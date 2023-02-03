"use strict";
const express = require("express");
const { findOne } = require("../../models/Employ/Employ.model");
const EmpInfoModal = require('../../models/Employ/Employ.model')
const EmpInfoModal1 = require('../../models/Employ/Emp1')
const { validationResult } = require('express-validator/check');

const ObjectId = require("mongodb").ObjectId;
// const { body, validationResult, check } = require('express-validator');
const { signupValidation, loginValidation, validation_all_field } = require('./validation.js');


class Emp {
    async add_employ(req, res) {
        signupValidation,
            console.log("Run ok");
        try {

            const { First_Name, Last_Name, date_of_birth, date_of_joining, gender,
                Contact_Number, Contact_Number_Home, Permanent_Address,
                Current_Address, email, emp_id,
                fatherName, Nationality,
                Blood_Group, Marital_Status, PAN_No,
                ADHAR, Bank_No, Bank_IFSC, Alternate_Contact_number,
                Position, Employee_Code, DEGREE, STREAM, YEAR_OF_PASSING
                , PASSED, PERCENTAGE_OF_MARKS, state, city
            } = req.body;

            // CHECK ALL FIELD IN FILL
            // if (!First_Name || !Last_Name || !date_of_birth || !date_of_joining || !gender || !Contact_Number
            //     || !Contact_Number_Home || !Permanent_Address || !email || !emp_id || !fatherName ||
            //     !Nationality || !Blood_Group || !Marital_Status || !PAN_No ||
            //     !ADHAR || !Bank_No || !Bank_IFSC || !Position || !Alternate_Contact_number
            //     || !Employee_Code || !DEGREE || !STREAM || !YEAR_OF_PASSING || !PASSED || !PERCENTAGE_OF_MARKS)
            //     return res.send({ message: "Please fill in all fields." });

            // console.log("fullName", fullName.length);

            // if (First_Name.length < 3 || First_Name.trim() == "") {
            //     return res.send({ message: "Invalid formate.name" })
            // }

            // EMAIL VALIDATER
            // if (!validateEmail(email))
            //     return res.send({ message: "Invalid emails." });
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

            // console.log("checkcemail", emailFind);
            if (emailFind) {
                return res.send({ message: "alredy exist emails." });
            }
            // if (ADHAR.length != 12) {
            //     return res.send({ message: " please inter 12 digit  " });
            // }


            // if (Contact_Number.length != 10 || Contact_Number_Home.length != 10 || Alternate_Contact_number.length != 10) {
            //     return res.send({ message: " please inter 10 digit  " });
            // }

            // return
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
                    emp_id,
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
            res.send("Error-", error);
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
    async createUser(req, res) {
        console.log('ok runnng');
        const userData = req.body;
        const {
            name,
            email,
            phone
        } = req.body;

        // const validationRes = signupValidation(userData);
        // console.log({ validationRes });
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.log("err=>", errors.array());
            res.send({ msg: errors.array() })
        }
        if (!email) {
            res.send({ msg: "email num is required" })
        }
        if (!phone) {
            res.send({ msg: "phone num is required" })
        }
        if (!phone.length == 10) {
            res.send({ msg: "invalid number" })
        }

        if (!validateEmail(email))
            return res.send({ message: "Invalid emails." });
        const employ = new EmpInfoModal({
            name,
            email,
            phone
        })


        await employ.save();
        console.log({ employ });
        res.send({ message: "Success " });
    }
    catch(error) {
        res.send("Error-", error);
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


    // async emp_update() {
    //     let myquery = { _id: ObjectId(req.params.id) };
    //     let newvalues = {
    //         $set: {
    //             name: req.body.name,
    //             position: req.body.position,
    //             level: req.body.level,
    //         }
    //     }
    //     EmpInfoModal.updateOne(myquery, newvalues, function (err, res) {
    //         if (err) throw err;
    //         console.log("1 document updated");
    //         response.json(res);
    //     });
    // }
}

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
        ;
}
module.exports = new Emp();
