import React from "react";
import { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { RotatingLines } from "react-loader-spinner";
let converter = require("number-to-words");

const Downloadslip = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [hra, Sethra] = useState("");
  const [ra, Setra] = useState("");
  const [flexib, Setflexib] = useState("");
  const [basicDA, setBasicDA] = useState("");
  const [netPay, setNetPay] = useState(0);
  const [compensatoryLeaveState, setCompensatoryLeaveState] = useState(0);
  const [showTotalLeave, setShowTotalLeave] = useState("");
  const holidays = props.holidays;
  const baseSalary = props.data.base_salary;
  const doj = new Date(props.data.Date_of_Joining).toLocaleDateString("pt-PT");
  useEffect(() => {
    axios
      .post(
        `http://192.168.29.146:7071/Emp_Leave/get_User_leave?id=${props.data.userid}&from_date=${props.data.from_date}&to_date=${props.data.end_date}`
      )
      .then((res) => {
        const arr = res.data.findLeave;
        let total_leave = 0;
        let compensatoryLeave = 0;
        arr.map((e) => {
          let fromDate = new Date(e.from_date);
          let toDate = new Date(e.to_date);
          if (
            fromDate.toISOString().slice(0, 10) ==
            toDate.toISOString().slice(0, 10)
          ) {
            if (e.leave_type !== 1) {
              console.log("halfDay");
              total_leave = total_leave + 0.5;
            } else {
              total_leave = total_leave + 1;
            }
          } else {
            const diffInMs = toDate - fromDate;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
            total_leave = total_leave + diffInDays;
          }
        });
        setShowTotalLeave(total_leave);
        setBasicDA(baseSalary / 2);
        Sethra((baseSalary / 2) * 0.4);
        Setra((baseSalary / 2) * 0.15);
        Setflexib(
          baseSalary -
          baseSalary / 2 -
          (baseSalary / 2) * 0.4 -
          (baseSalary / 2) * 0.15
        );
      });
  }, []);
  useEffect(() => {
    setNetPay(
      (baseSalary / (Number(props.data.monthDays) - holidays)) *
      (props.data.monthDays - holidays - showTotalLeave + 1)
    );
  }, [showTotalLeave]);
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
  const fword = converter.toWords(netPay);

  return (
    <div>
      <button className="btn text-white ml-5 mt-2 d-flex" style={{ backgroundColor: "#368bb5", lineHeight: '19px' }} onClick={downloadPDF} disabled={isLoading}>{isLoading ? <RotatingLines
        className='text-center'
        strokeColor="black"
        strokeWidth="8"
        animationDuration="0.75"
        width="26"
        visible={true} /> : 'Download Pdf'}<FaFileDownload style={{ width: '25px' }} /></button>
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
                    {props.data.Salary_Slip_Month_Year} 2023
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
                            {props.data.Employee_name.toUpperCase()}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          
                          <span className="fw-bolder">EMP Code </span>
                          <span style={{ marginLeft: "87px" }}>{":"}</span>
                          <small
                            style={{ marginLeft: "60px" }}
                          >
                            {props.data.Employee_code}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div
                      className="row"
                      style={{ backgroundColor: "#368bb5" }}
                    >
                      <div className="col-md-6">
                        <div>
                          
                          <span className="fw-bolder">Designation </span>
                          <span style={{ marginLeft: "60px" }}>{":"}</span>
                          <small
                            style={{ marginLeft: "30px" }}
                          >
                            {props.data.designation}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                           
                          <span className="fw-bolder">Ac No. </span>
                          <span style={{ marginLeft: "115px" }}>{":"}</span>
                          <small
                            style={{ marginLeft: "40px" }}
                          >
                            {props.data.Bank_Account_Number}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div
                      className="row "
                      style={{ backgroundColor: "#368bb5" }}
                    >
                      <div className="col-md-6">
                        <div>
                          
                          <span className="fw-bolder ">
                            Date Of Joining
                          </span>
                          <span style={{ marginLeft: "32px" }}>{":"}</span>
                          <small style={{ marginLeft: "50px" }}
                          >{doj}</small>
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div>
                          
                          <span className="fw-bolder">IFSC </span>
                          <span style={{ marginLeft: "130px" }}>{":"}</span>
                          <small style={{ marginLeft: "40px" }}
                          >
                            {props.data.Bank_IFSC_Code}
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
                          
                          <span className="fw-bolder">
                            Leave (Balance)
                          </span>
                          <span style={{ marginLeft: "32px" }}>{":"}</span>
                          <small style={{ marginLeft: "80px" }}
                          >1</small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          
                          <span className="fw-bolder">
                            Total Working Days
                          </span>
                          <span style={{ marginLeft: "20px" }}>{":"}</span>
                          <small style={{ marginLeft: "70px" }}
                          >
                            {Number(props.data.monthDays) - holidays}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div
                      className="row "
                      style={{ backgroundColor: "#368bb5" }}
                    >
                      <div className="col-md-6 ">
                        <div>
                          
                          <span className="fw-bolder">Leave Taken </span>
                          <span style={{ marginLeft: "58px" }}>{":"}</span>
                          <small style={{ marginLeft: "80px" }}
                          >{showTotalLeave}</small>
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div>
                          
                          <span className="fw-bolder ">
                            Present Days
                          </span>
                          <span style={{ marginLeft: "66px" }}>{":"}</span>
                          <small style={{ marginLeft: "70px" }}
                          >
                            {props.data.monthDays - holidays - showTotalLeave}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6  ">
                        <div>
                          
                          <span className="fw-bolder">Balance Days</span>
                          <span style={{ marginLeft: "50px" }}>{":"}</span>
                          <small style={{ marginLeft: "80px" }}
                          >1</small>
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div>
                          
                          <span className="fw-bolder">
                            Total Paid Days
                          </span>
                          <span style={{ marginLeft: "50px" }}>{":"}</span>
                          <small style={{ marginLeft: "70px" }}
                          >
                            {props.data.monthDays -
                              holidays -
                              showTotalLeave +
                              1 +
                              compensatoryLeaveState}
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
                        <td>{basicDA}</td>
                        <th scope="row">Basic & DA</th>
                        <td>{(netPay / 2).toFixed(2)}</td>
                        <td>PF</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row">HRA</th>
                        <td>{hra}</td>
                        <th scope="row">HRA</th>
                        <td>{((netPay / 2) * 0.4).toFixed(2)}</td>
                        <td>Professional tax</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row">RA</th>
                        <td>{ra}</td>
                        <th scope="row">RA</th>
                        <td>{((netPay / 2) * 0.15).toFixed(2)}</td>
                        <td>TDS</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row">FLEXI Benefits</th>
                        <td>{flexib}</td>
                        <th scope="row">FLEXI Benefits</th>
                        <td>
                          {(
                            netPay -
                            (netPay / 2 +
                              (netPay / 2) * 0.4 +
                              (netPay / 2) * 0.15)
                          ).toFixed(2)}
                        </td>
                        <td>ARRS</td>
                        <td>0.00</td>
                      </tr>
                      <tr
                        style={{ backgroundColor: "#368bb5", color: "white" }}
                      >
                        <th scope="row">Total Gross</th>
                        <td>{baseSalary}</td>
                        <td>Total Earn</td>
                        <td>
                          {(
                            netPay / 2 +
                            (netPay / 2) * 0.4 +
                            (netPay / 2) * 0.15 +
                            (netPay -
                              (netPay / 2 +
                                (netPay / 2) * 0.4 +
                                (netPay / 2) * 0.15))
                          ).toFixed(0)}
                        </td>
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
                        <td>{netPay.toFixed(2)}</td>
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
                    <span className="fw-bold">
                      Net Salary Payable(In Words)
                    </span>
                  </div>
                  <div className=" col-md-7">
                    <div className="d-flex flex-column ">
                      <span className="text-danger ">
                        {fword.toLocaleUpperCase()} ONLY
                      </span>
                      <br></br>
                    </div>
                  </div>
                </div>
                <span className="col-md-12">
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
