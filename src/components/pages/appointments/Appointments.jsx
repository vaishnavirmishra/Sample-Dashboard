import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    FiSearch,
    FiTrash
  } from "react-icons/fi";
import { FaArrowLeft, FaSortAlphaDown, FaArrowRight } from "react-icons/fa";
import { RiEditLine } from 'react-icons/ri';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import axios from 'axios';
import Header from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebar';

function Appointment() {
    const [appointmentStats, setAppointmentStats] = useState([]);
    const [appointmentsPerPage, setAppointmentsPerPage] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [status, setStatus] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/appointments/stats`)
            .then((response) => {
                setAppointmentStats(response.data);
            })
            .catch((err) =>{
                console.error(err);
            })
    }, [selectedAppointment])

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/appointments`, {
                params:{
                    page: currentPage,
                    status: status
                }
            })
            .then((response) => {
                setAppointmentsPerPage(response.data);
                setTotalPage(response.data.totalPages)
            })
            .catch((err) => {
                console.error(err);
            })
    }, [selectedAppointment, status, currentPage]);

    let result = -1;
    if (appointmentsPerPage.appointments && appointmentsPerPage.appointments.length > 0) {
        result=appointmentsPerPage.appointments.length;
    }

    function handleSelectAll(){
        try{
            if (selectedAppointment.length===appointmentsPerPage.appointments.length){
                setSelectedAppointment([]);
                setIsAllSelected(false);
            } else {
                setSelectedAppointment(appointmentsPerPage.appointments.map((appointment) => appointment.appointmentId));
                setIsAllSelected(true);
            }
        } catch(err){
            console.error(err);
        }
    }

    function handleAppointmentSelect(appointmentId){
        setSelectedAppointment((prevSelectedAppointment) => {
            if (prevSelectedAppointment.includes(appointmentId)){
                return prevSelectedAppointment.filter((id) => id !== appointmentId);
            } else {
                return [...prevSelectedAppointment, appointmentId];
            }
        })
    }

    //changing papge
    function handlePageChange(newPage){
        setCurrentPage(newPage);
    }

    //enabling filter
    function handleStatusChange(newStatus){
        setStatus(newStatus);
        setCurrentPage(1);
    }

    //bulk delete
    async function deleteSelectedAppointments(){
        if (selectedAppointment.length===0){
            alert("No user was selected");
            return;
        }

        try{
            const response = await axios.post("http://localhost:3000/api/appointments/delete", {appointmentIds: selectedAppointment});
            setSelectedAppointment([]);
            alert("Selected appointments deleted");
            navigate("/subjects");
        } catch(err){
            console.error(err);
        }
    }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header Section */}
      <Header />
      <div className="flex flex-row items-start justify-between ">
        {/* Sidebar */}
        <Sidebar />
        {/* Main */}
        <div className='flex-1 mt-20 ml-64'>
            <main className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Appointments</h1>
                    <Button
                        variant="secondary"
                        className="w-auto bg-[white] text-[#1abc9c] border-2"
                        >
                        Export
                    </Button>
                </div>
                {/* Stats */}
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="h-[150px] rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none border-none relative overflow-hidden">
                        <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                        <CardTitle className="text-2xl font-semibold">
                            {appointmentStats.totalNumber}
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="text-sem font-semibold text-gray-500 pb-2">
                            Total Appointments
                        </div>
                        <div className="flex items-center   gap-4">
                            <span className="text-green-600 text-md">22.45%</span>
                            <svg
                            class="h-5 w-5 text-green-600 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                d="M5 15l7-7 7 7"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            </svg>
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-none border-none relative">
                        <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                        <CardTitle className="text-2xl font-semibold">
                            {appointmentStats.totalNumberActive}
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="text-sm font-semibold text-gray-500 pb-2">
                            Active Bookings
                        </div>
                        <div className="flex items-center text-md text-green-600 gap-4">
                            <span>15.34%</span>
                            <svg
                            class="h-5 w-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                d="M5 15l7-7 7 7"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            </svg>
                        </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-none relative">
                        <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                        <CardTitle className="text-2xl font-semibold">
                            {appointmentStats.totalNumberScheduled}
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="text-sm font-semibold text-gray-500 pb-2">
                            Scheduled Bookings
                        </div>
                        <div className="flex items-center text-md text-red-600 gap-4">
                            <span>18.25%</span>
                            <svg
                            class="h-5 w-5 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                d="M19 9l-7 7-7-7"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            </svg>
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg relative border-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                        <CardTitle className="text-2xl font-semibold">
                            {appointmentStats.totalNumberCancelled}
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="text-sm font-semibold text-gray-500 pb-2">
                            Cancelled Bookings
                        </div>
                        <div className="flex items-center text-md text-green-600 gap-4">
                            <span>10.24%</span>
                            <svg
                            class="h-5 w-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                d="M5 15l7-7 7 7"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            </svg>
                        </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Table */}
                <div className="w-full mt-6">
                    <Card className="border-none">
                        <CardHeader>
                            <div className="header flex justify-between">
                                <div className="left flex">
                                    <Select defaultValue="All" value={status} onValueChange={(newVal) => handleStatusChange(newVal)}>
                                        <SelectTrigger className="w-[180px] border-2 h-10">
                                        <SelectValue placeholder="Filter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="New">New</SelectItem>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                            <SelectItem value="All">All</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className='flex'>
                                        <FiSearch className="w-5 h-5 text-gray-400 relative left-8 top-2" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-[360px] h-10 pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                        />
                                    </div>
                                </div>
                                <div className='right flex text-[#1abc9c]'>
                                    <FaSortAlphaDown className='border-2 mx-1 h-9 w-9 p-2 rounded-md'/>
                                    <RiEditLine className='border-2 mx-1 h-9 w-9 p-2 rounded-md cursor-pointer' />
                                    <FiTrash className='border-2 mx-1 h-9 w-9 p-2 rounded-md cursor-pointer'
                                        onClick = {deleteSelectedAppointments}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader className='border-b-2'>
                                <TableRow>
                                    <TableHead>
                                        <label className='flex items-center'>
                                            <input type="checkbox" className='mx-2 h-4 w-4' checked={isAllSelected} onChange={handleSelectAll} />
                                            <span>Subject Id</span>
                                        </label>
                                    </TableHead>
                                    <TableHead>Subject Name</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {appointmentsPerPage.appointments && appointmentsPerPage.appointments.length>0 ? (appointmentsPerPage.appointments.map((appointment) => (
                                    <TableRow key={appointment.appointmentId}>
                                    <TableCell className="font-medium">
                                        <label className='flex items-center'>
                                            <input 
                                            type="checkbox" 
                                            className='mx-2 h-4 w-4'
                                            checked={selectedAppointment.includes(appointment.appointmentId)}
                                            onChange={() => handleAppointmentSelect(appointment.appointmentId)} />
                                            {appointment.appointmentId}
                                        </label>
                                    </TableCell>
                                    <TableCell>{appointment.userName}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${
                                            appointment.status === 'Scheduled'
                                            ? 'bg-[#ffbf00]'
                                            : appointment.status === 'Active'
                                            ? 'bg-green-600'
                                            : appointment.status === 'Cancelled'
                                            ? 'bg-red-600'
                                            : 'bg-black'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </TableCell>
                                    </TableRow>
                                ))
                                ) : (
                                    <TableRow>
                                        <TableCell colspan={6} align='center'>
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardContent>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <FaArrowLeft 
                                        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage-1, 1))}
                                        className='cursor-pointer hover:text-gray-400'
                                    />
                                    {[...Array(totalPage)].map((_, index) => (
                                        <Button
                                        key={index + 1}
                                        variant={index + 1 === currentPage ? "contained" : "outlined"}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`mx-1 ${index+1 === currentPage
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-white text-gray-400"
                                        }`}
                                        >
                                        {index + 1}
                                        </Button>
                                    ))}
                                    <FaArrowRight 
                                        onClick={() => setCurrentPage((nextPage) => Math.min(nextPage+1, totalPage))}
                                        className='cursor-pointer hover:text-gray-400'
                                    />
                                </div>
                                <div>
                                    {result} results
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    </div>

    </div>
  )
}

export default Appointment