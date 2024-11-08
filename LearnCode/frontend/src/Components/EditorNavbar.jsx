import React from 'react';
import logo from "../Images/logo.png";
import { FiDownload } from "react-icons/fi";



const EditorNavbar = () => {
  return (
    <>
    <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414] text-white">
      <div className="logo">
        <img className="w-[150px] cursor-pointer" src={logo} alt="" />
      </div>
      <p>File / <span className="text-gray-500">My First Project</span></p>
      <i className="p-[8px] btn bg-black rounded-[5px] cursor-pointer text-[20px]"><FiDownload /></i>
      
    </div>
    </>
  )
}

export default EditorNavbar