

"use strict";
const express = require("express");
const LeaveModal = require('../../models/Employ/leave.modal')
const Emp = require('../Employ/EmpInfo.cotroller')
const ObjectId = require("mongodb").ObjectId;

// const info = Emp.add_employ().employee
class Leave {
    async Leave(req, res) {

        console.log("Run ok");
        try {

            var { userid, LEAVE_TYPE, DATE, REASON_FOR_LEAVE,
            } = req.body;

            // CHECK ALL FIELD IN FILL
            if (!LEAVE_TYPE || !userid
                || !DATE || !REASON_FOR_LEAVE
            )
                return res.send({ message: "Please fill in all fields." });
            // var today = ''
            // if (LEAVE_TYPE == "half") {
            //     today = 1
            // }
            // if (LEAVE_TYPE == "full") {
            //     today = 0.5
            // }
            // LEAVE_TYPE = today
            // console.log(today);
            // return
            const leave = new LeaveModal({
                userid,
                LEAVE_TYPE,
                DATE,
                REASON_FOR_LEAVE,
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

    async get_leave(req, res, next) {

        LeaveModal.find({}).then(function (leave) {
            res.send(leave);
        }).catch(next);

    }


}


module.exports = new Leave();
