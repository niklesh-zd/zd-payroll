
"use strict";
const express = require("express");
const effective_modal = require('../../models/Employ/Effective.modal')
class effective_date {
    async effective_date_(req, res) {
        var base_salary = req.body.base_salary
        var effective_date = req.body.effective_date
        var id = req.body.id
        // const effective_date_ = await effective_modal.findOne({ effective_date: effective_date })
        // if (effective_date_) {
        //     return res.send({ message: "alredy exist effective_date_." })
        // }

        if (!base_salary || !effective_date || !id) {
            res.send({ message: "please fill out this field" })

        }
        else {
            const yearLeave = new effective_modal({
                base_salary,
                effective_date,
                id
            })
            await yearLeave.save();
            console.log({ yearLeave });
            res.send({ message: "Success " });
        }
    }
    async get_(req, res, next) {
        try {
            effective_modal.find({})
                .then(function (leave) {
                    res.send(leave);
                }).catch(next);

        }
        catch (err) {
            res.send({ "error": err })
        }
    }
    async get_eff(req, res, next) {
        try {
            const docs = await effective_modal.aggregate([
                {
                    $lookup: {
                        from: "EmpInfo",
                        localField: "id",
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

}
module.exports = new effective_date();