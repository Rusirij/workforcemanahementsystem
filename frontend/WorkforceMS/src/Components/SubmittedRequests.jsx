import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmittedRequests = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const employeeId = localStorage.getItem('empId'); // Retrieve employee ID from local storage

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/employees/listLeaveRequest', {
                params: { empId: employeeId } // Pass employee ID as a query parameter
            });
            setLeaveRequests(response.data);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    };

    return (
        <div className="px-5 mt-3">
            <h2>Submitted Requests</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Reason</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Approval Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map(request => (
                        <tr key={request.requestId}>
                            <td>{request.requestId}</td>
                            <td>{request.requestReason}</td>
                            <td>{request.fromDate}</td>
                            <td>{request.toDate}</td>
                            <td>{request.requestStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubmittedRequests;
