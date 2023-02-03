import React, { useEffect, useState } from 'react'
// import validator from 'validator'
import axios from 'axios'
import { useNavigate } from 'react-router';
function AddEmployee(props) {
  console.log('props',props);
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  function ValidateDOB() {
    var lblError = document.getElementById('lblError')

    //Get the date from the TextBox.
    var dateString = document.getElementById('txtDate').value
    var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/

    //Check whether valid dd/MM/yyyy Date Format.
    if (regex.test(dateString)) {
      var parts = dateString.split('/')
      var dtDOB = new Date(parts[1] + '/' + parts[0] + '/' + parts[2])
      var dtCurrent = new Date()
      lblError.innerHTML = 'Eligibility 18 years ONLY.'
      if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
        return false
      }

      if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {
        //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
        if (dtCurrent.getMonth() < dtDOB.getMonth()) {
          return false
        }
        if (dtCurrent.getMonth() == dtDOB.getMonth()) {
          //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
          if (dtCurrent.getDate() < dtDOB.getDate()) {
            return false
          }
        }
      }
      lblError.innerHTML = ''
      return true
    } else {
      lblError.innerHTML = 'Enter date in dd/MM/yyyy format ONLY.'
      return false
    }
  }
useEffect(()=>{
  console.log('props.data',props.data);
  props.data && setFields(props.data)
},[props.data])
  function handleChange(e) {
    let fieldObj = { ...fields }
    fieldObj[e.target.name] = e.target.value

    setFields(fieldObj)
  }
  console.log('fields',fields);
  function submituserRegistrationForm(e) {
    e.preventDefault()
    // if (validateForm()) {
      console.log('fields', fields)
      axios.post('http://localhost:7071/emp/add_employ', fields)
          .then((response)=>{
            console.log('success',response)
        navigate('/settings/manageprofile')

          })
          .catch(error => {
              console.error('There was an error!', error);
          });
  }

//   function validateForm() {
//     console.log('fields', fields)
//     let bank_ifsc_regex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/)
//     let regex_Pan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/

//     let regex = new RegExp(/^[0-9]{9,18}$/)
//     let errObj = {}
//     console.log('fields', fields)
//     console.log(fields['ADHAR'])
//     let formIsValid = true
//     if (!fields['bank_ifsc']) {
//       formIsValid = false
//       errObj['bank_ifsc'] = '*Please enter your Bank IFSC.'
//     }
//     if (!bank_ifsc_regex.test(fields['bank_ifsc'])) {
//       formIsValid = false
//       errObj['bank_ifsc'] = '*Please enter your valid Bank IFSC.'
//     }

//     // bank_account_number CODE
//     // is empty return false
//     if (fields['bank_no'] == null) {
//       formIsValid = false
//       errObj['bank_no'] = '*Please enter your Bank no.'
//     }

//     // Return true if the bank_account_number
//     // matched the ReGex
//     if (regex.test(fields['bank_no']) == true) {
//       formIsValid = true
//     } else {
//       formIsValid = false
//       errObj['bank_no'] = '*Please enter your Bank no.'
//     }

//     console.log({ fields }, fields.PAN_NO)
//     if (fields['PAN_NO'].length == 10) {
//       formIsValid = true
//     } else {
//       errObj['PAN_NO'] = '*Please enter your valid Pan no.'
//     }
//     if (fields['ADHAR'].length == 12) {
//       formIsValid = true
//     } else {
//       errObj['ADHAR'] = '*Please enter your valid Aadhar no.'
//     }

//     console.log('errObj', errObj)
//     setErrors(errObj)
//     return formIsValid
//   }

  return (
    <div className="">
      <form
        method="post"
        name="userRegistrationForm"
        onSubmit={(e) => submituserRegistrationForm(e)}
        style={{ display: 'flex' }}
      >
        <div className="container px-4">
          <div className="row gx-12">
            <div className="col edit_information">
              <div className="Account-details">
                <h3 className="text-left"> Personal Details</h3>
                <hr />
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Employee Code
                      </label>
                      <input
                        type="text"
                        style={{ textTransform: 'capitalize' }}
                        name="Employee_Code"
                        className="form-control"
                        placeholder="Employee Code"
                        value={fields.Employee_Code}
                        onChange={(e)=> handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        First Name:
                      </label>
                      <input
                        type="text"
                        style={{ textTransform: 'capitalize' }}
                        name="First_Name"
                        pattern="^[A-Za-z]+$"
                        minLength="2"
                        maxLength="50"
                        className="form-control"
                        placeholder="First_Name"
                        value={fields.First_Name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Last Name:{' '}
                      </label>
                      <input

                        type="text"
                        name="Last_Name"
                        pattern="^[A-Za-z]+$"
                        minLength="2"
                        maxLength="50"
                        className="form-control"
                        placeholder="Last Name"
                        style={{ textTransform: 'capitalize' }}
                        value={fields.Last_Name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Father Name:
                      </label>
                      <input

                        type="text"
                        pattern="^[A-Za-z]+$"
                        name="fatherName"
                        minLength="2"
                        maxLength="50"
                        value={fields.fatherName}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Father Name"
                        style={{ textTransform: 'capitalize' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Date Of Birth:
                      </label>
                      <input

                        type="date"
                        name="date_of_birth"
                        className="form-control"
                        placeholder="Date Of Birth"
                        value={fields.date_of_birth}
                        onChange={(e) => handleChange(e)}
                        // onChange={(e) => ValidateDOB(e.target.value)}
                      />
                      <span
                        style={{
                          fontWeight: 'bold',
                          color: 'red',
                        }}
                      >
                        {/* {errorMessage} */}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Date Of Joining:
                      </label>
                      <input
                        type="date"
                        name="date_of_joining"
                        className="form-control"
                        placeholder="Date Of Joining"
                        value={fields.date_of_joining}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input
                        type="number"
                        maxLength="12"
                        value={fields.Contact_Number}
                        onChange={(e) => handleChange(e)}
                        name="Contact_Number"
                        className="form-control"
                        placeholder="Mobile Number"
                        pattern="^[0-9 ]*$"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Alternate Contact</label>
                      <input
                        type="tel"
                        maxLength="12"
                        value={fields.Alternate_Contact_number}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        name="Alternate_Contact_number"
                        placeholder="Alternate Contact (optional)"
                        pattern="^[0-9]*$"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Contact Number Home</label>
                      <input

                        type="tel"
                        maxLength="12"
                        name="Contact_Number_Home"
                        className="form-control"
                        placeholder="Mobile Number"
                        pattern="^[0-9]*$"
                        value={fields.Contact_Number_Home}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                    <div className="form-group">
                      <label className="profile_details_text">Email:</label>
                      <input

                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        // pattern= '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                        value={fields.email}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Blood Group:
                      </label>
                      <select
                        name="Blood_Group"
                        className="form-control"
                        value={fields.Blood_Group}
                        onChange={(e) => handleChange(e)}
                      >
                        <option>A+</option>
                        <option>O+</option>
                        <option>B+</option>
                        <option>AB+</option>
                        <option>A-</option>
                        <option>O-</option>
                        <option>B-</option>
                        <option>AB- </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                      Position
                      </label>
                      <input

                        type="text"
                        style={{ textTransform: 'capitalize' }}
                        name="Position"
                        pattern="^[A-Za-z]+$"
                        value={fields.Position}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Enter your Position"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Nationality
                      </label>
                      <input

                        type="text"
                        style={{ textTransform: 'capitalize' }}
                        name="Nationality"
                        pattern="^[A-Za-z]+$"
                        value={fields.Nationality}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="Enter your Nationality"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">Gender:</label>
                      <div onChange={(e) => handleChange(e)}>
                        <input type="radio" value="Male" name="gender" /> Male
                        <input type="radio" value="Female" name="gender" />{' '}
                        Female
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Marital Staus:
                      </label>

                      <div onChange={(e) => handleChange(e)}>
                        <input type="radio" value="Single" name="Marital_Status" />{' '}
                        Single
                        <input
                          type="radio"
                          value="Married"
                          name="Marital_Status"
                        />{' '}
                        Married
                      </div>
                    </div>
                  </div>
                </div>

                <br />
              </div>
              <br />
            </div>
            <div className="col edit_information">
              <div className="Account-details">
                <h3 className="text-left">Account Details</h3> <hr />
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>Bank A/C IFSC</label>
                      <input
                        name="Bank_IFSC"
                        value={fields.Bank_IFSC}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
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
                        pattern="[a-zA-Z0-9]+"
                        value={fields.PAN_No}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                      <div className="errorMsg">{errors.PAN_No}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label>ADHAR No.</label>
                      <input
                        name="ADHAR"
                        type="number"
                        value={fields.ADHAR}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                      ></input>
                      <div className="errorMsg">{errors.ADHAR}</div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <br />

              <div className="col-sm-12 edit_information">
                <div className="Account-details">
                  <h3 className="text-left">Education Information</h3> <hr />
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">Degree:</label>
                        <select
                          name="DEGREE"
                          className="form-control"
    
                          value={fields.DEGREE}
                          onChange={(e) => handleChange(e)}
                        >
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
                          pattern="^[A-Za-z]+$"
                          value={fields.STREAM}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
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
                          <option value="passed">PASSED</option>
                          <option value="appearing">APPEARING</option>
                        </select>
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
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Percentage Of Marks </label>
                        <input
                          name="PERCENTAGE_OF_MARKS"
                          type="number"
                          value={fields.PERCENTAGE_OF_MARKS}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <div className="col edit_information">
              <div className="Account-details">
                <h3 className="text-left">Address</h3> <hr />
                {/* <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">State: </label>
                      <input

                        type="text"
                        name="state"
                        minLength="2"
                        maxLength="50"
                        pattern="^[A-Za-z]+$"
                        className="form-control"
                        placeholder="State"
                        style={{ textTransform: 'capitalize' }}
                        value={fields.state}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">City:</label>
                      <input

                        type="text"
                        pattern="^[A-Za-z]+$"
                        name="City"
                        minLength="2"
                        maxLength="50"
                        value={fields.City}
                        onChange={(e) => handleChange(e)}
                        className="form-control"
                        placeholder="City"
                        style={{ textTransform: 'capitalize' }}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Current Address:
                      </label>
                      <textarea
                        className="border border-dark"
                        id="w3review"
                        name="Current_Address"
                        rows="4"
                        cols="50"
                        placeholder="Enter your Local Address"
                        value={fields.Current_Address}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Parmanent Address:
                      </label>
                      <textarea
                        className="border border-dark"
                        id="w3review"
                        name="Permanent_Address"
                        rows="4"
                        cols="50"
                        placeholder="Parmanent Address"
                        value={fields.Permanent_Address}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="submit">
                    <div className="form-group">
                      <input
                        type="submit"
                        value={props.data? "Update" : "Submit"}
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default AddEmployee
