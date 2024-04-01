import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Importing the CSS file

const Availability = () => {
    const empId = localStorage.getItem('empId');

    // Initial availability state for each day of the week
    const [availability, setAvailability] = useState({
        Monday: 'Not Available',
        Tuesday: 'Not Available',
        Wednesday: 'Not Available',
        Thursday: 'Not Available',
        Friday: 'Not Available',
        Saturday: 'Not Available',
        Sunday: 'Not Available',
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

    const insertAvailabilityObj = {
        empId: empId,
        availability: availability
    };

    // Function to handle change in availability for a specific day
    const handleAvailabilityChange = (day, value) => {
        setAvailability({
            ...availability,
            [day]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true); // Set submitting state to true
        try {
            // Make a POST request to the backend
            await axios.post('http://localhost:8080/api/employees/availability', insertAvailabilityObj);
            // Clear the form or show a success message
            console.log("Availability submitted:", availability);
        } catch (error) {
            // Handle error
            console.error('Error submitting availability:', error);
        } finally {
            setIsSubmitting(false); // Reset submitting state to false
        }
    };

    return (
        <div className="availability_container">
            <h2 className="availability_heading">Availability</h2>
            <form onSubmit={handleSubmit}>
                {/* Render dropdowns for each day of the week */}
                {Object.keys(availability).map((day) => (
                    <div key={day} className="availability_dayContainer">
                        <label htmlFor={day} className="availability_label">{day}</label>
                        <select
                            id={day}
                            value={availability[day]}
                            onChange={(e) => handleAvailabilityChange(day, e.target.value)}
                            className="availability_select"
                            disabled={isSubmitting} // Disable select while submitting
                        >
                            <option value="Shift1">Shift 1</option>
                            <option value="Shift2">Shift 2</option>
                            <option value="Shift3">Shift 3</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>
                ))}
                {/* Submit button */}
                <button type="submit" className="availability_submitButton" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Availability;
