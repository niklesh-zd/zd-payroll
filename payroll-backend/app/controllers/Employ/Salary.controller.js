

"use strict";
const express = require("express");
const SalaryModal = require('../../models/Employ/Salary.modal')
const ObjectId = require("mongodb").ObjectId;

// const info = Emp.add_employ().employee
class Salary {
    async salary(req, res) {

        console.log("Run ok");
        try {

            var { Employee_name,
                Employee_code, designation,
                Date_of_Joining,
                Salary_Slip_Month_Year,
                Employee_PAN, Employee_Adhar,
                Bank_Account_Number, Bank_IFSC_Code,
                Net_pay_in_words,
                Net_pay_in_number,
                Total_Work_Days, Number_of_Leaves, Leave_balence
                , Leave_taken, Balence_days, Present_day, Total_paid_day
                , Basic_DA, HRA, RA, Flext_benefits, Total_earn
            } = req.body;

            // CHECK ALL FIELD IN FILL
            if (!Employee_name || !Employee_code || !Leave_balence ||
                !Employee_PAN || !Employee_Adhar || !Leave_taken ||
                !Bank_IFSC_Code || !Net_pay_in_number || !Balence_days
                || !designation || !Salary_Slip_Month_Year || !Present_day
                || !Date_of_Joining || !Bank_Account_Number || !Total_paid_day
                || !Net_pay_in_words || !Total_Work_Days || !Number_of_Leaves
                || !Basic_DA || !HRA || !RA || !Flext_benefits || !Total_earn
            )
                return res.send({ message: "Please fill in all fields." });

            const leave = new SalaryModal({
                Employee_name,
                Employee_code,
                designation,
                Salary_Slip_Month_Year,
                Date_of_Joining,
                Employee_PAN,
                Employee_Adhar,
                Bank_Account_Number,
                Bank_IFSC_Code,
                Net_pay_in_words,
                Net_pay_in_number,
                Total_Work_Days,
                Number_of_Leaves,
                Leave_balence,
                Leave_taken,
                Balence_days,
                Present_day,
                Total_paid_day,
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
        catch (error) {
            // res.send("Error-", error);
            res.status(400).send({ 'status': false, 'error': error })

        }
    }

    async get_salary(req, res, next) {

        SalaryModal.find({})
            .then(function (leave) {
                res.send(leave);
            }).catch(next);

    }
    async update_salary(req, res) {
        console.log('update runnig');
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        SalaryModal.findByIdAndUpdate(id, req.body)
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
}
module.exports = new Salary();
