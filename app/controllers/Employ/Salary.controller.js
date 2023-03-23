

"use strict";
const express = require("express");
const SalaryModal = require('../../models/Employ/Salary.modal')
const EmpInfoModal = require('../../models/Employ/Employ.model');
const HolidayModal = require('../../models/Employ/Holiday.modal')
const LeaveModal = require('../../models/Employ/leave.modal')
const yearModal = require('../../models/Employ/Year_Leave.modal')
const ObjectId = require("mongodb").ObjectId;
const moment = require("moment");
const { request } = require("express");
var convertRupeesIntoWords = require('convert-rupees-into-words');

var month_array = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

class Salary {

    async get_salary(req, res, next) {
        try {
            yearModal.findOne({ year: req.query.year })
                .then(function (leave) {
                    res.send(leave);
                }).catch(next);

        }
        catch (err) {
            res.send({ "error": err })
        }
    }

    async salary_(req, res, next) {
        var year = req.query.year;
        var arrear_effective_date = 0
        var month = req.query.month
        const compareDates = (year, month, effective_date_emp) => {
            var month_flag = Number(month) < 10 ? "0" : ""
            var to_match_date = year + "-" + month_flag + month + "-" + effective_date_emp.toString().slice(8, 10);
            const effectiveDate = new Date(effective_date_emp);
            const toMatchDate = new Date(`${to_match_date}T00:00:00.000Z`);
            // if (toMatchDate.getFullYear() < effectiveDate.getFullYear() ||
            //     (toMatchDate.getFullYear() === effectiveDate.getFullYear() && toMatchDate.getMonth() >= effectiveDate.getMonth())) {
            if (toMatchDate < effectiveDate) {
                return "before";
            } else {
                return "after";
            }

        }

        if (!req.query.userid || !req.query.year || !req.query.month) {
            return res.send({ message: "Please fill in all fields." });
        }
        var Salary_Modal = await SalaryModal.find({
            userid: req.query.userid,
            Salary_Slip_Year: req.query.year,
            Salary_Slip_Month: req.query.month,
        })
        var leave_balence_year
        var empinfo_modal = await EmpInfoModal.find({
            _id: req.query.userid
        })
        empinfo_modal = empinfo_modal[0]
        // return
        if (moment(empinfo_modal.date_of_joining).date() > 15 && moment(empinfo_modal.date_of_joining).month() + 1 == Number(req.query.month) && moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month)) {
            leave_balence_year = 0
        }
        else {
            var year_leave_ = await yearModal.findOne({ year: year })
            leave_balence_year = year_leave_.leave

        }

        if (Salary_Modal.length != 0 && !req.body.overwrite_payslip) {
            console.log(Salary_Modal[0], '..................')
            return res.send(Salary_Modal[0])




        } else if (Salary_Modal.length != 0 && req.body.overwrite_payslip) {
            var salary_emp
            var effective_date_emp = empinfo_modal.base_salary_list
            var result = ""
            console.log(moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month), '--------------true');
            if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month)) {
                if (effective_date_emp.length > 1) {
                    for (let i = 1; i < effective_date_emp.length; i++) {
                        result = compareDates(year, month, effective_date_emp[i].effective_date);
                        if (result == "before") {
                            salary_emp = effective_date_emp[i - 1].salary_
                            console.log('111111111111');
                            break
                        } else {
                            salary_emp = effective_date_emp[i - 1].salary_
                            console.log('222222222222222---', salary_emp);
                        }
                    }


                } else {
                    salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                    console.log('333333333');
                }
            }
            // return
            if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 != Number(req.query.month)) {
                console.log('overrite1----------');
                const findLeave = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });


                var leave_taken = 0
                for (let i = 0; i < findLeave.length; i++) {
                    leave_taken += findLeave[i].total_number_of_day
                }

                const holiday = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                console.log({ empinfo_modal });
                var salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                console.log("balance_days", balance_days);
                var present_days = working_days - leave_taken
                if (present_days == 0) {
                    leave_balence_year = 0
                }
                console.log("present_days", present_days);
                var balance_days = leave_balence_year - leave_taken
                var total_paid_days = present_days + leave_balence_year
                console.log("total_paid_days", total_paid_days);
                var gross_basic_da = Math.round(salary_emp / 2)
                var gross_hra = Math.round((gross_basic_da * 40) / 100)
                var gross_ra = Math.round((gross_basic_da * 15) / 100)
                var gross_flexi_benifits = Math.round(salary_emp - gross_basic_da - gross_hra - gross_ra)
                var earned_basic_da = (gross_basic_da / working_days) * total_paid_days
                var earned_hra = (gross_hra / working_days) * total_paid_days
                var earned_ra = (gross_ra / working_days) * total_paid_days
                var earned_flexi_benifits = (gross_flexi_benifits / working_days) * total_paid_days
                var net_pay_in_number = Number((salary_emp / working_days) * total_paid_days) + Number(req.body.arrear) + Number(req.body.additional)
                net_pay_in_number = Math.round(net_pay_in_number)
                var net_pay_in_word = convertRupeesIntoWords(Math.round(net_pay_in_number))



            }
            else if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month) &&
                empinfo_modal.base_salary_list.length == 1) {
                console.log('overrite12-------');

                const holiday = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                const holiday_emp = await HolidayModal.find({
                    holiday_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                const findLeave = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                var leave_taken = 0
                for (let i = 0; i < findLeave.length; i++) {
                    leave_taken += findLeave[i].total_number_of_day
                }


                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                var salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                var present_days = Number(month_array[Number(req.query.month) - 1]) - holiday_emp.length - moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() + 1 - leave_taken
                if (present_days == 0) {
                    leave_balence_year = 0
                }
                var balance_days = leave_balence_year - leave_taken
                var total_paid_days = present_days + leave_balence_year
                var gross_basic_da = Math.round(salary_emp / 2)
                var gross_hra = Math.round((gross_basic_da * 40) / 100)
                var gross_ra = Math.round((gross_basic_da * 15) / 100)
                var gross_flexi_benifits = Math.round(salary_emp - gross_basic_da - gross_hra - gross_ra)
                var earned_basic_da = (gross_basic_da / working_days) * total_paid_days
                var earned_hra = (gross_hra / working_days) * total_paid_days
                var earned_ra = (gross_ra / working_days) * total_paid_days
                var earned_flexi_benifits = (gross_flexi_benifits / working_days) * total_paid_days
                var net_pay_in_number = (salary_emp / working_days) * total_paid_days + Number(req.body.arrear) + Number(req.body.additional)
                net_pay_in_number = Math.round(net_pay_in_number)
                var net_pay_in_word = convertRupeesIntoWords(net_pay_in_number)

            }
            else if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month) &&
                empinfo_modal.base_salary_list.length > 1 && moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() == 1) {
                console.log('overrite13-------');

                const findLeave = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });


                var leave_taken = 0
                for (let i = 0; i < findLeave.length; i++) {
                    leave_taken += findLeave[i].total_number_of_day
                }

                const holiday = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                var salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                console.log("balance_days", balance_days);
                var present_days = working_days - leave_taken
                if (present_days == 0) {
                    leave_balence_year = 0
                }
                console.log("present_days", present_days);
                var total_paid_days = present_days + leave_balence_year
                var balance_days = leave_balence_year - leave_taken
                console.log("total_paid_days", total_paid_days);
                var gross_basic_da = Math.round(salary_emp / 2)
                var gross_hra = Math.round((gross_basic_da * 40) / 100)
                var gross_ra = Math.round((gross_basic_da * 15) / 100)
                var gross_flexi_benifits = Math.round(salary_emp - gross_basic_da - gross_hra - gross_ra)
                var earned_basic_da = (gross_basic_da / working_days) * total_paid_days
                var earned_hra = (gross_hra / working_days) * total_paid_days
                var earned_ra = (gross_ra / working_days) * total_paid_days
                var earned_flexi_benifits = (gross_flexi_benifits / working_days) * total_paid_days
                var net_pay_in_number = Number((salary_emp / working_days) * total_paid_days) + Number(req.body.arrear) + Number(req.body.additional)
                net_pay_in_number = Math.round(net_pay_in_number)
                var net_pay_in_word = convertRupeesIntoWords(Math.round(net_pay_in_number))



            }
            else {

                const holiday = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                const holiday_1 = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lt: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date
                    }
                });

                const holiday_2 = await HolidayModal.find({
                    holiday_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });


                const findLeave = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });
                var leave_taken = 0
                console.log(findLeave, 'findLeave');
                for (let i = 0; i < findLeave.length; i++) {
                    leave_taken += findLeave[i].total_number_of_day
                }

                const findLeave_1 = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lt: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date
                    },
                    to_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lt: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date
                    }
                });


                var leave_taken_1 = 0
                console.log(findLeave_1, 'findLeave');
                for (let i = 0; i < findLeave_1.length; i++) {
                    leave_taken_1 += findLeave_1[i].total_number_of_day
                }


                const findLeave_2 = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                var leave_taken_2 = 0
                for (let i = 0; i < findLeave_2.length; i++) {
                    leave_taken += findLeave_2[i].total_number_of_day
                }


                // return
                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                var working_days_1 = moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() - 1 - holiday_1.length
                var working_days_2 = Number(month_array[Number(req.query.month) - 1]) - holiday_2.length - moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() + 1

                var month_days_1 = moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() - 1
                var month_days_2 = Number(month_array[Number(req.query.month) - 1]) - month_days_1

                var salary_emp_1 = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 2].salary_)
                var salary_emp_2 = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)


                console.log(balance_days, 'balance_days')
                console.log(leave_taken, 'leave_taken');
                // return
                var present_days = working_days - leave_taken
                if (present_days == 0) {
                    leave_balence_year = 0
                }
                var balance_days = leave_balence_year - leave_taken
                var present_days_1 = working_days_1 - leave_taken_1 + leave_balence_year
                var present_days_2 = working_days_2 - leave_taken_2
                var net_pay_in_number = Math.round((((salary_emp_1 / working_days) * present_days_1) + ((salary_emp_2 / working_days) * present_days_2)) + Number(req.body.arrear) + Number(req.body.additional))
                var net_pay_in_word = convertRupeesIntoWords(Math.round(net_pay_in_number))
                var total_paid_days = present_days + leave_balence_year

                var gross_basic_da_1 = Math.round(((salary_emp_1 / 2) / Number(month_array[Number(req.query.month) - 1])) * month_days_1)
                var gross_basic_da_2 = Math.round(((salary_emp_2 / 2) / Number(month_array[Number(req.query.month) - 1])) * month_days_2)
                // var gross_basic_da = gross_basic_da_1 + gross_basic_da_2
                var gross_basic_da = Math.round(salary_emp / 2)

                var gross_hra_1 = Math.round((gross_basic_da_1 * 40) / 100)
                var gross_hra_2 = Math.round((gross_basic_da_2 * 40) / 100)
                // var gross_hra = gross_hra_1 + gross_hra_2
                var gross_hra = Math.round((gross_basic_da * 40) / 100)


                var gross_ra_1 = Math.round((gross_basic_da_1 * 15) / 100)
                var gross_ra_2 = Math.round((gross_basic_da_2 * 15) / 100)
                // var gross_ra = gross_ra_1 + gross_ra_2
                var gross_ra = Math.round((gross_basic_da * 15) / 100)


                var gross_flexi_benifits_1 = Math.round(((salary_emp_1 - gross_basic_da_1 - gross_hra_1 - gross_ra_1) / Number(month_array[Number(req.query.month) - 1]) * month_days_1))
                var gross_flexi_benifits_2 = Math.round(((salary_emp_2 - gross_basic_da_2 - gross_hra_2 - gross_ra_2) / Number(month_array[Number(req.query.month) - 1]) * month_days_2))
                // var gross_flexi_benifits = gross_flexi_benifits_1 + gross_flexi_benifits_2
                var gross_flexi_benifits = salary_emp - (gross_basic_da + gross_hra + gross_ra)

                var earned_basic_da_1 = (gross_basic_da_1 / working_days) * present_days_1
                var earned_basic_da_2 = (gross_basic_da_2 / working_days) * present_days_2
                // var earned_basic_da = earned_basic_da_1 + earned_basic_da_2
                var earned_basic_da = Math.round(net_pay_in_number / 2)

                console.log(net_pay_in_number, 'net_pay_in_number');
                var earned_hra_1 = (gross_hra_1 / working_days) * present_days_1
                var earned_hra_2 = (gross_hra_2 / working_days) * present_days_2
                // var earned_hra = earned_hra_1 + earned_hra_2
                var earned_hra = Math.round((earned_basic_da * 40) / 100)
                console.log(earned_basic_da, 'earned_basic_da');
                var earned_ra_1 = (gross_ra_1 / working_days) * present_days_1
                var earned_ra_2 = (gross_ra_2 / working_days) * present_days_2
                // var earned_ra = earned_ra_1 + earned_ra_2
                var earned_ra = Math.round((earned_basic_da * 15) / 100)

                var earned_flexi_benifits_1 = (gross_flexi_benifits_1 / working_days) * present_days_1
                var earned_flexi_benifits_2 = (gross_flexi_benifits_2 / working_days) * present_days_2
                // var earned_flexi_benifits = earned_flexi_benifits_1 + earned_flexi_benifits_2
                var earned_flexi_benifits = net_pay_in_number - (earned_basic_da + earned_hra + earned_ra)



                var arrear_effective_date = net_pay_in_number - salary_emp
                console.log(arrear_effective_date, 'arrear_effective_date');
            }
            console.log('-------------------------------------------------------------------------');
            const salary = new SalaryModal({
                Employee_name: empinfo_modal.First_Name + " " + empinfo_modal.Last_Name,
                userid: empinfo_modal._id,
                Employee_code: empinfo_modal.Employee_Code,
                designation: empinfo_modal.Position,
                Salary_Slip_Month: req.query.month,
                Salary_Slip_Year: req.query.year,
                Date_of_Joining: empinfo_modal.date_of_joining,
                Bank_Account_Number: empinfo_modal.Bank_No,
                Bank_IFSC_Code: empinfo_modal.Bank_IFSC,
                Total_Work_Days: working_days,
                Leave_balence: leave_balence_year,
                Leave_taken: leave_taken,
                Balence_days: balance_days,
                Present_day: present_days,
                Total_paid_day: total_paid_days,
                Gross_Basic_DA: gross_basic_da,
                Gross_HRA: gross_hra,
                Gross_RA: gross_ra,
                Gross_Flext_benefits: gross_flexi_benifits,
                Gross_total: salary_emp,
                Earned_Basic_DA: Math.round(earned_basic_da),
                Earned_HRA: Math.round(earned_hra),
                Earned_RA: Math.round(earned_ra),
                Earned_Flext_benefits: Math.round(earned_flexi_benifits),
                Total_earn: Math.round(earned_basic_da + earned_hra + earned_ra + earned_flexi_benifits),
                Net_pay_in_number: net_pay_in_number,
                Net_pay_in_words: net_pay_in_word,
                ARRS: Number(req.body.arrear) + Number(arrear_effective_date),
                Additional: Number(req.body.additional),
                ARRS_Comment: req.body.arrear_comment,
                Additional_Comment: req.body.additional_comment,

            });

            await salary.save();
            console.log({ salary });
            res.status(200).send({ success: true, 'salary': salary })
        }
        else if (Salary_Modal.length == 0) {
            if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 != Number(req.query.month)) {
                console.log('1111111');
                const findLeave = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                var leave_taken = 0
                for (let i = 0; i < findLeave.length; i++) {
                    leave_taken += findLeave[i].total_number_of_day
                }

                const holiday = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                var salary_emp
                var effective_date_emp = empinfo_modal.base_salary_list
                var result = ""

                console.log('effective_date_emp.length > 1', effective_date_emp.length > 1);
                if (effective_date_emp.length > 1) {
                    for (let i = 1; i < effective_date_emp.length; i++) {
                        result = compareDates(year, month, effective_date_emp[i].effective_date);
                        if (result == "before") {
                            salary_emp = effective_date_emp[i - 1].salary_
                            break
                        } else {
                            salary_emp = effective_date_emp[effective_date_emp.length - 1].salary_
                        }
                    }

                } else {
                    salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                }
                console.log('result---', result);
                console.log('salary_emp---', salary_emp);
                // var salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                // return
                var present_days = working_days - leave_taken
                if (present_days == 0) {
                    leave_balence_year = 0
                }
                var balance_days = leave_balence_year - leave_taken
                var total_paid_days = present_days + leave_balence_year
                var gross_basic_da = Math.round(salary_emp / 2)
                var gross_hra = Math.round((gross_basic_da * 40) / 100)
                var gross_ra = Math.round((gross_basic_da * 15) / 100)
                var gross_flexi_benifits = Math.round(salary_emp - gross_basic_da - gross_hra - gross_ra)
                var earned_basic_da = (gross_basic_da / working_days) * total_paid_days
                var earned_hra = (gross_hra / working_days) * total_paid_days
                var earned_ra = (gross_ra / working_days) * total_paid_days
                var earned_flexi_benifits = (gross_flexi_benifits / working_days) * total_paid_days
                var net_pay_in_number = ((salary_emp / working_days) * total_paid_days) + Number(req.body.arrear) + Number(req.body.additional)
                net_pay_in_number = Math.round(net_pay_in_number)
                var net_pay_in_word = convertRupeesIntoWords(Math.round(net_pay_in_number))

            }
            else if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month) && empinfo_modal.base_salary_list.length == 1) {
                console.log('222222');
                const holiday = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month)]
                    }
                });
                // console.log('holiday', holiday);
                const holiday_emp = await HolidayModal.find({
                    holiday_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                const findLeave = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });


                var leave_taken = 0
                for (let i = 0; i < findLeave.length; i++) {
                    leave_taken += findLeave[i].total_number_of_day
                }


                console.log(leave_taken, 'leave_taken');
                console.log(findLeave, 'findLeave');

                // return

                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                console.log(working_days, '0000000000000');
                var salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                var balance_days = leave_balence_year - leave_taken
                if (present_days == 0) {
                    leave_balence_year == 0
                }
                var present_days = Number(month_array[Number(req.query.month) - 1]) - holiday_emp.length - moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() + 1 - leave_taken
                console.log(present_days, 'present_days');

                var total_paid_days = present_days + leave_balence_year

                console.log(balance_days, 'balance_days');
                console.log(total_paid_days, 'total_paid_days');
                // return
                var gross_basic_da = Math.round(salary_emp / 2)
                var gross_hra = Math.round((gross_basic_da * 40) / 100)
                var gross_ra = Math.round((gross_basic_da * 15) / 100)
                var gross_flexi_benifits = Math.round(salary_emp - gross_basic_da - gross_hra - gross_ra)
                var earned_basic_da = (gross_basic_da / working_days) * total_paid_days
                var earned_hra = (gross_hra / working_days) * total_paid_days
                var earned_ra = (gross_ra / working_days) * total_paid_days
                var earned_flexi_benifits = (gross_flexi_benifits / working_days) * total_paid_days
                var net_pay_in_number = (salary_emp / working_days) * total_paid_days + Number(req.body.arrear) + Number(req.body.additional)
                net_pay_in_number = Math.round(net_pay_in_number)
                var net_pay_in_word = convertRupeesIntoWords(net_pay_in_number)

            }
            else if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month) &&
                empinfo_modal.base_salary_list.length > 1 && moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() == 1) {
                console.log('555555555');
                const findLeave = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });


                var leave_taken = 0
                for (let i = 0; i < findLeave.length; i++) {
                    leave_taken += findLeave[i].total_number_of_day
                }

                const holiday = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });
                var present_days = working_days - leave_taken
                if (present_days == 0) {
                    leave_balence_year = 0
                }
                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                var salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                var balance_days = leave_balence_year - leave_taken
                console.log("balance_days", balance_days);
                console.log("present_days", present_days);
                var total_paid_days = present_days + leave_balence_year
                console.log("total_paid_days", total_paid_days);
                var gross_basic_da = Math.round(salary_emp / 2)
                var gross_hra = Math.round((gross_basic_da * 40) / 100)
                var gross_ra = Math.round((gross_basic_da * 15) / 100)
                var gross_flexi_benifits = Math.round(salary_emp - gross_basic_da - gross_hra - gross_ra)
                var earned_basic_da = (gross_basic_da / working_days) * total_paid_days
                var earned_hra = (gross_hra / working_days) * total_paid_days
                var earned_ra = (gross_ra / working_days) * total_paid_days
                var earned_flexi_benifits = (gross_flexi_benifits / working_days) * total_paid_days
                var net_pay_in_number = Number((salary_emp / working_days) * total_paid_days) + Number(req.body.arrear) + Number(req.body.additional)
                net_pay_in_number = Math.round(net_pay_in_number)
                var net_pay_in_word = convertRupeesIntoWords(Math.round(net_pay_in_number))

            }

            else {
                var salary_emp
                var effective_date_emp = empinfo_modal.base_salary_list
                var result = ""
                console.log(moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month), '--------------true');
                if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month)) {
                    if (effective_date_emp.length > 1) {
                        for (let i = 1; i < effective_date_emp.length; i++) {
                            result = compareDates(year, month, effective_date_emp[i].effective_date);
                            if (result == "before") {
                                salary_emp = effective_date_emp[i - 1].salary_
                                console.log('111111111111');
                                break
                            } else {
                                salary_emp = effective_date_emp[i - 1].salary_
                                console.log('222222222222222-----------------', salary_emp);
                            }
                        }


                    } else {
                        salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                        console.log('333333333');
                    }
                }
                console.log('999999');
                const holiday = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                const holiday_1 = await HolidayModal.find({
                    holiday_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lt: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date
                    }
                });

                const holiday_2 = await HolidayModal.find({
                    holiday_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                const findLeave = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                var leave_taken = 0
                for (let i = 0; i < findLeave.length; i++) {
                    leave_taken += findLeave[i].total_number_of_day
                }

                const findLeave_1 = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lt: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date
                    },
                    to_date: {
                        $gte: req.query.year + "-" + req.query.month + '-01',
                        $lt: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date
                    }
                });

                var leave_taken_1 = 0
                for (let i = 0; i < findLeave_1.length; i++) {
                    leave_taken_1 += findLeave_1[i].total_number_of_day
                }

                const findLeave_2 = await LeaveModal.find({
                    userid: req.query.userid,
                    from_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    },
                    to_date: {
                        $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date,
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]
                    }
                });

                var leave_taken_2 = 0
                for (let i = 0; i < findLeave_2.length; i++) {
                    leave_taken_2 += findLeave_2[i].total_number_of_day
                }
                console.log('-----');
                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                var working_days_1 = moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() - 1 - holiday_1.length
                var working_days_2 = Number(month_array[Number(req.query.month) - 1]) - holiday_2.length - moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() + 1

                var month_days_1 = moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() - 1
                var month_days_2 = Number(month_array[Number(req.query.month) - 1]) - month_days_1

                var salary_emp_1 = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 2].salary_)
                var salary_emp_2 = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)


                var present_days = working_days - leave_taken
                if (present_days == 0) {
                    leave_balence_year = 0
                }
                var balance_days = leave_balence_year - leave_taken
                var present_days_1 = working_days_1 - leave_taken_1 + leave_balence_year
                var present_days_2 = working_days_2 - leave_taken_2
                console.log('88888');
                var total_paid_days = present_days + leave_balence_year
                var net_pay_in_number = Math.round((((salary_emp_1 / working_days) * present_days_1) + ((salary_emp_2 / working_days) * present_days_2)) + Number(req.body.arrear) + Number(req.body.additional))
                var net_pay_in_word = convertRupeesIntoWords(Math.round(net_pay_in_number))
                var gross_basic_da_1 = Math.round(((salary_emp_1 / 2) / Number(month_array[Number(req.query.month) - 1])) * month_days_1)
                var gross_basic_da_2 = Math.round(((salary_emp_2 / 2) / Number(month_array[Number(req.query.month) - 1])) * month_days_2)
                // var gross_basic_da = gross_basic_da_1 + gross_basic_da_2
                var gross_basic_da = Math.round(salary_emp / 2)
                console.log('3456');
                var gross_hra_1 = Math.round((gross_basic_da_1 * 40) / 100)
                var gross_hra_2 = Math.round((gross_basic_da_2 * 40) / 100)
                // var gross_hra = gross_hra_1 + gross_hra_2
                var gross_hra = Math.round((gross_basic_da * 40) / 100)


                var gross_ra_1 = Math.round((gross_basic_da_1 * 15) / 100)
                var gross_ra_2 = Math.round((gross_basic_da_2 * 15) / 100)
                // var gross_ra = gross_ra_1 + gross_ra_2
                var gross_ra = Math.round((gross_basic_da * 15) / 100)


                var gross_flexi_benifits_1 = Math.round(((salary_emp_1 - gross_basic_da_1 - gross_hra_1 - gross_ra_1) / Number(month_array[Number(req.query.month) - 1]) * month_days_1))
                var gross_flexi_benifits_2 = Math.round(((salary_emp_2 - gross_basic_da_2 - gross_hra_2 - gross_ra_2) / Number(month_array[Number(req.query.month) - 1]) * month_days_2))
                // var gross_flexi_benifits = gross_flexi_benifits_1 + gross_flexi_benifits_2
                var gross_flexi_benifits = salary_emp - (gross_basic_da + gross_hra + gross_ra)
                var earned_basic_da_1 = (gross_basic_da_1 / working_days) * present_days_1
                var earned_basic_da_2 = (gross_basic_da_2 / working_days) * present_days_2
                // var earned_basic_da = earned_basic_da_1 + earned_basic_da_2

                var earned_basic_da = Math.round(net_pay_in_number / 2)

                var earned_hra_1 = (gross_hra_1 / working_days) * present_days_1
                var earned_hra_2 = (gross_hra_2 / working_days) * present_days_2
                // var earned_hra = earned_hra_1 + earned_hra_2
                var earned_hra = Math.round((earned_basic_da * 40) / 100)

                var earned_ra_1 = (gross_ra_1 / working_days) * present_days_1
                var earned_ra_2 = (gross_ra_2 / working_days) * present_days_2
                // var earned_ra = earned_ra_1 + earned_ra_2
                var earned_ra = Math.round((earned_basic_da * 15) / 100)

                var earned_flexi_benifits_1 = (gross_flexi_benifits_1 / working_days) * present_days_1
                var earned_flexi_benifits_2 = (gross_flexi_benifits_2 / working_days) * present_days_2
                // var earned_flexi_benifits = earned_flexi_benifits_1 + earned_flexi_benifits_2

                var earned_flexi_benifits = net_pay_in_number - (earned_basic_da + earned_hra + earned_ra)


                var arrear_effective_date = net_pay_in_number - salary_emp
                console.log(arrear_effective_date, 'arrear_effective_date');
            }
            // return


            console.log('result---', result);
            console.log('salary_emp---', salary_emp);
            console.log(salary_emp, 'salary_emp');
            // return
            const salary = new SalaryModal({
                Employee_name: empinfo_modal.First_Name + " " + empinfo_modal.Last_Name,
                userid: empinfo_modal._id,
                Employee_code: empinfo_modal.Employee_Code,
                designation: empinfo_modal.Position,
                Salary_Slip_Month: req.query.month,
                Salary_Slip_Year: req.query.year,
                Date_of_Joining: empinfo_modal.date_of_joining,
                Bank_Account_Number: empinfo_modal.Bank_No,
                Bank_IFSC_Code: empinfo_modal.Bank_IFSC,
                Total_Work_Days: working_days,
                Leave_balence: leave_balence_year,
                Leave_taken: leave_taken,
                Balence_days: balance_days,
                Present_day: present_days,
                Total_paid_day: total_paid_days,
                Gross_Basic_DA: gross_basic_da,
                Gross_HRA: gross_hra,
                Gross_RA: gross_ra,
                Gross_Flext_benefits: gross_flexi_benifits,
                Gross_total: salary_emp,
                Earned_Basic_DA: Math.round(earned_basic_da),
                Earned_HRA: Math.round(earned_hra),
                Earned_RA: Math.round(earned_ra),
                Earned_Flext_benefits: Math.round(earned_flexi_benifits),
                Total_earn: net_pay_in_number,
                Net_pay_in_number: net_pay_in_number,
                Net_pay_in_words: net_pay_in_word,
                ARRS: Number(req.body.arrear) + Number(arrear_effective_date),
                Additional: Number(req.body.additional),
                ARRS_Comment: req.body.arrear_comment,
                Additional_Comment: req.body.additional_comment,

            });

            await salary.save();
            res.status(200).send({ success: true, 'salary': salary })

        }

        else {
            return res.send({ message: "Either salary slip of this user don't exist or trying to generate salary slip befor 1st or 5th date." })
        }
    }

    async update_salary(req, res) {
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const userid = req.params.id;

        SalaryModal.findOneAndUpdate({ userid: userid }, req.body)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update =${id}`
                    });
                } else res.send({ message: "updated successfully." });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating=" + id
                });
                console.log(err)
            });
    }
    async salary_delete(req, res) {
        try {
            const userDelete = await SalaryModal.findByIdAndDelete(req.params.id)
            if (!userDelete) {
                return res.status(404).send({ message: "This user not Exist." });
            }
            res.status(201).json({ message: "delete successfuly" });
            console.log({ userDelete });

        } catch (error) {
            res.send({ error });
        }
    }
    async get_salary_id(req, res) {
        const data = await SalaryModal.find()
        var arr = []
        data.forEach((Val) => {
            arr.push(Val.userid)
            console.log(Val.userid);
        })
        if (!arr) {
            return res.status(404).send({ message: " user id not  Exist." });
        }

        res.send(arr);
    }
    async get_one_emp(req, res, next) {
        var val = req.params;
        const name = val.id
        // return
        SalaryModal.findOne({ userid: name }).then((employee) => {
            if (!employee) {
                return res.status(404).send({ message: "This user not Exist." });
            }
            res.send(employee);
        }).catch((error) => {
            res.status(500).send(error);
        })
    }

}
module.exports = new Salary();
