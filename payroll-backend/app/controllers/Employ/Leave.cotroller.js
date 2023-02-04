

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
            var today = ''
            if (LEAVE_TYPE == 'full') {
                today = 1
            }
            else {
                today = 0.5
            }
            const leave = new LeaveModal({
                userid,
                LEAVE_TYPE: today,
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
    async get_user_id(req, res) {
        const data = await LeaveModal.find()
        var user_id = []
        var leave_type = []
        data.forEach((Val) => {
            user_id.push(Val.userid)
            leave_type.push(Val.LEAVE_TYPE)
        })
        if (!user_id) {
            return res.status(404).send({ message: " user id not  Exist." });
        }
        if (user_id == user_id) {
            console.log(leave_type);
            leave_type = leave_type[0] + leave_type[1]
        }
        res.send({ user_id, leave_type });
    }
    async get_leave(req, res, next) {

        LeaveModal.find({})
            .then(function (leave) {
                res.send(leave);
            }).catch(next);

    }
}
module.exports = new Leave();
