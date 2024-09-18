import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    if(!localStorage.getItem("PasswordCounter") || localStorage.getItem("authToken"))
    {
         window.location.href = '/'

    }
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const token = searchParams.get('token'); // Extract token from the page URL

    const resetPasswordF = async () => {
        console.log("sasssssssss"+token)
        console.log("**"+`http://localhost:8080/reset-password?token=${token}&password=${password}`)

        try {
            const response = await fetch(`http://localhost:8080/reset-password?token=${token}&password=${password}`, {
                method: 'POST', // or 'POST' depending on your server setup
                headers: {
                  //  'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setStatus('Password reset successful!');
                setTimeout(() => window.location.href = '/src/final%20project/login-signup%20page/login.html#', 2000); // Redirect after 2 seconds
                localStorage.removeItem("PasswordCounter");
            } else {
                setStatus('Password reset failed , request another email.');
                setTimeout(() => window.location.href = '/src/final%20project/login-signup%20page/login.html#', 2000); // Redirect after 2 seconds

            }
        } catch (error) {
            setStatus('An error occurred.');
            console.log(error);
            console.log(Response);
        }
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (password && password === confirmPassword) {
            resetPasswordF();
        } else if (password !== confirmPassword) {
            setStatus('Passwords do not match.');
        } else {
            setStatus('Please enter a new password.');
        }
    };

    useEffect(() => {
        if (!token) {
            setStatus('Invalid request. Missing token.');
        }
    }, [token]);

    return (
        <div className="cont">
            <div className="reset-container">
                <a href="/"> <img className="logo" src="https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png" alt="User"></img></a>

                <h2 className='text'>Reset Password</h2>
                <form onSubmit={handleSubmit} className='form'>

                    <div className="inp">
                        <div className="saif">
                            <label className="input">
                                <input className="input__field" id="password2" type="password" placeholder=" " value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                                <span className="input__label">Enter new password</span>
                            </label>
                        </div>
                    </div>
                   

<div className="inp">
                        <div className="saif">
                            <label className="input">
                                <input className="input__field" id="password" type="password" placeholder=" "  value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required/>
                                <span className="input__label">Confirm new password</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {status && <p className={`error-message ${status.includes('successful') ? '' : 'activea'}`}>{status}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
