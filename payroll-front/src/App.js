import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Salary from "./pages/Salary";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/logout";
import AddEmployee from "./pages/Employee/AddEmployee";
import ManageEmpyee from "./pages/Employee/manageEmpyee";
import EmpEdit from "./pages/Employee/EmpEdit";
import EmpDetail from "./pages/Employee/EmpDetail";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Leaves from "./pages/Leaves/Leave";
import LeaveDetails from "./pages/Leaves/LeaveDetails";
import UserLeaveDetails from "./pages/Leaves/UserLeaveDetails";
import Downloadslip from "./pages/Salary_slip/downloadslip";


function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee" element={<Logout />} />
          <Route path="/employee/salary:id" element={<Salary/>} />
          <Route path="/employee/profile" element={<AddEmployee/>} />
          <Route path="/employee/manageprofile" element={<ManageEmpyee/>} />
          <Route path="/employee/EmpEdit:id" element={<EmpEdit />} />
          <Route path="/employee/EmpDetail:id" element={<EmpDetail/>} />
          <Route path="/employee/leave" element={<Leaves />} />
          <Route path="/employee/leavedetails" element={<LeaveDetails />} />
          <Route path="/employee/userleavedetails:id" element={<UserLeaveDetails />} />
          <Route path="/download:id" element={<Downloadslip />} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
