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

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/view_schedule' element={<ViewSchedule />}></Route>
          <Route path='/dashboard/timesheet' element={<Timesheet />}></Route>
          <Route path='/dashboard/apply_leave' element={<ApplyLeave />}></Route>
          <Route path='/dashboard/pay_stub' element={<PayStub />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>

        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
