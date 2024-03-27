import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Home = () => {

    const [profileData, setProfileData] = useState({
        fullName: "",
        // contactNo: "",
        mailingAddress: ""
        // email: "",
        // jobDescription: "",
        // reportTo: "",
        // employeeStartDate: new Date()
    });
    const [empId, setEmpId] = useState('');



    const [homeList, setHomeList] = useState([]);
    const [selectedHome, setSelectedHome] = useState(null);
    const navigate = useNavigate();
    const todayDate = new Date().toLocaleDateString(); // Get today's date
    const [employeeStartDate, setEmployeeStartDate] = useState(new Date());
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(true);
    const [startTime, setStartTime] = useState(null);
    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const startTimer = () => {
        setClockedIn(true);
        setClockedOut(false);
        setStartTime(new Date());

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedMilliseconds = currentTime - startTime;

            const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((elapsedMilliseconds % (1000 * 60)) / 1000);

            setTimer({
                hours: hours,
                minutes: minutes,
                seconds: seconds
            });
        }, 1000);

        // Store the intervalId in the state to clear the interval when component unmounts
        setTimer(intervalId);
    };

    const stopTimer = () => {
        setClockedIn(false);
        setClockedOut(true);

        // Clear the interval when Clock Out is pressed
        clearInterval(timer);

        // Reset the timer to 0
        setTimer({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
    };

    useEffect(() => {

        const empId = localStorage.getItem('empId');
        setEmpId(empId);

        // Function to fetch employee profile data
        const fetchEmployeeProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/employees/empProfile/` + empId);
                const { data } = response;
                // Update profileData state with received data
                setProfileData({
                    fullName: data.employeeName,
                    // contactNo: data.contactNo,
                    mailingAddress: data.address
                    // email: data.email,
                    // jobDescription: data.jobDescription,
                    // reportTo: data.reportingTo,
                    // employeeStartDate: new Date(data.employeeStartDate) // Assuming employeeStartDate is in ISO format
                });
            } catch (error) {
                console.error("Error fetching employee profile:", error);
            }
        };

        // Fetch employee profile data when component mounts
        if (empId) {
            fetchEmployeeProfile();
        }


        // Clear the interval when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, [timer]);


    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h3>Profile</h3>
                    <label htmlFor="todayTime" className="form-label">Today's Date: {todayDate}</label>
                    {clockedIn && (
                        <label htmlFor="timer" className="form-label">
                            Timer: {timer.hours}h {timer.minutes}m {timer.seconds}s
                        </label>
                    )}
                </div>
                <div className="d-flex">
                    <div className="clockin-button me-1">
                        <button className="btn btn-primary" onClick={startTimer} disabled={clockedIn}>
                            Clock In
                        </button>
                    </div>
                    <div className="clockin-button">
                        <button className="btn btn-danger" onClick={stopTimer} disabled={clockedOut}>
                            Clock Out
                        </button>
                    </div>
                </div>
            </div>



            <form className="row g-3 mt-3">
                <div className="col-md-12 col-lg-6">
                    <label htmlFor="fullName" className="form-label">
                        Full Name
                    </label>
                    <input type="text" className="form-control" id="fullName" value={profileData.fullName} placeholder="Enter Full Name" />

                    <label htmlFor="contactNo" className="form-label">
                        Contact No.
                    </label>
                    <input type="text" className="form-control" id="contactNo" placeholder="Enter Contact No." />

                    <label htmlFor="mailingAddress" className="form-label">
                        Mailing Address
                    </label>
                    <input type="text" className="form-control" id="mailingAddress" value={profileData.mailingAddress} placeholder="Enter Mailing Address" />

                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" />

                    <label htmlFor="jobDescription" className="form-label">
                        Job Description
                    </label>
                    <input type="text" className="form-control" id="jobDescription" placeholder="Enter Job Description" />
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
