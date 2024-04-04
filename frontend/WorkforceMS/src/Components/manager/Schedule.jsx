import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./schedulestyle.css";

const Schedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [scheduleStarted, setScheduleStarted] = useState(false);

    const data = [
        { employeeId: 1, employeeName: "Alice Johnson", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3"] },
        { employeeId: 2, employeeName: "Bob Smith", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 2", "Shift 3"] },
        { employeeId: 3, employeeName: "Carol Lee", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3", "Shift 3"] },
        { employeeId: 4, employeeName: "David Brown", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3"] },
        { employeeId: 5, employeeName: "Emily Clark", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3"] },
        { employeeId: 6, employeeName: "Frank Adams", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3", "Shift 3"] },
        { employeeId: 7, employeeName: "Grace Turner", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3", "Shift 3"] },
        { employeeId: 8, employeeName: "Grace Adams", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 2", "Shift 3"] },
        { employeeId: 9, employeeName: "Henry White", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 2", "Shift 3"] },
        { employeeId: 10, employeeName: "Isabel Garcia", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3", "Shift 3"] },
        { employeeId: 11, employeeName: "Jack Taylor", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3", "Shift 3"] },
        { employeeId: 12, employeeName: "Karen Hill", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 2", "Shift 3"] },
        { employeeId: 13, employeeName: "Leo Garcia", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3"] },
        { employeeId: 14, employeeName: "Megan Adams", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3", "Shift 3"] },
        { employeeId: 15, employeeName: "Nathan White", shiftsAvailable: ["Shift 1", "Shift 1", "Shift 2", "Shift 2", "Shift 3", "Shift 3", "Shift 3"] },
    ];

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const shifts = ["Shift 1", "Shift 2", "Shift 3"];
    const shiftHours = 8;
    const maxEmployeesPerShift = 2;
    const maxShiftsPerDay = 2;

    const generateSchedule = () => {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const newSchedule = [];

        for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
            const daySchedule = {};
            const availableEmployees = data.filter(
                (employee) => employee.shiftsAvailable[dayIndex] !== "NA"
            );

            if (availableEmployees.length === 0) {
                // If no employees available for the day, continue to the next day
                newSchedule.push(daySchedule);
                continue;
            }

            for (let shiftIndex = 0; shiftIndex < shifts.length; shiftIndex++) {
                const allEmployees = shuffleArray([...availableEmployees]); // Shuffle all employees for each shift
                const selectedEmployees = allEmployees.slice(0, maxEmployeesPerShift);
                daySchedule[shifts[shiftIndex]] = selectedEmployees.map(emp => emp.employeeName);
            }

            newSchedule.push(daySchedule);
        }

        setSchedule(newSchedule);
    };

    useEffect(() => {
        if (scheduleStarted) {
            generateSchedule();
        }
    }, [scheduleStarted]);

    const calculateTotalHours = (employee, dayIndex) => {
        return (
            employee.shiftsAvailable
                .slice(0, dayIndex + 1)
                .filter((shift) => shift !== "NA").length * shiftHours
        );
    };

    const countShiftsInDay = (employee, dayIndex) => {
        return employee.shiftsAvailable[dayIndex] === "NA" ? 0 : 1;
    };

    const handleStartSchedule = () => {
        setScheduleStarted(true);
    };

    const handleSaveSchedule = () => {
        axios.post('http://localhost:8080/api/employees/saveSchedule', schedule)
            .then(response => {
                console.log("Schedule saved successfully:", response.data);
                // Optionally, show a success message to the user
            })
            .catch(error => {
                console.error("Error saving schedule:", error);
                // Optionally, show an error message to the user
            });
    };

    return (
        <div className="main">
            <button className="btn btn-primary" onClick={handleStartSchedule} disabled={scheduleStarted}>
                Start Schedule
            </button>
            <span style={{ marginRight: '10px' }}></span>
            <button className="btn btn-success" onClick={handleSaveSchedule}>
                Save
            </button>
            <h2>Shift Schedule</h2>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        {shifts.map((shift, index) => (
                            <th key={index}>{shift}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {days.map((day, dayIndex) => (
                        <tr key={dayIndex}>
                            <td>{day}</td>
                            {shifts.map((shift, shiftIndex) => (
                                <td key={shiftIndex}>
                                    {schedule[dayIndex] &&
                                        schedule[dayIndex][shift].map((employee, index) => (
                                            <p key={index}>{employee}</p>
                                        ))}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;
