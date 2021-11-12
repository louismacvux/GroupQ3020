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
          <div className="flex flex-col h-full place-items-stretch">
               <TitleBar title={title} />
               <div className="p-8 flex-grow overflow-y-scroll">
                    <Outlet />
               </div>
               <NavBar />
          </div>
     )
}

export default SecondaryLayout;