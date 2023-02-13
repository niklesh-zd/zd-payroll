

"use strict";
const express = require("express");
const LeaveModal = require('../../models/Employ/leave.modal')
const EmpInfoModal = require('../../models/Employ/Employ.model')

const Emp = require('../Employ/EmpInfo.cotroller')

class Leave {
    async Leave(req, res) {

        console.log("Run ok");
        try {

            var { userid, leave_type, from_date,
                to_date, reason_for_leave,
            } = req.body;
            const datelFind = await LeaveModal.findOne({
                $and: [
                    { from_date: from_date },
                    { userid: userid }
                ]
            })

            if (datelFind) {
                return res.send({ message: "alredy exist  date." })
            }
            // CHECK ALL FIELD IN FILL
            if (!leave_type || !userid || !to_date
                || !from_date || !reason_for_leave
            )
                return res.send({ message: "Please fill in all fields." });
            var today = ''
            if (leave_type == 'full') {
                today = 1
            }
            else {
                today = 0.5
            }
            const leave = new LeaveModal({
                userid,
                leave_type: today,
                from_date,
                to_date,
                reason_for_leave
            });

            //STORE YOUR LOGIN DATA IN DB 
            await leave.save();
            console.log({ leave });
            res.status(200).send({ success: true })

        }
        catch (error) {
            res.status(400).send({ 'status': false, 'error': error })

        }
    }
    // async get_user_id(req, res) {
    //     const data = await LeaveModal.find()
    //     var user_id = []
    //     var leave_type = []
    //     data.forEach((Val) => {
    //         user_id.push(Val.userid)
    //         leave_type.push(Val.leave_type)
    //     })
    //     if (!user_id) {
    //         return res.status(404).send({ message: " user id not  Exist." });
    //     }
    //     if (user_id == user_id) {
    //         leave_type = leave_type[0] + leave_type[1]
    //         console.log(leave_type);
    //     }
    //     res.send({ user_id, leave_type });
    // }

    async get_user_id(req, res) {

    }
    async get_leave(req, res, next) {
        const docs = await LeaveModal.aggregate([
            {
                $lookup: {
                    from: "EmpInfo",
                    localField: "userid",
                    foreignField: "_id",
                    as: "result"
                }
            }
        ])
        res.send({ msg: docs })
        console.log("docs", docs);
    }
    async update_laeve(req, res) {
        console.log('update runnig');
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        LeaveModal.findByIdAndUpdate(id, req.body)
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
    async leave_delete(req, res) {
        try {
            console.log(req.params.id);
            const userDelete = await LeaveModal.findByIdAndDelete(req.params.id)

            res.status(201).json({ message: "delete successfuly" });
            console.log({ userDelete });

        } catch (error) {
            res.send({ error });
        }
    }
}
module.exports = new Leave();
