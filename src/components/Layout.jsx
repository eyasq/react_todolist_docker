import { Outlet } from "react-router";
import { TbChecklist, TbMenu } from "react-icons/tb";
import Navigation from "./common/Navigate";
import { useState } from "react";

import './styles/Layout.css'


export default function Layout(){
    
    const [sideBarOpen, setSideBarOpen]=useState(false)
    function handleSideBar(){
        setSideBarOpen(!sideBarOpen)
    }

    return(
        <>
        <div className="layout">
           <aside className={`sidebar ${sideBarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
            <TbChecklist className="logo" />
            <TbMenu className="menu-toggle" onClick={handleSideBar} />
        </div>
        <Navigation />
        </aside>
            <main className="main-content">
                <Outlet></Outlet>
            </main>
        </div>
        
        </>
    )
}