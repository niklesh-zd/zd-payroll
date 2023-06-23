import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { RotatingLines } from "react-loader-spinner";
import { TiArrowBack } from "react-icons/ti";
import { MdDownload } from "react-icons/md";
import host from "../utils";

const Downloadslip = () => {
  let location = useLocation();
  const salaryYear = Number(location.state.salaryYear);
  const salaryMonthNumber = Number(location.state.salaryMonthNumber);
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
        `${host}/Emp_Salary/salary_?userid=${id}&year=${salaryYear}&month=${salaryMonthNumber}`,
        data
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
          console.log("reponse", response);
          const element = document.getElementById("pdf-download");
          html2pdf(element, {
            margin: 0,
            filename: `${response.Employee_name}_${allMonthsName[response.Salary_Slip_Month - 1]
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

  console.log('fields', fields);
  const Pdfdownload = () => {
    const element = document.getElementById("pdf-download");
    html2pdf(element, {
      margin: 0,
      filename: `${fields.Employee_name}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "Tabloid", orientation: "Landscape" },
    });
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    let newDate = `${day}-${month}-${year}`;
    return newDate;
  };

  return (
    <div>
      <div className="btn float-end text-primary">
        <MdDownload onClick={Pdfdownload} size={30} />
      </div>
      <TiArrowBack onClick={() => { navigate("/employee/manageprofile") }} size={30} />
      <div
        className="d-flex mt-1 container"
        id="pdf-download"
        style={{ justifyContent: "center" }}
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
              width: "70%",
              height: '39.5rem',
              fontFamily: 'Cambria, Georgia, serif',
            }}
          >
            <div className="text-center">
              <h3 className="fw-bold" style={{ color: "rgb(18 61 162)", borderBottom: "1px solid black", paddingBottom: '8px', display: 'grid', gap: '2px' }}>
                ZECDATA <br />
                <small style={{fontSize: '14px'}}>INDORE(MP)</small>
              </h3>
              <h5 className="fw-bold h-8" style={{ color: "rgb(18 61 162)", marginTop: '-10px' }}>
                Payment Slip For The Month Of
                {" " + allMonthsName[fields.Salary_Slip_Month - 1]} {fields.Salary_Slip_Year}
              </h5>
            </div>
            <div
              className="text-white d-flex h-40"
              style={{ backgroundColor: "#4c71c8" }}
            >
              <div className="col-md-6">
                <div className=" h-20">
                  <div className="d-flex ml-5">
                    <div className="col-md-5">
                      <span className="fw-bolder">Name </span>
                    </div>
                    <div className="col-1">
                      <span className="fw-bolder"> : </span>
                    </div>
                    <div className="col-md-7">
                      <h6 className="fw-bolder">{fields.Employee_name.toUpperCase()}</h6>
                    </div>
                  </div>
                  <div className="d-flex ml-5">
                    <div className="col-md-5">
                      <span className="fw-bolder">Designation </span>
                    </div>
                    <div className="col-1">
                      <span className="fw-bolder"> : </span>
                    </div>
                    <div className="col-md-7">
                      <h6 className="fw-bolder">{fields.designation}</h6>
                    </div>
                  </div>
                  <div className="d-flex ml-5">
                    <div className="col-md-5">
                      <span className="fw-bolder ">Date of Joining</span>
                    </div>
                    <div className="col-1">
                      <span className="fw-bolder"> : </span>
                    </div>
                    <div className="col-md-5">
                      <span className="fw-bolder">
                        {formatDate(fields.Date_of_Joining?.substring(0, 10))}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex ml-5">
                  <div className="col-md-5">
                    <span className="fw-bolder">Leave (Balance)</span>
                  </div>
                  <div className="col-1">
                    <span className="fw-bolder"> : </span>
                  </div>
                  <div className="col-md-5">
                    <span className="fw-bolder">{fields.Leave_balence}</span>
                  </div>
                </div>
                <div className="d-flex ml-5">
                  <div className="col-md-5">
                    <span className="fw-bolder">Leave Taken </span>
                  </div>
                  <div className="col-1">
                    <span className="fw-bolder"> : </span>
                  </div>
                  <div className="col-md-5">
                    <span className="fw-bolder">{fields.Leave_taken}</span>
                  </div>
                </div>
                <div className="d-flex ml-5">
                  <div className="col-md-5">
                    <span className="fw-bolder">Balance Days</span>
                  </div>
                  <div className="col-1">
                    <span className="fw-bolder"> : </span>
                  </div>
                  <div className="col-md-5">
                    <span className="fw-bolder">{fields.Balence_days}</span>
                  </div>
                </div>
              </div>

              <div className="col-md-6">

                <div className=" h-20">
                  <div className="d-flex ml-5">
                    <div className="col-md-6">
                      <span className="fw-bolder">Employee Code. </span>
                    </div>
                    <div className="col-1">
                      <span className="fw-bolder"> : </span>
                    </div>
                    <div className="col-md-6">
                      <small className="fw-bolder">{fields.Employee_code}</small>
                    </div>
                  </div>
                  <div className="d-flex ml-5">
                    <div className="col-md-6">
                      <span className="fw-bolder">Bank A/c No. </span>
                    </div>
                    <div className="col-1">
                      <span className="fw-bolder"> : </span>
                    </div>
                    <div className="col-md-6">
                      <sapn className="fw-bolder">{fields.Bank_Account_Number}</sapn>
                    </div>
                  </div>
                  <div className="d-flex ml-5">
                    <div className="col-md-6">
                      <span className="fw-bolder">IFSC </span>
                    </div>
                    <div className="col-1">
                      <span className="fw-bolder"> : </span>
                    </div>
                    <div className="col-md-6">
                      <sapn className="fw-bolder">{fields.Bank_IFSC_Code}</sapn>
                    </div>
                  </div>
                </div>

                <div className="d-flex ml-5">
                  <div className="col-md-6">
                    <span className="fw-bolder">Total Working Days</span>
                  </div>
                  <div className="col-1">
                    <span className="fw-bolder"> : </span>
                  </div>
                  <div className="col-md-6 fw-bolder">
                    <small>{fields.Total_Work_Days}</small>
                  </div>
                </div>
                <div className="d-flex ml-5">
                  <div className="col-md-6">
                    <span className="fw-bolder ">Present Days</span>
                  </div>
                  <div className="col-1">
                    <span className="fw-bolder"> : </span>
                  </div>
                  <div className="col-md-6 fw-bolder">
                    <small>{fields.Present_day}</small>
                  </div>
                </div>
                <div className="d-flex ml-5">
                  <div className="col-md-6">
                    <span className="fw-bolder">Total Paid Days</span>
                  </div>
                  <div className="col-1">
                    <span className="fw-bolder"> : </span>
                  </div>
                  <div className="col-md-6 fw-bolder">
                    <small>{fields.Total_paid_day}</small>
                  </div>
                </div>
              </div>

            </div>

            <table className="table table-bordered  border-dark m-0" style={{ borderLeft: 'hidden', borderRight: 'hidden' }}>
              <thead>
                <tr style={{ color: "#19536f" }}>
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
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Gross_Basic_DA}</td>
                  <th scope="row">Basic & DA</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Earned_Basic_DA}</td>
                  <td className="fw-bolder">PF</td>
                  <td className="fw-bolder fs-6 float-right border-0">0</td>
                </tr>
                <tr>
                  <th scope="row">HRA</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Gross_HRA}</td>
                  <th scope="row">HRA</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Earned_HRA}</td>
                  <td className="fw-bolder">Professional tax</td>
                  <td className="fw-bolder fs-6 float-right border-0">0</td>
                </tr>
                <tr>
                  <th scope="row">RA</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Gross_RA}</td>
                  <th scope="row">RA</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Earned_RA}</td>
                  <td className="fw-bolder">TDS</td>
                  <td className="fw-bolder fs-6 float-right border-0">0</td>
                </tr>
                <tr>
                  <th scope="row">FLEXI Benefits</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Gross_Flext_benefits}</td>
                  <th scope="row">FLEXI Benefits</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Earned_Flext_benefits}</td>
                  <td className="fw-bolder">ARRS</td>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.ARRS}</td>
                </tr>
                <tr
                  style={{ backgroundColor: "#4c71c8", color: "white" }}
                >
                  <th scope="row">Total Gross</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Gross_total}</td>
                  <th>Total Earn</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Total_earn}</td>
                  <th>Additional</th>
                  <td className="fw-bolder fs-6 float-right border-0">{fields.Additional}</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr
                  style={{ backgroundColor: "#4c71c8", color: "white" }}
                >
                  <th scope="row">Net Pay</th>
                  <td className="fw-bolder fs-6 float-right border-0">&#8377;{fields.Net_pay_in_number}</td>
                  <td></td>
                  <td></td>
                  <th>Total Deduction</th>
                  <td className="fw-bolder fs-6 float-right border-0">0</td>
                </tr>
              </tbody>
            </table>
            <div className="border-bottom border-dark d-flex " style={{ borderLeft: 'hidden', borderRight: 'hidden' }}>
              
              <div className="col-md-4">
              <div className="d-flex fw-bolder">
                <small style={{ color: "rgb(18 61 162)", fontWeight: "bold" }} >
                  Net Salary Payable(In Words)
                </small>
                </div>
              </div>

              <div className="border-start border-dark" style={{ marginLeft: '-2px' }}></div>
              <div className=" col-md-8">

                <div className="d-flex ml-1 fw-bolder">
                  <small style={{ color: "rgb(18 61 162)", fontWeight: "bold" }}>
                    {fields.Net_pay_in_words.toUpperCase()} ONLY
                  </small>
                  <br></br>
                </div>

              </div>

            </div>
            <span className="col-md-12 fw-bolder" style={{ color: "rgb(18 61 162)" }}>
              *This is computer generated copy not need to stamp and sign
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
export default Downloadslip;