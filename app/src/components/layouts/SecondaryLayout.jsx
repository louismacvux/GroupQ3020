import React, { useContext } from 'react'
import TitleBar from '../navigation/TitleBar'
import NavBar from "../navigation/NavBar";
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import toTitleCase from '../../js/utils/toTitleCase';

const SecondaryLayout = (props) => {
     const { pathname } = useLocation();
     let title = toTitleCase(pathname.slice(pathname.lastIndexOf('/') + 1));
     document.title = title;
     return (
          <div className="relative flex flex-col h-full place-items-stretch overflow-hidden">
               <TitleBar title={title} className="relative w-full z-50 top-0 left-0" />
               <div className="relative inset-0 p-8 z-0 flex-grow overflow-y-scroll border-t border-b">
                    <Outlet />
               </div>
               <NavBar className="relative bottom-0 left-0 w-full z-50" />
          </div>
     )
}

export default SecondaryLayout;