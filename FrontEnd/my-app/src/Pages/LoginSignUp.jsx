import React, { useState } from 'react'
import './CSS/LoginSignUp.css'

const LoginSignUp = () => {

    const [state, setState] = useState("Login");
    const [formDate, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })

    const changeHandler = (e) => {
        setFormData({ ...formDate, [e.target.name]: e.target.value })
    }

    const login = async () => {
        console.log("Login Function Exceuted", formDate);
        let responseData;
        await fetch('https://gulam-shop-backend.onrender.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDate),
        }).then((response) => response.json()).then((data) => responseData = data);
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }

    }
    const signup = async () => {
        console.log("Signup Function Exceuted", formDate);
        let responseData;
        await fetch('https://gulam-shop-backend.onrender.com/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDate),
        }).then((response) => response.json()).then((data) => responseData = data);
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name='username' value={formDate.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
                    <input name='email' value={formDate.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formDate.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up" ? <p className="loginsignup-login">
                    Already have an account <span onClick={() => { setState("Login") }}>Login here</span></p> : <p className="loginsignup-login">
                    Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>

            </div>
        </div>
    )
}

export default LoginSignUp