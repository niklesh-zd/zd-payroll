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
                fatherName,base_salary,
                Blood_Group, Marital_Status, PAN_No,
                ADHAR, Bank_No, Bank_IFSC, Alternate_Contact_number,
                Position, Employee_Code, DEGREE, STREAM, YEAR_OF_PASSING
                , PASSED, PERCENTAGE_OF_MARKS,   permanent_state,
                permanent_city,
                current_state,is_active,
                current_city,
            } = req.body;

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                console.log("err=>", errors.array());
                res.send({ message: errors.array() })
            }
            const emailFind = await EmpInfoModal.findOne({ email: email })
            const Pan_no = await EmpInfoModal.findOne({ PAN_No: PAN_No })
            const adhar = await EmpInfoModal.findOne({ ADHAR: ADHAR })
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
                    Employee_Code,
                    DEGREE,
                    STREAM,
                    is_active,
                    PASSED,
                    PERCENTAGE_OF_MARKS,
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
        EmpInfoModal.find({is_active:1}).then(function(employee) {
            res.send(employee);
        }).catch(next);
    }

    async udateStatus_emlpoy(req, res, next) {
        EmpInfoModal.findByIdAndUpdate(req.body.id,{is_active:req.body.status}).then(function(employee) {
            res.send(employee);
        }).catch(next);
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
                Nationality: employee.Nationality,
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
