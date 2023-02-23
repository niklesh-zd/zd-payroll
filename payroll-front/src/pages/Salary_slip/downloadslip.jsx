import React from "react";
import { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { RotatingLines } from "react-loader-spinner";
let converter = require("number-to-words");

const Downloadslip = (props) => {
  console.log("props", props);
  const salaryYear = props.year;
  const salaryMonthNumber = props.month;

  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [fields, setFields] = useState({});
  const [hra, Sethra] = useState("");
  const [ra, Setra] = useState("");
  const [flexib, Setflexib] = useState("");
  const [basicDA, setBasicDA] = useState("");
  const [netPay, setNetPay] = useState(0);
  const [compensatoryLeaveState, setCompensatoryLeaveState] = useState(0);
  const [showTotalLeave, setShowTotalLeave] = useState("");
  const holidays = "";
  const baseSalary = "";
  const doj = "";
  // useEffect(() => {
  //   axios
  //     .post(
  //       `http://192.168.29.146:7072/Emp_Leave/get_User_leave?id=${props.data.userid}&from_date=${props.data.from_date}&to_date=${props.data.end_date}`
  //     )
  //     .then((res) => {
  //       const arr = res.data.findLeave;
  //       let total_leave = 0;
  //       let compensatoryLeave = 0;
  //       arr.map((e) => {
  //         let fromDate = new Date(e.from_date);
  //         let toDate = new Date(e.to_date);
  //         if (
  //           fromDate.toISOString().slice(0, 10) ==
  //           toDate.toISOString().slice(0, 10)
  //         ) {
  //           if (e.leave_type !== 1) {
  //             console.log("halfDay");
  //             total_leave = total_leave + 0.5;
  //           } else {
  //             total_leave = total_leave + 1;
  //           }
  //         } else {
  //           const diffInMs = toDate - fromDate;
  //           const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
  //           total_leave = total_leave + diffInDays;
  //         }
  //       });
  //       setShowTotalLeave(total_leave);
  //       setBasicDA(baseSalary / 2);
  //       Sethra((baseSalary / 2) * 0.4);
  //       Setra((baseSalary / 2) * 0.15);
  //       Setflexib(
  //         baseSalary -
  //         baseSalary / 2 -
  //         (baseSalary / 2) * 0.4 -
  //         (baseSalary / 2) * 0.15
  //       );
  //     });
  // }, []);
  // useEffect(() => {
  //   setNetPay(
  //     (baseSalary / (Number(props.data.monthDays) - holidays)) *
  //     (props.data.monthDays - holidays - showTotalLeave + 1)
  //   );
  // }, [showTotalLeave]);
  const downloadPDF = async () => {
    setIsLoading(true);
    const element = document.getElementById("pdf-download");
    await html2pdf(element, {
      margin: 0,
      filename: "ZecData_Technology.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: "in", format: "Tabloid", orientation: "Landscape" },
    });
    setIsLoading(false);
  };
  useEffect(() => {
    axios
      .post(
        `http://localhost:7071/Emp_Salary/salary_?userid=${id}&year=${salaryYear}&month=${salaryMonthNumber}`
      )
      .then((response) => {
        console.log("response", response.data.salary);
        setFields(response.data.salary);
      })
      .then(() => {
        // console.log("fields", fields);
      });
  }, []);

  return (
    <div>
      <button
        className="btn text-white ml-5 mt-2 d-flex"
        style={{ backgroundColor: "#368bb5", lineHeight: "19px" }}
        onClick={downloadPDF}
        disabled={isLoading}
      >
        {isLoading ? (
          <RotatingLines
            className="text-center"
            strokeColor="black"
            strokeWidth="8"
            animationDuration="0.75"
            width="26"
            visible={true}
          />
        ) : (
          "Download Pdf"
        )}
        <FaFileDownload style={{ width: "25px" }} />
      </button>
      <div className="container">
        <div>
          <form className="mt-5" id="pdf-download">
            {
              <div
                style={{
                  border: "1px solid black",
                  padding: "1%",
                  width: "60%",
                  marginLeft: "19%",
                }}
              >
                <div className="text-center lh-1 mb-2">
                  <h3 className="fw-bold" style={{ color: "#368bb5" }}>
                    ZecData
                  </h3>
                  <h5 className="fw-bold text-dark">
                    Payment slip for the month of
                    {fields.Salary_Slip_Month} {fields.Salary_Slip_Year}
                  </h5>
                </div>

                <div className="row text-white">
                  <div className="col-md-12  ">
                    <div className="row" style={{ backgroundColor: "#368bb5" }}>
                      <div className="col-md-6">
                        <div>
                          <span className="fw-bolder">Name </span>
                          <span style={{ marginLeft: "110px" }}>{":"}</span>
                          <small
                            // className="ms-3"
                            style={{ marginLeft: "63px" }}
                          >
                            {fields.Employee_name}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <span className="fw-bolder">EMP Code </span>
                          <span style={{ marginLeft: "87px" }}>{":"}</span>
                          <small style={{ marginLeft: "60px" }}>
                            {fields.Employee_code}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div
                      className="row p-2"
                      style={{ backgroundColor: "#368bb5" }}
                    >
                      <div className="col-md-6">
                        <div>
                          <span className="fw-bolder">Designation </span>
                          <span style={{ marginLeft: "55px" }}>{":"}</span>
                          <small style={{ marginLeft: "10px" }}>
                            {fields.designation}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <span className="fw-bolder">Ac No. </span>
                          <span style={{ marginLeft: "115px" }}>{":"}</span>
                          <small style={{ marginLeft: "40px" }}>
                            {fields.Bank_Account_Number}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div
                      className="row p-2"
                      style={{ backgroundColor: "#368bb5" }}
                    >
                      <div className="col-md-6">
                        <div>
                          <span className="fw-bolder ">Date of Joining</span>
                          <span style={{ marginLeft: "32px" }}>{":"}</span>
                          <small style={{ marginLeft: "50px" }}>
                            {fields.Date_of_Joining.substring(0, 10)}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div>
                          <span className="fw-bolder">IFSC </span>
                          <span style={{ marginLeft: "130px" }}>{":"}</span>
                          <small style={{ marginLeft: "40px" }}>
                            {fields.Bank_IFSC_Code}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-12"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <span className="fw-bolder">Leave (Balance)</span>
                          <span style={{ marginLeft: "40px" }}>{":"}</span>
                          <small style={{ marginLeft: "80px" }}>
                            {fields.Leave_balence}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <span className="lder">Total Working Days</span>
                          <span style={{ marginLeft: "20px" }}>{":"}</span>
                          <small style={{ marginLeft: "70px" }}>
                            {fields.Total_Work_Days}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div
                      className="row p-2"
                      style={{ backgroundColor: "#368bb5" }}
                    >
                      <div className="col-md-6 ">
                        <div>
                          <span className="fw-bolder">Leave Taken </span>
                          <span style={{ marginLeft: "55px" }}>{":"}</span>
                          <small style={{ marginLeft: "80px" }}>
                            {fields.Leave_taken}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div>
                          <span className="fw-bolder ">Present Days</span>
                          <span style={{ marginLeft: "66px" }}>{":"}</span>
                          <small style={{ marginLeft: "70px" }}>
                            {fields.Present_day}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6  ">
                        <div>
                          <span className="fw-bolder">Balance Days</span>
                          <span style={{ marginLeft: "50px" }}>{":"}</span>
                          <small style={{ marginLeft: "80px" }}>1</small>
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div>
                          <span className="fw-bolder">Total Paid Days</span>
                          <span style={{ marginLeft: "50px" }}>{":"}</span>
                          <small style={{ marginLeft: "70px" }}>
                            {fields.Total_paid_day}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="row">
                  <table className="mt-1 table table-bordered border-dark">
                    <thead>
                      <tr>
                        <th scope="col">Gross</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Earning</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Deduction</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "#19536f" }}>
                      <tr>
                        <th scope="row">Basic & DA</th>
                        <td>{fields.Gross_Basic_DA}</td>
                        <th scope="row">Basic & DA</th>
                        <td>{fields.Earned_Basic_DA}</td>
                        <td>PF</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row">HRA</th>
                        <td>{fields.Gross_HRA}</td>
                        <th scope="row">HRA</th>
                        <td>{fields.Earned_HRA}</td>
                        <td>Professional tax</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row">RA</th>
                        <td>{fields.Gross_RA}</td>
                        <th scope="row">RA</th>
                        <td>{fields.Earned_RA}</td>
                        <td>TDS</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row">FLEXI Benefits</th>
                        <td>{fields.Gross_Flext_benefits}</td>
                        <th scope="row">FLEXI Benefits</th>
                        <td>{fields.Earned_Flext_benefits}</td>
                        <td>ARRS</td>
                        <td>0.00</td>
                      </tr>
                      <tr
                        style={{ backgroundColor: "#368bb5", color: "white" }}
                      >
                        <th scope="row">Total Gross</th>
                        <td>{fields.Gross_total}</td>
                        <td>Total Earn</td>
                        <td>{fields.Total_earn}</td>
                        <td>Additional</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr
                        style={{ backgroundColor: "#368bb5", color: "white" }}
                      >
                        <th scope="row">Net Pay</th>
                        <td>{fields.Net_pay_in_number}</td>
                        <td></td>
                        <td></td>
                        <td>Total Deduction</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row border border-dark">
                  <div className="col-md-5 ">
                    <span style={{ color: "#368bb5", fontWeight: "bold" }}>
                      Net Salary Payable(In Words)
                    </span>
                  </div>
                  <div className=" col-md-7">
                    <div className="d-flex flex-column ">
                      <span style={{ color: "#368bb5", fontWeight: "bold" }}>
                        {fields.Net_pay_in_words} ONLY
                      </span>
                      <br></br>
                    </div>
                  </div>
                </div>
                <span className="col-md-12" style={{ color: "#368bb5" }}>
                  This is computer generated copy not need to stamp and sign
                </span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default Downloadslip;
