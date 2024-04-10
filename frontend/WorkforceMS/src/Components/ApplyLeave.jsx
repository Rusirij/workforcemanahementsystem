import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './applyleave.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplyLeave = () => {

    const currentDate = new Date().toLocaleDateString();

    const [leaveType, setLeaveType] = useState('');
    const [reason, setReason] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const empId = localStorage.getItem('empId');


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Prepare the data object to send to the backend
        const leaveRequestData = {
            employeeId: empId,
            leaveType: leaveType,
            reason: reason,
            fromDate: fromDate,
            toDate: toDate
        };

        try {
            const response = await axios.post('http://localhost:8080/api/employees/leaveRequest', leaveRequestData);

            // Check if the response status indicates success
            if (response.status >= 200 && response.status < 300) {
                // Handle success response here
                console.log('Leave request submitted successfully:', response.data);

                // Reset the form fields after successful submission
                setLeaveType('');
                setReason('');
                setFromDate('');
                setToDate('');
            } else {
                // Handle other status codes (optional)
                console.error('Error submitting leave request:', response.statusText);
            }
        } catch (error) {
            // Handle error response here
            console.error('Error submitting leave request:', error);
        }
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
                <div className="date-picker-container">
                    <label htmlFor="fromDate">From:</label>
                    <input type="date" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

                    <label htmlFor="toDate">To:</label>
                    <input type="date" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
                <br></br>
                <div>
                    <button type="submit" className="btn btn-primary">Submit for Approval</button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary" style={{ marginLeft: '10px' }}>Cancel</button>
                    <button type="button" className="btn btn-success" style={{ marginLeft: '30px' }}>
                        <Link to="/dashboard/apply_leave/submittedRequests" style={{ color: 'white', textDecoration: 'none' }}>
                            Submitted Requests
                        </Link>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ApplyLeave;
