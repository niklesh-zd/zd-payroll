import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Downloadslip from "./Salary_slip/downloadslip";

function Salary() {
  const { id } = useParams();
  const [empdata, empdatachange] = useState({});
  const [fields, setFields] = useState({});
  const [switchToDownload, setSwitchToDownload] = useState(false);
  const [switchToAdvance, setSwitchToAdvance] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [startdate, Setstartdate] = useState("");
  const [enddate, Setenddate] = useState("");
  const [month, Setmonth] = useState("");
  const [totalHolydays, setTotalHolydays] = useState("");
  const [prevMonths, setPrevMonths] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Setmonth("January");
    // setInputValue("31");
    Setstartdate(`${event.target.value}-01`);
    Setenddate(`${event.target.value}-31`);
  };
  const handleToggleAdvance = (e) => {
    setSwitchToAdvance((prev) => !prev);
  };
  // function getSalaryData(data) {
  //   if (data) {
  //     axios
  //       .post("http://192.168.29.146:7071/Emp_Salary/salary", data)
  //       .then((res) => {
  //         console.log("res", res);
  //         navigate("/download" + id);
  //       })
  //       .catch((error) => {
  //         console.error("There was an error!", error);
  //       });
  //   }
  // }

  // Get the current month and year
  const getPreviousMonths = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let currentDate = new Date();
    let previousMonths = [];

    for (let i = 0; i < 12; i++) {
      let date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      let month = monthNames[date.getMonth()];
      let year = date.getFullYear();
      let format1 = `${month} ${year}`;
      let format2 = `${year}-${("0" + (date.getMonth() + 1)).slice(-2)}`;
      previousMonths.push({ format_1: format1, format_2: format2 });
    }
    setPrevMonths(previousMonths);
    return previousMonths;
  };

  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post("http://192.168.29.146:7071/Holiday/get_holiday", fields)
      .then((response) => {
        console.log("response", response);
        let holidays = response.data.length;
        setTotalHolydays(holidays);
        // setFields({ ...fields, holidays: holidays})
        // let calholiday = inputValue - holiday;
        // getSalaryData({
        //   Total_Work_Days: calholiday,
        //   Leave_taken: leavetaken,
        //   ...fields,
        // });
      })
      .then(() => {
        setSwitchToDownload(true);
        console.log("fields", fields);
      });
  }

  useEffect(() => {
    setFields({
      from_date: startdate,
      end_date: enddate,
      Salary_Slip_Month_Year: month,
      monthDays: inputValue,
      ...empdata,
    });
  }, [startdate, enddate, month]);

  useEffect(() => {
    getPreviousMonths();
    fetch("http://192.168.29.146:7071/emp/emp_1/" + id)
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
    <Downloadslip data={fields} holidays={totalHolydays} />
  ) : (
    <div className="pt-5">
      <div>
        <div className="offset-lg-2 col-lg-8">
          {empdata && (
            <form className="container" onSubmit={(e) => handlesubmit(e)}>
              <div className="card p-10">
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
                        for="customSwitches"
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
                            name="arrs"
                            minLength="2"
                            maxLength="50"
                            className="form-control"
                            placeholder="ARRS"
                            // value={fields.First_Name}
                            // onChange={(e) => handleChange(e)}
                          />
                          {/* <div className="errorMsg">{errors.First_Name}</div> */}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="profile_details_text">
                            Additional
                          </label>
                          <input
                            type="text"
                            style={{ textTransform: "capitalize" }}
                            name="additional"
                            minLength="2"
                            maxLength="50"
                            className="form-control"
                            placeholder="Additional Amount"
                            // value={fields.First_Name}
                            // onChange={(e) => handleChange(e)}
                          />
                          {/* <div className="errorMsg">{errors.First_Name}</div> */}
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
                            name="arrs_comment"
                            rows="3"
                            cols="35"
                            placeholder="Write Comment Here"
                            // value={fields.Current_Address}
                            // onChange={(e) => handleChange(e)}
                          ></textarea>
                          <div className="errorMsg">
                            {/* {errors.Current_Address} */}
                          </div>
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
                            // value={fields.Current_Address}
                            // onChange={(e) => handleChange(e)}
                          ></textarea>
                          <div className="errorMsg">
                            {/* {errors.Current_Address} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt-4">
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
                            <option key={month.format_1} value={month.format_2}>
                              {month.format_1}
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
                        value="Generate"
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success"
                        value={'Generate'}
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
