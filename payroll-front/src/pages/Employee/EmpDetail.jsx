import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
const EmpDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [empdata, empdatachange] = useState({})

  const LoadEdit = () => {
    navigate('/settings/EmpEdit' + id)
  }
  const leaveNavigate = () => {
    navigate('/settings/leave')
  }
  useEffect(() => {
    fetch('http://localhost:7071/emp/emp_1/' + id)
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        console.log('r================esp', resp)
        empdatachange(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  const Removefunction = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        window
          .fetch('http://localhost:7071/emp/delete_emp/' + id, {
            method: 'POST',
          })
          .then((res) => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            .then(()=>{navigate('/settings/manageprofile')})
          })
          .catch((err) => {
            console.log(err.message)
          })
      }
    })
  }
  return (
    <div className="">
      <div className="card pt-3 pb-3 pl-10 pr-10">
        <div
          className="card-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex">
            <h3>Employee Details</h3>
          </div>
          <div className="flex">
            <button
              className="btn btn-sm btn-primary mr-2"
              onClick={() => LoadEdit()}
            >
              Update Details
            </button>
            <button
              className="btn btn-sm btn-primary mr-2"
              onClick={() => leaveNavigate()}
            >
              Apply Leave
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => Removefunction()}
            >
              Delete Employee
            </button>
          </div>
        </div>
        {empdata && (
          <div className="">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h5>Personal Details</h5>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Employee Code</h6>
                  <p>{empdata.Employee_Code}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Name</h6>
                  <p>{empdata.First_Name + ' ' + empdata.Last_Name}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Position</h6>
                  <p>{empdata.Position}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Email Address</h6>
                  <p>{empdata.email}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Father's Name</h6>
                  <p>{empdata.fatherName}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Date Of Birth</h6>
                  <p>{new Date(empdata.date_of_birth).toLocaleDateString('pt-PT')}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Gender</h6>
                  <p>{empdata.gender}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Blood Group</h6>
                  <p>{empdata.Blood_Group}</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h5>Educational Details</h5>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Degree</h6>
                  <p>{empdata.DEGREE}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Stream</h6>
                  <p>{empdata.STREAM}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Passed/Appearing</h6>
                  <p>{empdata.PASSED}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Year Of Passing</h6>
                  <p>{empdata.YEAR_OF_PASSING}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Date Of Joinig</h6>
                  <p>{new Date(empdata.date_of_joining).toLocaleDateString('pt-PT')}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Merital Status</h6>
                  <p>{empdata.Marital_Status}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Nationality</h6>
                  <p>{empdata.Nationality}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h5>Bank Details</h5>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Adhar Number</h6>
                  <p>{empdata.ADHAR}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Pan Number</h6>
                  <p>{empdata.PAN_No}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Bank Number</h6>
                  <p>{empdata.Bank_No}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Bank IFSC</h6>
                  <p>{empdata.Bank_IFSC}</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <h5>Contact Details</h5>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Contact</h6>
                  <p>{empdata.Contact_Number}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Alternate Contact</h6>
                  <p>{empdata.Alternate_Contact_number}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Home Contact</h6>
                  <p>{empdata.Contact_Number_Home}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>State</h6>
                  <p>Mp</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>City</h6>
                  <p>Khategaon</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Current Address</h6>
                  <p>{empdata.Current_Address}</p>
                </div>
                <div
                  className="flex"
                  style={{ width: '70%', justifyContent: 'space-between' }}
                >
                  <h6>Permanent Address</h6>
                  <p>{empdata.Permanent_Address}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmpDetail
