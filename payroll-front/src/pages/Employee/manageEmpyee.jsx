import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { BsPencilSquare } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
const ManageEmpyee = () => {
  const { id } = useParams()

  const [empdata, empdatachange] = useState(null)
  const navigate = useNavigate()
  const LoadDetail = (_id) => {
    navigate('/settings/EmpDetail' + _id)
  }
  const generateSalary = (_id) => {
    navigate('/settings/salary' + _id)
  }
  const LoadEdit = (_id) => {
    navigate('/settings/EmpEdit' + _id)
  }
  useEffect(() => {
    window
      .fetch('http://192.168.29.37:7071/emp/get_employ')
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
  var columns = [
    {
      name: 'Employee Code',
      selector: 'Employee_Code',
      sortable: true,
      width:'col col-lg-1'
    },
    {
      name: 'Name',
      selector: 'First_Name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: 'Contact_Number',
      sortable: true,
    },
    {
      name: 'DOJ',
      selector: 'date_of_joining',
    },
    {
      name: 'Action',
      cell: (row) => (
        <>
          <span
            className="btn btn-md"
            onClick={() => {
              LoadEdit(row._id)
            }}
          >
            <BsPencilSquare />
          </span>
          <span
            className="btn btn-md"
            onClick={() => {
              LoadDetail(row._id)
            }}
          >
            <CgMoreO />
          </span>
          <span
            className="btn btn-sm btn-success"
            style={{padding:"2px"}}
            onClick={() => {
              generateSalary(row._id)
            }}
          >
            Receipt
          </span>
        </>
      ),
  
      ignoreRowClick: true,
    },
  ]
  return (
    <div>
      <div>
        {/* <div className="ml-10">
          <h2 className="text-sky-900">Employee</h2>
        </div> */}
        <div className="ml-5 mr-5">
          <div>
            <Link to="/settings/profile" className="btn btn-primary btn-sm">
              Add New (+)
            </Link>
          </div>
          {/* <table id='example' className="table table-striped table-bordered">
            <thead className="">
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
                          LoadDetail(item._id)
                        }}
                        className="btn btn"
                      >
                        Details
                      </a>
                      <a
                        onClick={() => {
                          generateSalary(item._id)
                        }}
                        className="btn btn"
                      >
                        Receipt
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table> */}
          <DataTable
            title="Employees"
            columns={columns}
            data={empdata ? empdata : []}
            pagination
            highlightOnHover
            search
          />
        </div>
      </div>
    </div>
  )
}

export default ManageEmpyee
