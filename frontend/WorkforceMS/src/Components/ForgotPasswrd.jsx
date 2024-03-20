import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './style.css';
import emailjs from '@emailjs/browser'


const ForgotPasswrd = () => {
    const [email, setEmail] = useState(''); // Define the email state
    const [message, setMessage] = useState(''); // Define the message state
    const navigate = useNavigate(); // Get the navigate function

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            emailjs.send("service_cfcarur", "template_44e8kcj", {

                user_email: email,
            }, { publicKey: 'XUc9MGmEtL-BqZeAN' });
            setMessage('Password reset email sent successfully.');
            navigate('/');

        } catch (error) {
            // If there's an error, display the error message
            setMessage(error.response.data.message);
        }
    };


    return (
        <>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
                <div className="row">
                    <div className="col-md-45 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3><i className="fa fa-lock fa-4x"></i></h3>
                                    <h2 className="text-center">Forgot Password?</h2>
                                    <p>You can reset your password here.</p>
                                    <div className="panel-body">
                                        <form id="register-form" role="form" autoComplete="off" className="form" method="post" onSubmit={handleResetPassword}>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                                    <input
                                                        id="email"
                                                        name="user_email"
                                                        placeholder="email address"
                                                        className="form-control"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                {/* Use type="submit" for the reset button */}
                                                <button type="submit" className="btn btn-lg btn-primary btn-block">Reset Password</button>
                                            </div>
                                            <div className="text-center">{message}</div>
                                            <input type="hidden" className="hide" name="token" id="token" value="" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPasswrd;
