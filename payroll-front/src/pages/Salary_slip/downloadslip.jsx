import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { RotatingLines } from "react-loader-spinner";
import { TiArrowBack } from "react-icons/ti";
import { MdDownload } from "react-icons/md";
import host from "../utils";

const Downloadslip = () => {
  let location = useLocation();
  const salaryYear = location.state.salaryYear;
  const salaryMonthNumber = location.state.salaryMonthNumber;
  const data = location.state.fields;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [fields, setFields] = useState({});
  var allMonthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    axios
      .post(
        `${host}/Emp_Salary/salary_?userid=${id}&year=${salaryYear}&month=${salaryMonthNumber}&arrear=${data.arrear}&additional=${data.additional}&arrear_comment=${data.arrear_comment}&additional_comment=${data.additional_comment}`
      )
      .then((response) => {
        console.log("response", response.data);
        if (response.data.success) {
          setFields(response.data.salary);
          setIsLoading(false);
          return response.data.salary;
        } else {
          setFields(response.data);
          setIsLoading(false);
          return response.data;
        }
      })
      .then((response) => {
        if (response) {
          const element = document.getElementById("pdf-download");
          html2pdf(element, {
            margin: 0,
            filename: `${response.Employee_name}_${allMonthsName[fields.Salary_Slip_Month]
              }.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 5 },
            jsPDF: { unit: "in", format: "Tabloid", orientation: "Landscape" },
          });
        }
      })
      .catch((err) => {
        console.log("Somthing Went Wrong", err);
      });
  }, []);

  const Navigate = () =>{
    navigate('/settings/salary' + id)
  }
  const Pdfdownload = () => {
    const element = document.getElementById("pdf-download");
    html2pdf(element, {
      margin: 0,
      filename: `${fields.Employee_name}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: "in", format: "Tabloid", orientation: "Landscape" },
    });
  };
  return (
    <div>
      <div className="btn float-end text-primary">
        <MdDownload onClick={Pdfdownload} size={30} />
      </div>
      <div  className="btn text-dark">
        <TiArrowBack onClick={Navigate} size={30} />
      </div>
      <div className="container">
        <div>


          <form
            className="my-2"
            id="pdf-download"
            style={{ display: "flex", justifyContent: "center" }}
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
              <div
                style={{
                  border: "1px solid black",
                  padding: "1%",
                  width: "75%",
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

                <div
                  className="row text-white"
                  style={{ backgroundColor: "#368bb5" }}
                >
                  <div className="row col-md-6">
                    <div className="row mt-1">
                      <div className="col-md-5">
                        <span className="fw-bolder">Name </span>
                      </div>
                      <div className="col-md-7">
                        <small>{fields.Employee_name}</small>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-md-5">
                        <span className="fw-bolder">Designation </span>
                      </div>
                      <div className="col-md-7">
                        <small>{fields.designation}</small>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-md-5">
                        <span className="fw-bolder ">Date of Joining</span>
                      </div>
                      <div className="col-md-7">
                        <small>
                          {fields.Date_of_Joining?.substring(0, 10)}
                        </small>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-md-5">
                        <span className="fw-bolder">Leave (Balance)</span>
                      </div>
                      <div className="col-md-7">
                        <small>{fields.Leave_balence}</small>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-5">
                        <span className="fw-bolder">Leave Taken </span>
                      </div>
                      <div className="col-md-7">
                        <small>{fields.Leave_taken}</small>
                      </div>
                    </div>
                    <div className="row mt-1 p-2">
                      <div className="col-md-5">
                        <span className="fw-bolder">Balance Days</span>
                      </div>
                      <div className="col-md-7">
                        <small>1</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="row mt-1">
                      <div className="col-md-6">
                        <span className="fw-bolder">EMP Code </span>
                      </div>
                      <div className="col-md-6">
                        <small>{fields.Employee_code}</small>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-md-6">
                        <span className="fw-bolder">Ac No. </span>
                      </div>
                      <div className="col-md-6">
                        <small>{fields.Bank_Account_Number}</small>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-md-6">
                        <span className="fw-bolder">IFSC </span>
                      </div>
                      <div className="col-md-6">
                        <small>{fields.Bank_IFSC_Code}</small>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-md-6">
                        <span className="fw-bolder">Total Working Days</span>
                      </div>
                      <div className="col-md-6">
                        <small>{fields.Total_Work_Days}</small>
                      </div>
                    </div>

                    <div className="row mt-1">
                      <div className="col-md-6">
                        <span className="fw-bolder ">Present Days</span>
                      </div>
                      <div className="col-md-6">
                        <small>{fields.Present_day}</small>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <span className="fw-bolder">Total Paid Days</span>
                      </div>
                      <div className="col-md-6">
                        <small>{fields.Total_paid_day}</small>
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
                        <td>{fields.ARRS}</td>
                      </tr>
                      <tr
                        style={{ backgroundColor: "#368bb5", color: "white" }}
                      >
                        <th scope="row">Total Gross</th>
                        <td>{fields.Gross_total}</td>
                        <td>Total Earn</td>
                        <td>{fields.Total_earn}</td>
                        <td>Additional</td>
                        <td>{fields.Additional}</td>
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
                        {fields.Net_pay_in_words} Only
                      </span>
                      <br></br>
                    </div>
                  </div>
                </div>
                <span className="col-md-12" style={{ color: "#368bb5" }}>
                  This is computer generated copy not need to stamp and sign
                </span>
              </div>

            )}
          </form>
        </div>
      </div>
    </div>
  )
}
export default Downloadslip;
