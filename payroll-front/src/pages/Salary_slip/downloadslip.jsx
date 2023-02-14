import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Downloadslip = () => {
    const { id } = useParams();
    const [resdata, resdatachange] = useState({});
    const [restime, restimechange] = useState('');
    const [tsalary, Settsalary] = useState('');
    const [hra, Sethra] = useState('');
    const [ra, Setra] = useState('');
    const [flexib, Setflexib] = useState('');
    const [tgross, Settgross] = useState('');
    const [Npay, Setnpay] = useState('');
    const [Npaybda, Setnpaybda] = useState('');
    const [Npayhra, Setnpayhra] = useState('');
    const [Npayra, Setnpayra] = useState('');
    const [Npfb, Setnpayfb] = useState('');
    const [totalearn, Settotalearn] = useState('');
    useEffect(() => {
        fetch('http://localhost:7071/Emp_Salary/get-one-user/' + id)
            .then((res) => {
                return res.json()
            })
            .then((resp) => {
                console.log('base_salary',resp.base_salary);

                let leave = resp.Leave_taken;
                console.log(resp);
                const doj = new Date(resp.Date_of_Joining).toLocaleDateString('pt-PT');
                let TWD = resp.Total_Work_Days
                resdatachange(resp)
                restimechange(doj)
                const Tsalary = resp.base_salary
                const fiftyPercent = Tsalary / 2;
                Settsalary(fiftyPercent);
                const fortyPercent = fiftyPercent * 0.4;
                Sethra(fortyPercent);
                const fifteenPercent = fiftyPercent * 0.15;
                Setra(fifteenPercent)
                const FB = Tsalary - fiftyPercent - fortyPercent - fifteenPercent;
                Setflexib(FB)

                const Tgross = fiftyPercent + fortyPercent + fifteenPercent + FB;
                Settgross(Tgross)
                let netp = Tgross / TWD
                let tpd = resp.Present_day + 1
                let netpay = leave = 0 ? console.log('leave-0') : leave = leave > 0 ? netp * tpd : '';
                let npaybda = netpay / 2;
                let npayhra = npaybda * 0.4;
                let npayra = npaybda * 0.15;
                let npayfb = netpay - npaybda - npayhra - npayra;
                let totalearn = npaybda + npayhra + npayra + npayfb;
                Settotalearn(totalearn.toFixed(0));
                Setnpayfb(npayfb.toFixed(0))
                Setnpayra(npayra.toFixed(0))
                Setnpayhra(npayhra.toFixed(0))
                Setnpaybda(npaybda.toFixed(0));
                Setnpay(netpay.toFixed(2));
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
    let numword = function convertNumberToWords(amount) {
        // let amount = ''
        const units = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const tens = ['Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const scales = ['Thousand', 'Lakh',];

        if (amount < 10) {
            return units[amount];
        }
        if (amount < 20) {
            return teens[amount - 11];
        }

        if (amount < 100) {
            return tens[Math.floor(amount / 10) - 1] + (amount % 10 ? ` ${convertNumberToWords(amount % 10)}` : '');
        }

        if (amount < 1000) {
            return `${units[Math.floor(amount / 100)]} Hundred` + (amount % 100 ? ` and ${convertNumberToWords(amount % 100)}` : '');
        }

        if (amount < 10000) {
            return `${units[Math.floor(amount / 1000)]} Thousand` + (amount % 1000 ? ` and ${convertNumberToWords(amount % 1000)}` : '');
        }
        if (amount < 100000) {
            return `${tens[Math.floor(amount / 10000) - 1]} Thousand` + (amount % 10000 ? ` and ${convertNumberToWords(amount % 10000)}` : '');
        }
        return 'its too high';
    }

    const amount = totalearn;
    const fword = numword(amount)


    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <form
                    onSubmit={ButtonClick}
                    href="/download"
                >
                    {(
                        <div className="" style={{border: '1px solid black', padding: '1%', width: '100%'}}>
                            <div className="text-center lh-1 mb-2">
                                <h3 className="fw-bold" style={{color: '#368bb5'}}>ZecData</h3> <h5 className="fw-bold text-dark">Payment slip for the month of {resdata.Salary_Slip_Month_Year} 2023</h5>
                            </div>
                            {/* style={{width:'57.333333%'}} */}
                            {/* style={{width: '39.5rem', marginLeft: '13px'}} */}
                            {/* <div className="d-flex justify-content-end"> <span>..................</span> </div>  */}
                            <div className="row text-white">
                                <div className="col-md-6 border-top border-dark" >
                                    <div className="row" style={{backgroundColor: '#368bb5'}}>
                                        <div className="col-md-6">
                                            <div> <span className="fw-bolder">Name :</span> <small className="ms-3">{resdata.Employee_name}</small> </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div> <span className="fw-bolder">EMP Code :</span> <small className="ms-3">{resdata.Employee_code}</small> </div>
                                        </div>
                                    </div>

                                    <div className="row border-top border-dark" style={{backgroundColor: '#368bb5'}}>
                                        <div className="col-md-6">
                                            <div> <span className="fw-bolder">Designation :</span> <span className="ms-3">{resdata.designation}</span> </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div> <span className="fw-bolder">Ac No. :</span> <small className="ms-3">{resdata.Bank_Account_Number}</small> </div>
                                        </div>
                                    </div>

                                    <div className="row border-top border-dark" style={{backgroundColor: '#368bb5'}}>
                                        <div className="col-md-6 border-bottom border-dark">
                                            <div> <span className="fw-bolder ">Date Of Joining :</span> <small className="ms-3">{restime}</small></div>
                                        </div>
                                        <div className="col-md-6 border-bottom border-dark">
                                            <div> <span className="fw-bolder">IFSC :</span> <small className="ms-3">{resdata.Bank_IFSC_Code}</small> </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6"style={{backgroundColor: '#368bb5'}}>
                                    <div className="row border-top border-dark">
                                        <div className="col-md-6">
                                            <div> <span className="fw-bolder">Leave (Balance) :</span> <small className="ms-3">1</small> </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div> <span className="fw-bolder">Total Working Days :</span> <small className="ms-3">{resdata.Total_Work_Days}</small> </div>
                                        </div>
                                    </div>

                                    <div className="row border-top border-dark" style={{backgroundColor: '#368bb5'}}>

                                        <div className="col-md-6 ">
                                            <div> <span className="fw-bolder">Leave Taken :</span> <small className="ms-3">{resdata.Leave_taken}</small> </div>
                                        </div>
                                        <div className="col-md-6 ">
                                            <div> <span className="fw-bolder ">Present Days :</span> <small className="ms-3">{resdata.Present_day}</small> </div>
                                        </div>
                                        <div className="col-md-6 border-top border-bottom border-dark ">
                                            <div> <span className="fw-bolder">Balance Days :</span> <small className="ms-3">1</small> </div>
                                        </div>
                                        <div className="col-md-6 border-top border-bottom border-dark">
                                            <div> <span className="fw-bolder">Total Paid Days :</span> <small className="ms-3">{resdata.Present_day + 1}</small> </div>
                                        </div>
                                    </div>
                                </div>
                                {/* style={{width: '98%', marginLeft: '13px',}} */}
                                <table className="mt-1 table table-bordered border-dark" >
                                    <thead className=" text-white"  style={{backgroundColor: '#368bb5'}}>
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
                                            <td>{tsalary}</td>
                                            <td>Basic & DA</td>
                                            <td>{Npaybda}</td>
                                            <td>PF</td>
                                            <td>0.00</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">HRA</th>
                                            <td>{hra}</td>
                                            <td>HRA</td>
                                            <td>{Npayhra}</td>
                                            <td>Professional tax</td>
                                            <td>0.00</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">RA</th>
                                            <td>{ra}</td>
                                            <td>RA</td>
                                            <td>{Npayra}</td>
                                            <td>TDS</td>
                                            <td>0.00</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">FLEXI Benefits</th>
                                            <td>{flexib}</td>
                                            <td>FLEXI Benifits</td>
                                            <td>{Npfb}</td>
                                            <td>ARRS:</td>
                                            <td>0.00</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total Gross</th>
                                            <td>{tgross}</td>
                                            <td>Total Earn</td>
                                            <td>{totalearn}</td>
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
                                            <td>{Npay}</td>
                                            <td></td>
                                            <td></td>
                                            <td>Total Deduction</td>
                                            <td>0</td>
                                        </tr>
                                        <tr className="border-top">
                                            <th scope="row">Total Earning</th>
                                            <td>{resdata.Total_earn}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-md-5" > <br /> <span className="fw-bold">Net Salary Payable(In Words)</span> </div>
                                <div className="border border-dark col-md-7" >
                                    <div className="d-flex flex-column" ><span className="text-danger">{fword} Only</span><br></br>
                                        <span>*This is computer generated copy not need to stamp and sign*</span> </div>
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