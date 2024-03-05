import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate()

    const [empType, setEmpType] = useState('');
    useEffect(() => {
        // Fetch empType from localStorage when the component mounts
        const storedEmpType = localStorage.getItem('empType');
        setEmpType(storedEmpType);
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8080/auth/employee")
            .then((result) => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);
    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/delete_employee/' + id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
    }
    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Employee List</h3>
            </div>
            {empType === 'Manager' ? (
                <Link to="/dashboard/add_employee" className="btn btn-success">
                    Add Employee
                </Link>
            ) : (
                <p>You don't have permission to add employees.</p>
            )}

            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((e) => (
                            <tr>
                                <td>{e.name}</td>
                                <td>
                                    <img
                                        src={`http://localhost:3000/Images/` + e.image}
                                        className="employee_image"
                                    />
                                </td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.salary}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/edit_employee/` + e.id}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleDelete(e.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
