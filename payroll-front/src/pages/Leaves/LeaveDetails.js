import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
var columns = [
  {
    name: "Name",
    selector: "First_Name",
    sortable: true,
    width: 30,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
  },
  {
    name: "createdAt",
    selector: "createdAt",
    sortable: true,
  },
  {
    name: "From Date",
    selector: "from_date",
    sortable: true,
  },
  {
    name: "To Date",
    selector: "to_date",
    sortable: true,
  },
  {
    name: "Phone",
    selector: "Contact_Number",
    sortable: true,
  },
  {
    name: "Leave Type",
    selector: "leave_type",
    sortable: true,
  },
  {
    name: "Reason For Leave",
    selector: "reason_for_leave",
    sortable: true,
  },
];
function LeaveDetails() {
  const [empLeaveData, setEmpLeaveData] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.29.146:7071/Emp_Leave/get_leave")
      .then((response) => {
        let filteredArr = [];
        let filteredObj = {};
        let responseArr = response.data.msg;
        console.log("responseArr", responseArr);
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
            from_date: new Date(e.from_date).toLocaleDateString('pt-PT'),
            to_date: new Date(e.to_date).toLocaleDateString('pt-PT'),
            leave_type: e.leave_type == 1 ? "Full Day" : "Half Day",
            reason_for_leave: e.reason_for_leave,
            createdAt: new Date(e.createdAt).toLocaleDateString('pt-PT'),
          });
        });
        console.log("filteredArr", filteredArr);
        setEmpLeaveData(filteredArr);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  console.log("----", empLeaveData);
  return (
    <div>
      <div>
        <div className="ml-5 mr-5">
          <DataTable
            title={
              <div style={{ display: "flex", alignItems:'center' }}>
                <h4>Leaves Details</h4>{" "}
                <Link
                  to="/settings/leave"
                  className="btn btn-primary btn-sm ml-5 mr-5"
                >
                  Add Leave (+)
                </Link>
              </div>
            }
            columns={columns}
            data={empLeaveData ? empLeaveData : []}
            pagination
            highlightOnHover
            search
          />
        </div>
      </div>
    </div>
  );
}

export default LeaveDetails;
