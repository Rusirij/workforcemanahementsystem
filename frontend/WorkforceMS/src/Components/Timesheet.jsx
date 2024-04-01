import React from 'react';

class Timesheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // You can add state variables here if needed
        };
    }

    render() {
        const todayDate = new Date().toLocaleDateString(); // Get today's date

        return (
            <div className="px-5 mt-3">
                <form>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3>Timesheet</h3>
                            <label htmlFor="todayTime" className="form-label">Today's Date: {todayDate}</label>
                            <p>25 March, 2024</p>
                            <p>Week of: 25th March 2024</p>
                        </div>
                    </div>
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Shift Category</th>
                                <th>Hourly rate ($)</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Existing rows */}
                            <tr>
                                <td>Monday</td>
                                <td>Food preparation</td>
                                <td>1</td>
                                <td>15</td>
                            </tr>
                            {/* Add rows for additional shift categories */}
                            <tr>
                                <td>Tuesday</td>
                                <td>Cash handling</td>
                                <td>1</td>
                                <td>15</td>
                            </tr>
                            <tr>
                                <td>Wednesday</td>
                                <td>Cleaning and inventory handling</td>
                                <td>1</td>
                                <td>15</td>
                            </tr>
                            <tr>
                                <td>Thursday</td>
                                <td>Cleaning and inventory handling</td>
                                <td>1</td>
                                <td>15</td>
                            </tr>
                            <tr>
                                <td>Friday</td>
                                <td>Leave</td>
                                <td>2</td>
                                <td>18</td>
                            </tr>
                            {/* New rows */}
                            <tr>
                                <td>Saturday</td>
                                <td>Overall activities</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Sunday</td>
                                <td>Overall activities</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-3">
                        <strong>Additional Shift Categories:</strong>
                        <div>1 - From 8am To 11.59am: Leave Application</div>
                        <div>2 - From 12pm To 3.59pm: Leave Application</div>
                        <div>3 - From 4pm To 7.00pm: Shift Category</div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Timesheet;