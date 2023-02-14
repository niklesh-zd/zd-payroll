import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { getSnackbarContentUtilityClass } from "@mui/material";

function Salary() {
  const { id } = useParams();
  const [empdata, empdatachange] = useState({});
  const [fields, setFields] = useState({})
  const [selectedOption, setSelectedOption] = useState('January');
  const [inputValue, setInputValue] = useState('');
  const [startdate, Setstartdate] = useState('');
  const [enddate, Setenddate] = useState('');


  const navigate = useNavigate()
  // const Calculate = () => {
  //   var resources = document.getElementById('inp1').value;
  //   var minutes = document.getElementById('inp2').value;
  //   document.getElementById('inp3').value = minutes - resources;
  // }


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    switch (event.target.value) {
      case 'January':
        setInputValue('31');
        break;
      case 'February':
        setInputValue('28');

        break;
      case 'March':
        setInputValue('31');
        Setstartdate('2023-03-01');
        Setenddate('2023-03-31');
        break;
      case 'april':
        setInputValue('30');
        break;
      case 'may':
        setInputValue('31');
        break;
      case 'june':
        setInputValue('30');
        break;
      case 'july':
        setInputValue('31');
        break;
      case 'August':
        setInputValue('31');
        break;
      case 'September':
        setInputValue('30');
        break;
      case 'October':
        setInputValue('31');
        break;
      case 'november':
        setInputValue('30');
        break;
      case 'December':
        setInputValue('31');
        break;
      default:
        setInputValue('31');
    }
  }


  function getSalaryData(data) {
    // console.log('postSalaryData', postSalaryData);
    if (data) {
      axios.post('http://localhost:7071/Emp_Salary/salary', data)
        .then((res) => {
          console.log('res', res);
          navigate("/download" + id)
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }


  function handlesubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:7071/Holiday/get_holiday', fields)
      .then((response) => {
        let holiday = response.data.length;
        let calholiday = inputValue - holiday;
        getSalaryData({ Total_Work_Days: calholiday, ...fields })
      })
  }

  useEffect(() => {
    setFields({ from_date: startdate, end_date: enddate, ...empdata });
  }, [startdate, enddate])


  useEffect(() => {
    fetch('http://localhost:7071/emp/emp_1/' + id)
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        console.log(resp.base_salary);
        let obje = { Employee_name: resp.First_Name, userid: resp._id, Employee_code: resp.Employee_Code, designation: resp.Position, Salary_Slip_Month_Year: resp.Salary_Slip_Month_Year, Date_of_Joining: resp.date_of_joining, Employee_PAN: resp.PAN_No, Employee_Adhar: resp.ADHAR, Bank_Account_Number: resp.Bank_No, Bank_IFSC_Code: resp.Bank_IFSC, Leave_taken: resp.Leave_taken, Total_earn: resp.Total_earn, Salary_Slip_Month_Year: resp.Salary_Slip_Month_Year, Present_day: resp.Present_day, base_salary: resp.base_salary}
        // console.log(resp._id, "userid8888-------------88");
        empdatachange(obje,)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])


  return (
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
                      {/* <h5>Name : </h5><p className="">{empdata.Employee_name}</p> */}
                      <div className="col-md-6">
                        <div> <span className="fw-bolder text-lg">Name :</span> <small className="ms-3 text-lg fw-bolder" >{empdata.Employee_name}</small> </div>
                      </div>
                      {/* <input
                        type="text"
                        min="2"
                        max="50"
                        name="Employee_name"
                        value={empdata.Employee_name}
                        // onChange={(e) => handleChange(e)}
                        className="form-control"
                      >
                      </input> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div> <span className="fw-bolder text-lg">EMP Code :</span> <small className="ms-3 text-lg fw-bolder" >{empdata.Employee_code}</small> </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <h5>Employee Code</h5>
                      <p>{empdata.Employee_code}</p>
                      <div
                        className="flex"
                        style={{ width: '70%', justifyContent: 'space-between' }}>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Employee Code</label>
                      <input
                        type="text"
                        min="2"
                        max="50"
                        name="Employee_code"
                        value={empdata.Employee_code}
                        // onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    {/* <div className="form-group">
                      <label>Designation</label>
                      <input
                        type="text"
                        min="2"
                        max="50"
                        name="designation"
                        value={empdata.designation}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt-4">
                    <div className="form-group">
                      <label>Select the month</label>
                      <select
                        min="2"
                        max="50"
                        name="Salary_Slip_Month_Year"
                        className="form-control "
                        // value={empdata.Salary_Slip_Month_Year}
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
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>start Date</label>
                      <input
                        type="date"
                        min="2"
                        max="50"
                        name="from_date"
                        value={startdate}
                        onClick={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}


                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>end Date</label>
                      <input
                        type="date"
                        min="2"
                        max="50"
                        name="end_date"
                        value={enddate}
                        onClick={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}

                </div>
                {/* <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>DOJ</label>
                      <input
                        type="text"
                        min="2"
                        max="50"
                        name="Date_of_Joining"
                        value={empdata.Date_of_Joining}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Pan Number</label>
                      <input
                        type="text"
                        min="2"
                        max="50"
                        name="Employee_PAN"
                        value={empdata.Employee_PAN
                        }
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Aadhar Number</label>
                      <input
                        type="text"
                        min="12"
                        max="12"
                        name="Employee_Adhar"
                        value={empdata.Employee_Adhar}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Account Number</label>
                      <input
                        type="text" <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Total Work Days</label>
                      <input
                        id="inp2"
                        type="number"
                        name="Total_Work_Days"
                        // value={empdata.Total_Work_Days}
                        value={totalworkday}
                        // onClick={(e) => Calculate(e)}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                        min="2"
                        max="50"
                        name="Bank_Account_Number"
                        value={empdata.Bank_Account_Number}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>IFSC Code</label>
                      <input
                        type="text"
                        min="2"
                        max="50"
                        name="Bank_IFSC_Code"
                        value={empdata.Bank_IFSC_Code}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Leave taken</label>
                      <input
                        id="inp1"
                        type="number"
                        min="0"
                        max="20"
                        name="Leave_taken"
                        value={empdata.Leave_taken}
                        onClick={(e) => Calculate(e)}
                        // onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Total Work Days</label>
                      <input
                        id="inp2"
                        type="number"
                        name="Total_Work_Days"
                        // value={empdata.Total_Work_Days}
                        value={totalworkday}
                        // onClick={(e) => Calculate(e)}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                  {/* 
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Present Days</label>
                      <input
                        id="inp3"
                        type="text"
                        min="2"
                        max="50"
                        name="Present_day"
                        value={third.value}
                        // onClick={(e) => Calculate(e)}
                        // onClick={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}

               
                </div>
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