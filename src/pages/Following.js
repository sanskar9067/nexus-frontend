import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/auth'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Following() {
    const [auth] = useAuth();
    const [followers, setFollowers] = useState();
    const id = auth.user._id;

    const fetchFollowing = async () => {
        try {
            const res = await axios.post("https://nexus-backend-4fnk.onrender.com/getfollowing", { id });
            if (res.data.success) {
                setFollowers(res.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {

        fetchFollowing();
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
                    <h1 className="text-center mb-4 text-4xl font-bold">Following</h1>
                    {followers && followers.following && followers.following.length > 0 ? (
                        followers.following.map(follower => (
                            <div className="flex justify-center" key={follower.id}>


                                <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow my-4">
                                    <div class="flex justify-end px-4 pt-4">

                                    </div>
                                    <div class="flex flex-col items-center pb-10">
                                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={`https://nexus-backend-4fnk.onrender.com/${follower.profilePhoto}`} alt="Bonnie image" />
                                        <h5 class="mb-1 text-xl font-medium text-gray-900">{follower.name}</h5>
                                        <span class="text-sm text-gray-500 dark:text-gray-700">{follower.email}</span>
                                        <div class="flex mt-4 md:mt-6">
                                            <Link to={`/userprofile/${follower.id}`} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <>No Following</>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    )
}
