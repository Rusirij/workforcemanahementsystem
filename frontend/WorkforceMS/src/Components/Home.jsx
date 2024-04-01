import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const [profileData, setProfileData] = useState({
        fullName: "",
        mailingAddress: "",
    });
    const [empId, setEmpId] = useState('');
    const todayDate = new Date().toLocaleDateString();
    const [employeeStartDate, setEmployeeStartDate] = useState(new Date());
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(true);

    useEffect(() => {
        const empId = localStorage.getItem('empId');
        setEmpId(empId);

        const fetchEmployeeProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/employees/empProfile/` + empId);
                const { data } = response;
                setProfileData({
                    fullName: data.employeeName,
                    mailingAddress: data.address,
                    contactNo: data.contactNo,
                    hourlyRate: data.hourlyRate
                });
            } catch (error) {
                console.error("Error fetching employee profile:", error);
            }
        };

        if (empId) {
            fetchEmployeeProfile();
        }
    }, []);

    const handleClockIn = async () => {
        try {
            const clockTime = new Date().toLocaleString();
            const response = await axios.post(`http://localhost:8080/api/employees/clockin`, {
                empId: empId,
                dateTime: clockTime
            });

            // Check if clock-in is successful (status code 200)
            if (response.status === 200) {
                // If clock-in is successful, set clockedIn to true and clockedOut to false
                setClockedIn(true);
                setClockedOut(false);
                console.log("Clock in successful");
            } else {
                console.error("Clock in failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error clocking in:", error);
        }
    };


    const handleClockOut = async () => {
        try {
            const clockTime = new Date().toLocaleString();

            const response = await axios.post(`http://localhost:8080/api/employees/clockout`, {
                empId: empId,
                dateTime: clockTime
            });
            // Check if clock-out is successful (status code 200)
            if (response.status === 200) {
                setClockedIn(true);
                setClockedOut(true);
                console.log("Clock out successful");
            } else {
                console.error("Clock in failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error clocking out:", error);
        }
    };

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h3>Profile</h3>
                <div className="d-flex">
                    <button className="btn btn-primary me-2" onClick={handleClockIn} disabled={clockedIn}>
                        Clock In
                    </button>
                    <button className="btn btn-danger" onClick={handleClockOut} disabled={clockedOut}>
                        Clock Out
                    </button>
                </div>
            </div>

            <label htmlFor="todayTime" className="form-label">Today's Date: {todayDate}</label>

            <form className="row g-3 mt-3">
                <div className="col-md-12 col-lg-6">
                    <label htmlFor="fullName" className="form-label">
                        Full Name
                    </label>
                    <input type="text" className="form-control" id="fullName" value={profileData.fullName} placeholder="Enter Full Name" />

                    <label htmlFor="contactNo" className="form-label">
                        Contact No.
                    </label>
                    <input type="text" className="form-control" id="contactNo" value={profileData.contactNo} placeholder="Enter Contact No." />

                    <label htmlFor="mailingAddress" className="form-label">
                        Mailing Address
                    </label>
                    <input type="text" className="form-control" id="mailingAddress" value={profileData.mailingAddress} placeholder="Enter Mailing Address" />

                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" />

                    <label htmlFor="hourlyRate" className="form-label">
                        Hourly Rate
                    </label>
                    <input type="text" className="form-control" id="hourlyRate" value={profileData.hourlyRate} placeholder="Enter Job Description" />
                </div>

                <div className="col-md-15 col-lg-3 position-relative">
                    <div className="position-absolute bottom-0 end-2.5 ">
                        <label htmlFor="reportTo" className="form-label">
                            Report To
                        </label>
                        <input type="text" className="form-control" id="reportTo" placeholder="Enter Manager Name" />

                        <label htmlFor="employeeStartDate" className="form-label">
                            Employee Start Date
                        </label>
                        <div className="col-md-2 col-lg-12" >
                            <DatePicker
                                selected={employeeStartDate}
                                onChange={(date) => setEmployeeStartDate(date)}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-12 text-end">
                    <button className="btn btn-success">Edit Profile</button>
                </div>
            </form>
        </div>
    );
};

export default Home;
