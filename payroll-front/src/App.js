import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Salary from "./pages/Salary";
import Dashboard from "./pages/Dashboard";
import Leave from "./pages/Leave";
import Logout from "./pages/logout";
import AddEmployee from "./pages/Employee/AddEmployee";
import ManageEmpyee from "./pages/Employee/manageEmpyee";
import EmpEdit from "./pages/Employee/EmpEdit";
import EmpDetail from "./pages/Employee/EmpDetail";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import {  useParams } from "react-router-dom";



function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Leave" element={<Leave/>} />
          <Route path="/settings" element={<Logout />} />
          <Route path="/salary" element={<Salary/>} />
          <Route path="/settings/profile" element={<AddEmployee/>} />
          <Route path="/settings/manageprofile" element={<ManageEmpyee/>} />
          <Route path="/settings/EmpEdit:id" element={<EmpEdit />} />
          <Route path="/settings/EmpDetail:id" element={<EmpDetail/>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
