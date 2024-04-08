import React, { useEffect, useState } from "react";
import "./schedulestyle.css";
import axios from 'axios';
import data from "./employeeData";


const ShiftSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [scheduleStarted, setScheduleStarted] = useState(false);

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
                const selectedEmployees = [];
                let remainingShiftEmployees = availableEmployees.filter(
                    (employee) =>
                        employee.shiftsAvailable[dayIndex] === shifts[shiftIndex]
                );

                while (
                    selectedEmployees.length < maxEmployeesPerShift &&
                    remainingShiftEmployees.length > 0
                ) {
                    const shuffledEmployees = shuffleArray([...remainingShiftEmployees]); // Shuffle remaining employees for each shift
                    const eligibleEmployees = shuffledEmployees.filter(
                        (employee) =>
                            calculateTotalHours(employee, dayIndex) <
                            employee.maxHoursPerWeek &&
                            countShiftsInDay(employee, dayIndex) < maxShiftsPerDay &&
                            !selectedEmployees.includes(employee)
                    );

                    if (eligibleEmployees.length === 0) break;

                    const employeeToAdd = eligibleEmployees[0];
                    selectedEmployees.push(employeeToAdd);
                    remainingShiftEmployees = remainingShiftEmployees.filter(
                        (employee) => employee !== employeeToAdd
                    );
                }

                daySchedule[shifts[shiftIndex]] = selectedEmployees;
            }

            // Check for remaining available employees and assign them only if they are available for the empty shifts
            const remainingAvailableEmployees = availableEmployees.filter(
                (employee) => !Object.values(daySchedule).flat().includes(employee)
            );

            for (const shift in daySchedule) {
                if (daySchedule[shift].length === 0) {
                    const remainingEmployee = remainingAvailableEmployees.find(
                        (employee) => employee.shiftsAvailable[dayIndex] === shift
                    );
                    daySchedule[shift] = remainingEmployee
                        ? [remainingEmployee]
                        : ["No employee available"];
                }
            }

            newSchedule.push(daySchedule);
        }

        setSchedule(newSchedule);
    };

    const handleStartSchedule = () => {
        setScheduleStarted(true);
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

    const generateScheduleDataForBackend = () => {
        const scheduleDataForBackend = [];
        for (const dayIndex in days) {
            const daySchedule = {};
            for (const shift of shifts) {
                const employees = schedule[dayIndex] && schedule[dayIndex][shift]
                    ? schedule[dayIndex][shift].map(employee => ({
                        employeeId: employee.employeeId,
                        employeeName: employee.employeeName
                    }))
                    : [];
                daySchedule[shift] = employees;
            }
            scheduleDataForBackend.push(daySchedule);
        }
        return scheduleDataForBackend;
    };


    const handleSaveSchedule = () => {
        const scheduleDataForBackend = generateScheduleDataForBackend();

        axios.post('http://localhost:8080/api/employees/saveSchedule', scheduleDataForBackend)
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
            <h2>Shift Schedule</h2>
            <button className="btn btn-primary" onClick={handleStartSchedule} disabled={scheduleStarted}>
                Start Schedule
            </button>
            <span style={{ marginRight: '10px' }}></span>
            <button className="btn btn-success" onClick={handleSaveSchedule}>
                Save
            </button>

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
                                        schedule[dayIndex][shift].map((employee) => (
                                            <p key={employee.employeeId}>{employee.employeeName}</p>
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

export default ShiftSchedule;
