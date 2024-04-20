import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Posts() {
    const [auth] = useAuth();
    const lid = auth.user._id;
    const [tweet, setTweet] = useState();
    useEffect(() => {
        axios.get("https://nexus-backend-4fnk.onrender.com/getpost")
            .then(res => setTweet(res.data))
            .catch(err => console.log(err));
    });

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


    return (
        <div>
            <div className="mt-3">
                {tweet && tweet.length > 0 ? (
                    tweet.map(tweetItem => (
                        <div className="bg-white rounded-lg shadow-md mb-4" key={tweetItem._id}>
                            <div className="p-4 flex items-center">
                                <img
                                    src={`https://nexus-backend-4fnk.onrender.com/${tweetItem.photo}`}
                                    alt="User Avatar"
                                    className="rounded-full w-12 h-12 mr-4"
                                />
                                <div>
                                    <span className="text-lg font-bold">{tweetItem.name}</span>

                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <p className="text-gray-800">{tweetItem.post}</p>
                            </div>
                            {tweetItem.location && (
                                <img
                                    className="w-full rounded-b-lg shadow-lg"
                                    src={`https://nexus-backend-4fnk.onrender.com/${tweetItem.location}`}
                                    alt="post"
                                />
                            )}
                            <div className="p-2 border-t border-gray-200 flex justify-between">
                                <button
                                    className="hover:bg-gray-200 py-2 px-4 text-gray-700 font-semibold"
                                    onClick={() => likePost(tweetItem._id, tweetItem.pid)}
                                >
                                    {tweetItem.likes.length} ❤️ Likes
                                </button>
                                <Link
                                    to={`/comments/${tweetItem._id}`}
                                    className="hover:bg-gray-200 py-2 px-4 border-l text-gray-700 font-semibold"
                                >
                                    Comment
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-4">No posts to display.</div>
                )}
            </div>

        </div>
    )
}
