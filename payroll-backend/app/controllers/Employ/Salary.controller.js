

"use strict";
const express = require("express");
const SalaryModal = require('../../models/Employ/Salary.modal')
const EmpInfoModal = require('../../models/Employ/Employ.model');
const HolidayModal = require('../../models/Employ/Holiday.modal')
const LeaveModal = require('../../models/Employ/leave.modal')
const ObjectId = require("mongodb").ObjectId;
const moment = require("moment");
const { request } = require("express");
var convertRupeesIntoWords = require('convert-rupees-into-words');

var month_array = ['31','28','31','30','31','30','31','31','30','31','30','31'];

// const info = Emp.add_employ().employee
class Salary {

    async salary_(req, res, next){

        var Salary_Modal = await SalaryModal.find({
            userid : req.query.userid,
            Salary_Slip_Year: req.query.year,
            Salary_Slip_Month : req.query.month,
        })

        if (Salary_Modal.length != 0){
            return res.send(Salary_Modal[0])
        }

        else if (Salary_Modal.length == 0 && moment().date() > 5){

            var empinfo_modal = await EmpInfoModal.find({
                _id : req.query.userid
            })

            empinfo_modal = empinfo_modal[0]
            

            if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 != Number(req.query.month)){

                
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
                console.log(findLeave)
    
                var leave_taken = 0
                for(let i = 0; i < findLeave.length; i++){
                    leave_taken += findLeave[i].total_number_of_day
                    console.log(leave_taken)
                }

                const holiday = await HolidayModal.find({
                    holiday_date: { 
                        $gte: req.query.year + "-" + req.query.month + '-01', 
                        $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1] 
                    }
                });

                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                var salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                var balance_days = 1 - leave_taken
                var present_days = working_days - leave_taken
                var total_paid_days = present_days + 1
                var gross_basic_da = Math.round(salary_emp / 2)
                var gross_hra = Math.round((gross_basic_da * 40) / 100)
                var gross_ra = Math.round((gross_basic_da * 15) / 100)
                var gross_flexi_benifits =  Math.round(salary_emp - gross_basic_da - gross_hra - gross_ra)
                var earned_basic_da = Math.round((gross_basic_da / working_days) * total_paid_days)
                var earned_hra = Math.round((gross_hra / working_days) * total_paid_days)
                var earned_ra = Math.round((gross_ra/ working_days) * total_paid_days)
                var earned_flexi_benifits = Math.round((gross_flexi_benifits / working_days) * total_paid_days)
                var net_pay_in_number = (salary_emp / working_days) * total_paid_days
                net_pay_in_number = (Math.round(net_pay_in_number * 100) / 100) + Number(req.query.arrear) + Number(req.query.additional)
                var net_pay_in_word = convertRupeesIntoWords(Math.round(net_pay_in_number))


                
            }
            else if (moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).month() + 1 == Number(req.query.month) && empinfo_modal.base_salary_list.length == 1){
                console.log("====================================================")
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
                console.log(findLeave)
    
                var leave_taken = 0
                for(let i = 0; i < findLeave.length; i++){
                    leave_taken += findLeave[i].total_number_of_day
                    console.log(leave_taken)
                }


                var working_days = Number(month_array[Number(req.query.month) - 1]) - holiday.length
                var salary_emp = Number(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].salary_)
                var balance_days = 1 - leave_taken
                var present_days = Number(month_array[Number(req.query.month) - 1]) - holiday_emp.length - moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() + 1 - leave_taken
                var total_paid_days = present_days + 1
                var gross_basic_da = Math.round(salary_emp / 2)
                var gross_hra = Math.round((gross_basic_da * 40) / 100)
                var gross_ra = Math.round((gross_basic_da * 15) / 100)
                var gross_flexi_benifits =  Math.round(salary_emp - gross_basic_da - gross_hra - gross_ra)
                var earned_basic_da = Math.round((gross_basic_da / working_days) * total_paid_days)
                var earned_hra = Math.round((gross_hra / working_days) * total_paid_days)
                var earned_ra = Math.round((gross_ra/ working_days) * total_paid_days)
                var earned_flexi_benifits = Math.round((gross_flexi_benifits / working_days) * total_paid_days)
                var net_pay_in_number = (salary_emp / working_days) * total_paid_days + Number(req.query.arrear) + Number(req.query.additional)
                net_pay_in_number = Math.round(net_pay_in_number)
                var net_pay_in_word = convertRupeesIntoWords(net_pay_in_number)

                console.log(earned_basic_da + earned_hra + earned_ra + earned_flexi_benifits)
                console.log(earned_basic_da)
                console.log(earned_hra)
                console.log(earned_ra)
                console.log(earned_flexi_benifits)



            }
            else{
                return res.send({message : "api is in progress for this condition"})
            }

            // else{

            //     const holiday_1 = await HolidayModal.find({
            //         holiday_date: { 
            //             $gte: req.query.year + "-" + req.query.month + '-01', 
            //             $lt: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date
            //         }
            //     });

            //     const holiday_2 = await HolidayModal.find({
            //         holiday_date: { 
            //             $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date, 
            //             $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1] 
            //         }
            //     });


            //     const findLeave = await LeaveModal.find({
            //         userid: req.query.userid,
            //         from_date: {
            //             $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date, 
            //             $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]  
            //         },
            //         to_date: {
            //             $gte: empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date, 
            //             $lte: req.query.year + "-" + req.query.month + "-" + month_array[Number(req.query.month) - 1]  
            //         }
            //     });
            //     console.log(findLeave)
    
            //     var leave_taken = 0
            //     for(let i = 0; i < findLeave.length; i++){
            //         leave_taken += findLeave[i].total_number_of_day
            //         console.log(leave_taken)
            //     }
                
            //     var working_days_1 = moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() - 1 - holiday_1.length
            //     var working_days_2 = Number(month_array[Number(req.query.month) - 1]) - holiday_2.length - moment(empinfo_modal.base_salary_list[empinfo_modal.base_salary_list.length - 1].effective_date).date() + 1
            //     var working_days_check = Number(month_array[Number(req.query.month) - 1]) - holiday_1.length
            //     var working_days = working_days_1 + working_days_2
            //     var salary_emp_1 = Number(empinfo_modal.base_salary_list[base_salary_list.length - 1].salary_)
            //     var salary_emp_2 = Number(empinfo_modal.base_salary_list[base_salary_list.length - 2].salary_)
            //     salary_emp = salary_emp_1 + salary_emp_2
            //     var balance_days = 1 - leave_taken
            //     var present_days = working_days - leave_taken
            //     var total_paid_days = present_days + 1
            //     var gross_basic_da_1 = Math.round(salary_emp_1 / 2)
            //     var gross_basic_da_2 = Math.round(salary_emp_2 / 2)
            //     var gross_basic_da = gross_basic_da_1 + gross_basic_da_2
            //     var gross_hra_1 = Math.round((gross_basic_da_1 * 40) / 100)
            //     var gross_hra_2 = Math.round((gross_basic_da_2 * 40) / 100)
            //     var gross_hra = gross_hra_1 + gross_hra_2
            //     var gross_ra_1 = Math.round((gross_basic_da_1 * 15) / 100)
            //     var gross_ra_2 = Math.round((gross_basic_da_2 * 15) / 100)
            //     var gross_ra = gross_ra_1 + gross_ra_2
            //     var gross_flexi_benifits_1 =  Math.round(salary_emp_1 - gross_basic_da_1 - gross_hra_1 - gross_ra_1)
            //     var gross_flexi_benifits_2 =  Math.round(salary_emp_2 - gross_basic_da_2 - gross_hra_2 - gross_ra_2)
            //     var gross_flexi_benifits = gross_flexi_benifits_1 + gross_flexi_benifits_2
            //     var earned_basic_da_1 = Math.round((gross_basic_da_1 / working_days) * total_paid_days)
            //     var earned_hra_1 = Math.round((gross_hra_1 / working_days) * total_paid_days)
            //     var earned_ra_1 = Math.round((gross_ra_1/ working_days) * total_paid_days)
            //     var earned_flexi_benifits_1 = Math.round((gross_flexi_benifits_1 / working_days) * total_paid_days)
            //     var earned_basic_da_2 = Math.round((gross_basic_da_2 / working_days) * total_paid_days)
            //     var earned_hra_2 = Math.round((gross_hra_2 / working_days) * total_paid_days)
            //     var earned_ra_2 = Math.round((gross_ra_2/ working_days) * total_paid_days)
            //     var earned_flexi_benifits_2 = Math.round((gross_flexi_benifits_2 / working_days) * total_paid_days)
            //     var earned_basic_da = earned_basic_da_1 + earned_basic_da_2
            //     var earned_hra = earned_hra_1 + earned_hra_2
            //     var earned_ra = earned_ra_1 + earned_ra_2
            //     var earned_flexi_benifits = earned_flexi_benifits_1 + earned_flexi_benifits_2
            //     var net_pay_in_number = (salary_emp / working_days) * total_paid_days
            //     net_pay_in_number = (Math.round(net_pay_in_number * 100) / 100) + Number(req.query.arrear) + Number(req.query.additional)
            //     var net_pay_in_word = convertRupeesIntoWords(Math.round(net_pay_in_number))
            // }

            const salary = new SalaryModal({
                Employee_name : empinfo_modal.First_Name + " " + empinfo_modal.Last_Name,
                userid : empinfo_modal._id,
                Employee_code : empinfo_modal.Employee_Code,
                designation : empinfo_modal.Position,
                Salary_Slip_Month : req.query.month,
                Salary_Slip_Year : req.query.year,
                Date_of_Joining : empinfo_modal.date_of_joining,
                Bank_Account_Number : empinfo_modal.Bank_No,
                Bank_IFSC_Code : empinfo_modal.Bank_IFSC,
                Total_Work_Days : working_days,
                Leave_balence : 1,
                Leave_taken :leave_taken,
                Balence_days : balance_days,
                Present_day : present_days,
                Total_paid_day : total_paid_days,
                Gross_Basic_DA : gross_basic_da,
                Gross_HRA : gross_hra,
                Gross_RA : gross_ra,
                Gross_Flext_benefits : gross_flexi_benifits,
                Gross_total : gross_basic_da + gross_hra + gross_ra + gross_flexi_benifits,
                Earned_Basic_DA : earned_basic_da,
                Earned_HRA : earned_hra,
                Earned_RA : earned_ra,
                Earned_Flext_benefits : earned_flexi_benifits,
                Total_earn : earned_basic_da + earned_hra + earned_ra + earned_flexi_benifits,
                Net_pay_in_number : net_pay_in_number,
                Net_pay_in_words : net_pay_in_word,
                ARRS : Number(req.query.arrear),
                Additional : Number(req.query.additional),
                ARRS_Comment : req.query.arrear_comment,
                Additional_Comment : req.query.additional_comment,
    
            });

            await salary.save();
            console.log({ salary });
            res.status(200).send({ success: true, 'salary' : salary })          

        }

        else{
            return res.send({message : "Either salary slip of this user don't exist or trying to generate salary slip befor 1st or 5th date."})
        }
    }




    async salary(req, res) {

        console.log("Run ok");

        try {

            var { Employee_name,
                Employee_code, designation,
                Date_of_Joining,
                Salary_Slip_Month_Year,
                Employee_PAN, Employee_Adhar,
                Bank_Account_Number, Bank_IFSC_Code,
                Net_pay_in_words, userid,
                Net_pay_in_number,
                Total_Work_Days, Number_of_Leaves, Leave_balence
                , Leave_taken, Balence_days, Present_day, Total_paid_day
                , Basic_DA, HRA, RA, Flext_benefits, Total_earn, base_salary
            } = req.body;
            const date = new Date();
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const currentMonthName = monthNames[date.getMonth()];
            console.log(currentMonthName);
            const user_id = await SalaryModal.findOne({ userid: userid })
            // console.log(user_id.userid,"---------------------user_id-------------------");
            if ("March" || user_id.userid) {
                const userid = user_id.userid;

                try {
                    console.log(userid, '...........');
                    const userDelete = await SalaryModal.findByIdAndDelete(userid)
                    console.log(userDelete, '.........');
                    if (!userDelete) {
                        return res.status(404).send({ message: "This user not Exist." });
                    }
                    res.status(201).json({ message: "delete successfuly" });
                    console.log({ userDelete });

                } catch (error) {
                    res.send({ error });
                }

            }
            else {
                // CHECK ALL FIELD IN FILL
                // if (!Employee_name || !Employee_code || !Leave_balence ||
                //     !Employee_PAN || !Employee_Adhar || !Leave_taken ||
                //     !Bank_IFSC_Code || !Net_pay_in_number || !Balence_days
                //     || !designation || !Salary_Slip_Month_Year || !Present_day
                //     || !Date_of_Joining || !Bank_Account_Number || !Total_paid_day
                //     || !Net_pay_in_words || !Total_Work_Days || !Number_of_Leaves
                //     || !Basic_DA || !HRA || !RA || !Flext_benefits || !Total_earn
                // )
                //     return res.send({ message: "Please fill in all fields." });

                const leave = new SalaryModal({
                    Employee_name,
                    Employee_code,
                    userid,
                    designation,
                    base_salary,
                    Salary_Slip_Month_Year,
                    Date_of_Joining,
                    Employee_PAN,
                    Employee_Adhar,
                    Bank_Account_Number,
                    Bank_IFSC_Code,
                    Net_pay_in_words,
                    base_salary,
                    Net_pay_in_number,
                    Total_Work_Days,
                    Number_of_Leaves,
                    Leave_balence,
                    Leave_taken,
                    Balence_days,
                    Present_day,
                    Total_paid_day,
                    userid,
                    Basic_DA,
                    HRA,
                    RA,
                    Flext_benefits,
                    Total_earn
                    // file,
                });

                //STORE YOUR LOGIN DATA IN DB 
                await leave.save();
                console.log({ leave });
                // res.send({ message: "Success " });
                res.status(200).send({ success: true })

            }
        }
        catch (error) {
            // res.send("Error-", error);
            console.log(error);
            res.status(400).send({ 'status': false, 'error': error })

        }
    }

    async get_salary(req, res, next) {
        try {
            SalaryModal.find({})
                .then(function (leave) {
                    res.send(leave);
                }).catch(next);

        }
        catch (err) {
            res.send({ "error": err })
        }
    }
    async update_salary(req, res) {
        console.log('update runnig');
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
            console.log(req.params.id);
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
        console.log('get-salart');
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
            console.log("data:", employee);
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
