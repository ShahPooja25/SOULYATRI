// src/components/UserSettings.jsx

import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import axios from 'axios'; 

function UserSettings() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null); 

    /************************************************* */
    const currentUserUid = 'Madhulikaid';
/***************************************************************** */


    
    const [bio, setBio] = useState('');
    const [originalBio, setOriginalBio] = useState('');
    const [loading, setLoading] = useState(true);
    const [savingBio, setSavingBio] = useState(false); 
    const [bioSaveSuccess, setBioSaveSuccess] = useState(false); 
    const [error, setError] = useState(null);

    // NEW: State for Profile Picture management
    const [currentAvatar, setCurrentAvatar] = useState("https://i.pravatar.cc/150?img=15"); 
    const [selectedImageFile, setSelectedImageFile] = useState(null); 
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null); 
    const [uploadingAvatar, setUploadingAvatar] = useState(false); 
    const [avatarSaveSuccess, setAvatarSaveSuccess] = useState(false); 
    const [avatarError, setAvatarError] = useState(null);
/************************************************************************************************************* */
    // Cloudinary configuration
    const CLOUDINARY_CLOUD_NAME = 'dbv7ximdy'; // my Cloudinary Cloud Name
    const CLOUDINARY_UPLOAD_PRESET = 'profile_image_upload'; // my Cloudinary Upload Preset Name
/******************************************************************************************************************** */
    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUserUid) {
                setError("User not authenticated.");
                setLoading(false);
                return;
            }
            try {
                const userRef = doc(db, 'users', currentUserUid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setBio(userData.bio || '');
                    setOriginalBio(userData.bio || '');
                    setCurrentAvatar(userData.avatar || "https://i.pravatar.cc/150?img=15"); // Set current avatar
                } else {
                    console.log("No such user document for current user! Initializing with defaults.");
                   
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load settings. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUserUid]);

    // Existing Bio Save Logic
    const handleSaveBio = async () => {
        if (bio === originalBio) {
            setBioSaveSuccess(true);
            setTimeout(() => setBioSaveSuccess(false), 3000);
            return;
        }

        setSavingBio(true);
        setError(null);
        setBioSaveSuccess(false);
        try {
            const userRef = doc(db, 'users', currentUserUid);
            await updateDoc(userRef, {
                bio: bio
            });
            setOriginalBio(bio);
            setBioSaveSuccess(true);
            setTimeout(() => setBioSaveSuccess(false), 3000);
        } catch (err) {
            console.error("Error saving bio:", err);
            setError("Failed to save bio. Please try again.");
        } finally {
            setSavingBio(false);
        }
    };

    // Handle image selection from file input
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file)); // Create a local URL for preview
            setAvatarError(null); // Clear any previous avatar errors
        } else {
            setSelectedImageFile(null);
            setImagePreviewUrl(null);
        }
    };

    
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // NEW: Upload image to Cloudinary
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
            return response.data.secure_url; // Return the secure URL of the uploaded image
        } catch (err) {
            console.error("Cloudinary Upload Error:", err.response?.data || err.message);
            throw new Error("Image upload failed."); // Re-throw to be caught by handleSaveProfilePicture
        }
    };

   
    const handleSaveProfilePicture = async () => {
        if (!selectedImageFile) {
            setAvatarError("Please select an image first.");
            return;
        }
        if (!currentUserUid) {
            setAvatarError("User not authenticated. Cannot save profile picture.");
            return;
        }

        setUploadingAvatar(true);
        setAvatarError(null);
        setAvatarSaveSuccess(false);

        try {
            const imageUrl = await uploadToCloudinary(selectedImageFile);
            if (imageUrl) {
                const userRef = doc(db, 'users', currentUserUid);
                await updateDoc(userRef, {
                    avatar: imageUrl // Update the 'avatar' field in Firestore
                });
                setCurrentAvatar(imageUrl); // Update local state to reflect new avatar
                setSelectedImageFile(null); 
                setImagePreviewUrl(null); 
                setAvatarSaveSuccess(true);
                setTimeout(() => setAvatarSaveSuccess(false), 3000);
            } else {
                throw new Error("Failed to get image URL from Cloudinary.");
            }
        } catch (err) {
            console.error("Error saving profile picture:", err);
            setAvatarError(err.message || "Failed to save profile picture. Please try again.");
        } finally {
            setUploadingAvatar(false);
        }
    };


    if (loading) {
        return <div className="p-4 text-center text-gray-600">Loading settings...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                    <ArrowLeftIcon
                        className="h-6 w-6 text-gray-600 cursor-pointer mr-4"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="text-2xl font-bold text-gray-800">User Settings</h1>
                </div>

                {/* General Error Display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Profile Picture Section */}
                <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Picture</h2>
                    <div className="flex flex-col items-center mb-4">
                        <img
                            src={imagePreviewUrl || currentAvatar} // Show preview or current avatar
                            alt="Profile Avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            accept="image/*"
                            className="hidden" // Hide the default file input
                        />
                        <button
                            onClick={triggerFileInput}
                            className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Choose New Photo
                        </button>
                    </div>

                    {avatarError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{avatarError}</span>
                        </div>
                    )}

                    {avatarSaveSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">Profile picture updated successfully!</span>
                        </div>
                    )}

                    <button
                        onClick={handleSaveProfilePicture}
                        disabled={!selectedImageFile || uploadingAvatar}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-200
                            ${!selectedImageFile || uploadingAvatar
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            }`}
                    >
                        {uploadingAvatar ? 'Uploading & Saving...' : 'Save Profile Picture'}
                    </button>
                </div>

                {/* Bio Section (existing) */}
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Bio</h2>
                    <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                        Edit Bio
                    </label>
                    <textarea
                        id="bio"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                        rows="5"
                        placeholder="Tell us a little about yourself..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength="200"
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-1">{bio.length}/200 characters</p>

                    {bioSaveSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <span className="block sm:inline">Bio saved successfully!</span>
                        </div>
                    )}

                    <button
                        onClick={handleSaveBio}
                        disabled={savingBio || bio === originalBio}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-200 mt-4
                            ${savingBio || bio === originalBio
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            }`}
                    >
                        {savingBio ? 'Saving Bio...' : 'Save Bio'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserSettings;