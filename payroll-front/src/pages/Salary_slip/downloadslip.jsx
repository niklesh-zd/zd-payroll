import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



const Downloadslip = () => {
    const { id } = useParams();
    const [resdata, resdatachange] = useState({});
    const [restime, restimechange] = useState('');
    const [tsalary, Settsalary] = useState('');
    const [hra, Sethra] = useState('');
    const [ra, Setra] = useState('');
    const [flexib, Setflexib] = useState('');
    const [tgross, Settgross] = useState('');
    const [npay, Setnpay] = useState('');
    const [Npaybda, Setnpaybda] = useState('');
    const [Npayhra, Setnpayhra] = useState('');
    const [Npayra, Setnpayra] = useState('');
    const [Npfb, Setnpayfb] = useState('');
    const [totalearn, Settotalearn] = useState('');
    const [totalleave, Settotalleave] = useState('');

  //       // let tpd = resp.Total_Work_Days - leave + 1;

    useEffect(() => {
        fetch('http://192.168.29.186:7071/Emp_Salary/get-one-user/' + id)
            .then((res) => {
                return res.json()
            })
            .then((resp) => {
                console.log(resp);
                // console.log(resp.Leave_taken);
                const doj = new Date(resp.Date_of_Joining).toLocaleDateString('pt-PT');
                restimechange(doj);
                // console.log('resp', resp);
                resdatachange(resp)
                let Tsalary = resp.base_salary


                Settgross(Tsalary)
                let leave = resp.Leave_taken;
                Settotalleave(leave);
                let TWD = resp.Total_Work_Days

                const fiftyPercent = Tsalary / 2;
                Settsalary(fiftyPercent);
                const fortyPercent = fiftyPercent * 0.4;
                Sethra(fortyPercent.toFixed(2));
                const fifteenPercent = fiftyPercent * 0.15;
                Setra(fifteenPercent.toFixed(2))
                const FB = Tsalary - fiftyPercent - fortyPercent - fifteenPercent;
                Setflexib(FB.toFixed(0))

                let finalsalary = resp.base_salary
                let netp = finalsalary / TWD
                let tpd = resp.Total_Work_Days - Number(leave) + 1
                
                // let netpay = leave = 0 ? finalsalary + netp : leave = leave > 0 ? netp * tpd : '' ;
                let netpay = Number(finalsalary) + Number(netp);


    if (amount < 10) {
      return units[amount];
    }
    if (amount < 20) {
      return teens[amount - 11];
    }

    let converter = require('number-to-words');
    const fword = converter.toWords(Number(totalearn))


    if (amount < 100000) {
      return (
        `${tens[Math.floor(amount / 10000) - 1]} ${tens ? "Thousand" : ""}` +
        (amount % 10000 ? `  ${convertNumberToWords(amount % 10000)}` : "")
      );
    }
    // if (amount < 100000) {
    //     return `${tens[Math.floor(amount / 10000) - 1] } Thousand` + (amount % 10000 ? ` and ${convertNumberToWords(amount % 10000)}` : '');
    // } {amount = Number(amount) = tens[Math.floor(amount / 10000) - 1] ? }${amount < 10000 ? `thousend` : ''}
    return "its too high";
  };

  const amount = 21000;
  const fword = numword(amount);
  console.log(fword);

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={ButtonClick} href="/download">
          {
            <div
              className=""
              style={{
                border: "1px solid black",
                padding: "1%",
                width: "100%",
              }}
            >
              <div className="text-center lh-1 mb-2">
                <h3 className="fw-bold" style={{ color: "#368bb5" }}>
                  ZecData
                </h3>{" "}
                <h5 className="fw-bold text-dark">
                  Payment slip for the month of{" "}
                  {props.data.Salary_Slip_Month_Year} 2023
                </h5>
              </div>

              <div className="row text-white">
                <div className="col-md-6 border-top border-dark">
                  <div className="row" style={{ backgroundColor: "#368bb5" }}>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">Name :</span>{" "}
                        <small className="ms-3">
                          {props.data.Employee_name}
                        </small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">EMP Code :</span>{" "}
                        <small className="ms-3">
                          {props.data.Employee_code}
                        </small>{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    className="row border-top border-dark"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">Designation :</span>{" "}
                        <small className="ms-3">{props.data.designation}</small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">Ac No. :</span>{" "}
                        <small className="ms-3">
                          {props.data.Bank_Account_Number}
                        </small>{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    className="row border-top border-dark"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <div className="col-md-6 border-bottom border-dark">
                      <div>
                        {" "}
                        <span className="fw-bolder ">
                          Date Of Joining :
                        </span>{" "}
                        <small className="ms-3">{doj}</small>
                      </div>
                    </div>
                    <div className="col-md-6 border-bottom border-dark">
                      <div>
                        {" "}
                        <span className="fw-bolder">IFSC :</span>{" "}
                        <small className="ms-3">
                          {props.data.Bank_IFSC_Code}
                        </small>{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-md-6"
                  style={{ backgroundColor: "#368bb5" }}
                >
                  <div className="row border-top border-dark">
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">
                          Leave (Balance) :
                        </span>{" "}
                        <small className="ms-3">1</small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <span className="fw-bolder">
                          Total Working Days :
                        </span>{" "}
                        <small className="ms-3">
                          {Number(props.data.monthDays) - holidays}
                        </small>{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    className="row border-top border-dark"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <div className="col-md-6 ">
                      <div>
                        {" "}
                        <span className="fw-bolder">Leave Taken :</span>{" "}
                        <small className="ms-3">{showTotalLeave}</small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div>
                        {" "}
                        <span className="fw-bolder ">Present Days :</span>{" "}
                        <small className="ms-3">
                          {props.data.monthDays - holidays - showTotalLeave}
                        </small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6 border-top border-bottom border-dark ">
                      <div>
                        {" "}
                        <span className="fw-bolder">Balance Days :</span>{" "}
                        <small className="ms-3">1</small>{" "}
                      </div>
                    </div>
                    <div className="col-md-6 border-top border-bottom border-dark">
                      <div>
                        {" "}
                        <span className="fw-bolder">
                          Total Paid Days :
                        </span>{" "}
                        <small className="ms-3">
                          {props.data.monthDays - holidays - showTotalLeave + 1}
                        </small>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <table className="mt-1 table table-bordered border-dark">
                  <thead
                    className=" text-white"
                    style={{ backgroundColor: "#368bb5" }}
                  >
                    <tr>
                      <th scope="col">Gross</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Earning</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Deduction</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Basic & DA</th>
                      <td>{basicDA}</td>
                      <td>Basic & DA</td>
                      <td>{(netPay / 2).toFixed(2)}</td>
                      <td>PF</td>
                      <td>0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">HRA</th>
                      <td>{hra}</td>
                      <td>HRA</td>
                      <td>{((netPay / 2) * 0.4).toFixed(2)}</td>
                      <td>Professional tax</td>
                      <td>0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">RA</th>
                      <td>{ra}</td>
                      <td>RA</td>
                      <td>{((netPay / 2) * 0.15).toFixed(2)}</td>
                      <td>TDS</td>
                      <td>0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">FLEXI Benefits</th>
                      <td>{flexib}</td>
                      <td>FLEXI Benifits</td>
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
                    <tr>
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
                        ).toFixed(2)}
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
                    <tr>
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
              <div className="row">
                <div className="col-md-5">
                  {" "}
                  <br />{" "}
                  <span className="fw-bold">
                    Net Salary Payable(In Words)
                  </span>{" "}
                </div>
                <div className="border border-dark col-md-7">
                  <div className="d-flex flex-column">
                    <span className="text-danger">{fword} Only</span>
                    <br></br>
                    <span>
                      *This is computer generated copy not need to stamp and
                      sign*
                    </span>{" "}
                  </div>
                </div>
              </div>
              <input type="submit" value={"Print"} />
            </div>
          }
        </form>
      </div>
    </div>
  );
};

export default Downloadslip;
