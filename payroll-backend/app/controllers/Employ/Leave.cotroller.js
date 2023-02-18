

"use strict";
const express = require("express");
const LeaveModal = require('../../models/Employ/leave.modal')
const EmpInfoModal = require('../../models/Employ/Employ.model')
const moment = require('moment');

const Emp = require('../Employ/EmpInfo.cotroller');

var month_array = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

console.log(`month list length : ${month_array.length}`);

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
                today = 1;
            }
            else {
                today = 0.5;
            }
            let fromDate = new Date(from_date);
            let toDate = new Date(to_date);
            const diffInMs = toDate - fromDate;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
            console.log('diffInDays', diffInDays);

            const leave = new LeaveModal({
                userid,
                leave_type: today,
                from_date,
                to_date,
                reason_for_leave,
                total_number_of_day: diffInDays
            });

            // validation for two documents in mongodb for leave's date range in two month

            if (moment(to_date, "YYYY-MM-DD").isAfter(moment(from_date, "YYYY-MM-DD"))) {

                if (Number(from_date.split("-")[0]) % 4 == 0) {
                    month_array[1] = '29'
                }
                else {
                    month_array[1] = '28'
                }
                var to_date_split = to_date.split("-")[0] + "-" + from_date.split("-")[1] + "-" + month_array[moment(from_date, "YYYY-MM-DD").month()];
                var from_date_split = from_date.split("-")[0] + "-" + to_date.split("-")[1] + "-01";
                console.log("from date split " + from_date_split);
                console.log("to date split " + to_date_split);
                const leave_1 = new LeaveModal({
                    userid,
                    leave_type: today,
                    from_date,
                    to_date: to_date_split,
                    reason_for_leave
                });

                const leave_2 = new LeaveModal({
                    userid,
                    leave_type: today,
                    from_date: from_date_split,
                    to_date,
                    reason_for_leave
                });

                await leave_1.save();
                await leave_2.save();
            }
            else {
                const leave = new LeaveModal({
                    userid,
                    leave_type: today,
                    from_date,
                    to_date,
                    reason_for_leave
                });

                //STORE YOUR LOGIN DATA IN DB 
                await leave.save();
            }
            // console.log({ leave });
            res.status(200).send({ success: true })

        }
        catch (error) {
            console.log(error);
            res.status(400).send({ 'status': false, 'error': error })

        }
    }

    async get_leave(req, res, next) {
        try {
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
        } catch (err) {
            res.send({ "error": err })
        }
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
                    message: "Error updating=" + id, err
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
    async get_user_leave_id(req, res) {
        try {
            const userid = req.params.id

            const datelFind = await LeaveModal.find({
                userid: userid
            })
            if (!datelFind) {
                return res.status(404).send({ message: "This user not Exist." });
            }
            res.send(datelFind)
            console.log({ datelFind });
        }
        catch (err) {
            res.send({ "error": err })
        }

    }

    async get_User_leave(req, res, next) {
        try {
            const findLeave = await LeaveModal.find({
                userid: req.query.id,
                from_date: { $gte: req.query.from_date, $lte: req.query.to_date },
                to_date: { $gte: req.query.from_date, $lte: req.query.to_date }
            });
            console.log("findLeave", findLeave);
            res.send({ findLeave })
        } catch (err) {
            res.send({ "error": err })
        }
    }
}

module.exports = new Leave();
