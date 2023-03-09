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
      selector: "year",
      sortable: true,
      width: 30,
    },
    {
      name: "Year_Leave",
      selector: "leave",
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
          console.log(response);
          setEmpLeaveData(response.data)
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }, []);
  console.log(id);
  return (
    <div>
      <div>
        <div className="ml-5 mr-5">
          <DataTable
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4>Year_Leave Details</h4>{" "}
                <Link
                  to="/Year_leave
                  "
                  className="btn btn-primary btn-sm ml-5 mr-5"
                >
                  Add Year_Leave (+)
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
