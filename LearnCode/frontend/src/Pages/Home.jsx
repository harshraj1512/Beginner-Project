import React from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between px-[100px] my-[40px]">
        <h2 className="text-2xl">Hi, Coder 👋</h2>
        <div className="flex gap-1">
          <div className="inputBox w-[350px]">
            <input type="text" placeholder="Search Here... !"/>
          </div>
          <button className="btnBlue rounded-[5px] mb-4 text-[20px] p-[5px] px-[10px]">+</button>
        </div>
      </div>
    </>
  );
};

export default Home;
