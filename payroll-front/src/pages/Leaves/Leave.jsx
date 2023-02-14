import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Leaves = () => {
  let navigate = useNavigate();
  const [leavesData, setLeavesData] = useState({});
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    let leavesObj = { ...leavesData };
    leavesObj[e.target.name] = e.target.value;
    setLeavesData(leavesObj);
  };
  console.log("leavesData", leavesData);
  useEffect(() => {
    window
      .fetch("http://localhost:7071/emp/get_employ")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log("res", resp);
        setUsers(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("0000");
    axios
      .post("http://localhost:7071/Emp_Leave/leave", leavesData)
      .then((response) => {
        console.log("success", response);
      })
      .then(() => {
        navigate("/settings/leavedetails");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
        <div className="offset-lg-2 col-lg-8">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card p-10">
              <div className="card-title" style={{ textAlign: "center" }}>
                <h2 className="text-red-900">Apply Leave</h2>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">
                      Select Employee Name
                    </label>
                    <select
                      name="userid"
                      className="form-control"
                      value={leavesData.userid}
                      placeholder="Select Employee"
                      onChange={(e) => handleChange(e)}
                    >
                      <option disabled={true} selected={true}>
                        select Employee
                      </option>
                      {users.map((u) => {
                        return (
                          <option value={u._id} key={u._id}>
                            {u.First_Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>From Date</label>
                    <input
                      type="date"
                      name="from_date"
                      value={leavesData.from_date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>To Date</label>
                    <input
                      type="date"
                      name="to_date"
                      value={leavesData.to_date}
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
                      name="reason_for_leave"
                      className="form-control"
                      value={leavesData.reason_for_leave}
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
                      name="leave_type"
                      className="form-control"
                      value={leavesData.leave_type}
                      onChange={(e) => handleChange(e)}
                      placeholder="Leave Type"
                    >
                      <option disabled={true} selected={true}>
                        Leave Type
                      </option>
                      <option value="full">Full Day</option>
                      <option value="half">Half Day</option>
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
  );
};

export default Leaves;
