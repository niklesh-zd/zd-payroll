import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Leaves = (props) => {
  const [leavesData, setLeavesData] = useState({})

  const handleChange = (e) => {
    let leavesObj = { ...leavesData }
    leavesObj[e.target.name] = e.target.value
    setLeavesData({leavesObj, '_id': props.empData._id})
  }
  console.log('leavesData', leavesData)
  const handlesubmit = (e) => {
    e.preventDefault()
    console.log('0000')
    axios
      .post('http://192.168.29.37:7071/Emp_Leave/leave', leavesData)
      .then((response) => {
        console.log('success', response)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  return (
    <div>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card p-10">
              <div className="card-title" style={{ textAlign: 'center' }}>
                <h2 className="text-red-900">Apply Leave</h2>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">
                      Select Employee Name
                    </label>
                    <select
                      name="userid"
                      className="form-control"
                      value={props.empData._id}
                      placeholder="Select Employee"
                      disabled
                    >
                        <option>{props.empData.First_Name}</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      min="2"
                      max="50"
                      name="DATE"
                      value={leavesData.DATE}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">Reason</label>
                    <select
                      name="REASON_FOR_LEAVE"
                      className="form-control"
                      value={leavesData.REASON_FOR_LEAVE}
                      onChange={(e) => handleChange(e)}
                      placeholder="Leave Reason"
                    >
                      <option disabled={true} selected={true}>
                        Reason
                      </option>
                      <option>Sick Leave</option>
                      <option>Casual Leave</option>
                      <option>Compensatory Leave</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">Leave Type</label>
                    <select
                      name="LEAVE_TYPE"
                      className="form-control"
                      value={leavesData.LEAVE_TYPE}
                      onChange={(e) => handleChange(e)}
                      placeholder="Leave Type"
                    >
                      <option disabled={true} selected={true}>
                        Leave Type
                      </option>
                      <option>full</option>
                      <option>half</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group pt-2">
                    <label>Total Days Of Request</label>
                    <input
                      type="number"
                      min="2"
                      max="50"
                      name=""
                      //   value={fields.STREAM}
                      //   onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="submit pt-8">
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Add"
                      className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Leaves
