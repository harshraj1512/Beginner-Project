import React from 'react';
import img from "../Images/code.png";
import deleteImg from "../Images/delete.png";

const ListCard = () => {
  return (
    <>
    <div className="listCard mb-2 w-full flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]">
        <div className="flex items-center gap-2">
            <img className="w-[80px]" src={img} alt=''/>
            <div>
                <h3 className="text-[20px]">My first Project</h3>
                <p className="text-gray-500 text-[14px]">Created in 9 mon 2023</p>
            </div>
        </div>
        <div>
            <img className="w-[30px] mr-4" src={deleteImg} alt='' />
        </div>
    </div>
    </>
  )
}

export default ListCard