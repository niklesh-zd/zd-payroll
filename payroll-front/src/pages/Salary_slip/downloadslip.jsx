import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Downloadslip = () => {
    const { id } = useParams();
    const [empdata, empdatachange] = useState({});
    const [resdata, resdatachange] = useState({});

    useEffect(() => {
        fetch('http://localhost:7071/Emp_Salary/get-one-user/' + id)
            .then((res) => {
                return res.json()
            })
            .then((resp) => {
                empdatachange(resp)
                resdatachange(resp)
                console.log('r===============78=esp', resp)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [])
    //   console.log('emp---jo mange wo ---sdata', empdata);
    const ButtonClick = () => {
        window.print();
        fetch('/download.pdf').then(response => {
            response.blob().then(blob => {
                let alink = document.createElement('a');
                // alink.href = fileURL;
                alink.click();
            })
        })
    }
// let ondate = 
// const today = resdata.Date_of_Joining.toLocaleDateString('pt-PT')
// console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today));
// console.log(today,'-0-0-0');
// let todate = ondate.getFullYear()
// console.log(todate,'ondate');

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <form
                    onSubmit={ButtonClick}
                    href="/download"
                >

                        {empdata && (
                            <div className="col-md-12">
                                <div className="text-center lh-1 mb-2">
                                    <h6 className="fw-bold">Payslip</h6> <span className="fw-normal">Payment slip for the month of {resdata.Salary_Slip_Month_Year} 2023</span>
                                </div>
                                <div className="d-flex justify-content-end"> <span>..................</span> </div>
                                <div className="row">
                                    <div className="col-md-6">

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Name</span> <small className="ms-3">{resdata.Employee_name}</small> </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">EMP Code</span> <small className="ms-3">{resdata.Employee_code}</small> </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Designation</span> <small className="ms-3">{resdata.designation}</small> </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Ac No.</span> <small className="ms-3">{resdata.Bank_Account_Number}</small> </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Date Of Joining</span> <small className="ms-3">{resdata.Date_of_Joining}</small></div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">IFSC</span> <small className="ms-3">{resdata.Bank_IFSC_Code}</small> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Leave (Balance)</span> <small className="ms-3">1</small> </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Total Working Days</span> <small className="ms-3">{resdata.Total_Work_Days}</small> </div>
                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Leave Taken</span> <small className="ms-3">{resdata.Leave_taken}</small> </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Present Days</span> <small className="ms-3">{resdata.Present_day + 1}</small> </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Balance Days</span> <small className="ms-3">1</small> </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Total Paid Days</span> <small className="ms-3">{ }</small> </div>
                                            </div>
                                        </div>

                                    </div>
                                    <table className="mt-4 table table-bordered">
                                        <thead className="bg-dark text-white">
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
                                                <td>16250.00</td>
                                                <td>Basic & DA</td>
                                                <td>1800.00</td>
                                                <td>PF</td>
                                                <td>1800.00</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">HRA</th>
                                                <td>550.00</td>
                                                <td>HRA</td>
                                                <td>142.00</td>
                                                <td>Professional tax</td>
                                                <td>142.00</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">RA</th>
                                                <td>1650.00 </td>
                                                <td>RA</td>
                                                <td>0.00</td>
                                                <td>TDS</td>
                                                <td>0.00</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">FLEXI Benefits</th>
                                                <td>120.00 </td>
                                                <td>FLEXI Benifits</td>
                                                <td>0.00</td>
                                                <td>ARRS:</td>
                                                <td>0.00</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total Gross</th>
                                                <td>0.00 </td>
                                                <td>Total Earn</td>
                                                <td>0.00</td>
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
                                                <td>3000.00</td>
                                                <td></td>
                                                <td></td>
                                                <td>Total Deduction</td>
                                                <td>0</td>
                                            </tr>

                                            <tr className="border-top">
                                                <th scope="row">Total Earning</th>
                                                <td>{resdata.Total_earn}</td>
                                                <td>Total Deductions</td>
                                                <td>2442.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-md-4"> <br /> <span className="fw-bold">Net Salary Payable (In Words)</span> </div>
                                    <div className="border col-md-8">
                                        <div className="d-flex flex-column"><span>Twenty Five thousand nine hundred seventy only</span><br></br>
                                            <span>*This is computer generated copy not need of stamp and sign*</span> </div>
                                    </div>

                                </div>
                                <input
                                    type="submit"
                                    value={'Print'}
                                />
                            </div>
                        )}
                </form>
            </div>
        </div>
    )
}

export default Downloadslip;