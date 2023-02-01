

"use strict";
const express = require("express");
const LeaveModal = require('../../models/Employ/leave.modal')

const ObjectId = require("mongodb").ObjectId;


class Leave {
    async Leave(req, res) {

        console.log("Run ok");
        try {

            const { LEAVE_TYPE, NUMBER_OF_DAYS_REQUESTED, DATE, REASON_FOR_LEAVE,
            } = req.body;

            // CHECK ALL FIELD IN FILL
            if (!LEAVE_TYPE || !NUMBER_OF_DAYS_REQUESTED
                || !DATE || !REASON_FOR_LEAVE
            )
                return res.send({ message: "Please fill in all fields." });

            // return
            const leave = new LeaveModal({
                LEAVE_TYPE,
                NUMBER_OF_DAYS_REQUESTED,
                DATE,
                REASON_FOR_LEAVE,
                // file,
            });

            //STORE YOUR LOGIN DATA IN DB 
            await leave.save();
            console.log({ leave });
            res.send({ message: "Success " });
        }
        catch (error) {
            console.log("Error-", error);
        }
    }

    async get_salary(req, res) {
        console.log(res);
    }


}


module.exports = new Leave();
