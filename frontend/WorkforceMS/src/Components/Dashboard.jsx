import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import logoPath from '../../public/images/schedhublogo.jpeg';


const Dashboard = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [empName, setEmpName] = useState('');
    const [empType, setEmpType] = useState('');

    useEffect(() => {
        // Fetch empName from localStorage when the component mounts
        const storedEmpName = localStorage.getItem('empName');
        setEmpName(storedEmpName);

        const storedEmpType = localStorage.getItem('empType');
        setEmpType(storedEmpType);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');

    };

    const renderLinks = () => {
        if (empType === 'Employee') {
            return (
                <>
                    <li className="w-100">
                        <Link to="/dashboard/view_schedule" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-calendar-event ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Schedule</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/availability" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi bi-check-circle-fill ms-2 grayscale-icon"></i>
                            <span className="ms-2 d-none d-sm-inline">Availability</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/timesheet" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-columns ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Timesheet</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/pay_stub" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-cash ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Pay Stub</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/apply_leave" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-umbrella ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Apply Leave</span>
                        </Link>
                    </li>
                    <li className="w-100" style={{ display: 'none' }}>
                        <Link to="/dashboard/apply_leave/submittedRequests" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-umbrella ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Apply Leave</span>
                        </Link>
                    </li>
                </>
            );
        } else if (empType === 'Manager') {
            return (
                <>
                    <li className="w-100">
                        <Link to="/dashboard/manager/schedule" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-people ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Schedule</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/manager/manage-employee" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-columns ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Manage Employee</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/manager/timesheet" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-grid  ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Timesheet</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/manager/paystub" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-cash ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Paystub</span>
                        </Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/manager/leave-requests" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-umbrella ms-2"></i>
                            <span className="ms-2 d-none d-sm-inline">Leave Requests</span>
                        </Link>
                    </li>
                </>
            );
        }
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <img src={logoPath} alt="Logo" className="ms-2" style={{ width: '100px', height: '100px' }} />

                        <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">SCHEDHUB</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="w-100">
                                <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            {renderLinks()}
                            <li className="w-100" onClick={handleLogout}>
                                <Link className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-power ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow">
                        <h4>Hello {empName}</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
