import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'
import YourPosts from '../components/YourPosts'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Profile() {
    const [auth] = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const [file, setFile] = useState();
    const id = auth.user._id;

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handlePhoto = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData;
            formData.append('id', id);
            formData.append('file', file)
            const res = await axios.post("https://nexus-backend-4fnk.onrender.com/updatephoto", formData)
            if (res.data.success) {
                toast.success(res.data.message);
            }
            else {
                toast(res.data.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

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
                    <div className="bg-white w-full shadow rounded-lg p-5">
                        <img
                            className="mb-4 rounded-full border border-gray-200"
                            src={`https://nexus-backend-4fnk.onrender.com/${auth.user.location}`}
                            alt="Profile"
                            style={{ width: '10rem', height: '10rem' }}
                        />
                        <div className="mb-4">
                            <h1 className='font-bold text-xl'>Name: {auth.user.name}</h1>
                            <h1 className='font-bold text-xl'>Email: {auth.user.email}</h1>
                        </div>
                        <Link className="font-bold text-blue-600 hover:underline" to="/forgotpassword">Update Password</Link>
                        <div className='mt-3'>
                            <>
                                <button
                                    onClick={openModal}
                                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                >
                                    Update Profile Photo
                                </button>

                                {/* Main modal */}
                                {isOpen && (
                                    <div
                                        id="authentication-modal"
                                        tabIndex="-1"
                                        aria-hidden="true"
                                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
                                    >
                                        <div className="relative p-4 w-full max-w-md">
                                            {/* Modal content */}
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                {/* Modal header */}
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Upload Your Image
                                                    </h3>
                                                    <button
                                                        onClick={closeModal}
                                                        type="button"
                                                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 14 14"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                            />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                {/* Modal body */}
                                                <div className="p-4 md:p-5">
                                                    <form className="space-y-4" action="#">
                                                        <div>
                                                            <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                                                            <input
                                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                                id="file_input"
                                                                type="file"
                                                                accept='image/*'
                                                                onChange={(e) => setFile(e.target.files[0])}
                                                            />
                                                        </div>


                                                        <button
                                                            type="submit"
                                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            onClick={handlePhoto}
                                                        >
                                                            Update Photo
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>


                    <YourPosts />

                </div>
            </div>
            <Footer />
        </div>
    )
}
