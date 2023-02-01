import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
  const { id } = useParams();

  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://192.168.29.37:7071/emp/emp_1/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log('r================esp',resp);
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  
  return (
    <div className="container ml-12">
        <div className="card ml-12" style={{ "textAlign": "left" }}>
          <div className="card-title">
            <h2>Employee Create</h2>
          </div>
          {empdata && (
            <div>
              <h5>
                Name :- <b>{empdata.name}</b>
              </h5>
              {/* ({empdata.empid}) */}
              <h3>Contact Details</h3>
              {/* <h5>FatherName :{empdata.fatherName}</h5> */}
              <h5>Email : {empdata.email}</h5>
              <h5>Phone : {empdata.phone}</h5>
              {/* <h5>Address : {empdata.address}</h5>
              <h5>Address : {empdata.emp_id}</h5> */}
              <Link className="btn btn-danger" to="/">
                Back
              </Link>
            </div>
          )}        
        </div>
        </div>
  );
};

export default EmpDetail;
