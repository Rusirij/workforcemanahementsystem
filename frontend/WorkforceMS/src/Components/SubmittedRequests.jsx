import React from 'react';

const SubmittedRequests = () => {
    return (
        <div className="container">
            <h2>Submitted Requests</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Leave Request 1</h5>
                    <p className="card-text">Type: Annual</p>
                    <p className="card-text">Reason: Vacation</p>
                    <p className="card-text">From: 2024-04-15</p>
                    <p className="card-text">To: 2024-04-20</p>
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">Leave Request 2</h5>
                    <p className="card-text">Type: Sick</p>
                    <p className="card-text">Reason: Medical Leave</p>
                    <p className="card-text">From: 2024-04-10</p>
                    <p className="card-text">To: 2024-04-12</p>
                </div>
            </div>
            {/* Add more cards for additional submitted requests */}
        </div>
    );
};

export default SubmittedRequests;
