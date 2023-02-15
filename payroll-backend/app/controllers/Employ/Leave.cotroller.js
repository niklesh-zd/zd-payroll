

"use strict";
const express = require("express");
const LeaveModal = require('../../models/Employ/leave.modal')
const EmpInfoModal = require('../../models/Employ/Employ.model')
const moment = require('moment');

const Emp = require('../Employ/EmpInfo.cotroller')

class Leave {
    async Leave(req, res) {

        console.log("Run ok");
        try {

            var { userid, leave_type, from_date,
                to_date, reason_for_leave,
            } = req.body;

            //date range validation
            const user_data = await LeaveModal.find({ userid: userid });
            for (let i = 0; i < user_data.length; i++) {
                if (
                    moment(from_date, "YYYY-MM-DD").isBetween(moment(user_data[i].from_date, "YYYY-MM-DD"), moment(user_data[i].to_date, "YYYY-MM-DD"))
                    && moment(to_date, "YYYY-MM-DD").isBetween(moment(user_data[i].from_date, "YYYY-MM-DD"), moment(user_data[i].to_date, "YYYY-MM-DD"))
                ) {
                    return res.send({ message: "applied date range already exist." })
                }
            }

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
            // console.log({ leave });
            res.status(200).send({ success: true })

        }
        catch (error) {
            console.log(error);
            res.status(400).send({ 'status': false, 'error': error })

        }
    }


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
        ]).sort({ _id: -1 })
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
            if (!userDelete) {
                return res.status(404).send({ message: "This user not Exist." });
            }
            res.status(201).json({ message: "delete successfuly" });
            console.log({ userDelete });

        } catch (error) {
            res.send({ error });
        }
    }


    async get_User_leave(req, res, next) {
<<<<<<< HEAD

        var userId = req.params.id
        console.log(userId);
        const findLeave = await LeaveModal.find({ userid: userId }).sort({ _id: -1 })
=======
        
        const findLeave = await LeaveModal.find({
             userid: req.query.id,
             from_date : { $gte: req.query.from_date, $lte: req.query.to_date },
             to_date : { $gte: req.query.from_date, $lte: req.query.to_date } 
            });
>>>>>>> 60e70d6df868777d5156c472ecc60f7aac5ff614
        console.log("findLeave", findLeave);
        res.send(findLeave)
    }
}

module.exports = new Leave();
