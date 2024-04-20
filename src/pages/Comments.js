import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

export default function Comments() {
    const { id } = useParams();
    const [auth] = useAuth();
    const name = auth.user.name;

    const [comment, setComment] = useState();

    const fetchDetails = async () => {
        const res = await axios.get(`https://nexus-backend-4fnk.onrender.com/getpostdetails/${id}`);
        setDetails(res.data);
    }

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            const comm = await axios.post("https://nexus-backend-4fnk.onrender.com/addcomment", { id, name, comment });
            if (comm.data.success) {
                toast.success(comm.data.message);
            }
            else {
                toast(comm.data.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const [details, setDetails] = useState([])
    useEffect(() => {
        fetchDetails();
    })
    return (
        <div>
            <Navbar />
            <div className="w-full bg-indigo-100 min-h-screen flex flex-row justify-center items-center">
                {details && (
                    <div className="max-w-xl bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center">
                            <img
                                src={`https://nexus-backend-4fnk.onrender.com/${details.photo}`}
                                alt="User Avatar"
                                className="rounded-full w-12 h-12 mr-4"
                            />
                            <div>
                                <span className="text-lg font-bold">{details.name}</span>
                                <p className="text-sm text-gray-600">{details.email}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-md text-gray-700">{details.post}</p>
                            <img className="mt-4 rounded-lg shadow-lg w-full h-72 object-cover" src={`https://nexus-backend-4fnk.onrender.com/${details.location}`} alt="Post" />
                        </div>
                        <div className="mt-4">
                            <textarea className="bg-gray-200 w-full rounded-lg shadow border p-4" value={comment} onChange={(e) => setComment(e.target.value)} rows="3" placeholder="Add Comment"></textarea>
                            <button type="button" onClick={handleComment} className="float-right bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg mt-4">Submit</button>
                        </div>
                        <div className="bg-white border border-gray-200 shadow-md rounded-lg mt-4">
                            {/* Comments Section */}
                            {details.comments && details.comments.length > 0 ? (
                                details.comments.map(comment => (
                                    <div key={comment._id} className="p-4 border-b border-gray-200">
                                        <span className="text-sm font-semibold">{comment.name}</span>
                                        <p className="text-sm text-gray-700">{comment.text}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4">
                                    <p className="text-sm text-gray-700">No comments yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
