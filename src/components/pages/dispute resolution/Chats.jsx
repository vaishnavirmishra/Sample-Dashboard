import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CiUser } from "react-icons/ci";
import { BiPaperclip } from "react-icons/bi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Chats() {
  const [disputeData, setDisputeData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [disputeId, setDisputeId] = useState(0);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/chat/disputes')
      .then(response => {
        setDisputeData(response.data);
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/chats?disputeId=${disputeId}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(err => {
        console.error(err);
      })
  }, [disputeId]);

  const handleSubmitMessage = async () => {
    if (!messageText.trim()) return; // Prevent empty messages
  
    try {
      const response = await axios.post(`http://localhost:3000/api/chats`, {
        disputeId,
        text: messageText
      });
  
      setMessages(prevChats => [...prevChats, response.data]);
      setMessageText('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send the message. Please try again.');
    }
  };  

  return (
    <div className='flex h-screen overflow-y-hidden'>
      {/* Sidebar */}
      <div className='border-r w-96'>
        <Link to="/dispute-resolution" className='text-sm p-4 pb-0 mt-4 ml-2 flex items-center text-gray-400 hover:text-black'>
          <FaArrowLeft />
          <span className="pl-2">Back</span>
        </Link>
        <h2 className='p-4 pt-0 pb-0 font-bold mb-12'>Conversations</h2>
            <div className='flex justify-center'>
              <div className="relative border w-[80%] rounded-md">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>
        <ul className='mt-4 cursor-pointer'>
          {disputeData.map(dispute => (
            <li key={dispute.userId} className='border-b p-4 flex items-center font-semibold'
            onClick={() => {
              setDisputeId(dispute.disputeId);
            }}>
              <div className='h-8 w-8 bg-[#1abc9c] rounded-full mr-4'></div>
              {dispute.name}
            </li>
          ))}
        </ul>
      </div>
      {/* chatbox */}
      {disputeId === 0 ? (
        <div className='flex h-screen justify-center items-center w-full font-bold text-2xl'>
          Click to see chats
        </div>
      ) : (
        <div className='flex-grow w-full'>
          <Card className='border-none'>
            <CardContent>
              <Table>
                <TableRow>
                  <TableCell className='flex justify-between items-center font-bold p-6'>
                    {disputeData.find(dispute => dispute.disputeId === disputeId).name}
                    <CiUser className='w-6 h-6 text-gray-700'/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="relative flex-grow w-full">
                      <div className='space-y-4 flex flex-col items-between overflow-y-scroll h-[calc(100vh-120px)] p-4'>
                        {messages
                          .filter(chat => chat.disputeId === disputeId)
                          .map(chat => (
                            <div
                              key={chat.messageId}
                              className={`p-3 rounded-lg max-w-md ${
                                chat.senderId === 0
                                  ? 'bg-gray-200 text-black self-end'
                                  : 'bg-orange-500 text-white self-start'
                              }`}
                            >
                              {chat.text}
                            </div>
                          ))}
                      </div>
                      
                      <div className='absolute bottom-0 left-0 right-0 bg-white p-4 border-t-2'>
                          <div className='flex items-evenly gap-4'>
                            {/* Text Input Box */}
                            <input
                              type='text'
                              value={messageText}
                              onChange={e => {
                                setMessageText(e.target.value)
                              }}
                              className='w-full p-2 border-none'
                              placeholder='Type a message...'
                            />

                            <button className='p-2'>
                              <BiPaperclip className='w-6 h-6 text-gray-700'/>
                            </button>

                            {/* Send Button */}
                            <button
                              onClick={handleSubmitMessage}
                              className='p-2 bg-[#1abc9c] px-4 text-white rounded-lg'>
                              Send
                            </button>
                          </div>
                        </div>
                    </div>
                  </TableCell>
                </TableRow>  
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Chats