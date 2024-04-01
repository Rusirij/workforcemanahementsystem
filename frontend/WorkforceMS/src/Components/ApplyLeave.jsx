import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import './applyleave.css'; // Import CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS



const ApplyLeave = () => {
    const currentDate = new Date().toLocaleDateString();


    const [leaveType, setLeaveType] = useState('');
    const [reason, setReason] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Leave Type:', leaveType);
        console.log('Reason:', reason);
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);
    };

    const handleCancel = () => {
        // Handle cancel logic here
    };


    return (
        <div className="px-5 mt-3">
            <h2> Apply Leave </h2>
            <p className="current-date" style={{ marginBottom: '20px' }}>{currentDate}</p>


            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="leaveType">Type:</label>
                    <select id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                        <option value="">Select Leave Type</option>
                        <option value="Annual">Annual</option>
                        <option value="Sick">Sick</option>
                        <option value="Casual">Casual</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="reason">Reason:</label>
                    <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>
                <div class="date-picker-container">
                    <label htmlFor="fromDate">From:</label>
                    <input type="date" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

                    <label htmlFor="toDate">To:</label>
                    <input type="date" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
                <br></br>
                <div>
                    <button type="submit" className="btn btn-primary">Submit for Approval</button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary" style={{ marginLeft: '10px' }} >Cancel</button>
                    <button type="button" className="btn btn-success" style={{ marginLeft: '30px' }}>
                        <Link to="/apply_leave/submittedRequests" style={{ color: 'white', textDecoration: 'none' }}>
                            Submitted Requests
                        </Link>
                    </button>
                </div>
            </form>
        </div>


    )
}

export default ApplyLeave