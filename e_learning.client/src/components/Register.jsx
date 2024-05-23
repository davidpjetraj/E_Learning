import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {

    document.title = "Register";


    useEffect(()=>{
        const user = localStorage.getItem("user")
        if(user){
            document.location = "/"
        }
    },[]);

    return (
        <form action='#' className='register' onSubmit={registerHandler}>
        <h3>Register Page</h3>
        <div className="mb-3">
            <label htmlFor="name">Full name</label>
            <input type="text" className="form-control" placeholder="Full name" name="Name" id="name" required />
        </div>
        <div className="mb-3">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" name="Email" id="email" required />
        </div>
        <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" name="Password" id="password" required/>
        </div>
        <div className="d-grid">
            <button type="submit" className="btn btn-primary">
                Register
            </button>
        </div>
        <p className="forgot-password text-right">
            Already registered <a href="/login">Login?</a>
        </p>
    </form>
    );
    async function registerHandler(e){
        e.preventDefault()
        const form_ = e.target, submitter = document.querySelector("input.login")

        const formData = new FormData(form_, submitter), dataToSend = {}

        for(const [key, value] of formData){
            dataToSend[key] = value;
        }

        // create username
        const newUserName = dataToSend.Name.trim().split(" ")
        dataToSend.UserName = newUserName.join("")

        const response = await fetch("api/E_Learning/register", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type" : "Application/json",
                "Accept": "application/json"
            }
        });

        const data = await response.json()

        if(response.ok){
            document.location = "/login";
        }

        const messageEl = document.querySelector(".message")
        if(data.message) {
            messageEl.innerHTML = data.message;
        }else {
            let errorMessages = "<div>Attention please:</div><div class='normal'>"
            data.errors.forEach(error => {
                errorMessages += error.description + " ";
            });

            errorMessages += "</div>";
            messageEl.innerHTML = errorMessages;
        }

        console.log("login error: ", data);
    }
}

export default Register;