import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

import axios from 'axios';
import { RiCloseFill } from 'react-icons/ri';
import Header from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebar';

const EditUser = () => {
    const { id } = useParams();
    const [userOrderData, setUserOrderData] = useState({})
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        address: '',
        email: '',
        phoneNumber: ''
    })
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData() {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/orders/${id}`);
                    setUserOrderData(response.data);
                    setUserData({
                        address: response.data.user.address,
                        email: response.data.user.email,
                        phoneNumber: response.data.user.phoneNumber
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
        fetchData();
        }, [id])

    // Fetch existing tags on initial load
    useEffect(() => {
        async function fetchTags(){
        try {
            const response = await axios.get(`http://localhost:3000/api/user/${id}/tags`);
            setTags(response.data.tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
        };
        fetchTags();
    }, [id]);

    // Handle Enter key to add a new tag
    async function handleKeyPress(e){
        if (e.key === 'Enter' && tagInput.trim()) {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/user/${id}/tags`, { tags: [tagInput.trim()] });
            setTags(response.data.tags);
            setTagInput('');
        } catch (error) {
            console.error("Error adding tag:", error);
        }
        }
    };

    async function deleteTag(tagToDelete){
        try {
            await axios.delete(`http://localhost:3000/api/user/${id}/tags`, { data: { tag: tagToDelete } });
            setTags((prevTags) => prevTags.filter(tag => tag !== tagToDelete));
        } catch (error) {
            console.error("Error deleting tag:", error);
        }
    };

    function handleChange(e){
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    
    function toggleEdit(){setIsEditing(!isEditing)};

    async function deleteUser(id){
        try{
            const response = await axios.delete(`http://localhost:3000/api/user/${id}`);
            alert("User Deleted Successfully");
            navigate("/user");
        } catch(err) {
            console.error(err);
        }
    }

    async function handleSave(){
        try{
            await axios.patch(`http://localhost:3000/api/user/${id}`, userData);
            setIsEditing(false);
            alert("User data updated successfully");
        }catch(err){
            console.error(err);
            alert("User data was not updated due to an error");
        }
    }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-row items-start justify-between">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1">
                {/* User Content */}
                <main className="p-6">
                    <div className="flex items-center justify-between text-sm">
                        <div>
                            <Link to="/user" className='flex items-center text-gray-400 hover:text-black'>
                                <FaArrowLeft />
                                <span className='pl-2'>Back</span>
                            </Link>
                            <h1 className="text-2xl font-semibold">User Information</h1>
                        </div>
                        <div className='w-auto flex justify-around'>
                        <Link to="/user">
                            <Button
                            variant="secondary"
                            className="w-auto bg-[white] text-[#1abc9c] border-2 mr-3"
                            >
                                Cancel
                            </Button>
                        </Link>

                            <Button
                            type="submit"
                            variant="secondary"
                            className="w-auto bg-[#1abc9c] text-white hover:text-[#1abc9c] hover:border-2 hover:bg-white"
                            onClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                    <div className="w-full mt-6 pb-6 flex flex-row gap-4">
                        <div className='flex flex-col gap-4 basis-2/3'>
                            <Card>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="flex p-8 items-center">
                                                    { userOrderData.success ? (
                                                        <div className="flex items-center">
                                                        <div className="bg-[#00796b] p-4 rounded-full text-2xl h-16 w-16 flex items-center justify-center text-white font-bold mr-4">
                                                        {userOrderData.user.name[0]}
                                                        </div>
                                                
                                                        <div>
                                                        <div className="font-bold mb-1">{userOrderData.user.name}</div>
                                                        <div>
                                                            <div>Country: {userOrderData.user.country}</div>
                                                            <div>Bookings: {userOrderData.numOfOrders}</div>
                                                            <div>User since: {userOrderData.user.dateJoined}</div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    ) : (<div>
                                                        Cannot fetch data: {JSON.stringify(userOrderData)}
                                                    </div>) }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="p-8">
                                                    <div className='font-bold mb-4 flex flex-col'>
                                                        Customer Notes
                                                    </div>
                                                    <label className='text-gray-400 flex flex-col'>
                                                        Notes
                                                        <input type='text' placeholder='Add notes about user' className='w-auto h-[60px] px-4 border rounded-sm border-gray-300' name='notes' />
                                                    </label>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <Card>
                            <CardContent>
                                <CardHeader className='font-bold'>Customer Orders</CardHeader>
                                    <Table>
                                        <TableHeader className='border-b-2'>
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Order Status</TableHead>
                                            <TableHead>Price</TableHead>
                                        </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                        {userOrderData.success ? (userOrderData.orders.map((order) => (
                                            <TableRow key={order.orderId}>
                                            <TableCell>{order.orderId}</TableCell>
                                            <TableCell>
                                                <span
                                                className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${
                                                    order.status === "Completed"
                                                    ? "bg-green-600"
                                                    : "bg-gray-400"
                                                }`}
                                                >
                                                {order.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>${order.price}</TableCell>
                                            
                                            <TableCell>{order.date}</TableCell>
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
                            </Card>
                        </div>
                        <div className='flex flex-col gap-4 basis-1/3'>
                            <Card>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="flex p-8 items-center">
                                                    {userOrderData.success ? (
                                                        <div className='w-full'>
                                                            <div className='flex justify-between w-auto'>
                                                                <div className="font-bold mb-6">Overview</div>
                                                                <div className='text-blue-600 cursor-pointer' onClick={toggleEdit}>
                                                                    {isEditing ? "Save" : "Edit"}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='flex flex-col mb-6'>
                                                                    <span className='text-gray-400'>Address</span>
                                                                    {isEditing ? (
                                                                        <input
                                                                        type="text"
                                                                        name="address"
                                                                        value={userData.address}
                                                                        onChange={handleChange}
                                                                        className="border px-2 py-1 rounded"
                                                                        />
                                                                    ) : (
                                                                        userData.address
                                                                    )}
                                                                </div>
                                                                <div className='flex flex-col mb-6'>
                                                                    <span className='text-gray-400'>E-mail</span>
                                                                    {isEditing ? (
                                                                        <input
                                                                        type="email"
                                                                        name="email"
                                                                        value={userData.email}
                                                                        onChange={handleChange}
                                                                        className="border px-2 py-1 rounded"
                                                                        />
                                                                    ) : (
                                                                        userData.email
                                                                    )}
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <span className='text-gray-400'>Phone</span>
                                                                    {isEditing ? (
                                                                        <input
                                                                        type="text"
                                                                        name="phoneNumber"
                                                                        value={userData.phoneNumber}
                                                                        onChange={handleChange}
                                                                        className="border px-2 py-1 rounded"
                                                                        />
                                                                    ) : (
                                                                        userData.phoneNumber
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>Cannot fetch data: {JSON.stringify(userOrderData)}</div>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <div className='text-red-600 cursor-pointer' onClick={() => deleteUser(id)}>
                                                        Delete User
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='font-bold'>Tags</CardHeader>
                                <CardContent>
                                    <label className='text-gray-400 flex flex-col'>
                                        Add Tags
                                        <input type='text' placeholder='Add notes about user' className='w-auto h-[60px] px-4 border rounded-sm border-gray-300' name='tags' value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress ={handleKeyPress}/>
                                    </label>

                                    <div className='flex flex-wrap'>
                                    {tags.map((tag, index) => (
                                        <span key={index} className="tag bg-gray-200 text-gray-700 px-2 py-1 mr-4 mt-4 flex items-center">
                                            {tag}
                                            <RiCloseFill className='ml-1 cursor-pointer' onClick={() => deleteTag(tag)}/>
                                        </span>
                                    ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
  )
}

export default EditUser;