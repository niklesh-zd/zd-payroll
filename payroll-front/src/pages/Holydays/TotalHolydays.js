import axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import host from "./../utils";

function TotalHolydays() {
  const [totalHolydays, setTotalHolydays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [fields, setFields] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnchange = (e) =>{
    let fieldObj = { ...fields };
    fieldObj[e.target.name] = e.target.value;
    setFields(fieldObj);
  }
  var columns = [
    {
      name: "Holyday Name",
      selector:   (rowData) => rowData["holiday_name"],
      sortable: true,
      width: 30,
    },
    {
      name: "Holyday Type",
      selector:  (rowData) => rowData["holiday_type"],
      sortable: true,
    },
    {
      name: "Holiday Date",
      selector:  (rowData) => rowData["holiday_date"],
      sortable: true,
    },
    {
      name: "Created At",
      selector:  (rowData) => rowData["createdAt"],
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
    const datesobject = {
      from_date: formatDate(firstDay),
      end_date: formatDate(lastDay),
    };
    axios
      .post(`${host}/Holiday/get-fastival`, datesobject)
      .then((res) => {
        const filterArr = [];
        res.data.map((e) => {
          filterArr.push({
            holiday_date: new Date(e.holiday_date).toLocaleDateString("pt-PT"),
            holiday_name: e.holiday_name,
            holiday_type: e.holiday_type,
            createdAt: new Date(e.createdAt).toLocaleDateString("pt-PT"),
          });
        });
        setTotalHolydays(filterArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHolyday = () => {};
  const handleHoliydaySubmit = (e) => {
    e.preventDefault()
    console.log("fields",fields);
  };
  const filteredData = totalHolydays.filter((row) => {
    return (
      row.holiday_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.holiday_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.holiday_date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
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
                  <Button variant="primary" onClick={handleShow}>
                  Add Holyday (+)
                  </Button>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Holiyday Name</Form.Label>
              <Form.Control type="text" name="holiday_name" placeholder="Enter Holiday Name" onChange={(e)=>handleOnchange(e)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Holiyday Type</Form.Label>
              <Form.Control type="" name="holiday_type" placeholder="Enter Holiday Type" onChange={(e)=>handleOnchange(e)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Holiyday Date</Form.Label>
              <Form.Control type="date" name="holiday_date" placeholder="Select Holiday Date" onChange={(e)=>handleOnchange(e)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>handleHoliydaySubmit(e)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TotalHolydays;
