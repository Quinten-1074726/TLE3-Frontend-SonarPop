import React, {useEffect, useState} from 'react';
import {Camera, Search, X, Plus, UserPlus} from 'lucide-react';
import PrimaryButton from "./PrimaryButton.jsx";
import SecondaryButton from "./SecondaryButton.jsx";
import {useNavigate, useParams} from "react-router"

function EditCollaboratorComponent({isCOpen, onClose}) {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    const [collaborators, setCollaborators] = useState([
        {
            id: 1,
            name: 'User 1',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
        },
        {
            id: 2,
            name: 'User 2',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        {
            id: 3,
            name: 'User 3',
            avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop'
        }
    ]);
    const [formData, setFormData] = useState({
        collaborators: "",
    })

    const getPlaylist = async () => {
        try {
            const response = await fetch({
                method: "GET",
                headers: {
                    Accept: "application/json"
                },
            })
            const data = await response.json()
            setFormData({
                collaborators: data.collaborators,
            })
        } catch(error) {
            console.log("Cannot fetch playlist data", error)
        }
    }

    useEffect(() => {
        if (id)
            getPlaylist()
    }, [id]);

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        savePlaylist()
    }

    const savePlaylist = async () => {
        try {
            const response = await fetch({
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    collaborators: formData.collaborators,
                })
            })
            if (response.ok) navigate("/")
        } catch (error) {
            console.log("Cannot save playlist ", error)
        }
    }

    if (!isCOpen) return null
    return (

        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 ">
            <div className="bg-[#0D2132] rounded-2xl">


                <div className="p-2 flex justify-end">
                    {/* Close modal button */}
                    <SecondaryButton
                        onClick={onClose}
                        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-20"
                    >
                        <X size={24}/>
                    </SecondaryButton>
                </div>
                <form onSubmit={handleSubmit} method="POST">

                        {/* Search collaboraters */}
                        <div className="mb-10">
                            <label className="block text-sm font-semibold text-[#DEF9F6] mb-2 uppercase tracking-wider">Add
                                collaborators</label>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search friends..."
                                    className="w-full bg-[#d1d1d1] border-none rounded-xl pl-4 pr-10 py-3 focus:ring-2 focus:ring-red-400 outline-none transition-all placeholder:text-gray-500"
                                    onChange={handleInputChange}
                                    value={formData.collaborators}
                                />
                                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#181919]"/>
                            </div>

                            {/* Friend list*/}
                            <div className="flex justify-between items-center px-2">
                                <div className="flex -space-x-3 overflow-hidden">
                                    {collaborators.map((user) => (
                                        <img
                                            key={user.id}
                                            className="inline-block h-16 w-16 rounded-full ring-4 ring-[#f0f0f0] object-cover hover:scale-110 transition-transform cursor-pointer"
                                            src={user.image}
                                            alt={user.name}
                                        />
                                    ))}
                                    <button
                                        className="h-16 w-16 rounded-full bg-white flex items-center justify-center ring-4 ring-[#f0f0f0] text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                                        {/* Size of the profile image */}
                                        <UserPlus size={24}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center w-full">
                            {/* Save button */}
                            <PrimaryButton type="submit">
                                Save
                            </PrimaryButton>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default EditCollaboratorComponent