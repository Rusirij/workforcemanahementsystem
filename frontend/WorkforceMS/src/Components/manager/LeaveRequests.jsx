import axios from "axios";
import React, { useState, useEffect } from "react";

const LeaveRequests = () => {
    const [approvalStatuses, setApprovalStatuses] = useState({});
    const [replacementValues, setReplacementValues] = useState({});
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [loading, setLoading] = useState(true);
    const [names, setNames] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/employees/listLeaveRequestManager')
            .then(response => {
                const filteredData = response.data.filter(request => request.approvedStatus !== "Approved");
                setLeaveRequests(filteredData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching leave details:', error);
                setLoading(false);
            });

        axios.get('http://localhost:8080/api/employees/getNames')
            .then(response => {
                setNames(response.data);
            })
            .catch(error => {
                console.error('Error fetching names:', error);
            });
    }, []);

    const handleApprovalChange = (reqId, value) => {
        setApprovalStatuses(prevState => ({
            ...prevState,
            [reqId]: value
        }));
    };

    const handleReplacementChange = (reqId, value) => {
        setReplacementValues(prevState => ({
            ...prevState,
            [reqId]: value
        }));
    };

    const handleSubmit = (request) => {
        const dataToUpdate = {
            reqId: request.reqId,
            name: request.name,
            fromDate: request.fromDate,
            toDate: request.toDate,
            leaveType: request.leaveType,
            reason: request.reason,
            approvalStatus: approvalStatuses[request.reqId],
            replacement: replacementValues[request.reqId]
        };

        axios.post('http://localhost:8080/api/employees/updateLeave', dataToUpdate)
            .then(response => {
                console.log("Leave updated successfully:", response.data);
            })
            .catch(error => {
                console.error('Error updating leave:', error);
            });
    };

    const totalPages = Math.ceil((leaveRequests?.length || 0) / perPage);
    const indexOfLastEntry = currentPage * perPage;
    const indexOfFirstEntry = indexOfLastEntry - perPage;
    const currentEntries = leaveRequests?.slice(indexOfFirstEntry, indexOfLastEntry) || [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="px-5 mt-3">
            <h3>Leave Requests</h3>
            <label htmlFor="todayTime" className="form-label">Today's Date: {currentDate}</label>
            {loading ? (
                <p>Loading...</p>
            ) : leaveRequests?.length === 0 ? (
                <p>No leave requests found.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Req Id</th>
                            <th>Name</th>
                            <th>Leave From</th>
                            <th>Leave To</th>
                            <th>Leave Type</th>
                            <th>Reason</th>
                            <th>Approve/Reject</th>
                            <th>Replacement</th>
                            <th>Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((request, index) => (
                            <tr key={index}>
                                <td>{request.reqId}</td>
                                <td>{request.name}</td>
                                <td>{request.fromDate}</td>
                                <td>{request.toDate}</td>
                                <td>{request.leaveType}</td>
                                <td>{request.reason}</td>
                                <td>
                                    <select value={approvalStatuses[request.reqId] || ''} onChange={(e) => handleApprovalChange(request.reqId, e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <select value={replacementValues[request.reqId] || ''} onChange={(e) => handleReplacementChange(request.reqId, e.target.value)}>
                                        <option value="">Select</option>
                                        {names && Object.values(names).map((item, index) => (
                                            <option key={index} value={item.employeeName}>{item.employeeName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleSubmit(request)}>Submit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {leaveRequests?.length > perPage && (
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                    <span>Page:</span>
                    <select value={currentPage} onChange={(e) => handlePageChange(parseInt(e.target.value))}>
                        {[...Array(totalPages).keys()].map((page) => (
                            <option key={page + 1} value={page + 1}>{page + 1}</option>
                        ))}
                    </select>
                    <span>of {totalPages}</span>
                    <span>{perPage}</span>
                </div>
            )}
        </div>
    );
};

export default LeaveRequests;
