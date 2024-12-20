import DashboardHeader from "./DashboadHeader";
import SideBar from "./SideBar"
import { Navigate, Outlet } from "react-router";

export default function Dashboard() {

    const token = localStorage.getItem("auth-admin");
    if (!token) return <Navigate to={"/"} />;
    
    return (
        <div className="grid grid-rows-2">
            <DashboardHeader/>
            <div className="grid grid-cols-12 min-h-screen">
                <div className="col-span-3 p-5 bg-stone-100 ">
                    <SideBar/>
                </div>
                <div className="col-span-9 border border-gray-300 m-3 rounded-md">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

