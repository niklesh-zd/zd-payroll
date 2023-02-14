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
        let obje = { Employee_name: resp.First_Name, userid: resp._id, Employee_code: resp.Employee_Code, designation: resp.Position, Salary_Slip_Month_Year: resp.Salary_Slip_Month_Year, Date_of_Joining: resp.date_of_joining, Employee_PAN: resp.PAN_No, Employee_Adhar: resp.ADHAR, Bank_Account_Number: resp.Bank_No, Bank_IFSC_Code: resp.Bank_IFSC, Leave_taken: resp.Leave_taken, Total_earn: resp.Total_earn, Salary_Slip_Month_Year: resp.Salary_Slip_Month_Year, Present_day: resp.Present_day, base_salary: resp.base_salary }
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
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div> <span className="fw-bolder text-lg">EMP Code :</span> <small className="ms-3 text-lg fw-bolder" >{empdata.Employee_code}</small> </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

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
                  </div>

                </div>
                <div className="row">

                </div>
                <div className="row">

                </div>
                <div className="row">
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