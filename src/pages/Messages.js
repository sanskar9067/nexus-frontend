import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';
import { useAuth } from '../context/auth';
import axios from 'axios';
import Designer from '../assets/Designer.jpeg'

export default function Messages() {
    const [auth] = useAuth();
    const id = auth.user._id;
    const [users, setUsers] = useState();

    const fetchUsers = async () => {
        try {
            const res = await axios.post("https://nexus-backend-4fnk.onrender.com/chatusers", { id });
            if (res.data.success) {
                setUsers(res.data);

            }
        } catch (error) {
            console.log(error);
        }
    }

    const sendDetails = async () => {
        try {
            const res = await axios.post("https://nexus-backend-4fnk.onrender.com/")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

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
                <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased">
                    <div className="flex flex-col md:flex-row"> {/* Use flex-col for mobile view */}
                        <div className="w-full md:w-1/4 bg-gray-200 md:h-full"> {/* Use w-full for mobile view */}
                            <div className="flex justify-center md:h-full"> {/* Use md:h-full for consistency */}
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Users
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users && users.chatUsers && users.chatUsers.length > 0 ? (
                                            users.chatUsers.map(user => (
                                                <tr key={user._id}>
                                                    <td className="px-6 py-4">
                                                        <Link to={`/messages/${user._id}`} className="flex items-center focus:outline-none">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full" src={`https://nexus-backend-4fnk.onrender.com/${user.location}`} alt={user.name} />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm leading-5 font-medium text-gray-900">{user.name}</div>
                                                                <div className="text-sm leading-5 text-gray-500">{user.status}</div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="1">No users</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full md:w-3/4 bg-gray-300 md:h-full"> {/* Use w-full for mobile view */}
                            {/* Conditionally render the image based on screen size */}
                            {window.innerWidth >= 768 && (
                                <div className="flex justify-center">
                                    <img src={Designer} style={{ height: "54rem" }} alt="Designer" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}
