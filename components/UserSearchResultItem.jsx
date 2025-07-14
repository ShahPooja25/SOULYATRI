// src/components/UserSearchResultItem.jsx
import React, { useState, useEffect } from 'react';
import {
    doc,
    onSnapshot,
    updateDoc, 
    arrayUnion, 
    arrayRemove, 
    increment 
} from 'firebase/firestore';
import { db } from '../firebase';


const UserSearchResultItem = ({ user, currentUserUid, handleUserClick }) => {
    const [isFollowingThisUser, setIsFollowingThisUser] = useState(false);

    useEffect(() => {
    
        if (user.id === currentUserUid) return;

        const currentUserDocRef = doc(db, 'users', currentUserUid);
        const unsubscribe = onSnapshot(currentUserDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const currentUserData = docSnap.data();
                const followingList = currentUserData.following || []; // Get the array
                setIsFollowingThisUser(followingList.includes(user.id));
            } else {
                console.warn("Current user document not found for follow status check in UserSearchResultItem.");
                setIsFollowingThisUser(false);
            }
        }, (err) => console.error("Error listening to current user's following status for search result item:", err));

        return () => unsubscribe(); 
    }, [user.id, currentUserUid]);

    const handleFollowToggle = async (e) => {
        e.stopPropagation(); 

        if (!currentUserUid || !user.id || currentUserUid === user.id) {
            console.warn("Invalid follow/unfollow attempt from search item.");
            return;
        }

        const currentUserDocRef = doc(db, "users", currentUserUid);
        const targetUserDocRef = doc(db, "users", user.id); 

        try {
            if (isFollowingThisUser) {
                // Unfollow logic
                await updateDoc(currentUserDocRef, {
                    following: arrayRemove(user.id), // Remove target user's UID from current user's following array
                    followingCount: increment(-1) // Decrement current user's following count
                });
                await updateDoc(targetUserDocRef, {
                    followers: arrayRemove(currentUserUid), // Remove current user's UID from target user's followers array
                    followersCount: increment(-1) // Decrement target user's followers count
                });
                console.log(`[Search Item Follow] ${currentUserUid} unfollowed ${user.id}`);
            } else {
                // Follow logic
                await updateDoc(currentUserDocRef, {
                    following: arrayUnion(user.id), // Add target user's UID to current user's following array
                    followingCount: increment(1) // Increment current user's following count
                });
                await updateDoc(targetUserDocRef, {
                    followers: arrayUnion(currentUserUid), // Add current user's UID to target user's followers array
                    followersCount: increment(1) // Increment target user's followers count
                });
                console.log(`[Search Item Follow] ${currentUserUid} followed ${user.id}`);
            }
            
        } catch (error) {
            console.error("Error toggling follow status from search item:", error);
   
        }
    };

    return (
        <div
            onClick={() => handleUserClick(user.id)} 
            className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-4"> {/* Group avatar and name/bio */}
                <img
                    src={user.avatar || "https://i.pravatar.cc/150?img=15"} 
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    {user.bio && <p className="text-sm text-gray-500 truncate">{user.bio}</p>}
                </div>
            </div>

            {/* Follow Button - only show if not the current user */}
            {user.id !== currentUserUid && (
                <button
                    onClick={handleFollowToggle}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                        isFollowingThisUser
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    {isFollowingThisUser ? 'Following' : 'Follow'}
                </button>
            )}
        </div>
    );
};

export default UserSearchResultItem;