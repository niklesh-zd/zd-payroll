import "../Css/Dashbord.css";
import { HiUserGroup } from "react-icons/hi";
import {
  BsEmojiFrownFill,
  BsFillEmojiHeartEyesFill,
  BsFillEmojiLaughingFill,
} from "react-icons/bs";
import { GiScales } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [totalEmployee, setTotalEmployee] = useState("");
  const [totalHoliday, setTotalHoliday] = useState([]);
  const [todayPresent, setTodayPresent] = useState({});
  const [monthName, setMonthName] = useState("");
  useEffect(() => {
    window
      .fetch("http://192.168.29.146:7071/emp/get_employ")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        // console.warn(resp);
        setTotalEmployee(resp.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://192.168.29.146:7071/Emp_Leave/get_day_leave")
      .then((resp) => {
        console.log("resp", resp.data);
        setTodayPresent(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  var marchHolidays = [];
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const firstDate = new Date(`${currentYear}-${currentMonth}-01`);
    const lastDate = new Date(currentYear, currentMonth, 0);
    const startDate = firstDate.toISOString().slice(0, 10);
    const endDate = lastDate.toISOString().slice(0, 10);

    const datesobject = { from_date: startDate, end_date: endDate };
    axios
      .post("http://192.168.29.146:7071/Holiday/get-fastival", datesobject)
      .then((res) => {
        console.log("resp", res.data);
        setTotalHoliday(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div id="root">
      <div className="container pt-5">
        <div className="row align-items-stretch">
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div
              className="wrap"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div>
                <h4 className="">Total Employee</h4>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>
                  <HiUserGroup />
                  {totalEmployee}
                </h1>
              </div>
            </div>
          </div>

          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div
              className="wrap"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4 className="">Festival Holidays</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>
                  {totalHoliday.length == 0 ? (
                    <BsEmojiFrownFill />
                  ) : totalHoliday.length < 3 ? (
                    <BsFillEmojiLaughingFill />
                  ) : (
                    <BsFillEmojiHeartEyesFill />
                  )}
                  {/* {totalHoliday.length} */}
                </h1>
              </div>
              <div>
                {totalHoliday.length > 0 ? (
                  totalHoliday.map((e) => {
                    return <h6>{e.holiday_name}</h6>;
                  })
                ) : (
                  <h6>No Holidays This Month</h6>
                )}
              </div>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div
              className="wrap"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4 className="">Today Presents</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>
                  <GiScales />
                </h1>
              </div>
              <h2>
                {todayPresent.present_count}/{totalEmployee}
              </h2>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div
              className="wrap"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4 className="">Today Absent</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>
                  <GiScales />
                </h1>
              </div>
              <h2>
                {todayPresent.absent_count}/{totalEmployee}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
