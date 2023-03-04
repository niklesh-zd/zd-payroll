import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Salary from "./pages/Salary";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/Employee/AddEmployee";
import ManageEmpyee from "./pages/Employee/manageEmpyee";
import EmpEdit from "./pages/Employee/EmpEdit";
import EmpDetail from "./pages/Employee/EmpDetail";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Leaves from "./pages/Leaves/Leave";
import LeaveDetails from "./pages/Leaves/LeaveDetails";
import UserLeaveDetails from "./pages/Leaves/UserLeaveDetails";
import Downloadslip from "./pages/Salary_slip/downloadslip";
import LoginPage from "./Auth/LoginPage";
import { useState } from "react";

function App() {
  const token = localStorage.getItem('token');
  console.log('---Token---',token);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <Router>
      {!token ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <SideBar>
          <Routes>
            <Route path="/settings/salary/:id" element={<Salary />} />
            <Route path="/settings/profile" element={<AddEmployee />} />
            <Route path="/settings/manageprofile" element={<ManageEmpyee />} />
            <Route path="/settings/EmpEdit/:id" element={<EmpEdit />} />
            <Route path="/settings/EmpDetail/:id" element={<EmpDetail />} />
            <Route path="/settings/leave" element={<Leaves />} />
            <Route path="/settings/leavedetails" element={<LeaveDetails />} />
            <Route path="/settings/userleavedetails/:id" element={<UserLeaveDetails />} />
            <Route path="/download/:id" element={<Downloadslip />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </SideBar>
      )}
    </Router>
  );
}

export default App;
