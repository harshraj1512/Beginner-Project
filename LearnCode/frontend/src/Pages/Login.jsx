import React, { useState } from 'react'
import logo from "../Images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import image from "../Images/authPageSide.png";
import { api_base_url } from '../helper';
const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/users/login",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    }).then(res => res.json()).then(data => {
      if(data.success === true){
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        window.location.href = "/";
      } else {
        setError(data.message);
      }
    })
  }
  return (
    <>
    <div className="container bg-[#0D0C0C] w-screen min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[35%]">
            <img className="w-[200px]" src={logo} alt=""/>
            <form onSubmit={submitForm} className="w-full mt-[60px]" action="">

                <div className="inputBox">
                    <input onChange = {(e) => {setEmail(e.target.value)}} value={email} type="email" placeholder="Email" required />
                </div>

                <div className="inputBox">
                    <input onChange = {(e) => {setPwd(e.target.value)}} value={pwd} type="password" placeholder="Password" required />
                </div>

                
                <p className="text-[gray]">Don't have an account <Link to="/signup" className="text-[#00AEEF]">SignUp</Link></p>
                <p className='text-red-500 text-[14px] my-2'>{error}</p>

                <button className="btnBlue w-full mt-[20px] font-medium text-lg">Login</button>
            </form>
        </div>
        <div className="right w-[55%]">
        <img className="h-screen w-[100%] object-cover" src={image}  alt=""/>
        </div>
    </div>
    </>
  )
}

export default Login