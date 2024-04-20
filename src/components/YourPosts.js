import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

export default function YourPosts() {
    const [tweet, setTweet] = useState();
    const [auth] = useAuth();
    const pid = auth.user._id;
    const postData = async () => {
        try {
            const res = await axios.get(`https://nexus-backend-4fnk.onrender.com/yourpost?id=${pid}`);
            setTweet(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        const del = await axios.post("https://nexus-backend-4fnk.onrender.com/deletepost", { id });
        if (del.data.success) {
            toast.success(del.data.message);
        }
        else {
            toast.success(del.data.message);
        }
    }

    useEffect(() => {

        postData();
    })
    return (
        <div>
            <div>
                <div className="mt-3 flex flex-col">
                    <div className="mt-3 flex flex-col">
                        {tweet && tweet.length > 0 ? (
                            tweet.map(tweetItem => (
                                <div className="bg-white mt-3" key={tweetItem._id}>
                                    <div className="bg-white border border-gray-200 shadow-md p-4 rounded-lg flex items-start">
                                        <img
                                            src={`https://nexus-backend-4fnk.onrender.com/${tweetItem.photo}`}
                                            alt="User Avatar"
                                            className="rounded-full w-12 h-12 mr-4"
                                        />
                                        <div>
                                            <span className="text-lg font-bold my-10">{tweetItem.name}</span>
                                            <p>{tweetItem.email}</p>
                                        </div>

                                    </div>
                                    <div className="bg-white border border-gray-200 shadow-md p-4 rounded-lg flex items-start">
                                        <p className="text-gray-700">{tweetItem.post}</p>
                                    </div>


                                    <img className="border rounded-t-lg shadow-lg" src={`https://nexus-backend-4fnk.onrender.com/${tweetItem.location}`} alt="post" />
                                    <div className="bg-white p-1 border shadow flex flex-row flex-wrap">
                                        <button onClick={() => handleDelete(tweetItem._id)} className="w-1/2 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold" >Delete</button>

                                    </div>

                                </div>
                            ))
                        ) : (
                            <div>No posts to display.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
