import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';

export default function Conversations() {
    const [auth] = useAuth();
    const [chats, setChats] = useState();
    const [message, setMessage] = useState();
    const senderId = auth.user._id;
    const { id } = useParams();
    const receiverId = id;

    const sendChat = async () => {
        try {
            const res = await axios.post("https://nexus-backend-4fnk.onrender.com/sendmessage", { senderId, receiverId, message });
        } catch (error) {
            console.log(error);
        }
    }

    const getMessages = async () => {
        try {
            const mess = await axios.post("https://nexus-backend-4fnk.onrender.com/getmessages", { senderId, receiverId });
            setChats(mess.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getMessages();
    })

    return (
        <div>
            <Navbar />
            <div className="w-full bg-indigo-100 h-screen flex flex-row flex-wrap justify-center">

                {/* Begin Navbar */}

                <div className="bg-white shadow-lg border-t-4 border-indigo-500 absolute bottom-0 w-full md:w-0 md:hidden flex flex-row flex-wrap">
                    <div className="w-full text-right"><button className="p-2 fa fa-bars text-4xl text-gray-600"></button></div>
                </div>

                <div className="w-0 md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg">
                    <div className="p-5 bg-white sticky top-0">
                        <img className="border border-indigo-100 shadow-lg round" src={`https://nexus-backend-4fnk.onrender.com/${auth.user.location}`} alt="Profile" />
                        <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                            {auth.user.name}
                        </div>
                    </div>
                    <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
                        <Link className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold" to="/home"><i className="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Home</Link>
                        <Link className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold" to="/profile"><i className="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Profile</Link>
                        <Link className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold" to="/messages"><i className="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Messages</Link>
                        <Link className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold" to="/followers"><i className="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Followers</Link>
                        <Link className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold" to="/following"><i className="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Following</Link>
                        <Link className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold" to="/search"><i className="fa fa-arrow-left text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Search</Link>
                    </div>
                </div>

                {/* End Navbar */}

                <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased">
                    <div className="flex flex-col h-screen">

                        <div className="flex-1 bg-gray-200 p-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                            {
                                chats && chats.messages && chats.messages.length > 0 ? (
                                    chats.messages.map(chat => (
                                        chat.senderId === senderId ? (

                                            <div className="mb-4 text-right">
                                                <span className="inline-block p-2 rounded-lg bg-blue-500 text-white">
                                                    {chat.message}
                                                </span>
                                            </div>

                                        ) : (
                                            <div className="mb-4 text-left">
                                                <span className="inline-block p-2 rounded-lg bg-gray-300">
                                                    {chat.message}
                                                </span>
                                            </div>
                                        )

                                    ))
                                ) : (<></>)

                            }




                        </div>
                        <div className="flex items-center p-4 bg-gray-300">
                            <input
                                type="text"
                                className="flex-1 px-2 py-1 rounded-lg border border-gray-400 mr-2"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={sendChat}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
