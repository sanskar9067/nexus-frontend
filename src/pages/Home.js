import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/auth'
import { toast } from 'react-toastify';
import axios from 'axios';
import Posts from '../components/Posts';
import { Link } from 'react-router-dom';

export default function Home() {
    const [auth] = useAuth();
    const [post, setPost] = useState();
    const [file, setFile] = useState();
    const name = auth.user.name;
    const pid = auth.user._id;
    const email = auth.user.email;
    const photo = auth.user.location;

    const [joke, setJoke] = useState([]);


    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('pid', pid);
            formData.append('photo', photo);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('post', post);
            formData.append('file', file);
            const res = await axios.post("https://nexus-backend-4fnk.onrender.com/uploadpost", formData);
            if (res.data.success) {
                toast.success(res.data.message);
            }
            else {
                toast(toast.data.message);
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        const fetchJoke = async () => {
            const api = "https://official-joke-api.appspot.com/jokes/random";
            const response = await fetch(api);
            const data = await response.json();
            setJoke(data);
        }

        fetchJoke();
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
                        <img className="border border-indigo-100 shadow-lg  mx-auto" src={`https://nexus-backend-4fnk.onrender.com/${auth.user.location}`} alt="Profile" />
                        <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                            {auth.user.name}
                        </div>
                    </div>

                    <div className="w-full h-screen antialiased flex flex-col">
                        <h1 className="font-bold text-xl text-center my-4">Jokes</h1>
                        <div className="px-4">
                            {joke ? (
                                <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
                                    <p className="text-lg font-semibold">{joke.setup}</p>
                                    <p className="text-gray-700">{joke.punchline}</p>
                                </div>
                            ) : (
                                <div className="bg-gray-100 rounded-lg shadow-md p-4">No joke available.</div>
                            )}
                        </div>
                    </div>
                </div>


                {/* End Navbar */}

                <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased">
                    <div className="bg-white w-full shadow rounded-lg p-5">
                        <textarea
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            className="bg-gray-200 w-full rounded-lg shadow border p-2 mb-4"
                            rows="3"
                            placeholder="Speak your mind"
                        ></textarea>

                        <div className="flex flex-row flex-wrap">
                            <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
                                    Upload file
                                </label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                    id="file_input"
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className="w-full md:w-1/2 lg:w-2/3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    className="bg-indigo-400 hover:bg-indigo-300 text-white p-2 rounded-lg focus:outline-none"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>


                    <Posts />
                </div>
            </div>

            <Footer />
        </div>
    )
}
