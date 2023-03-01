import React from "react";
import { useEffect, useState } from "react";
import Downloadslip from "./Salary_slip/downloadslip";

import { Link, useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
function Salary() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [empdata, empdatachange] = useState({});
  const [fields, setFields] = useState({
    arrear: 0,
    additional: 0,
    arrear_comment: "",
    additional_comment: "",
    overwrite_payslip: false,
  });
  const [switchToDownload, setSwitchToDownload] = useState(false);
  const [switchToAdvance, setSwitchToAdvance] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [salaryYear, setSalaryYear] = useState(0);
  const [salaryMonthNumber, setSalaryMonthNumber] = useState(0);
  const [prevMonths, setPrevMonths] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    let salaryMonth = event.target.value;
    let yearStr = salaryMonth.substring(0, 4);
    let monthStr = salaryMonth.substring(4);
    setSalaryYear(yearStr);
    setSalaryMonthNumber(monthStr);
  };
  function handleChange(e) {
    let fieldObj = { ...fields };
    if (e.target.name == "overwrite_payslip") {
      fieldObj["overwrite_payslip"] = !fieldObj["overwrite_payslip"];
    } else {
      fieldObj[e.target.name] = e.target.value;
    }
    console.log("fieldObj", fieldObj);
    setFields(fieldObj);
  }
  const handleToggleAdvance = (e) => {
    setSwitchToAdvance((prev) => !prev);
  };
  
  const getPreviousMonths = () => {
    const currentDate = new Date(); // get the current date
    const previousMonths = []; // initialize an empty array to hold the month objects

    for (let i = 1; i <= 12; i++) {
      const prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthObj = {
        format1:
          prevMonth.toLocaleString("default", { month: "short" }) +
          " " +
          prevMonth.getFullYear(),
        year: prevMonth.getFullYear().toString(),
        monthNumber: ("0" + (prevMonth.getMonth() + 1)).slice(-2) - 1,
      };
      previousMonths.push(monthObj);
    }
    setPrevMonths(previousMonths);
    return previousMonths;
  };

  function handlesubmit(e) {
    e.preventDefault();
    navigate("/download" + id, {
      state: {
        salaryYear: salaryYear,
        salaryMonthNumber: salaryMonthNumber,
        fields: fields,
      },
    });
  }

  useEffect(() => {
    getPreviousMonths();
    fetch("http://localhost:7071/emp/emp_1/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        let obje = {
          Employee_name: resp.First_Name,
          Last_Name: resp.Last_Name,
          userid: resp._id,
          Employee_code: resp.Employee_Code,
          designation: resp.Position,
          Date_of_Joining: resp.date_of_joining,
          Employee_PAN: resp.PAN_No,
          Employee_Adhar: resp.ADHAR,
          Bank_Account_Number: resp.Bank_No,
          Bank_IFSC_Code: resp.Bank_IFSC,
          base_salary: resp.base_salary,
        };
        empdatachange(obje);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return switchToDownload ? (
    <Downloadslip year={salaryYear} month={salaryMonthNumber} />
  ) : (
    <div className="pt-5">
      <div>
        <div className="offset-lg-2 col-lg-8">
          {empdata && (
            <form className="container" onSubmit={(e) => handlesubmit(e)}>
              <div className="card m-5 p-3 ">
                <Link to="/settings/manageprofile">
                  <TiArrowBack size={25} />
                </Link>
                <div className="card-title" style={{ textAlign: "center" }}>
                  <h2 className="text-red-900">Generate Salary Receipt</h2>
                </div>
                <div className="row text-center pt-3">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <div className="col-md-12">
                        <div>
                          {" "}
                          <span className="fw-bolder text-lg">Name :</span>{" "}
                          <small className="ms-3 text-lg fw-bolder">
                            {empdata.Employee_name + " " + empdata.Last_Name}
                          </small>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      {" "}
                      <span className="fw-bolder text-lg">EMP Code :</span>{" "}
                      <small className="ms-3 text-lg fw-bolder">
                        {empdata.Employee_code}
                      </small>{" "}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt-4">
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitches"
                        onChange={(e) => handleToggleAdvance(e)}
                      />
                      <label
                        className="custom-control-label px-3"
                        htmlFor="customSwitches"
                      >
                        advance options
                      </label>
                    </div>
                  </div>
                </div>
                {switchToAdvance ? (
                  <div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="profile_details_text">ARRS</label>
                          <input
                            type="text"
                            style={{ textTransform: "capitalize" }}
                            name="arrear"
                            minLength="2"
                            maxLength="50"
                            className="form-control"
                            placeholder="ARRS"
                            value={fields.arrear}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="profile_details_text">
                            Additional
                          </label>
                          <input
                            type="number"
                            style={{ textTransform: "capitalize" }}
                            name="additional"
                            minLength="2"
                            maxLength="50"
                            className="form-control"
                            placeholder="Additional Amount"
                            value={fields.additional}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="profile_details_text">
                            ARRS Comment
                          </label>
                          <textarea
                            className="form-control"
                            name="arrear_comment"
                            rows="3"
                            cols="35"
                            placeholder="Write Comment Here"
                            value={fields.arrear_comment}
                            onChange={(e) => handleChange(e)}
                          ></textarea>
                          <div className="errorMsg"></div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="profile_details_text">
                            Additional Comment
                          </label>
                          <textarea
                            className="form-control"
                            name="additional_comment"
                            rows="3"
                            cols="35"
                            placeholder="Write Comment Here"
                            value={fields.additional_comment}
                            onChange={(e) => handleChange(e)}
                          ></textarea>
                          <div className="errorMsg"></div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pt-2">
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            name="overwrite_payslip"
                            className="custom-control-input"
                            value={fields.overwrite_payslip}
                            onChange={(e) => handleChange(e)}
                          />
                          <label
                            className="custom-control-label px-3"
                            htmlFor="customSwitches"
                          >
                            select for overwrite payslip
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt-2">
                    <div className="form-group">
                      <label>Select the month</label>
                      <select
                        min="2"
                        max="50"
                        name="Salary_Slip_Month_Year"
                        className="form-control "
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <option selected disabled value="">
                          please select an option
                        </option>
                        {prevMonths.map((month) => {
                          return (
                            <option
                              key={month.format1}
                              value={month.year + month.monthNumber}
                            >
                              {month.format1}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="submit pt-8">
                    <div className="form-group">
                      <input
                        type="submit"
                        // value="Download_slip"
                        value="Generated"
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Salary;
