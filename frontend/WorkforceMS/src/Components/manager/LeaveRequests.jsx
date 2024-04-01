import React, { useState } from 'react';

const LeaveRequests = () => {
    const [approvalStatuses, setApprovalStatuses] = useState({});
    const [replacementValues, setReplacementValues] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5); // Change this to set the number of entries per page

    const leaveRequests = [
        { name: 'Theresa Webb', leaveDate: '18-03-2024', leaveType: 'Sick' },
        { name: 'Annette Black', leaveDate: '20-03-2024', leaveType: 'Sick' },
        // Add more leave requests
    ];

    // Sample employees for demonstration
    const employees = ['Jeremy Neigh', 'Kathryn Murphy', 'Jane Cooper'];

    // Handle approval status change
    const handleApprovalChange = (employee, value) => {
        setApprovalStatuses(prevState => ({
            ...prevState,
            [employee]: value
        }));
    };

    // Handle replacement change
    const handleReplacementChange = (employee, value) => {
        setReplacementValues(prevState => ({
            ...prevState,
            [employee]: value
        }));
    };

    // Handle form submission for individual employee
    const handleSubmit = (employee) => {
        console.log(`Employee: ${employee}, Approval Status: ${approvalStatuses[employee]}, Replacement: ${replacementValues[employee]}`);
    };

    // Pagination
    const totalPages = Math.ceil(leaveRequests.length / perPage);
    const indexOfLastEntry = currentPage * perPage;
    const indexOfFirstEntry = indexOfLastEntry - perPage;
    const currentEntries = leaveRequests.slice(indexOfFirstEntry, indexOfLastEntry);

    // Change page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="px-5 mt-3">
            <h3>Leave Requests</h3>
            <p>25 March, 2024</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Leave Date</th>
                        <th>Leave Type</th>
                        <th>Approve/Reject</th>
                        <th>Replacement</th>
                        <th>Submit</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.map((request, index) => (
                        <tr key={index}>
                            <td>{request.name}</td>
                            <td>{request.leaveDate}</td>
                            <td>{request.leaveType}</td>
                            <td>
                                <select value={approvalStatuses[request.name] || ''} onChange={(e) => handleApprovalChange(request.name, e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Approve">Approve</option>
                                    <option value="Reject">Reject</option>
                                </select>
                            </td>
                            <td>
                                <select value={replacementValues[request.name] || ''} onChange={(e) => handleReplacementChange(request.name, e.target.value)}>
                                    <option value="">Select</option>
                                    {employees.map((employee, index) => (
                                        <option key={index} value={employee}>{employee}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleSubmit(request.name)}>Submit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
        </div>
    );
};

export default LeaveRequests;