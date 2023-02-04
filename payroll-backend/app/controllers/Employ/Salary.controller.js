

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
                EPF_Account_Number,
                Universal_Account_Number,
                Total_Work_Days, Number_of_Leaves, Leave_balence
                , Leave_taken, Balence_days, Present_day, Total_paid_day
                , Basic_DA, HRA, RA, Flext_benefits, Total_earn
            } = req.body;

            // CHECK ALL FIELD IN FILL
            if (!Employee_name || !Employee_code || !Leave_balence ||
                !Employee_PAN || !Employee_Adhar || !Leave_taken ||
                !Bank_IFSC_Code || !Universal_Account_Number || !Balence_days
                || !designation || !Salary_Slip_Month_Year || !Present_day
                || !Date_of_Joining || !Bank_Account_Number || !Total_paid_day
                || !EPF_Account_Number || !Total_Work_Days || !Number_of_Leaves
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
                EPF_Account_Number,
                Universal_Account_Number,
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
}
module.exports = new Salary();
