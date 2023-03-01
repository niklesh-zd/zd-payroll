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
import host from "./utils";
const Dashboard = () => {
  const navigate = useNavigate();
  const [totalEmployee, setTotalEmployee] = useState("");
  const [totalHoliday, setTotalHoliday] = useState([]);
  const [todayPresent, setTodayPresent] = useState({});
  const [yesterdayPresent, setYesterdayPresent] = useState({});
  const [monthName, setMonthName] = useState("");
  useEffect(() => {
    window
      .fetch(`${host}/emp/get_employ`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setTotalEmployee(resp.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${host}/Emp_Leave/get_today_leave`)
      .then((resp) => {
        // console.log("today", resp.data);
        setTodayPresent(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  useEffect(() => {
    axios
      .get(`${host}/Emp_Leave/get_yesterday_leave`)
      .then((resp) => {
        // console.log("yesterday", resp.data);
        setYesterdayPresent(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
      .post(`${host}/Holiday/get-fastival`, datesobject)
      .then((res) => {
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
          <a className="c-dashboardInfo col-lg-3 col-md-6 text-black text-decoration-none"  href="/settings/manageprofile">
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
          </a>

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
              <h4 className="">Yesterday Absents</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>
                  <GiScales />
                </h1>
              </div>
              <h2>
                {yesterdayPresent.absent_count}/{totalEmployee}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
