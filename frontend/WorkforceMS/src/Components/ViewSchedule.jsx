import React from 'react';
import axios from 'axios';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shiftData: [], // Initialize shiftData state to store day and shift type
            loading: true // Add loading state to track the loading status
        };
    }

    componentDidMount() {
        // Get employeeId from localStorage
        const employeeId = localStorage.getItem('empId');

        // Make Axios request to fetch shift schedule for the employee
        axios.get(`http://localhost:8080/api/employees/shift-schedule/${employeeId}`)
            .then(response => {
                // Log key-value pairs of shifts
                Object.entries(response.data).forEach(([day, shift]) => {
                    console.log(`${day}: ${shift}`);
                });

                // Transform the response into an array of objects containing day and shift type
                const shiftDataArray = Object.entries(response.data).map(([day, shift]) => ({ day, shift }));

                // Update state with the fetched shift data array and set loading to false
                this.setState({ shiftData: shiftDataArray, loading: false });
            })
            .catch(error => {
                console.error('Error fetching shift schedule:', error);
                // Handle error if needed
            });
    }

    render() {
        const todayDate = new Date().toLocaleDateString(); // Get today's date
        const { shiftData, loading } = this.state; // Destructure shiftData and loading from state

        if (loading) {
            return <div>Loading...</div>; // Render loading indicator if data is being fetched
        }

        return (
            <div className="px-5 mt-3">
                <form>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3>Schedule</h3>
                            <label htmlFor="todayTime" className="form-label">Today's Date: {todayDate}</label>
                        </div>
                    </div>
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Timeline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Display shifts for each day */}
                            {shiftData.map(({ day, shift }, index) => (
                                <tr key={index}>
                                    <td>{day}</td>
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            {[...Array(12)].map((_, i) => {
                                                const startHour = 8 + i;
                                                let shiftStart, shiftEnd;
                                                switch (shift) {
                                                    case 'Shift 1':
                                                        shiftStart = 8;
                                                        shiftEnd = 12;
                                                        break;
                                                    case 'Shift 2':
                                                        shiftStart = 12;
                                                        shiftEnd = 16;
                                                        break;
                                                    case 'Shift 3':
                                                        shiftStart = 16;
                                                        shiftEnd = 20;
                                                        break;
                                                    default:
                                                        shiftStart = 0;
                                                        shiftEnd = 0;
                                                }
                                                const color = startHour >= shiftStart && startHour < shiftEnd ? 'green' : 'white';
                                                return (
                                                    <div
                                                        key={i}
                                                        style={{
                                                            width: '50px',
                                                            height: '20px',
                                                            backgroundColor: color,
                                                            borderRight: '1px solid #000'
                                                        }}
                                                    >
                                                        {startHour < 10 ? `0${startHour}` : startHour}:00
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div className="mt-3">
                        <strong>Shift Categories:</strong>
                        <div>1 - Shift 1: 8am - 11:59am</div>
                        <div>2 - Shift 2: 12pm - 3:59pm</div>
                        <div>3 - Shift 3: 4pm - 7pm</div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Schedule;
