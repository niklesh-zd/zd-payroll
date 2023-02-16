import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getSnackbarContentUtilityClass } from "@mui/material";
import Downloadslip from "./Salary_slip/downloadslip";

function Salary() {
  const { id } = useParams();
  const [empdata, empdatachange] = useState({});
  const [fields, setFields] = useState({});
  const [selectedOption, setSelectedOption] = useState("January");
  const [inputValue, setInputValue] = useState("");
  const [startdate, Setstartdate] = useState("");
  const [enddate, Setenddate] = useState("");
  const [month, Setmonth] = useState("");
  const [totalHolydays, setTotalHolydays] = useState("");
  const [switchToDownload, setSwitchToDownload] = useState(false);

  const navigate = useNavigate();
  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
    switch (event.target.value) {
      case "January":
        Setmonth("January");
        setInputValue("31");
        Setstartdate("2023-01-01");
        Setenddate("2023-01-31");
        break;
      case "February":
        Setmonth("February");
        setInputValue("28");
        Setstartdate("2023-02-01");
        Setenddate("2023-02-28");
        break;
      case "March":
        Setmonth("March");
        setInputValue("31");
        Setstartdate("2023-03-01");
        Setenddate("2023-03-31");
        break;
      case "april":
        Setmonth("april");
        setInputValue("30");
        Setstartdate("2023-04-01");
        Setenddate("2023-04-30");
        break;
      case "may":
        Setmonth("may");
        setInputValue("31");
        Setstartdate("2023-05-01");
        Setenddate("2023-05-31");
        break;
      case "june":
        Setmonth("june");
        setInputValue("30");
        Setstartdate("2023-06-01");
        Setenddate("2023-06-30");
        break;
      case "july":
        Setmonth("july");
        setInputValue("31");
        Setstartdate("2023-07-01");
        Setenddate("2023-07-31");
        break;
      case "August":
        Setmonth("August");
        setInputValue("31");
        Setstartdate("2023-08-01");
        Setenddate("2023-08-31");
        break;
      case "September":
        Setmonth("September");
        setInputValue("30");
        Setstartdate("2023-09-01");
        Setenddate("2023-09-30");
        break;
      case "October":
        Setmonth("October");
        setInputValue("31");
        Setstartdate("2023-10-01");
        Setenddate("2023-10-31");
        break;
      case "november":
        Setmonth("november");
        setInputValue("30");
        Setstartdate("2023-11-01");
        Setenddate("2023-11-30");
        break;
      case "December":
        Setmonth("December");
        setInputValue("31");
        Setstartdate("2023-12-01");
        Setenddate("2023-12-31");
        break;
      default:
        Setmonth("January");
        setInputValue("31");
        Setstartdate("2023-01-01");
        Setenddate("2023-01-31");
    }
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

  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post("http://192.168.29.146:7071/Holiday/get_holiday", fields)
      .then((response) => {
        console.log('response',response);
        let holidays = response.data.length;
        setTotalHolydays(holidays)
        // setFields({ ...fields, holidays: holidays})
        // let calholiday = inputValue - holiday;
        // getSalaryData({
        //   Total_Work_Days: calholiday,
        //   Leave_taken: leavetaken,
        //   ...fields,
        // });
      }).then(()=>{
        setSwitchToDownload(true)
        console.log('fields',fields);
      })
  }

  useEffect(() => {
    setFields({
      from_date: startdate,
      end_date: enddate,
      Salary_Slip_Month_Year: month,
      monthDays:inputValue,
      ...empdata,
    });
  }, [startdate, enddate, month]);

  useEffect(() => {
    fetch("http://192.168.29.146:7071/emp/emp_1/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        let obje = {
          Employee_name: resp.First_Name,
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

  return (
    switchToDownload ?
    <Downloadslip data={fields} holidays={totalHolydays}/>
    :
    <div className="pt-5">
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          {empdata && (
            <form className="container" onSubmit={(e) => handlesubmit(e)}>
              <div className="card p-10">
                <div className="card-title" style={{ textAlign: "center" }}>
                  <h2 className="text-red-900">Generate Salary Receipt</h2>
                </div>
                <div className="row text-center pt-5">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <div className="col-md-6">
                        <div>
                          {" "}
                          <span className="fw-bolder text-lg">Name :</span>{" "}
                          <small className="ms-3 text-lg fw-bolder">
                            {empdata.Employee_name}
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
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="april">April</option>
                          <option value="may">may</option>
                          <option value="june">june</option>
                          <option value="july">july</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="november">november</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row">
                  <div className="submit pt-8">
                    <div className="form-group">
                      <input
                        type="submit"
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
