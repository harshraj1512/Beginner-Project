import React from 'react';
import deleteImg from "../Images/delete.png"
import codeImg from "../Images/code.png";

const GridCard = () => {
  return (
    <>
    <div className="gridCard bg-[#141414] p-[10px] w-[250px] h-[180px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50">
        <img className="w-[90px]" src={codeImg} alt="" />
        <h3 className="text-[20px] w-[90%] line-clamp-1">My first Project</h3>
        <div className="flex items-center justify-between">
            <p className="text-[14px] text-gray-500">Created in 9 mon 2023</p>
            <img className="w-[30px] cursor-pointer" src={deleteImg}/>
        </div>
    </div>
    </>
  )
}

export default GridCard