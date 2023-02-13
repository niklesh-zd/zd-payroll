"use strict";
const express = require("express");
const { findOne } = require("../../models/Employ/Employ.model");
const EmpInfoModal = require('../../models/Employ/Employ.model');
const DeleteEmpInfo = require('../../models/Employ/DeleteEmployee')
const { validationResult } = require('express-validator/check');

const ObjectId = require("mongodb").ObjectId;

class Emp {
    async add_employ(req, res, next) {

        console.log("Run ok");
        try {

            const { First_Name, Last_Name, date_of_birth, date_of_joining, gender,
                Contact_Number, Contact_Number_Home, Permanent_Address,
                Current_Address, email,
                fatherName, base_salary,
                Blood_Group, Marital_Status, PAN_No,
                ADHAR, Bank_No, Bank_IFSC, Alternate_Contact_number,
                Position,  DEGREE, STREAM, YEAR_OF_PASSING
                , PASSED, PERCENTAGE_OF_MARKS, permanent_state,
                permanent_city,
                current_state, is_active, permanent_pin_code,
                current_city, current_pin_code
            } = req.body;

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                console.log("err=>", errors.array());
                res.send({ message: errors.array() })
            }
            const emailFind = await EmpInfoModal.findOne({ email: email })
            const Pan_no = await EmpInfoModal.findOne({ PAN_No: PAN_No })
            const adhar = await EmpInfoModal.findOne({ ADHAR: ADHAR })
            const last_emp = await EmpInfoModal.find().sort({ _id: -1 }).limit(1);
            var next_emp_code;
            if (last_emp){
                const last_emp_code = last_emp[0].Employee_Code;
                console.log(`last emp code : ${last_emp_code}`);
                const splitted_emp_code = last_emp_code.split("-");
                var emp_code = Number(splitted_emp_code[1]) + 1;
                emp_code = emp_code.toString();
                while (emp_code.length < 4) emp_code = "0" + emp_code;
                next_emp_code = splitted_emp_code[0]+ "-" + emp_code;
    
            }
            else{
                next_emp_code = "A-0001";
            }
            console.log(`next emp code : ${next_emp_code}`);

            if (adhar) {
                return res.send({ message: "alredy exist ADHAR." })
            }

            if (Pan_no) {
                return res.send({ message: "alredy exist PAN_NO." })
            }
            if (emailFind) {
                return res.send({ message: "alredy exist emails." });
            }

            else {
                const employ = new EmpInfoModal({
                    First_Name: First_Name.charAt(0).toUpperCase() + First_Name.slice(1),
                    Last_Name: Last_Name.charAt(0).toUpperCase() + Last_Name.slice(1),
                    date_of_birth,
                    date_of_joining,
                    gender,
                    Contact_Number,
                    Contact_Number_Home,
                    Permanent_Address,
                    Current_Address,
                    email,
                    fatherName,
                    Alternate_Contact_number,
                    Blood_Group,
                    Marital_Status,
                    PAN_No,
                    permanent_state,
                    permanent_city,
                    current_state,
                    current_city,
                    base_salary,
                    ADHAR,
                    Bank_No,
                    Bank_IFSC,
                    Position,
                    Employee_Code : next_emp_code,
                    DEGREE,
                    STREAM,
                    is_active,
                    PASSED,
                    PERCENTAGE_OF_MARKS,
                    permanent_pin_code,
                    current_pin_code,
                    YEAR_OF_PASSING
                    // file,
                });
                //STORE YOUR LOGIN DATA IN DB 
                await employ.save();
                console.log({ employ });
                res.send({ message: "Success " });
            }
        }
        catch (error) {
            console.log(error);
            res.send({ message: error });
            Error.captureStackTrace(error);


        }
    }
    async get_user_id(req, res) {
        const data = await EmpInfoModal.find()
        var arr = []
        data.forEach((Val) => {
            arr.push(Val.id)
        })
        if (!arr) {
            return res.status(404).send({ message: " user id not  Exist." });
        }

        res.send(arr);


    }
    async get_emlpoy(req, res, next) {
        EmpInfoModal.find({ is_active: 1 }).then(function (employee) {
            res.send(employee);
        }).catch(next);
    }

    async udateStatus_emlpoy(req, res, next) {
        EmpInfoModal.findByIdAndUpdate(req.body.id, { is_active: req.body.status }).then(function (employee) {
            res.send(employee);
        }).catch(next);
    }

    async position(req, res) {
        var arr = ['Software_Architect', 'Engineering_Lead', 'Principal_Software_Engineer', 'Senior_Software_Developer',
            'Software_Engineer', 'Software_Developer', ' Junior_Software_Developer', ' Intern_Software_Developer', 'Other']

        for (var val = 0; val <= arr.length; val++) {
            console.log(arr[val]);
             res.send({arr:arr[val]})
        }

    }
    async get_one_emp(req, res, next) {
        console.log('----------', { id: req.params.id });
        EmpInfoModal.findById(req.params.id).then((employee) => {
            console.log("data:", employee);
            if (!employee) {
                return res.status(404).send({ message: "This user not Exist." });
            }
            res.send(employee);
        }).catch((error) => {
            res.status(500).send(error);
        })

    }
    async emp_delete(req, res) {
        try {
            console.log(req.params.id);
            const userDelete = await EmpInfoModal.findByIdAndDelete(req.params.id)
            if (!userDelete) {
                return res.status(404).send({ message: "This user not Exist." });
            }
            res.status(201).json({ message: "delete successfuly" });
            console.log({ userDelete });

        } catch (error) {
            res.send({ error });
        }
    }
    async emp_update(req, res) {
        console.log('update api runnig');
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        EmpInfoModal.findByIdAndUpdate(id, req.body)
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

    async Emp_swap(req, res) {
        // console.log("Check");

        var userId = req.params.id

        EmpInfoModal.findById(userId).then((employee) => {
            // console.log("data:", employee);
            if (!employee) {
                return res.status(404).send({ message: "This user not Exist." });
            }

            const employDelete = new DeleteEmpInfo({
                Emp_Id: employee._id,
                First_Name: employee.First_Name,
                Last_Name: employee.Last_Name,
                date_of_birth: employee.date_of_birth,
                date_of_joining: employee.date_of_joining,
                gender: employee.gender,
                Contact_Number: employee.Contact_Number,
                Contact_Number_Home: employee.Alternate_Contact_number,
                Permanent_Address: employee.Permanent_Address,
                Current_Address: employee.Current_Address,
                email: employee.email,
                fatherName: employee.fatherName,
                Alternate_Contact_number: employee.Alternate_Contact_number,
                Blood_Group: employee.Blood_Group,
                Marital_Status: employee.Marital_Status,
                PAN_No: employee.PAN_No,
                state: employee.state,
                city: employee.city,
                ADHAR: employee.ADHAR,
                Bank_No: employee.Bank_No,
                Bank_IFSC: employee.Bank_IFSC,
                Position: employee.Position,
                Employee_Code: employee.Employee_Code,
                DEGREE: employee.DEGREE,
                STREAM: employee.STREAM,
                PASSED: employee.PASSED,
                PERCENTAGE_OF_MARKS: employee.PERCENTAGE_OF_MARKS,
                YEAR_OF_PASSING: employee.YEAR_OF_PASSING
                // file,
            });
            //STORE YOUR LOGIN DATA IN DB 

            const userDelete = EmpInfoModal.findByIdAndDelete(userId)
            if (!userDelete) {
                return res.status(404).send({ message: "This user not Exist." });
            }
            res.status(201).json({ message: "delete successfuly" });
            console.log({ userDelete });


            employDelete.save();
            // res.send({ message: "Success " });
            // const userDelete = EmpInfoModal.deleteOne({ First_Name: employee.First_Name })
            // console.log("delete=>", userDelete);
            // if (!userDelete) {
            //     return res.status(404).send({ message: "This user not Exist." });
            // } else {
            //     res.status(201).json({ message: "delete successfuly" });
            //     console.log({ userDelete });
            // }


            // res.send(employee);
        }).catch((error) => {
            res.status(500).send(error);
        })


    }


}

module.exports = new Emp();
