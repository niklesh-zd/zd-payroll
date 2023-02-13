import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { BsPencilSquare } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { experienceCalculator } from "./experienceCalculator";
const ManageEmpyee = () => {
  const { id } = useParams();

  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();
  const LoadDetail = (_id) => {
<<<<<<< HEAD
    navigate("/settings/EmpDetail" + _id);
  };
  const generateSalary = (_id) => {
    navigate("/settings/salary" + _id);
  };
  const LoadEdit = (_id) => {
    navigate("/settings/EmpEdit" + _id);
  };
  useEffect(() => {
    window
      .fetch("http://localhost:7071/emp/get_employ")
=======
    navigate('/settings/EmpDetail' + _id)
  }
  const generateSalary = (_id) => {
    navigate('/settings/salary' + _id)
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
>>>>>>> c496239e7274b14f03ca1a6805626eb223b13bf9
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        let DOJ;
        let experience;
        let arr = [];
        let finalArr = [];
        for (let i = 0; i < resp.length; i++) {
          arr.push(resp[i]);
        }
        arr.map((e) => {
          experience = experienceCalculator(e.date_of_joining) 
          DOJ = new Date(e.date_of_joining).toLocaleDateString("pt-PT");
          console.log('experience',experience);
          finalArr.push({ ...e, DOJ: DOJ, experience: experience });
        });
        empdatachange(finalArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  var columns = [
    {
      name: "Employee Code",
      selector: "Employee_Code",
      sortable: true,
      width: 30,
    },
    {
      name: "Name",
      selector: "First_Name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Phone",
      selector: "Contact_Number",
      sortable: true,
    },
    {
      name: "Experience",
      selector: "experience",
    },
    {
      name: "DOJ",
      selector: "DOJ",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <span
            className="btn btn-md"
            onClick={() => {
              LoadEdit(row._id);
            }}
          >
            <BsPencilSquare />
          </span>
          <span
            className="btn btn-md"
            onClick={() => {
              LoadDetail(row._id);
            }}
          >
            <CgMoreO />
          </span>
          <span
            className="btn btn-sm btn-success"
            style={{ padding: "2px" }}
            onClick={() => {
              generateSalary(row._id);
            }}
          >
            Receipt
          </span>
        </>
      ),

      ignoreRowClick: true,
    },
  ];
  return (
    <div>
      <div>
        <div className="ml-5 mr-5">
          <DataTable
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4>Employees</h4>{" "}
                <Link
                  to="/settings/profile"
                  className="btn btn-primary btn-sm ml-5 mr-5"
                >
                  Add New (+)
                </Link>
              </div>
            }
            columns={columns}
            data={empdata ? empdata : []}
            pagination
            highlightOnHover
            search
          />
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
        </div>
      </div>
    </div>
  );
};

export default ManageEmpyee;
