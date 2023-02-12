import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

function Salary() {
  const { id } = useParams();
  const [empdata, empdatachange] = useState({});
  const [third, thirdchnge] = useState({});
  const [fields, setFields] = useState({})
  const [selectedOption, setSelectedOption] = useState('January');
  const [inputValue, setInputValue] = useState('');


  const navigate = useNavigate()
  const Calculate = () => {
    var resources = document.getElementById('inp1').value;
    var minutes = document.getElementById('inp2').value;
    document.getElementById('inp3').value = minutes - resources;
  }

  // const generateSalary = (_id) => {
  //   navigate("/download" + _id)
  // }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    switch (event.target.value) {
      case 'January':
        setInputValue('25');
        break;
      case 'February':
        setInputValue('22');
        break;
      case 'March':
        setInputValue('25');
        break;
      case 'april':
        setInputValue('24');
        break;
      case 'may':
        setInputValue('25');
        break;
      case 'june':
        setInputValue('24');
        break;
      case 'july':
        setInputValue('25');
        break;
      case 'August':
        setInputValue('25');
        break;
      case 'September':
        setInputValue('24');
        break;
      case 'October':
        setInputValue('25');
        break;
      case 'november':
        setInputValue('24');
        break;
      case 'December':
        setInputValue('25');
        break;
      default:
        setInputValue('25');
    }
  }

  function handlesubmit(e) {
    e.preventDefault()
    // console.log({ fields }, 'this is main field');
    axios.post('http://localhost:7071/Emp_Salary/salary', fields,)
      // console.log(fields.fields,'fields.fields')
      .then((response) => {
        console.log('success data ---------------------geted', response)

        navigate("/" + id)
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
  function handleChange(e) {
    let fieldObj = { ...empdata, ...fields }
    fieldObj[e.target.name] = e.target.value
    setFields(fieldObj)
  }
  useEffect(() => {
    let obje = {};
    fetch('http://localhost:7071/emp/emp_1/' + id)
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        console.log({ resp }, 'resp');
        let obje = { Employee_name: resp.First_Name, Employee_code: resp.Employee_Code, designation: resp.Position, Salary_Slip_Month_Year: resp.Salary_Slip_Month_Year, Date_of_Joining: resp.date_of_joining, Employee_PAN: resp.PAN_No, Employee_Adhar: resp.ADHAR, Bank_Account_Number: resp.Bank_No, Bank_IFSC_Code: resp.Bank_IFSC, Leave_taken: resp.Leave_taken, Total_Work_Days: resp.Total_Work_Days, Total_earn: resp.Total_earn, Salary_Slip_Month_Year: resp.Salary_Slip_Month_Year, userid: resp._id, Present_day: resp.Present_day }
        // console.log(resp._id, "userid8888-------------88");
        empdatachange(obje)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  return (
    <div>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          {empdata && (
            <form className="container" onSubmit={(e) => handlesubmit(e)}>
              <div className="card p-10">
                <div className="card-title" style={{ textAlign: "center" }}>
                  <h2 className="text-red-900">Generate Salary Receipt</h2>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Name</label>

                      <input
                        type="text"
                        min="2"
                        max="50"
                        name="Employee_name"
                        value={empdata.Employee_name}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      >
                      </input>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Employee Code</label>
                      <input
                        type="text"
                        min="2"
                        max="50"
                        name="Employee_code"
                        value={empdata.Employee_code}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
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
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Salary Slip Month</label>
                      <select
                        min="2"
                        max="50"
                        name="Salary_Slip_Month_Year"
                        className="form-control"
                        // value={empdata.Salary_Slip_Month_Year}
                        value={selectedOption}
                        onClick={(e) => handleChange(e)}
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
                <div className="row">
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
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Account Number</label>
                      <input
                        type="text"
                        min="2"
                        max="50"
                        name="Bank_Account_Number"
                        value={empdata.Bank_Account_Number}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Total Work Days</label>
                      <input
                        id="inp2"
                        type="number"
                        name="Total_Work_Days"
                        // value={empdata.Total_Work_Days}
                        value={inputValue}
                        // onClick={(e) => Calculate(e)}
                        onClick={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

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
                        onClick={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        type="number"
                        min="8000"
                        name="Total_earn"
                        value={empdata.Total_earn}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
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