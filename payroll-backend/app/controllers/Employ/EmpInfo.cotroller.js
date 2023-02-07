"use strict";
const express = require("express");
const { findOne } = require("../../models/Employ/Employ.model");
const EmpInfoModal = require('../../models/Employ/Employ.model')
const EmpInfoModal1 = require('../../models/Employ/Emp1')
const { validationResult } = require('express-validator/check');

const ObjectId = require("mongodb").ObjectId;

class Emp {
    async add_employ(req, res, next) {

        console.log("Run ok");
        try {

            const { First_Name, Last_Name, date_of_birth, date_of_joining, gender,
                Contact_Number, Contact_Number_Home, Permanent_Address,
                Current_Address, email,
                fatherName, Nationality,
                Blood_Group, Marital_Status, PAN_No,
                ADHAR, Bank_No, Bank_IFSC, Alternate_Contact_number,
                Position, Employee_Code, DEGREE, STREAM, YEAR_OF_PASSING
                , PASSED, PERCENTAGE_OF_MARKS, state, city
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
                    First_Name,
                    Last_Name,
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
                    Nationality,
                    Blood_Group,
                    Marital_Status,
                    PAN_No,
                    state,
                    city,
                    ADHAR,
                    Bank_No,
                    Bank_IFSC,
                    Position,
                    Employee_Code,
                    DEGREE,
                    STREAM,
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
            res.send({ message: "error" });
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
        EmpInfoModal.find({}).then(function (employee) {
            res.send(employee);
        }).catch(next);
    }

    async update_user() {
        const id = req.params.id;

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
}

module.exports = new Emp();
