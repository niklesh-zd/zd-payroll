import { useEffect, useState } from "react";
import { HiUserGroup } from 'react-icons/hi';
import { MdOutlineEditCalendar, MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import emo from '../../../src/components/Sidebar/download.jpeg';
import Swal from "sweetalert2";
import utils from "./../utils"
import {TiArrowBack} from "react-icons/ti"

const EmpDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [empdata, empdatachange] = useState({});

  const LoadEdit = () => {
    navigate("/settings/EmpEdit" + id);
  };
  // const leaveNavigate = () => {
  //   navigate("/settings/userleavedetails" + id);
  // };
  useEffect(() => {
    fetch(`/emp/emp_1/` + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log("r================esp", resp);
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const img = emo
  const Removefunction = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        window
          .fetch(`${utils}/emp/delete_emp/` + id, {
            method: "POST",
          })
          .then((res) => {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then(() => {
              navigate("/settings/manageprofile");
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  return (
    <div className="mt-5 " >

      <div className="card">

        {empdata && (
          <div className="cover-content">
            <div
              className="card-title float-end"
              style={{
                marginTop: '-2.5rem',
                color: 'rgba(23,31,35,.64)'
              }}
            >
              <div className="flex"
              >
                <div className="flex">
                  <Link
                    to="/settings/manageprofile" className="btn text-primary">
                    <TiArrowBack size={30} />
                  </Link>
                </div>

                <div className="flex">
                  <button
                    className="btn"
                    onClick={() => LoadEdit()}
                  >
                    <MdOutlineEditCalendar className="text-primary fs-3" />
                  </button>
                  <button
                    className="btn"
                    onClick={() => Removefunction()}
                  >
                    <MdDelete className="text-danger fs-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h5>Bank Details</h5>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Aadhar Number</h6>
                  <p>{empdata.ADHAR}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Pan Number</h6>
                  <p>{empdata.PAN_No}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Bank A/C No.</h6>
                  <p>{empdata.Bank_No}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Bank IFSC Code</h6>
                  <p>{empdata.Bank_IFSC}</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h5>Contact Details</h5>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Contact Number</h6>
                  <p style={{ alignSelf: "left" }}>{empdata.Contact_Number}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Alternate Contact No.</h6>
                  <p>{empdata.Alternate_Contact_number}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Home Contact No.</h6>
                  <p>{empdata.Contact_Number_Home}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>State</h6>
                  <p>Mp</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>City</h6>
                  <p>Khategaon</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Current Address</h6>
                  <p>{empdata.Current_Address}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: "70%", justifyContent: "space-between" }}
                >
                  <h6>Permanent Address</h6>
                  <p>{empdata.Permanent_Address}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {empdata && (
        <div className="card">
          <div className="container mt-3">
            <div className="row view-basic-card">
              <h3 className="card-title media-body mb-4" style={{ color: '#3075BA' }}>Basic Information</h3>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Employee Code</label>
                <p className="pmd-list-title"><small>{empdata.Employee_Code}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">First Name</label><br />
                <small>{empdata.First_Name}</small>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Last Name</label>
                <p className="pmd-list-title">{empdata.Last_Name}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Date of Joinig</label>
                <p className="pmd-list-title"><small>{new Date(empdata.date_of_joining).toLocaleDateString(
                  "pt-PT"
                )}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Personal Email</label>
                <p className="pmd-list-title"><small href="" title="">{empdata.email}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Date of Birth</label>
                <p className="pmd-list-title"><small>{new Date(empdata.date_of_birth).toLocaleDateString(
                  "pt-PT"
                )}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Gender</label>
                <p className="pmd-list-title"><small>{empdata.gender}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Marital Status</label>
                <p className="pmd-list-title"><small>{empdata.Marital_Status}</small></p>
              </div>
            </div>
            <hr />
            <div className="row view-basic-card">
              <h3 className="card-title media-body mb-4" style={{ color: '#3075BA' }}>Education Details</h3>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Degree</label>
                <p className="pmd-list-title"><small>{empdata.DEGREE}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Stream</label><br />
                <small>{empdata.STREAM}</small>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Passed/Appearing</label>
                <p className="pmd-list-title">{empdata.PASSED}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Year of Passing</label>
                <p className="pmd-list-title"><small>{empdata.YEAR_OF_PASSING}</small></p>
              </div>
              {/* <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Date of Joinig</label>
                <p className="pmd-list-title"><small>{new Date(empdata.date_of_joining).toLocaleDateString(
                      "pt-PT"
                    )}</small></p>
              </div> */}
            </div>
            <hr />
            <div className="row view-basic-card">
              <h3 className="card-title media-body mb-4" style={{ color: '#3075BA' }}>Bank Details</h3>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Aadhar Number</label>
                <p className="pmd-list-title"><small>{empdata.ADHAR}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Pan Number</label><br />
                <small>{empdata.PAN_No}</small>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Bank A/C No.</label>
                <p className="pmd-list-title">{empdata.Bank_No}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Bank IFSC Code</label>
                <p className="pmd-list-title"><small>{empdata.Bank_IFSC}</small></p>
              </div>

            </div>
            <hr />
            <div className="row view-basic-card">
              <h3 className="card-title media-body mb-4" style={{ color: '#3075BA' }}>Contact Details</h3>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Contact Number</label>
                <p className="pmd-list-title"><small>{empdata.Contact_Number}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Alternate Contact No.</label><br />
                <small>{empdata.Alternate_Contact_number}</small>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Home Contact No.</label>
                <p className="pmd-list-title">{empdata.Contact_Number_Home}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">State</label>
                <p className="pmd-list-title"><small href="" title="">mp</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">City</label>
                <p className="pmd-list-title"><small>Indore</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Current Address</label>
                <p className="pmd-list-title"><small>{empdata.Current_Address}</small></p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label className="pmd-list-subtitle">Permanent Address</label>
                <p className="pmd-list-title"><small>{empdata.Permanent_Address}</small></p>
              </div>
            </div>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpDetail;
