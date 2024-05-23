import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {

    document.title = "Login";


    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user){
            document.location = "/";
        }
    }, []);

    return (
        <form action='#' className='login' onSubmit={loginHandler}>
            <div className="mb-3">
                <label htmlFor='email'>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" name="Email" id="email" required/>
            </div>
            <div className="mb-3">
                <label htmlFor='password'>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="Password" id="password" required/>
            </div>
            <div className="mb-3">
                <input type="checkbox" className="custom-control-input" name="Remember" id="remember" />
                <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
                </label>
            </div>
            <div className="d-grid">
                <input type="submit" value="Login" className="btn btn-primary" /> 
            </div>
            <p className="forgot-password text-right">
                Or <a href="/register">Register?</a>
            </p>
        </form>
    );
    async function loginHandler(e) {
        e.preventDefault();
        const form_ = e.target, submitter = document.querySelector("input.login");

        const formData = new FormData(form_, submitter), dataToSend = {};

        for(const [key, value] of formData) {
            dataToSend[key] = value;
        }

        if(dataToSend.Remember === "on") {
            dataToSend.Remember = true
        }

        console.log("login data before spend: ", dataToSend);
        const response = await fetch("api/E_Learning/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type" : "Application/json",
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if(response.ok){
            localStorage.setItem("user", dataToSend.Email);
            document.location = "/";
        }

        const messageEl = document.querySelector(".message");
        if (data.message) {
            messageEl.innerHTML = data.message;
        } else {
            messageEl.innerHTML = "Something went wrong, please try again";
        }

        console.log("login error: ", data);
    }
}

export default Login;