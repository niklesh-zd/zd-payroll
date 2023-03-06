
"use strict";
const express = require("express");
const yearModal = require('../../models/Employ/Year_Leave.modal')
class year_Leave {
    async year_leave(req, res) {
        var year = req.body.year
        var leave = req.body.leave
        const yearLeave = new yearModal({
            year,
            leave
        })
        await yearLeave.save();
        console.log({ yearLeave });
        res.send({ message: "Success " });
    }
    async get_year_leave(req, res, next) {
        try {
            yearModal.findOne({ year: req.body.year })
                .then(function (leave) {
                    res.send(leave);
                }).catch(next);

        }
        catch (err) {
            res.send({ "error": err })
        }
    }

}
module.exports = new year_Leave();