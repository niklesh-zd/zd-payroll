import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import host from "./../utils";

const Year_Leave = () => {
    let navigate = useNavigate();
    const [leavesData, setLeavesData] = useState({});
    var leavesObj = {}
    const handleChange = (e) => {
        leavesObj = { ...leavesData };
        leavesObj[e.target.name] = e.target.value;
        // if (leavesObj.from_date) {
        //     setDisableToDate(false);
        //     if (toDateInputRef.current) {
        //         const today = new Date(leavesObj.from_date).toISOString().split("T")[0];
        //         toDateInputRef.current.setAttribute("min", today);
        //     }
        // }
        setLeavesData(leavesObj);
    };

    console.log("leavesData", leavesData);

    const notify = (message) => {
        toast(message, {
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
            .post(`${host}/year/year-leave`, leavesData)
            .then((response) => {
                console.log("success", response);
                if (response.data.message == "Success ") {
                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        text: "Successfully!",
                    }).then(() => {
                        navigate("/year_leavedetails");
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
                            <h2 className="text-red-900"> Year_Leave</h2>
                        </div>

                        <div className="row">

                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label className="profile_details_text">Year_Leave</label>
                                    <select
                                        name="year"
                                        className="form-control"
                                        value={leavesData.year}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Year"
                                    >
                                        <option disabled={true} selected={true}>
                                            Year_Leave
                                        </option>
                                        <option>2023</option>
                                        <option>2024</option>
                                        <option>2025</option>
                                        <option>2026</option>
                                        <option>2027</option>
                                        <option>2028</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label className="profile_details_text">Leave Type</label>
                                    <select
                                        name="leave"
                                        className="form-control"
                                        value={leavesData.leave}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Leave"
                                    >
                                        <option disabled={true} selected={true}>
                                            Leave Day
                                        </option>
                                        <option>1</option>
                                        <option >2</option>
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

export default Year_Leave;