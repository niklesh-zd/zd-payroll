import React from "react";

function Salary() {
  const handleChange = () => {};
  const handlesubmit = () => {};
  return (
    <div>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card p-10">
              <div className="card-title" style={{ textAlign: "center" }}>
                <h2 className="text-red-900">Generate Salary Receipt</h2>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Employee_name"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Employee Code</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Employee_code"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Designation</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="designation"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Salary Slip Month</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Salary_Slip_Month_Year"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>DOJ</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Date_of_Joining"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Pan Number</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Employee_PAN"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Aadhar Number</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Employee_Adhar"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Account Number</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Bank_Account_Number"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Bank_IFSC_Code"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Leave taken</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Leave_taken"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Total Work Days</label>
                    <input
                      type="number"
                      min="2"
                      max="50"
                      name="Total_Work_Days"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Number Of Leaves</label>
                    <input
                      type="text"
                      min="2"
                      max="50"
                      name="Number_of_Leaves"
                      // value={leavesData.date}
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="submit pt-8">
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Generate"
                      className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Salary;
