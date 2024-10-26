import React, { useState } from 'react'
import EditorNavbar from '../Components/EditorNavbar'
import Editor from '@monaco-editor/react';
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";


const Editior = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setISExpanded] = useState(false);
  const changeTheme = () => {
    if (isLightMode) {
      document.querySelector(".EditiorNavbar").style.background = "#141414";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      document.querySelector(".EditiorNavbar").style.background = "#f4f4f4";
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  return (
    <>
    <EditorNavbar/>
    <div className="flex">
        <div className={`left w-[${isExpanded ? "100%" : "50%"}]`}>
            <div className="tabs flex  items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
              <div className="tabs flex items-center gap-2">
              <div className="tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">HTML</div>
                <div className="tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">Css</div>
                <div className="tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">Javascript</div>
              </div>

              <div className="flex items-center gap-2">
                <i className="text-[20px] cursor-pointer" onClick={changeTheme}><MdLightMode /></i>
                <i className="text-[20px] cursor-pointer" onClick={() => { setIsExpanded(!isExpanded);}}><AiOutlineExpandAlt /></i>
              </div>
                
            </div>
            <Editor height="81vh" theme={isLightMode ? "vs-light" : "vs-dark"} defaultLanguage="javascript" defaultValue="// some comment" />
        </div>
        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-[50%] min-h-[82vh] bg-[#fff] text-black"
            title="output"
          />
        )}
    </div>
    </>
  )
}

export default Editior