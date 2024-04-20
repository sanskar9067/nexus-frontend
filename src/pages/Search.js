import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Search() {
    const [auth] = useAuth();
    const [news, setNews] = useState();
    const [user, setUser] = useState();
    const authId = auth.user._id;
    const authName = auth.user.name;
    const authEmail = auth.user.email;
    const authProfilePhoto = auth.user.location;
    const [usedet, setUsedet] = useState();
    const fetchNews = async () => {
        const api = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=094a4894ab104804ba60b7ad67c19153";
        const response = await fetch(api);
        const res = await response.json();
        setNews(res);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post("https://nexus-backend-4fnk.onrender.com/searchuser", { user });
            if (res.data.success) {
                toast.success(res.data.message);
                setUsedet(res);
            }
            else {
                toast.success(res.data.message);
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const handleFollow = async (userId, userName, userProfilePhoto, userEmail) => {
        try {
            const follow = await axios.post("https://nexus-backend-4fnk.onrender.com/follow", { authId, userId, authName, userName, authProfilePhoto, userProfilePhoto, authEmail, userEmail });
            if (follow.data.success) {
                toast.success(follow.data.message);
            }
            else {
                toast("Already Followed");
            }
        }
        catch (err) {
            console.log(err);
            toast("Already Followed");
        }
    }

    useEffect(() => {
        fetchNews();
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

                {/* End Navbar */}

                <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased">
                    <div className="bg-white w-full shadow rounded-lg p-5">
                        <form class="max-w-md mx-auto">
                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users" required />
                                <button type="button" onClick={handleSearch} class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>
                    </div>

                    {
                        usedet && usedet.data.user && usedet.data.user.length > 0 ? (
                            <div className='flex justify-center mt-5'>
                                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                                    <div className="flex flex-col items-center pb-10 pt-4">
                                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`https://nexus-backend-4fnk.onrender.com/${usedet.data.user[0].location}`} alt="Bonnie image" />
                                        <h5 className="mb-1 text-xl font-medium text-gray-900">{usedet.data.user[0].name}</h5>
                                        <div className="flex mt-4 md:mt-6">
                                            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleFollow(usedet.data.user[0]._id, usedet.data.user[0].name, usedet.data.user[0].location, usedet.data.user[0].email)}>Follow</button>
                                            <Link to={`/userprofile/${usedet.data.user[0]._id}`} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-600">View Profile</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='flex justify-center mt-5'>User not found</div>
                        )
                    }



                    <div>




                    </div>


                    {/*<YourPosts />*/}
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto max-w-7x1">
                            <div className="flex flex-wrap w-full mb-4 p-4">
                                <div className="w-full mb-6 lg:mb-0">
                                    <h1 className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">Latest Articles</h1>
                                    <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                                </div>
                            </div>
                            <div className="flex flex-wrap -m-4">
                                {
                                    news && (
                                        <div className="xl:w-1/3 md:w-1/2 p-4">
                                            <div className="bg-white p-6 rounded-lg">
                                                <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6" src={news.articles[0].urlToImage} alt="Image Size 720x400" />
                                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{news.articles[0].author}</h3>
                                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{news.articles[0].title}</h2>
                                                <p className="leading-relaxed text-base">{news.articles[0].description}</p>
                                                <a href={news.articles[0].url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">Read more</a>
                                            </div>
                                        </div>

                                    )
                                }
                                {
                                    news && (
                                        <div className="xl:w-1/3 md:w-1/2 p-4">
                                            <div className="bg-white p-6 rounded-lg">
                                                <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6" src={news.articles[1].urlToImage} alt="Image Size 720x400" />
                                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{news.articles[1].author}</h3>
                                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{news.articles[1].title}</h2>
                                                <p className="leading-relaxed text-base">{news.articles[1].description}</p>
                                                <a href={news.articles[1].url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">Read more</a>
                                            </div>
                                        </div>

                                    )
                                }
                                {
                                    news && (
                                        <div className="xl:w-1/3 md:w-1/2 p-4">
                                            <div className="bg-white p-6 rounded-lg">
                                                <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6" src={news.articles[2].urlToImage} alt="Image Size 720x400" />
                                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{news.articles[2].author}</h3>
                                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{news.articles[2].title}</h2>
                                                <p className="leading-relaxed text-base">{news.articles[2].description}</p>
                                                <a href={news.articles[2].url} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">Read more</a>
                                            </div>
                                        </div>

                                    )
                                }


                                {/* Add the remaining divs with similar structure */}
                            </div>
                        </div>
                    </section >

                </div>
            </div>
            <Footer />
        </div>

    )
}
