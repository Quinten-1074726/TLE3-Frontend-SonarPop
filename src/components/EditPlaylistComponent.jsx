import React, {useEffect, useState} from 'react';
import {Camera, Search, X, Plus, UserPlus} from 'lucide-react';
import PrimaryButton from "./PrimaryButton.jsx";
import SecondaryButton from "./SecondaryButton.jsx";
import {useNavigate, useParams} from "react-router"

function EditPlaylistComponent({isOpen, onClose}) {
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
        playlistImage: "",
        playlistName: "",
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
                playlistImage: data.playlistImage,
                playlistName: data.playlistName,
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
                    playlistImage: formData.playlistImage,
                    playlistName: formData.playlistName,
                    collaborators: formData.collaborators,
                })
            })
            if (response.ok) navigate("/")
        } catch (error) {
            console.log("Cannot save playlist ", error)
        }
    }

    if (!isOpen) return null
    return (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6">
            <div className="relative w-full max-w-xl max-h-[90vh] bg-[#0D2132] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

                {/* Close Button */}
                <div className="flex justify-end p-4 absolute right-0 top-0 z-20">
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#DEF9F6] tracking-tight">
                            Edit playlist
                        </h2>

                        {/* Upload image section */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                            <div className="relative group cursor-pointer">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                                    <Camera size={32} className="text-gray-500 group-hover:scale-110 transition-transform" />
                                    <input
                                        type="file"
                                        onChange={handleInputChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col text-center sm:text-left">
                                <span className="text-lg font-semibold text-[#DEF9F6]">Upload cover image</span>
                                <span className="text-xs text-gray-400">PNG or JPG (max. 5MB)</span>
                            </div>
                        </div>

                        {/* Playlist name */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold text-[#DEF9F6] mb-2 uppercase tracking-widest opacity-70">
                                Playlist name
                            </label>
                            <input
                                type="text"
                                placeholder="My awesome playlist..."
                                value={formData.playlistName}
                                onChange={handleInputChange}
                                className="w-full bg-white/10 text-white border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-teal-400 outline-none transition-all placeholder:text-gray-500"
                            />
                        </div>

                        {/* Collaborators */}
                        <div className="mb-10">
                            <label className="block text-xs font-bold text-[#DEF9F6] mb-2 uppercase tracking-widest opacity-70">
                                Add collaborators
                            </label>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search friends..."
                                    className="w-full bg-white/10 text-white border-none rounded-xl pl-4 pr-12 py-4 focus:ring-2 focus:ring-teal-400 outline-none transition-all placeholder:text-gray-500"
                                    onChange={handleInputChange}
                                    value={formData.collaborators}
                                />
                                <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>

                            {/* Friend list */}
                            <div className="flex flex-wrap items-center gap-3 px-1">
                                <div className="flex -space-x-3">
                                    {collaborators.map((user) => (
                                        <img
                                            key={user.id}
                                            className="inline-block h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-4 ring-[#0D2132] object-cover hover:translate-y-[-4px] transition-transform cursor-pointer"
                                            src={user.image}
                                            alt={user.name}
                                        />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-teal-500/10 border-2 border-dashed border-teal-500/30 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-white transition-all shadow-sm"
                                >
                                    <UserPlus size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                className="w-full bg-teal-500 hover:bg-teal-400 text-[#0D2132] font-bold py-4 rounded-xl transition-all active:scale-95"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full sm:hidden bg-white/5 text-white py-4 rounded-xl font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditPlaylistComponent