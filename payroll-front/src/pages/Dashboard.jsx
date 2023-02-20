import "../Css/Dashbord.css";
import { HiUserGroup } from "react-icons/hi";
import { BsEmojiFrownFill, BsFillEmojiHeartEyesFill, BsFillEmojiLaughingFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const [totalEmployee, setTotalEmployee] = useState("");
  const [totalHoliday, setTotalHoliday] = useState([]);
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
  var marchHolidays = [];
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const firstDate = new Date(`${currentYear}-${currentMonth}-01`);
    const startDate = firstDate.toISOString().slice(0, 10);
    const lastDate = new Date(currentYear, currentMonth, 0);
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
              <div>
                <h4 className="">Festival Holidays</h4>
                {
                  totalHoliday.length > 0 ?
                  totalHoliday.map((e) => {
                  return <span>{e.holiday_name}</span>;
                })
                :
                <span>No Holidays</span>
                }
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>
                  {totalHoliday.length == 0 ? (
                    <BsEmojiFrownFill />
                  ) : totalHoliday.length < 3 ? (
                    <BsFillEmojiLaughingFill />
                  ) : (
                    <BsFillEmojiHeartEyesFill />
                  )}
                  {totalHoliday.length}
                </h1>
              </div>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Available funds
                <svg
                  className="MuiSvgIcon-root-19"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                €5000
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Rental return
                <svg
                  className="MuiSvgIcon-root-19"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                6,40%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
