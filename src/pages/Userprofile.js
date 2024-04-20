import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

export default function Userprofile() {
    const [auth] = useAuth();
    const lid = auth.user._id;
    const [details, setDetails] = useState();
    const { id } = useParams();
    const fetchData = async () => {
        try {
            const res = await axios.get(`https://nexus-backend-4fnk.onrender.com/userdetails/${id}`);
            if (res.data.success) {
                setDetails(res.data);
            }

        }

        catch (err) {
            console.log(err);
        }
    }

    const likePost = async (actualid, postid) => {
        try {
            console.log(postid);
            console.log(lid);
            const res = await axios.post("https://nexus-backend-4fnk.onrender.com/like", { actualid, postid, lid });
            if (res.data.success) {
                toast.success(res.data.message);

            }
            else {
                toast.success(res.data.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    })
    return (
        <div>
            <Navbar />
            {details && (<>
                <div className="w-full bg-indigo-100 h-screen flex flex-row flex-wrap justify-center">

                    {/* Begin Navbar */}

                    <div className="bg-white shadow-lg border-t-4 border-indigo-500 absolute bottom-0 w-full md:w-0 md:hidden flex flex-row flex-wrap">
                        <div className="w-full text-right"><button className="p-2 fa fa-bars text-4xl text-gray-600"></button></div>
                    </div>

                    <div className="w-0 md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg">
                        <div className="p-5 bg-white sticky top-0">
                            <img className="border border-indigo-100 shadow-lg round" src={`https://nexus-backend-4fnk.onrender.com/${details.user.location}`} alt="Profile" />
                            <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                                {details.user.name}
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


                        <div>
                            {
                                details.posts && details.posts.length > 0 ? (
                                    details.posts.map(posts => (
                                        <div className="bg-white rounded-lg shadow-md mb-4" key={posts._id}>
                                            <div className="p-4 flex items-center">
                                                <img
                                                    src={`https://nexus-backend-4fnk.onrender.com/${posts.photo}`}
                                                    alt="User Avatar"
                                                    className="rounded-full w-12 h-12 mr-4"
                                                />
                                                <div>
                                                    <span className="text-lg font-bold">{posts.name}</span>

                                                </div>
                                            </div>
                                            <div className="p-4 border-t border-gray-200">
                                                <p className="text-gray-800">{posts.post}</p>
                                            </div>
                                            {posts.location && (
                                                <img
                                                    className="w-full rounded-b-lg shadow-lg"
                                                    src={`https://nexus-backend-4fnk.onrender.com/${posts.location}`}
                                                    alt="post"
                                                />
                                            )}
                                            <div className="p-2 border-t border-gray-200 flex justify-between">
                                                <button
                                                    className="hover:bg-gray-200 py-2 px-4 text-gray-700 font-semibold"
                                                    onClick={() => likePost(posts._id, posts.pid)}
                                                >
                                                    {posts.likes.length} ❤️ Likes
                                                </button>
                                                <Link
                                                    to={`/comments/${posts._id}`}
                                                    className="hover:bg-gray-200 py-2 px-4 border-l text-gray-700 font-semibold"
                                                >
                                                    Comment
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (<div>No Posts to display</div>)
                            }
                        </div>



                    </div>
                </div>
            </>)}
            <Footer />
        </div>
    )
}
