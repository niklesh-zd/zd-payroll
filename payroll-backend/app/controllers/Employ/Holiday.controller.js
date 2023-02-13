

"use strict";
const express = require("express");
const HolidayModal = require('../../models/Employ/Holiday.modal')
const moment = require("moment")

class Holiday {
    async holiday(req, res) {

        console.log("Run ok");
        try {

            var { holiday_name, holiday_type, holiday_date,
            } = req.body;
            // CHECK ALL FIELD IN FILL
            if (!holiday_name || !holiday_type
                || !holiday_date
            )
                return res.send({ message: "Please fill in all fields." });

            const leave = new HolidayModal({
                holiday_name,
                holiday_type,
                holiday_date,
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

    async get_Holiday_all(req, res,next) {

        HolidayModal.find({})
            .then(function (leave) {
                res.send(leave);
            }).catch(next);
    }
    async get_holiday(req, res, next) {

        var FromDate = req.body.from_date;
        var EndDate = req.body.end_date;
        console.log('runnnig holiday..');
        HolidayModal.find({ holiday_date: { $gte: new Date(FromDate), $lt: new Date(EndDate) } }
        ).then(function (employee) {
            res.send(employee);
        }).catch(next);
    }

    async update_holiday(req, res) {
        console.log('update runnig');
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        HolidayModal.findByIdAndUpdate(id, req.body)
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
    async holiday_delete(req, res) {
        try {
            console.log(req.params.id);
            const userDelete = await HolidayModal.findByIdAndDelete(req.params.id)

            res.status(201).json({ message: "delete successfuly" });
            console.log({ userDelete });

        } catch (error) {
            res.send({ error });
        }
    }
}
module.exports = new Holiday();
