import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import GridCard from "../Components/GridCard";
import ListCard from "../Components/ListCard";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [isCreateModelShow, setisCreateModelShow] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createproj = (e) => {
    if (projTitle === "") {
      alert("Please enter the project Title");
    } else {
      fetch(api_base_url + "/users/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: localStorage.getItem("userId")
        })
      }).then(res => res.json()).then(data => {
        if (data.success === true) {
          setisCreateModelShow(false)
          setProjTitle("")
          alert("Project Created Successfully")
          navigate(`/editor/${data.projectId}`)
        } else {
          alert("Something went wrong")
        }
      })
    }
  };

  const getProj = () => {
    fetch(api_base_url + "/users/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success === true) {
        setData(data.project);
      } else {
        setError(data.message);
      }
    })
  };

  useEffect(() => {
    getProj();
  }, []);
  

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between px-[100px] my-[40px]">
        <h2 className="text-2xl">Hi, Coder 👋</h2>
        <div className="flex gap-1">
          <div className="inputBox w-[350px]">
            <input type="text" placeholder="Search Here... !" />
          </div>
          <button onClick={()=> setisCreateModelShow(true)} className="btnBlue rounded-[5px] mb-4 text-[20px] p-[5px] px-[10px]">
            +
          </button>
        </div>
      </div>

      <div className="cards">
        {isGridLayout ? (
          <div className="grid px-[100px]">
            {
              data?data.map((item,index)=>{
                return <GridCard key={index} item={item}/>
              }): ""
            }
            {/* <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard /> */}
          </div>
        ) : (
          <div className="list px-[100px]">
            {
              data?data.map((item,index)=>{
                return <ListCard key={index} item={item}/>
              }): ""
            }
            {/* <ListCard />
            <ListCard />
            <ListCard /> */}
          </div>
        )}
      </div>

      {isCreateModelShow ? (
        <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.1)] flex items-center justify-center">
          <div className="createModel w-[25vw] h-[27vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
            <h3 className="text-2xl">Create New Project</h3>
            <div className="inputBox !bg-[#202020] mt-4">
              <input onChange={(e)=> setProjTitle(e.target.value)} value={projTitle} type="text" placeholder="Project Title" />
            </div>

            <div className="flex items-center gap-[10px] w-full mt-2">
              <button onClick={createproj} className="btnBlue rounded-[5px] w-[49%] mb-4 !p-[5px] !px-[10px] !py-[10px]">
                Create
              </button>
              <button onClick={()=> setisCreateModelShow(false)} className="btnBlue !bg-[#1A1919] rounded-[5px] mb-4 w-[49%] !p-[5px] !px-[10px] !py-[10px]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
