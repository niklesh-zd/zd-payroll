import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LeaveDetails() {
    const [empLeaveData, setEmpLeaveData] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:7071/Emp_Leave/get_leave")
      .then((response) => {
        console.log("success", response.data);
        setEmpLeaveData(response.data)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="ml-10">
          <h2 className="text-sky-900">Employee</h2>
        </div>
        <div className="ml-10">
          <div className="divbtn">
            <Link to="/settings/leave" className="btn">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Reason</td>
                <td>Type</td>
                <td>Total leaves</td>
              </tr>
            </thead>
            <tbody>
              {empLeaveData &&
                empLeaveData.map((item) => (
              <tr>
                <td>shjgd</td>
                <td>sdd</td>
                <td>dsds</td>
                <td>{item.reason_for_leave}</td>
                <td>cdsfdgasyjs</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveDetails;
