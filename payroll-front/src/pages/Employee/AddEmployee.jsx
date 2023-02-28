import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { validateForm } from "./employeeValidation";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import host from "./../utils"
import {TiArrowBack} from "react-icons/ti"

function AddEmployee(props) {
  const dobDateInputRef = useRef(null);
  const dojDateInputRef = useRef(null);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [adharerrors, setEdharerrors] = useState('');
  const [panerrors, setPanerrors] = useState('');
  const [emailerrors, setEmailerrors] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    props.data && setFields(props.data);
  }, [props.data]);

  function handleChange(e) {
    let fieldObj = { ...fields };
    fieldObj[e.target.name] = e.target.value;
    setFields(fieldObj);
  }


  console.log("fields", fields);
  const notify = (message) => {
    if(message == "alredy exist ADHAR."){
      setEdharerrors(message)
    }
    if(message == "alredy exist PAN_NO."){
      setPanerrors(message)
    }
    if(message == "alredy exist emails."){
      setEmailerrors(message)
    }
  };
  function submituserRegistrationForm(e) {
    e.preventDefault();
    const validationErrors = validateForm(fields);
    setErrors(validationErrors.errObj);
    if (validationErrors && validationErrors.formIsValid) {
      axios
        .post(`${host}/emp/add_employ`, fields)
        .then((response) => {
          console.log("success", response.data.message);
          if (response.data.message == "Success ") {
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: "Employee Successfully Created!",
            }).then(() => {
              navigate("/settings/manageprofile");
            });
          } else {
            notify(response.data.message);
          }
        })
        .catch((err) => {
          console.error("There was an error!", err);
        });
    }
  }

  function updateUserDetails(e) {
    e.preventDefault();
    const validationErrors = validateForm(fields);
    setErrors(validationErrors.errObj);
    if (validationErrors && validationErrors.formIsValid) {
      axios
        .post(`${host}/emp/update/` + props.data._id, fields)
        .then((response) => {
          console.log("success", response);
          if (response.data.message == "updated successfully.") {
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: "Employee Successfully Updated!",
            }).then(() => {
              navigate("/settings/manageprofile");
            });
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }
  useEffect(() => {
    const today = new Date();
    if (dobDateInputRef.current) {
      var eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      eighteenYearsAgo = new Date(eighteenYearsAgo).toISOString().split("T")[0];
      dobDateInputRef.current.setAttribute("max", eighteenYearsAgo);
    }
    if (dojDateInputRef.current) {
      var oneMonthAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
      oneMonthAgo = new Date(oneMonthAgo).toISOString().split("T")[0];
      dojDateInputRef.current.setAttribute("min", oneMonthAgo);
    }
  }, []);

  const handleInput = (event) => {
    const { value, selectionStart, selectionEnd } = event.target;
    const sanitizedValue = value.replace(/[!@#$%^&*()1234567890;:'"?/{}><,.+=-_-]/g, "");
    event.target.value = sanitizedValue;
    event.target.setSelectionRange(selectionStart, selectionEnd);
  };
  return (
    <div className="">
      <Link
        to="/settings/manageprofile" className="btn text-dark">
        <TiArrowBack size={30} />
      </Link>
      <form style={{ display: "flex" }}>
        <div className="px-4 pt-5">
          <div className="row gx-12">
            <div className="col-4 edit_information">
              <div className="Account-details">
                <h5 className="text-left"> Personal Details</h5>
                <hr style={{ margin: "0px" }} />
                {props.data ? ( 
                  <div className ="row">
                    <div className ="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className ="form-group">
                        <label className ="profile_details_text">
                          Employee Code
                        </label>
                        <input
                          type="text"
                          style={{ textTransform: "capitalize" }}
                          name="Employee_Code"
                          className="form-control"
                          placeholder="Employee Code"
                          value={fields.Employee_Code}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">{errors.Employee_Code}</div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        First Name
                      </label>
                      <input
                        pattern="[a-zA-Z0-9\s]*"
                        onInput={handleInput}
                        type="text"
                        style={{ textTransform: "capitalize" }}
                        name="First_Name"
                        minLength="2"
                        maxLength="50"
                        className="form-control"
                        placeholder="First Name"
                        value={fields.First_Name}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">{errors.First_Name}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Last Name{" "}
                      </label>
                      <input
                        type="text"
                        name="Last_Name"
                        minLength="2"
                        maxLength="50"
                        className="form-control"
                        placeholder="Last Name"
                        style={{ textTransform: "capitalize" }}
                        onInput={handleInput}
                        value={fields.Last_Name}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">{errors.Last_Name}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Father's Name:
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        minLength="2"
                        maxLength="50"
                        value={fields.fatherName}
                        onChange={(e) => handleChange(e)}
                        onInput={handleInput}
                        className="form-control"
                        placeholder="Father's Name"
                        style={{ textTransform: "capitalize" }}
                      />
                      <div className="errorMsg">{errors.fatherName}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Contact No</label>
                      <input
                        type="number"
                        maxLength="12"
                        value={fields.Contact_Number}
                        onChange={(e) => handleChange(e)}
                        name="Contact_Number"
                        className="form-control"
                        placeholder="Mobile Number"
                      ></input>
                      <div className="errorMsg">{errors.Contact_Number}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Alternate Contact No</label>
                      <input
                        type="number"
                        maxLength="12"
                        value={fields.Alternate_Contact_number}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        name="Alternate_Contact_number"
                        placeholder="Alternate Contact (optional)"
                      ></input>
                      <div className="errorMsg">
                        {errors.Alternate_Contact_number}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Home Contact No.</label>
                      <input
                        type="number"
                        maxLength="12"
                        name="Contact_Number_Home"
                        className="form-control"
                        placeholder="Mobile Number"
                        value={fields.Contact_Number_Home}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">
                        {errors.Contact_Number_Home}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                    <div className="form-group">
                      <label className="profile_details_text">Email ID</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={fields.email}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">{emailerrors ? 'Email id is' + ' ' + emailerrors.slice(0,12): ''}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Date of Birth
                      </label>
                      <input
                        ref={dobDateInputRef}
                        type="date"
                        name="date_of_birth"
                        className="form-control small_date"
                        placeholder="Date of Birth"
                        value={new Date(
                          fields.date_of_birth
                        ).toLocaleDateString("en-CA")}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">{errors.date_of_birth}</div>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {/* {errorMessage} */}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Date of Joining:
                      </label>
                      <input
                        ref={dojDateInputRef}
                        type="date"
                        name="date_of_joining"
                        className="form-control small_date"
                        placeholder="Date Of Joining"
                        value={new Date(
                          fields.date_of_joining
                        ).toLocaleDateString("en-CA")}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="errorMsg">{errors.date_of_joining}</div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Blood Group
                      </label>
                      <select
                        name="Blood_Group"
                        className="form-control"
                        value={fields.Blood_Group}
                        onChange={(e) => handleChange(e)}
                      >
                        <option disabled={true} selected={true}>
                          Choose Blood Group
                        </option>
                        <option>A+</option>
                        <option>O+</option>
                        <option>B+</option>
                        <option>AB+</option>
                        <option>A-</option>
                        <option>O-</option>
                        <option>B-</option>
                        <option>AB- </option>
                      </select>
                      <div className="errorMsg">{errors.Blood_Group}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">Position</label>
                      <select
                        name="Position"
                        className="form-control"
                        value={fields.Position}
                        onChange={(e) => handleChange(e)}
                      >
                        <option disabled={true} selected={true}>
                          Choose Position
                        </option>
                        <option>Software Architect</option>
                        <option>Project Manager</option>
                        <option>Team Lead</option>
                        <option>Principal Software Engineer</option>
                        <option>Senior Software Developer</option>
                        <option>Software Developer</option>
                        <option>Junior Software Developer</option>
                        <option>Intern Software Developer</option>
                        <option>Other</option>
                      </select>
                      <div className="errorMsg">{errors.Position}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">Gender</label>
                      <div onChange={(e) => handleChange(e)}>
                        <input
                          type="radio"
                          value="Male"
                          name="gender"
                          checked={fields.gender == "Male"}
                        />{" "}
                        Male
                        <input
                          type="radio"
                          value="Female"
                          name="gender"
                          className="ml-2"
                          checked={fields.gender == "Female"}
                        />{" "}
                        Female
                      </div>
                      <div className="errorMsg">{errors.gender}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Marital Status
                      </label>

                      <div onChange={(e) => handleChange(e)}>
                        <input
                          type="radio"
                          value="Single"
                          name="Marital_Status"
                          checked={fields.Marital_Status == "Single"}
                        />{" "}
                        Single
                        <input
                          type="radio"
                          value="Married"
                          name="Marital_Status"
                          className="ml-2"
                          checked={fields.Marital_Status == "Married"}
                        />{" "}
                        Married
                      </div>
                      <div className="errorMsg">{errors.Marital_Status}</div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <br />
            </div>
            <div className="col-4 edit_information">
              <div className="Account-details">
                <h5 className="text-left">Account Details</h5>{" "}
                <hr style={{ margin: "0px" }} />
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Bank A/C IFSC</label>
                      <input
                        name="Bank_IFSC"
                        value={fields.Bank_IFSC}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Enter Bank IFSC"
                      ></input>
                      <div className="errorMsg">{errors.Bank_IFSC}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Bank A/C No</label>
                      <input
                        name="Bank_No"
                        value={fields.Bank_No}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Enter Bank A/C No"
                      ></input>
                      <div className="errorMsg">{errors.Bank_No}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>PAN No</label>
                      <input
                        name="PAN_No"
                        value={fields.PAN_No}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Enter Pan Number"
                      ></input>
                      <div className="errorMsg">{panerrors ?'Pan No. is' + ' ' + panerrors.slice(0,12): ''}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Aadhaar No.</label>
                      <input
                        name="ADHAR"
                        type="number"
                        value={fields.ADHAR}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Enter Aadhar"
                      ></input>
                      <div className="errorMsg">{adharerrors ?'Aadhar No. is' + ' ' + adharerrors.slice(0,12): ''}</div>
                    </div>
                  </div>
                </div>
                <div className="row">

                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="form-group">
                      <label>Base Salary</label>
                      <input
                        type="number"
                        name="base_salary"
                        value={fields.base_salary}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Enter Base Salary"
                      ></input>
                      <div className="errorMsg">{errors.base_salary}</div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="form-group">
                      <label>Effective Date</label>
                      <input
                        type="date"
                        name="effective_date"
                        value={fields.effective_date}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Efffective Date"
                      ></input>
                      <div className="errorMsg">{errors.effective_date}</div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <br />

              <div className="col-sm-12 edit_information">
                <div className="Account-details">
                  <h5 className="text-left">Educational Details</h5>{" "}
                  <hr style={{ margin: "0px" }} />
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">Degree</label>
                        <select
                          name="DEGREE"
                          className="form-control"
                          value={fields.DEGREE}
                          onChange={(e) => handleChange(e)}
                        >
                          <option disabled={true} selected={true}>
                            Choose Degree
                          </option>
                          <option>BCA</option>
                          <option>B.Arch</option>
                          <option>BE/B.TECH</option>
                          <option>B.Sc</option>
                          <option>BPharma</option>
                          <option>BDS</option>
                          <option>BPT</option>
                          <option>BA</option>
                          <option>BBA</option>
                          <option>BMS</option>
                          <option>BFA</option>
                          <option>BEM</option>
                          <option>BFD</option>
                          <option>BSW</option>
                          <option>BBS</option>
                          <option>BTTM</option>
                          <option>LLB</option>
                          <option>B.Com</option>
                          <option>ME/M.TECH</option>
                          <option>MA</option>
                          <option>MSc</option>
                          <option>LLM</option>
                          <option>MBA</option>
                          <option>MPhil</option>
                          <option>MEd</option>
                          <option>MRes</option>
                          <option>Other</option>
                        </select>
                        <div className="errorMsg">{errors.DEGREE}</div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Stream</label>
                        <input
                          type="text"
                          min="2"
                          max="50"
                          name="STREAM"
                          value={fields.STREAM}
                          onChange={(e) => handleChange(e)}
                          onInput={handleInput}
                          className="form-control"
                          placeholder="Enter Stream"
                        ></input>
                        <div className="errorMsg">{errors.STREAM}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">
                          Passed/Appearing:
                        </label>
                        <select
                          name="PASSED"
                          className="form-control"
                          value={fields.PASSED}
                          onChange={(e) => handleChange(e)}
                        >
                          <option disabled={true} selected={true}>
                            Choose Passed/Appearing
                          </option>
                          <option value="passed">PASSED</option>
                          <option value="appearing">APPEARING</option>
                        </select>
                        <div className="errorMsg">{errors.PASSED}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Year of Passing</label>
                        <input
                          name="YEAR_OF_PASSING"
                          value={fields.YEAR_OF_PASSING}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          type="number"
                          placeholder="Enter Passing Year"
                        ></input>
                        <div className="errorMsg">{errors.YEAR_OF_PASSING}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Percentage of Marks </label>
                        <input
                          name="PERCENTAGE_OF_MARKS"
                          type="number"
                          value={fields.PERCENTAGE_OF_MARKS}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Enter Percentage"
                        ></input>
                        <div className="errorMsg">
                          {errors.PERCENTAGE_OF_MARKS}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>

            <div className="col-4 edit_information">

              <div className="Account-details">
                <h5 className="text-left">Address Details</h5>{" "}
                <hr style={{ margin: "0px" }} />
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Current State
                      </label>
                      <input
                        type="text"
                        name="current_state"
                        minLength="2"
                        maxLength="50"
                        className="form-control"
                        placeholder="Current State"
                        style={{ textTransform: "capitalize" }}
                        value={fields.current_state}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">{errors.current_state}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Current City
                      </label>
                      <input
                        type="text"
                        name="current_city"
                        minLength="2"
                        maxLength="50"
                        value={fields.current_city}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Current City"
                        style={{ textTransform: "capitalize" }}
                      />
                      <div className="errorMsg">{errors.current_city}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Current Pin Code
                      </label>
                      <input
                        type="number"
                        name="current_pin_code"
                        minLength="2"
                        maxLength="50"
                        className="form-control"
                        placeholder="Current Pin"
                        style={{ textTransform: "capitalize" }}
                        value={fields.current_pin_code}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">{errors.current_pin_code}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Current Address:
                      </label>
                      <textarea
                        className="form-control"
                        name="Current_Address"
                        rows="3"
                        cols="35"
                        placeholder="Enter your Local Address"
                        value={fields.Current_Address}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                      <div className="errorMsg">{errors.Current_Address}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Permanent State
                      </label>
                      <input
                        type="text"
                        name="permanent_state"
                        minLength="2"
                        maxLength="50"
                        className="form-control"
                        placeholder="Permanent State"
                        style={{ textTransform: "capitalize" }}
                        value={fields.permanent_state}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">{errors.permanent_state}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Permanent City
                      </label>
                      <input
                        type="text"
                        name="permanent_city"
                        minLength="2"
                        maxLength="50"
                        value={fields.permanent_city}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Permanent City"
                        style={{ textTransform: "capitalize" }}
                      />
                      <div className="errorMsg">{errors.permanent_city}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Permanent Pin Code
                      </label>
                      <input
                        type="number"
                        name="permanent_pin_code"
                        minLength="2"
                        maxLength="50"
                        className="form-control"
                        placeholder="Permanent Pin"
                        style={{ textTransform: "capitalize" }}
                        value={fields.permanent_pin_code}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="errorMsg">
                        {errors.permanent_pin_code}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Permanent Address
                      </label>
                      <textarea
                        className="form-control"
                        name="Permanent_Address"
                        rows="3"
                        cols="35"
                        placeholder="Enter Your Permanent Address"
                        value={fields.Permanent_Address}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                      <div className="errorMsg">{errors.Permanent_Address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="submit">
              <div className="form-group text-center">
                {props.data ? (
                  <input
                    type="submit"
                    value="Update"
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4 btn btn-success"
                    onClick={(e) => updateUserDetails(e)}
                  />
                ) : (
                  <input
                    type="submit"
                    value="Submit"
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4 btn btn-success"
                    onClick={(e) => submituserRegistrationForm(e)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddEmployee;
