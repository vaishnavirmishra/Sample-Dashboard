import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    FiSearch,
    FiPlus,
    FiTrash,
  } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight, FaSortAlphaDown } from "react-icons/fa";
import {RiEditLine} from "react-icons/ri";
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

export default function User() {
    const [userData, setUserData] = useState([]);
    const [userPerPage, setUserPerPage] = useState({});
    const [totalPage, setTotalPage] = useState(0); 
    const [currentPage, setCurrentPage]= useState(1);

    const [selectedUser, setSelectedUser] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        //Fetching user data
        axios
            .get(`http://localhost:3000/api/all`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }, [selectedUser]);

    function handleStatusChange(newStatus){
        setStatus(newStatus);
        setCurrentPage(1);
    }

    useEffect(() => {
        //Fetching only 10 users using pagination
        axios
            .get(`http://localhost:3000/api/users`, {
                params: {
                    status: status,
                    page: currentPage,
                }
            })
            .then((response) => {
                setUserPerPage(response.data);
                setTotalPage(response.data.totalPages);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }, [selectedUser, currentPage, status])

    function handleSelectAll(){
        try{
            if (selectedUser.length === userPerPage.users.length) {
                setSelectedUser([]);
                setIsAllSelected(false);
            } else {
                setSelectedUser(userPerPage.users.map((user) => user.userId));
                setIsAllSelected(true);
            }
        } catch(err){
            console.error(err);
        }
    }

    function handleUserSelect(userId){
        setSelectedUser((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    }

    function handlePageChange(page){
        setCurrentPage(page);
    }
    let result = -1;
    if (userPerPage.users && userPerPage.users.length>0){
        result = userPerPage.users.length;
    }

    async function deleteSelectedUsers(){
        if (selectedUser.length===0){
            alert("No user was selected");
            return;
        }

        try{
            const response = await axios.post('http://localhost:3000/api/user/delete', {userIds: selectedUser});
            setSelectedUser([]);
            alert("Selected users deleted");
            navigate("/user");
        }catch(err){
            console.error(err);
        }
    }

    function editSelectedUser(){
        if (selectedUser.length===0){
            alert("No user was selected");
            return;
        } else if (selectedUser.length>1){
            alert("More than one users selected");
            return;
        }

        const userId = selectedUser[0];
        navigate(`/student/edit/${userId}`);
    }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-row items-start justify-between ">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 ml-64 mt-20">
                {/* User Content */}
                <main className="p-6">
                    <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Students</h1>
                    <div className='w-[250px] flex justify-evenly'>
                    <Link to="/student/add">
                        <Button
                        variant="secondary"
                        className="w-auto bg-[#1abc9c] text-white hover:text-[#1abc9c] hover:border-2 hover:bg-white"
                        >
                            <FiPlus />
                            Add Student
                        </Button>
                    </Link>
                    <Button
                        variant="secondary"
                        className="w-auto bg-[white] text-[#1abc9c] border-2"
                        >
                            Export
                        </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="h-[150px] rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none border-none relative overflow-hidden">
                            <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                            <CardTitle className="text-2xl font-semibold">
                                {userData.totalNumber}
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="text-sem font-semibold text-gray-500 pb-2">
                                Total Users
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
                        <Card className="rounded-none relative border-none relative">
                            <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                            <CardTitle className="text-2xl font-semibold">
                                {userData.totalNumberActive}
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="text-sm font-semibold text-gray-500 pb-2">
                                Active Users
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

                        <Card className="rounded-none relative border-none relative">
                            <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                            <CardTitle className="text-2xl font-semibold">
                                {userData.totalNumberInactive}
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="text-sm font-semibold text-gray-500 pb-2">
                                Inactive Users
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
                                {userData.totalNumberSuspended}
                            </CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="text-sm font-semibold text-gray-500 pb-2">
                                Suspended Users
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
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                                <SelectItem value="Suspended">Suspended</SelectItem>
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
                                        <RiEditLine className='border-2 mx-1 h-9 w-9 p-2 rounded-md cursor-pointer' onClick={editSelectedUser}/>
                                        <FiTrash className='border-2 mx-1 h-9 w-9 p-2 rounded-md cursor-pointer'
                                            onClick={deleteSelectedUsers}
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
                                                <input type="checkbox" className='mx-2 h-4 w-4' checked={isAllSelected} onChange={handleSelectAll}/>
                                                <span>User Id</span>
                                            </label>
                                        </TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Phone Number</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date Joined</TableHead>
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {userPerPage.users && userPerPage.users.length>0 ? (userPerPage.users.map((user) => (
                                        <TableRow key={user.userId}>
                                        <TableCell className="font-medium">
                                            <label className='flex items-center'>
                                                <input 
                                                    type="checkbox" 
                                                    className='mx-2 h-4 w-4' 
                                                    checked={selectedUser.includes(user.userId)}
                                                    onChange={() => handleUserSelect(user.userId)}/>
                                                {user.userId}
                                            </label>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                        <TableCell>
                                            <span
                                            className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${
                                                user.status === "Active"
                                                ? "bg-green-600"
                                                : user.status === "Inactive"
                                                ? "bg-[#ffbf00]"
                                                : "bg-red-600"
                                            }`}
                                            >
                                            {user.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{user.dateJoined}</TableCell>
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