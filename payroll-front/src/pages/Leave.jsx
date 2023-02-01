import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddEmployee = () => {

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);


    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { name, email, phone, active, id};
        fetch("http://192.168.29.37:7071/emp/post_some_data",{
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert('Saved successfully.')
            console.log({res},"==============babu");
            navigate('/settings/manageprofile')
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                {/* row justify-content-center pt-6 */}
                                <h2 className="text-red-900"> Apply Leave</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>User</label>
                                            <select value="Radish">
                                            <option value="Orange">User 1</option>
                                            <option value="Radish">User 2</option>
                                            <option value="Cherry">User 3</option>
                                          </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <label>Leave Type 1</label>
                                            <select value="Radish">
                                            <option value="Orange">User 1</option>
                                            <option value="Radish">User 2</option>
                                            <option value="Cherry">User 3</option>
                                          </select>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <label>Leave Type 2</label>
                                            <select value="Radish">
                                            <option value="Orange">User 1</option>
                                            <option value="Radish">User 2</option>
                                            <option value="Cherry">User 3</option>
                                          </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input required type="date" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                    <button className="btn btn-primary">Add</button>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                                <button className="btn btn-primary" type="submit">Submit</button>
                                                <Link to="/settings/manageprofile" className="btn btn-primary">Back</Link>
                                            </div>
                                        </div>
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

export default AddEmployee;