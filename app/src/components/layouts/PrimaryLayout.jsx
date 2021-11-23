import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from "../navigation/NavBar";
import { useLocation } from 'react-router-dom';
import toTitleCase from '../../js/utils/toTitleCase';


const PrimaryLayout = (props) => {
     const { pathname } = useLocation();
     let title = toTitleCase(pathname.slice(pathname.lastIndexOf('/') + 1)) || "Home";
     document.title = title;
     return (
          <div className="w-full h-full flex flex-col overflow-hidden">
               <div className="flex-grow p-8 overflow-y-scroll">
                    <Outlet />
               </div>
               <NavBar className="border-t" />
          </div>
     )
}

export default PrimaryLayout