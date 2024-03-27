import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Profile from './Components/Profile'
import AddEmployee from './Components/AddEmployee'
import ViewSchedule from './Components/ViewSchedule'
import ApplyLeave from './Components/ApplyLeave'
import Timesheet from './Components/Timesheet'
import PayStub from './Components/PayStub'
import ForgotPasswrd from './Components/ForgotPasswrd'

import LeaveRequests from './Components/manager/LeaveRequests'
import ManageEmployee from './Components/manager/ManageEmployee'
import PaystubManager from './Components/manager/Paystub'
import Schedule from './Components/manager/Schedule'
import TimesheetManager from './Components/manager/Timesheet'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPasswrd />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/view_schedule' element={<ViewSchedule />}></Route>
          <Route path='/dashboard/timesheet' element={<Timesheet />}></Route>
          <Route path='/dashboard/apply_leave' element={<ApplyLeave />}></Route>
          <Route path='/dashboard/pay_stub' element={<PayStub />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>

          <Route path='/dashboard/manager/schedule' element={<Schedule />}></Route>
          <Route path='/dashboard/manager/manage-employee' element={<ManageEmployee />}></Route>
          <Route path='/dashboard/manager/timesheet' element={<TimesheetManager />}></Route>
          <Route path='/dashboard/manager/paystub' element={<PaystubManager />}></Route>
          <Route path='/dashboard/manager/leave-requests' element={<LeaveRequests />}></Route>


        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
