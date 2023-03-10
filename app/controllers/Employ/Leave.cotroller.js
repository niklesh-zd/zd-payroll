

"use strict";
const express = require("express");
const LeaveModal = require('../../models/Employ/leave.modal')
const EmpInfoModal = require('../../models/Employ/Employ.model')
const HolidayModal = require('../../models/Employ/Holiday.modal')
const moment = require('moment');

const Emp = require('../Employ/EmpInfo.cotroller');

var month_array = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

class Leave {
    async Leave(req, res) {

        try {

            var { userid, leave_type, from_date,
                to_date, reason_for_leave,
            } = req.body;

            //date range validation
            const user_data = await LeaveModal.find({ userid: userid });
            for (let i = 0; i < user_data.length; i++) {
                if (
                    moment(from_date, "YYYY-MM-DD").isBetween(moment(user_data[i].from_date, "YYYY-MM-DD"), moment(user_data[i].to_date, "YYYY-MM-DD"))
                    || moment(to_date, "YYYY-MM-DD").isBetween(moment(user_data[i].from_date, "YYYY-MM-DD"), moment(user_data[i].to_date, "YYYY-MM-DD"))
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

            // validation for two documents in mongodb for leave's date range in two month

            if (moment(to_date, "YYYY-MM-DD").month() != moment(from_date, "YYYY-MM-DD").month()) {

                if (Number(from_date.split("-")[0]) % 4 == 0) {
                    month_array[1] = '29'
                }
                else {
                    month_array[1] = '28'
                }
                var to_date_split = to_date.split("-")[0] + "-" + from_date.split("-")[1] + "-" + month_array[moment(from_date, "YYYY-MM-DD").month()];
                var from_date_split = from_date.split("-")[0] + "-" + to_date.split("-")[1] + "-01";

                // calculating leaves first part
                const holiday_1 = await HolidayModal.find({
                    holiday_date: { $gte: from_date, $lte: to_date_split }
                });
                var diff_between_leaves_days_1 = (moment(to_date_split, "YYYY-MM-DD").diff(moment(from_date, "YYYY-MM-DD"), "days")) + 1;
                var total_leave_1 = (diff_between_leaves_days_1 - holiday_1.length) * today

                const leave_1 = new LeaveModal({
                    userid,
                    leave_type: today,
                    from_date,
                    to_date: to_date_split,
                    reason_for_leave,
                    total_number_of_day: total_leave_1
                });

                // calculating leaves second part
                const holiday_2 = await HolidayModal.find({
                    holiday_date: { $gte: from_date_split, $lte: to_date }
                });
                var diff_between_leaves_days_2 = (moment(to_date, "YYYY-MM-DD").diff(moment(from_date_split, "YYYY-MM-DD"), "days")) + 1;
                var total_leave_2 = (diff_between_leaves_days_2 - holiday_2.length) * today

                const leave_2 = new LeaveModal({
                    userid,
                    leave_type: today,
                    from_date: from_date_split,
                    to_date,
                    reason_for_leave,
                    total_number_of_day: total_leave_2
                });

                await leave_1.save();
                await leave_2.save();
            }
            else {

                const holiday = await HolidayModal.find({
                    holiday_date: { $gte: from_date, $lte: to_date }
                });
                var diff_between_leaves_days = (moment(to_date, "YYYY-MM-DD").diff(moment(from_date, "YYYY-MM-DD"), "days")) + 1;
                var total_leave = (diff_between_leaves_days - holiday.length) * today

                const leave = new LeaveModal({
                    userid,
                    leave_type: today,
                    from_date,
                    to_date,
                    reason_for_leave,
                    total_number_of_day: total_leave
                });

                //STORE YOUR LOGIN DATA IN DB 
                console.log(leave)
                await leave.save();
            }
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

    async get_User_leave(req, res, next) {
        try {
            const findLeave = await LeaveModal.find({
                userid: req.query.id,
                from_date: { $gte: req.query.from_date, $lte: req.query.to_date },
                to_date: { $gte: req.query.from_date, $lte: req.query.to_date }
            });
            res.send({ findLeave })
        } catch (err) {
            res.send({ "error": err })
        }
    }

    async get_User_leave_count(req, res, next) {

        const findLeave = await LeaveModal.find({
            userid: req.query.id,
            from_date: { $gte: req.query.from_date, $lte: req.query.to_date },
            to_date: { $gte: req.query.from_date, $lte: req.query.to_date }
        });
        var leave_count = 0
        for (let i = 0; i < findLeave.length; i++) {
            leave_count += findLeave[i].total_number_of_day
        }
        res.send({ "leave_count": leave_count })
    }

    async get_today_leave(req, res, next) {
        var today = moment(moment().utc().format('YYYY-MM-DD'))
        // var today = moment('2023-02-21', 'YYYY-MM-DD')  // for testing purpose
        var from_date = String(today.year()) + "-" + String(today.month() + 1) + "-01"
        var to_date = String(today.year()) + "-" + String(today.month() + 1) + "-31"

        const findLeave = await LeaveModal.find({
            from_date: { $gte: from_date, $lte: to_date },
            to_date: { $gte: from_date, $lte: to_date }
        });

        const emp_count = await EmpInfoModal.find()
        var absent_count = 0
        for (let i = 0; i < findLeave.length; i++) {

            var from_date_ = moment(moment(findLeave[i].from_date).utc().format('YYYY-MM-DD'))
            var to_date_ = moment(moment(findLeave[i].to_date).utc().format('YYYY-MM-DD'))

            if (
                today.isSameOrBefore(to_date_)
                && today.isSameOrAfter(from_date_)
            ) {
                absent_count++
            }
        }
        var present_count = emp_count.length - absent_count
        res.send(
            {
                "present_count": present_count,
                "absent_count": absent_count
            }
        )
    }


    async get_yesterday_leave(req, res, next) {
        var today = moment(moment().utc().format('YYYY-MM-DD'))
        var yesterday = today.subtract(1, 'day')
        var from_date = String(yesterday.year()) + "-" + String(yesterday.month() + 1) + "-01"
        var to_date = String(yesterday.year()) + "-" + String(yesterday.month() + 1) + "-31"

        const findLeave = await LeaveModal.find({
            from_date: { $gte: from_date, $lte: to_date },
            to_date: { $gte: from_date, $lte: to_date }
        });

        const emp_count = await EmpInfoModal.find()
        var absent_count = 0
        for (let i = 0; i < findLeave.length; i++) {

            var from_date_ = moment(moment(findLeave[i].from_date).utc().format('YYYY-MM-DD'))
            var to_date_ = moment(moment(findLeave[i].to_date).utc().format('YYYY-MM-DD'))

            if (
                yesterday.isSameOrBefore(to_date_)
                && yesterday.isSameOrAfter(from_date_)
            ) {
                absent_count++
            }
        }
        var present_count = emp_count.length - absent_count
        res.send(
            {
                "present_count": present_count,
                "absent_count": absent_count
            }
        )
    }


}

module.exports = new Leave();
