import React, { useState } from 'react';
import axios from 'axios';

const ManageEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        employeeId: '',
        employeeName: '',
        street: '',
        city: '',
        contactNumber: '',
        hourlyRate: '',
        maxHoursPerWeek: '',
        employeeToDelete: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployeeData({
            ...employeeData,
            [name]: value
        });
    };

    // Delete employee funtion
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/employees/deleteempl`, employeeToDelete);
            console.log('Employee deleted successfully');
        } catch (error) {
            console.error('Error while deleting employee:', error);
        }
    };

    // Add employee functionf
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { employeeId, employeeName, street, city, contactNumber, hourlyRate, maxHoursPerWeek } = employeeData;

        const empobj = {
            employeeId: employeeId,
            employeeName: employeeName,
            address: {
                street: street,
                city: city
            },
            contactNumber: contactNumber,
            hourlyRate: hourlyRate,
            maxHoursPerWeek: maxHoursPerWeek
        };

        try {
            // Sending empobj to backend
            await axios.post('http://localhost:8080/api/employees/addemp', empobj);
            console.log('Data sent successfully');
            // Optionally, you can reset the form after successful submission
            setEmployeeData({
                employeeId: '',
                employeeName: '',
                street: '',
                city: '',
                contactNumber: '',
                hourlyRate: '',
                maxHoursPerWeek: '',
                employeeToDelete: ''
            });
        } catch (error) {
            console.error('Error while sending data:', error);
        }
    };

    return (
        <div style={{ paddingLeft: '20px' }}> {/* Adding left padding */}
            <h2><strong>Enter Employee Details</strong></h2>
            <p>4/1/2024</p>
            <form onSubmit={handleSubmit} style={{ width: '60%', marginBottom: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="employeeId">Employee ID</label>
                    <br />
                    <input type="text" id="employeeId" name="employeeId" style={{ width: '150px' }} value={employeeData.employeeId} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '48%' }}>
                        <label htmlFor="employeeName">Employee Name</label>
                        <br />
                        <input type="text" id="employeeName" name="employeeName" style={{ width: '100%' }} value={employeeData.employeeName} onChange={handleInputChange} />
                    </div>
                    <div style={{ width: '48%' }}>
                        <label htmlFor="employeeImage">Employee Image (50x50px)</label>
                        <br />
                        <input type="file" id="employeeImage" name="employeeImage" accept="image/*" style={{ width: '100%' }} />
                    </div>
                </div>
                <h3>Address Details</h3>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '48%' }}>
                        <label htmlFor="street">Street</label>
                        <br />
                        <input type="text" id="street" name="street" style={{ width: '100%' }} value={employeeData.street} onChange={handleInputChange} />
                    </div>
                    <div style={{ width: '48%' }}>
                        <label htmlFor="city">City</label>
                        <br />
                        <input type="text" id="city" name="city" style={{ width: '100%' }} value={employeeData.city} onChange={handleInputChange} />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="contactNumber">Contact No</label>
                    <br />
                    <input type="text" id="contactNumber" name="contactNumber" style={{ width: '100%' }} value={employeeData.contactNumber} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="hourlyRate">Hourly Rate</label>
                    <br />
                    <input type="text" id="hourlyRate" name="hourlyRate" style={{ width: '100%' }} value={employeeData.hourlyRate} onChange={handleInputChange} />
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '48%' }}>
                        <label htmlFor="maxHoursPerWeek">Max hours per week</label>
                        <br />
                        <input type="number" id="maxHoursPerWeek" name="maxHoursPerWeek" style={{ width: '80%' }} value={employeeData.maxHoursPerWeek} onChange={handleInputChange} />
                    </div>
                    <div style={{ width: '48%' }}>
                        <label htmlFor="employeeToDelete">Employee No. To Be Deleted</label>
                        <br />
                        <input type="text" id="employeeToDelete" name="employeeToDelete" style={{ width: '100%' }} value={employeeData.employeeToDelete} onChange={handleInputChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary">Cancel</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete Employee</button>
                    <button type="button" className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ManageEmployee;
