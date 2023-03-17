import axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import host from "./../utils"
function YesterdayApsent() {
    const navigate = useNavigate();
    const [empLeaveData, setEmpLeaveData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    var columns = [
        {
            name: "Name",
            selector: (rowData) => rowData["First_Name"],
            sortable: true,
            width: 30,
        },
        {
            name: "Email",
            selector: (rowData) => rowData["email"],
            sortable: true,
        },
        {
            name: "CreatedAt",
            selector: (rowData) => rowData["createdAt"],
            sortable: true,
        },
        {
            name: "From Date",
            selector: (rowData) => rowData["from_date"],
            sortable: true,
        },
        {
            name: "To Date",
            selector: (rowData) => rowData["to_date"],
            sortable: true,
        },
        {
            name: "Phone",
            selector: (rowData) => rowData["Contact_Number"],
            sortable: true,
        },
        {
            name: "Leave Type",
            selector: (rowData) => rowData["leave_type"],
            sortable: true,
        },
        {
            name: "Reason For Leave",
            selector: (rowData) => rowData["reason_for_leave"],
            sortable: true,
        },

    ];
    useEffect(() => {
        axios
            .get(`${host}/Emp_Leave/get_yesterday_leave_`)
            .then((response) => {
                let filteredArr = [];
                let filteredObj = {};
                let responseArr = response.data.msg;
                console.log(response.data, '........................');
                responseArr.map((e) => {
                    e.result.map((w) => {
                        filteredObj = {
                            First_Name: w.First_Name,
                            email: w.email,
                            Contact_Number: w.Contact_Number,
                        };
                    });
                    filteredArr.push({
                        ...filteredObj,
                        from_date: new Date(e.from_date).toLocaleDateString("pt-PT"),
                        to_date: new Date(e.to_date).toLocaleDateString("pt-PT"),
                        leave_type: e.leave_type == 1 ? "Full Day" : "Half Day",
                        reason_for_leave: e.reason_for_leave,
                        id: e._id,
                        createdAt: new Date(e.createdAt).toLocaleDateString("pt-PT"),
                    });
                });
                setEmpLeaveData(filteredArr);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);
    const filteredData = empLeaveData.filter((row) => {
        return (
            row.First_Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div>

            <Link
                to="/employee/manageprofile" className="btn text-dark">
                <TiArrowBack size={30} />
            </Link>
            <div>

                <div className="ml-5 mr-5">
                    <DataTable
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <h4>Yeserday Absent</h4>{" "}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        }
                        columns={columns}
                        data={filteredData ? filteredData : []}
                        pagination
                        highlightOnHover
                        search
                    />
                </div>
            </div>
        </div>
    );
}

export default YesterdayApsent;
