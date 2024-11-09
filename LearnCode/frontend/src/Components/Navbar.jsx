import React, { useEffect, useState } from 'react';
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import Avatar from 'react-avatar';
import { MdOutlineLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from '../helper';


const Navbar = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(api_base_url + "/users/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data=>{
      if (data.success) {
        setData(data.user);
      } else {
        setError(data.message);
      }
    })
  }, [])
  


  return (
    <>
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414] text-white">
      <div className="logo">
        <img className="w-[150px] cursor-pointer" src={logo} alt="" />
      </div>
      <div className="link flex items-center gap-2">
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Contact</Link>
        <Link>Services</Link>
        <Avatar onClick={() => {toggleClass(".dropDownNavbar","hidden")}} name={data ? data.name: ""} size="40" round="50%"  className="cursor-pointer ml-2" />
      </div>

      <div className="dropDownNavbar hidden absolute right-[60px] top-[80px] p-[10px] shadow-lg shadow-black/50 bg-[#1A1919] rounded-lg w-[150px] h-[140px]">
        <div className="py-[10px] border-b-[1px] border-b-white">
          <h3 className="text-[16px]" style={{lineHeight:1}}>{data ? data.name : ""}</h3>
        </div>

        <i className="flex items-center gap-2 mt-3 mb-2 cursor-pointer" style={{fontStyle:"normal"}}><MdOutlineLightMode className="text-[20px]" /><p>Light Mode</p></i>
        <i className="flex items-center gap-2 mt-3 mb-2 cursor-pointer" style={{fontStyle:"normal"}}><BsGridFill  className="text-[20px]" /><p>Grid Mode</p></i>
      </div>
    </div>
    </>
  )
}

export default Navbar