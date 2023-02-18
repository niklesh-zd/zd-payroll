import '../Css/Dashbord.css'
import { HiUserGroup } from 'react-icons/hi';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Dashboard = () => {
  const [totalEmployee, setTotalEmployee] = useState('')
  const [totalHoliday, setTotalHoliday] = useState('')
  const [monthName, setMonthName] = useState('')
  useEffect(() => {
    window
      .fetch("http://192.168.29.146:7071/emp/get_employ")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        // console.warn(resp);
        setTotalEmployee(resp.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  var marchHolidays = []
  useEffect(() => {
    window
      .fetch("http://192.168.29.146:7071/Holiday/get-holiday")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.warn('resp',resp);
        // var today = new Date().toISOString()
        // resp.map((e) => {
        //   if (e.holiday_date.includes("2023-02") && today.includes("2023-02")) {
        //     marchHolidays.push(e.holiday_date)
        //     setMonthName("February")
        //   }
        //   if (e.holiday_date.includes("2023-03") && today.includes("2023-03")) {
        //     setMonthName("March")
        //     marchHolidays.push(e.holiday_date)
        //   }
        //   if (e.holiday_date.includes("2023-04") && today.includes("2023-04")) {
        //     setMonthName("April")
        //     marchHolidays.push(e.holiday_date)
        //   }
        //   if (e.holiday_date.includes("2023-05") && today.includes("2023-05")) {
        //     setMonthName("May")
        //     marchHolidays.push(e.holiday_date)
        //   }
        //   if (e.holiday_date.includes("2023-06") && today.includes("2023-06")) {
        //     setMonthName("June")
        //     marchHolidays.push(e.holiday_date)
        //   }
        //   if (e.holiday_date.includes("2023-07") && today.includes("2023-07")) {
        //     marchHolidays.push(e.holiday_date)
        //     setMonthName("July")

        //   }
        //   if (e.holiday_date.includes("2023-08") && today.includes("2023-08")) {
        //     marchHolidays.push(e.holiday_date)
        //     setMonthName("August")

        //   }
        //   if (e.holiday_date.includes("2023-09") && today.includes("2023-09")) {
        //     marchHolidays.push(e.holiday_date)
        //     setMonthName("September")

        //   }
        //   if (e.holiday_date.includes("2023-10") && today.includes("2023-10")) {
        //     marchHolidays.push(e.holiday_date)
        //     setMonthName("October")

        //   }
        //   if (e.holiday_date.includes("2023-11") && today.includes("2023-11")) {
        //     marchHolidays.push(e.holiday_date)
        //     setMonthName("November")

        //   }
        //   if (e.holiday_date.includes("2023-12") && today.includes("2023-12")) {
        //     marchHolidays.push(e.holiday_date)
        //     setMonthName("December")

        //   }
        // })
        // setTotalHoliday(marchHolidays.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div id="root">
    <div className="container pt-5">
      <div className="row align-items-stretch">
        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap" style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <h4 className="">Total Employee</h4>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1><HiUserGroup />{totalEmployee}</h1>
            </div>
          </div>
        </div>

        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap" style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <h4 className="">{monthName} Holiday</h4>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1><BsFillEmojiLaughingFill />{totalHoliday}</h1>
            </div>
          </div>
        </div>
        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap">
            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Available funds<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">€5000</span>
          </div>
        </div>
        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap">
            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Rental return<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">6,40%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Dashboard;
