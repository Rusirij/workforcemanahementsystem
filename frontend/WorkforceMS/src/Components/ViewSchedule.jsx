import React from 'react';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // You can add state variables here if needed
        };
    }

    render() {
        const todayDate = new Date().toLocaleDateString(); // Get today's date

        // Define the shifts
        const shifts = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 1,
            Friday: 2,
            Saturday: 3,
            Sunday: 1
        };

        return (
            <div className="px-5 mt-3">
                <form>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3>Schedule</h3>
                            <label htmlFor="todayTime" className="form-label">Today's Date: {todayDate}</label>
                            <p>25 March, 2024</p>
                            <p>Week of: 25th March 2024</p>
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
                            {Object.entries(shifts).map(([day, shift]) => (
                                <tr key={day}>
                                    <td>{day}</td>
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            {[...Array(12)].map((_, i) => {
                                                const startHour = 8 + i;
                                                const shiftStart = shift === 1 ? 8 : shift === 2 ? 12 : 16;
                                                const shiftEnd = shiftStart + 4;
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
                                                        {startHour}:00
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