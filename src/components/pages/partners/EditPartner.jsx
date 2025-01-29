import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    BarChart3,
    Building2,
    Calendar,
    FileText,
    Home,
    MessageSquare,
    Settings,
    Settings2,
    Star,
    Users2,
    Wallet,
  } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    FiSearch,
    FiMessageSquare,
    FiBell,
    FiChevronDown,
  } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { MdVerifiedUser, MdCancel, MdDownloadForOffline } from "react-icons/md";
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
import Header from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebar';

function EditPartner() {
    const {id} = useParams();
    const [partnerInfo, setPartnerInfo] = useState({});
    const [partnerData, setPartnerData] = useState({
      address: '',
      email: '',
      phoneNumber: '',
      duration: '',
      break: '',
      verified:'',
      document:''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [servicesData, setServiceData] = useState([]);
    const [packagesData, setPackageData] = useState([]);
    const [isEditingVerify, setIsEditingVerify] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      async function fetchData(){
        if (id){
          try{
            const response = await axios.get(`http://localhost:3000/api/partner/info/${id}`);
            setPartnerInfo(response.data);
            setPartnerData({
              address: response.data.partner.address,
              email: response.data.partner.email,
              phoneNumber: response.data.partner.phoneNumber,
              duration: response.data.partner.duration,
              break: response.data.partner.break,
              verified: response.data.partner.verified,
              document: response.data.partner.document
            });
            setServiceData(response.data.serviceData);
            setPackageData(response.data.packageData);
          } catch(err){
            console.error(err);
          }
        } 
      }
      fetchData();
    }, [id])

    function toggleEdit(){
      setIsEditing(!isEditing);
    }

    function toggleEditVerify(){
      setIsEditingVerify(!isEditingVerify);
    }

    function handleChange(e){
      const { name, value } = e.target;
      setPartnerData({ ...partnerData, [name]: value});
    }

    async function deletePartner(id){
      try{
        const response = await axios.delete(`http://localhost:3000/api/partner/${id}`);
        alert("Partner deleted successfully");
        navigate("/partners")
      } catch(err){
        console.error(err);
      }
    }

    async function handleSave(){
      try{
        await axios.patch(`http://localhost:3000/api/partner/${id}`, partnerData);
        setIsEditing(false);
        alert("Partner data updated successfully");
        navigate("/partners")
      } catch(err){
        console.error(err);
        alert("Partner data not updated due to an error");
      }
    }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header Section */}
      <Header />
      <div className="flex flex-row items-start justify-between ">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-1 mt-20 ml-64">
        {/* Patrner information */}
        <main className='p-6'>
          <div className="flex items-center justify-between text-sm">
            <div>
              <Link to="/teachers" className='flex items-center text-gray-400 hover:text-black'>
                <FaArrowLeft />
                <span className="pl-2">Back</span>
              </Link>
              <h1 className="text-2xl font-semibold"> Partner Information</h1>
            </div>
            <div className="w-auto flex justify-around">
              <Link to="/teachers">
                <Button className="w-auto bg-[white] text-[#1abc9c] vorder-2 mr-3 border-2" variant="secondary">
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
          <div className="w-full mt-6 pb-6 flex flex-col flex-grow gap-4">
            <div className='flex flex-row gap-4'>
              <div className='flex flex-col gap-4 basis-2/3'>
                <Card>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className='flex p-8 items-center'>
                            { partnerInfo.success ? (
                              <div className="flex items-center">
                                <div className='bg-[#00796b] p-4 rounded-full text-2xl h-16 w-16 flex items-center justify-center text-white font-bold mr-4'>
                                  {partnerInfo.partner.name[0]}
                                </div>
                                <div>
                                  <div className='font-bold mb-1'>
                                    {partnerInfo.partner.businessName}
                                  </div>
                                  <div className='text-gray-600'>
                                    <div className='font-semibold'>Owner: {partnerInfo.partner.name}</div>
                                    <div>Country: {partnerInfo.partner.country}</div>
                                    <div>Bookings: {partnerInfo.partner.numOfOrders}</div>
                                    <div>User since: {partnerInfo.partner.dateJoined}</div>
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div>
                                Cannot fetch data
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="p-8">
                            <div className="font-bold mb-4 flex flex-col">
                              Partner Notes
                            </div>
                            <label className='text-gray-400 flex flex-col'>
                              Notes
                              <input type='text' placeholder='Add notes about partner' className='w-auto h-[60px] px-4 border rounded-sm border-gray-300' name='notes' />
                            </label>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <CardHeader className='font-bold'>Partner Bookings</CardHeader>
                    <Table>
                      <TableHeader className='border-b-2'>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Booking Status</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partnerInfo.success ? (partnerInfo.orders.map((order) => (
                          <TableRow key={order.orderId}>
                            <TableCell>{order.orderId}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${
                                order.status === "Completed"
                                ? "bg-green-600"
                                : "bg-gray-400"
                              }`}>
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell>${order.price}</TableCell>
                          </TableRow>
                        ))):(
                          <TableRow>
                            <TableCell>No bookings found</TableCell>
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
                          <TableCell className="flex items-center">
                            {partnerInfo.success ? (
                              <div className='w-full'>
                                <div className="flex justify-between">
                                  <div className="font-bold mb-6">Overview</div>
                                  <div className='text-[#1abc9c] cursor-pointer' onClick={toggleEdit}>
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
                                          value={partnerData.address}
                                          onChange={handleChange}
                                          className="border px-2 py-1 rounded"
                                          />
                                        ) : (
                                          partnerData.address
                                        )}
                                    </div>
                                    <div className='flex flex-col mb-6'>
                                        <span className='text-gray-400'>E-mail</span>
                                        {isEditing ? (
                                          <input
                                          type="email"
                                          name="email"
                                          value={partnerData.email}
                                          onChange={handleChange}
                                          className="border px-2 py-1 rounded"
                                          />
                                        ) : (
                                          partnerData.email
                                        )}
                                    </div>
                                    <div className='flex flex-col mb-6'>
                                      <span className='text-gray-400'>Phone</span>
                                      {isEditing ? (
                                        <input
                                        type="text"
                                        name="phoneNumber"
                                        value={partnerData.phoneNumber}
                                        onChange={handleChange}
                                        className="border px-2 py-1 rounded"
                                        />
                                      ) : (
                                        partnerData.phoneNumber
                                      )}
                                    </div>
                                    <div className='flex flex-col mb-6'>
                                      <span className='text-gray-400'>Duration</span>
                                      {isEditing ? (
                                        <input
                                        type="text"
                                        name="duration"
                                        value={partnerData.duration}
                                        onChange={handleChange}
                                        className="border px-2 py-1 rounded"
                                        />
                                      ) : (
                                        partnerData.duration
                                      )}
                                    </div>
                                    <div className='flex flex-col'>
                                      <span className='text-gray-400'>Break</span>
                                      {isEditing ? (
                                        <input
                                        type="text"
                                        name="break"
                                        value={partnerData.break}
                                        onChange={handleChange}
                                        className="border px-2 py-1 rounded"
                                        />
                                      ) : (
                                        partnerData.break
                                      )}
                                    </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                Cannot fetch data
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="text-red-600 cursor-pointer" onClick={() => deletePartner(id)}> Delete User</div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <CardHeader className='font-bold px-0'>Verification</CardHeader>
                      <span className="text-[#1abc9c] cursor-pointer" onClick={toggleEditVerify}>
                        {isEditingVerify ? "Save" : "Edit"}
                      </span>
                    </div>
                    <div>
                      <div className='flex items-center'>
                        <span className='text-gray-400 mr-2'>Status</span> {partnerData.verified ? (<MdVerifiedUser />) : (<MdCancel />)}
                      </div>
                      <span>
                        {partnerData.verified ? "Verified" : "Not Verified"}
                      </span>
                    </div>
                    <div className={`pt-2 flex ${partnerData.verified && !isEditingVerify ? 'p-2 bg-yellow-100 mt-6 border-2 border-[#1abc9c] justify-center rounded-2xl cursor-pointer hover:bg-yellow-200' : ''}`}>
                      Document - {partnerData.verified && !isEditingVerify ? (
                        <div className='flex items-center'>
                          <span className='mr-2'>{partnerData.document}</span>
                          <MdDownloadForOffline />
                        </div> ): (
                          <span className='text-red-500'>
                            Not Available
                          </span>
                        )}
                    </div>
                    {isEditingVerify ? (
                      <div className='p-2 flex mt-6 bg-yellow-100 border-2 border-[#1abc9c] justify-center rounded-2xl cursor-pointer hover:bg-yellow-200'>
                        Verify
                      </div>
                    ) : ''}
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className='grid grid-cols-2 w-full gap-4'>
              <Card>
                <CardContent>
                  <CardHeader className='font-bold'>Partner Services</CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {servicesData && servicesData.length > 0 ? (
                        servicesData.map((service) => (
                          <TableRow key={service.serviceId}>
                            <TableCell>{service.serviceName}</TableCell>
                            <TableCell>${service.price}</TableCell>
                            <TableCell>{service.duration}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align='center'>No services found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <CardHeader className='font-bold'>Partner Services</CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Package Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Services</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {packagesData && packagesData.length > 0 ? (
                        packagesData.map((packages) => (
                          <TableRow key={packages.packageId}>
                            <TableCell>{packages.packageName}</TableCell>
                            <TableCell>${packages.price}</TableCell>
                            <TableCell>{packages.duration}</TableCell>
                            <TableCell>{packages.includedServices.join(', ')}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align='center'>No services found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
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

export default EditPartner;