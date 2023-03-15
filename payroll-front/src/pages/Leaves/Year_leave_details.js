import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import host from "./../utils"


function Year_Leave_Details
  () {
  const { id } = useParams();
  const [empLeaveData, setEmpLeaveData] = useState([]);
  const deleteLeave = () => { };
  var columns = [
    {
      name: "Year",
      selector: (rowData) => rowData["year"],
      sortable: true,
      width: 30,
    },
    {
      name: "Year_Leave",
      selector: (rowData) => rowData["leave"],
      sortable: true,
    },


  ];

  // year = new Date(e.to_date).toLocaleDateString("pt-PT"),
  useEffect(() => {
    axios
      .get(
        `${host}/year/get_year_leave`
      )
      .then((response) => {
        let filteredArr = [];
        let responseArr = response.data;
        responseArr.map((e) => {
          filteredArr.push({
            year: new Date(e.year).getFullYear(),
            leave: e.leave,
            createdAt: new Date(e.createdAt).toLocaleDateString("pt-PT"),
          });
        });
        setEmpLeaveData(filteredArr);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <div>
      <div>
        <div className="ml-5 mr-5">
          <DataTable
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4>Year Leave Details</h4>{" "}
                <Link
                  to="/Year_leave
                  "
                  className="btn btn-primary btn-sm ml-5 mr-5"
                >
                  Add Year Leave (+)
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

export default Year_Leave_Details
  ;
