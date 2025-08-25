import { Outlet } from "react-router";
import { TbChecklist, TbMenu } from "react-icons/tb";
import Navigation from "./common/Navigate";
import { useState } from "react";
import { userStore } from "../store/store";
import './styles/Layout.css'


export default function Layout(){
    console.log("Store:\n",userStore.getState().user)
    
    const [sideBarOpen, setSideBarOpen]=useState(false)
    function handleSideBar(){
        setSideBarOpen(!sideBarOpen)
    }
    function handleOuterSidebar(){
        return sideBarOpen? handleSideBar():""
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
            <main className="main-content" onClick={handleOuterSidebar}>
                <TbMenu className="menu-toggle" onClick={handleSideBar} />

                <Outlet></Outlet>
            </main>
        </div>
        
        </>
    )
}