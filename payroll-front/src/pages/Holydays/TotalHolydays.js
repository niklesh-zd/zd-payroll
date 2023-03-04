import axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import host from "./../utils";

function TotalHolydays() {
  const [totalHolydays, setTotalHolydays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  var columns = [
    {
      name: "Holyday Name",
      selector: "holiday_name",
      sortable: true,
      width: 30,
    },
    {
      name: "Holyday Type",
      selector: "holiday_type",
      sortable: true,
    },
    {
      name: "Holiday Date",
      selector: "holiday_date",
      sortable: true,
    },
    {
      name: "Created At",
      selector: "createdAt",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <span
            className="btn btn-md"
            onClick={() => {
              deleteHolyday(row);
            }}
          >
            <FaTrash />
          </span>
        </>
      ),

      ignoreRowClick: true,
    },
  ];
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), 0, 1);
    const lastDay = new Date(today.getFullYear(), 11, 31);
    const datesobject = { from_date: formatDate(firstDay), end_date: formatDate(lastDay) };
    axios
      .post(`${host}/Holiday/get-fastival`, datesobject)
      .then((res) => {
        const filterArr = []
        res.data.map((e)=>{
            filterArr.push({
                holiday_date: new Date(e.holiday_date ).toLocaleDateString("pt-PT"),
                holiday_name: e.holiday_name,
                holiday_type: e.holiday_type,
                createdAt: new Date(e.createdAt).toLocaleDateString("pt-PT"),
            })
        })
        setTotalHolydays(filterArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHolyday = () => {};
  const filteredData = totalHolydays.filter((row) => {
     return (
        row.holiday_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.holiday_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.holiday_date.toLowerCase().includes(searchTerm.toLowerCase()) 
        )
  });

  return (
    <div>
      <Link to="/Holydays" className="btn text-dark">
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
                  <h4>Holydays</h4>{" "}
                  <Link
                    to="/add/holiyday"
                    className="btn btn-primary btn-sm ml-5 mr-5"
                  >
                    Add Holyday (+)
                  </Link>
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

export default TotalHolydays;
