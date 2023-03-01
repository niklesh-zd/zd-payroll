import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBackCircle } from "react-icons/io5";
import host from "./../utils"
const Leaves = () => {
  let navigate = useNavigate();
  const toDateInputRef = useRef(null);
  const [leavesData, setLeavesData] = useState({});
  const [users, setUsers] = useState([]);
  const [disableToDate, setDisableToDate] = useState(true);


  const handleChange = (e) => {
    let leavesObj = { ...leavesData };
    leavesObj[e.target.name] = e.target.value;
    console.log("leave", leavesObj);
    if (leavesObj.from_date) {
      setDisableToDate(false);
      if (toDateInputRef.current) {
        const today = new Date(leavesObj.from_date).toISOString().split("T")[0];
        toDateInputRef.current.setAttribute("min", today);
      }
    }
    setLeavesData(leavesObj);
  };
  console.log("leavesData", leavesData);

  useEffect(() => {
    window
      .fetch(`${host}/emp/get_employ`)
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

  const notify = (message) => {
    toast("Leave already Taken On This Date!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("0000");
    axios
      .post(`${host}/Emp_Leave/leave`, leavesData)
      .then((response) => {
        console.log("success", response.data.success);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Successful",
            text: "Leave Added Successfully!",
          }).then(() => {
            navigate("/settings/leavedetails");
          });
        } else {
          notify(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };




  return (
    <div>
      <div className="offset-lg-2 col-lg-8">
        <ToastContainer />
        <form className="container" onSubmit={handlesubmit}>
          <div className="card m-5 p-3">
            <Link to="/settings/leavedetails">
              <TiArrowBack size={25} />
            </Link>
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
                    ref={toDateInputRef}
                    disabled={disableToDate}
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
