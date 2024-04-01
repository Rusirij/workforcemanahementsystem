import React from 'react';

const PayStub = () => {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="px-5 mt-3">
            <h2>Paystub</h2>
            <p className="current-date" style={{ marginBottom: '20px' }}>{currentDate}</p>

            <div className="paystub">
                <div className="paystub-entry">
                    <div className="amount-section">
                        <label className="amount-label">Amount:</label>
                        <p className="amount" style={{ color: 'green', fontWeight: 'bold', fontSize: '1.2em' }}>$1,500.00</p>
                    </div>
                    <div className="payment-details">
                        <p><span className="detail-label" style={{ fontSize: '0.8em', fontWeight: 'lighter' }}>Date</span><span className="detail-label" style={{ fontSize: '0.8em', fontWeight: 'lighter', marginLeft: '120px' }}>Payment Code</span></p>
                        <p><span className="detail-value">2024-03-27</span><span className="detail-value" style={{ marginLeft: '60px' }}>B-8640</span></p>
                    </div>
                </div>

                <hr className="divider" />

                <div className="paystub-entry">
                    <div className="amount-section">
                        <label className="amount-label">Amount:</label>
                        <p className="amount" style={{ color: 'green', fontWeight: 'bold', fontSize: '1.2em' }}>$2,000.00</p>
                    </div>
                    <div className="payment-details">
                        <p><span className="detail-label" style={{ fontSize: '0.8em', fontWeight: 'lighter' }}>Date</span><span className="detail-label" style={{ fontSize: '0.8em', fontWeight: 'lighter', marginLeft: '120px' }}>Payment Code</span></p>
                        <p><span className="detail-value">2024-03-27</span><span className="detail-value" style={{ marginLeft: '60px' }}>B-8640</span></p>
                    </div>
                </div>

                <hr className="divider" />

                <div className="paystub-entry">
                    <div className="amount-section">
                        <label className="amount-label">Amount:</label>
                        <p className="amount" style={{ color: 'green', fontWeight: 'bold', fontSize: '1.2em' }}>$1,200.00</p>
                    </div>
                    <div className="payment-details">
                        <p><span className="detail-label" style={{ fontSize: '0.8em', fontWeight: 'lighter' }}>Date</span><span className="detail-label" style={{ fontSize: '0.8em', fontWeight: 'lighter', marginLeft: '120px' }}>Payment Code</span></p>
                        <p><span className="detail-value">2024-03-27</span><span className="detail-value" style={{ marginLeft: '60px' }}>B-8640</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayStub;
