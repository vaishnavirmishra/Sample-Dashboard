import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    BarChart3,
    Building2,
    Calendar,
    ChevronDown,
    FileText,
    Home,
    MessageSquare,
    Settings,
    Settings2,
    ShieldCheck,
    Star,
    Users2,
    Wallet,
  } from "lucide-react";

function Sidebar() {
    const activeClass = 'w-full justify-start gap-2 hover:bg-[#00796b] bg-[#1abc9c] text-white'
    const inactiveClass = 'w-full justify-start gap-2 text-gray-600 hover:bg-gray-50'
  return (
    <div
        className="flex w-64 flex-col border-r bg-white px-3 py-4 fixed mt-20"
        style={{ backgroundColor: "#f3f4f6" }}
        >
        <div className="space-y-1 bg">
            <NavLink to="/dashboard" className={({isActive}) => `${isActive ? activeClass : inactiveClass} flex items-center p-3 rounded-md text-sm font-semibold`}>
                <Home className="h-4 w-4" />
                Dashboard
            </NavLink>
            <NavLink to="/student" className={({isActive}) => `${isActive ? activeClass : inactiveClass} flex items-center p-3 rounded-md text-sm font-semibold`}>
            <Users2 className="h-4 w-4" />
                Students
            </NavLink>
            <NavLink to="/teachers" className={({isActive}) => `${isActive ? activeClass : inactiveClass} flex items-center p-3 rounded-md text-sm font-semibold`}>
                
                <Building2 className="h-4 w-4" />
                    Teachers
            </NavLink>
            <NavLink to="/subjects" className={({isActive}) => `${isActive ? activeClass : inactiveClass} flex items-center p-3 rounded-md text-sm font-semibold`}>
                <Calendar className="h-4 w-4" />
                Subjects
            </NavLink>
            <NavLink to="/reports" className={({isActive}) => `${isActive ? activeClass : inactiveClass} flex items-center p-3 rounded-md text-sm font-semibold`}>
                <BarChart3 className="h-4 w-4" />
                Reports
            </NavLink>
            <NavLink to="/dispute-resolution" className={({isActive}) => `${isActive ? activeClass : inactiveClass} flex items-center p-3 rounded-md text-sm font-semibold`}>
                <MessageSquare className="h-4 w-4" />
                Dispute Resolution
            </NavLink>
          </div>
          <div className="mt-20 space-y-1">
            <div className="px-3 text-xs font-medium text-gray-500 ">
              Settings
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-50"
            >
              <Settings2 className="h-4 w-4" />
              Global Settings
            </Button>
          </div>
    </div>
  )
}

export default Sidebar