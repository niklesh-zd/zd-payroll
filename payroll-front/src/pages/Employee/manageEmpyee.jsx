import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ManageEmpyee = () => {
  const { id } = useParams()

  const [empdata, empdatachange] = useState(null)
  const navigate = useNavigate()

  const LoadDetail = (_id) => {
    navigate('/settings/EmpDetail' + _id)
  }
  const LoadEdit = (_id) => {
    navigate('/settings/EmpEdit' + _id)
  }
  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      window
        .fetch('http://localhost:7071/emp/delete_emp/' + id, {
          method: 'POST',
        })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }
  useEffect(() => {
    window
      .fetch('http://localhost:7071/emp/get_employ')
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        console.log('res', resp)
        empdatachange(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  return (
    <div>
      <div>
        <div className="ml-10">
          <h2 className="text-sky-900">Employee</h2>
        </div>
        <div className="ml-10">
          <div className="divbtn">
            <Link to="/settings/profile" className="btn">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Date of joining</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item._id}>
                    <td>{item.Employee_Code}</td>
                    <td>{item.First_Name}</td>
                    <td>{item.email}</td>
                    <td>{item.Contact_Number}</td>
                    <td>
                      {item.createdAt}
                      {/* {format(item.date_of_joining, 'dd/mm/yyyy')} */}
                    </td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item._id)
                        }}
                        className="btn btn"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item._id)
                        }}
                        className="btn btn"
                      >
                        delete
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item._id)
                        }}
                        className="btn btn"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageEmpyee
