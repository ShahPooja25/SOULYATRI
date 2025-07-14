// src/components/UserConnections.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const UserConnections = () => {
    const { userId } = useParams(); // Get the user ID from the URL (this is the profile being viewed)
    const [searchParams] = useSearchParams(); // Get URL query parameters
    const navigate = useNavigate();

    const initialTab = searchParams.get('tab') || 'followers'; // Default to 'followers' if no tab is specified
    const [activeTab, setActiveTab] = useState(initialTab);

    // State to store lists of user objects (with name, avatar, id)
    const [followersList, setFollowersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // This ensures the tab state updates if you manually change the URL query param
        setActiveTab(searchParams.get('tab') || 'followers');
    }, [searchParams]);

    useEffect(() => {
        if (!userId) {
            setError("User ID is missing from the URL.");
            setLoading(false);
            return;
        }

        console.log(`[UserConnections DEBUG] Fetching data for userId: ${userId}`);
        setLoading(true);
        setError(null);

        const userRef = doc(db, "users", userId);

        // Use onSnapshot for real-time updates of the user's connections
        const unsubscribe = onSnapshot(userRef, async (docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("[UserConnections DEBUG] User document data received:", userData);

                // Ensure followers and following are treated as arrays, even if undefined or null
                const followersUids = userData.followers || [];
                const followingUids = userData.following || [];

                console.log("[UserConnections DEBUG] Retrieved followers UIDs from DB:", followersUids);
                console.log("[UserConnections DEBUG] Retrieved following UIDs from DB:", followingUids);

                // Function to fetch details for a list of UIDs
                const fetchUserDetails = async (uids, listName) => {
                    if (uids.length === 0) {
                        console.log(`[UserConnections DEBUG] No UIDs to fetch for ${listName}.`);
                        return []; // Return empty array if no UIDs to fetch
                    }
                    console.log(`[UserConnections DEBUG] Starting to fetch details for ${uids.length} UIDs in ${listName}...`);
                    const promises = uids.map(async (uid) => {
                        try {
                            const userDoc = await getDoc(doc(db, "users", uid));
                            if (userDoc.exists()) {
                                const data = userDoc.data();
                                console.log(`[UserConnections DEBUG] Fetched details for ${listName} UID ${uid}:`, data.name);
                                return { id: uid, name: data.name, avatar: data.avatar };
                            } else {
                                console.warn(`[UserConnections DEBUG] User document not found for ${listName} UID: ${uid}. This user might have been deleted.`);
                                return null;
                            }
                        } catch (fetchError) {
                            console.error(`[UserConnections DEBUG] Error fetching details for ${listName} UID ${uid}:`, fetchError);
                            return null;
                        }
                    });
                    // Wait for all promises to resolve and filter out any null results
                    const results = (await Promise.all(promises)).filter(Boolean);
                    console.log(`[UserConnections DEBUG] Finished fetching details for ${listName}. Result count: ${results.length}`);
                    return results;
                };

                // Fetch both lists concurrently
                const [fetchedFollowers, fetchedFollowing] = await Promise.all([
                    fetchUserDetails(followersUids, "followers"),
                    fetchUserDetails(followingUids, "following")
                ]);

                setFollowersList(fetchedFollowers);
                setFollowingList(fetchedFollowing);
                setLoading(false);
                console.log("[UserConnections DEBUG] Final Follower list state:", fetchedFollowers);
                console.log("[UserConnections DEBUG] Final Following list state:", fetchedFollowing);

            } else {
                setError("User document not found for this profile.");
                setLoading(false);
                console.error(`[UserConnections DEBUG] User document with ID ${userId} does not exist.`);
            }
        }, (err) => {
            console.error("[UserConnections DEBUG] Firestore onSnapshot error:", err);
            setError("Failed to load connections due to a network or database error.");
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, [userId]); // Dependency array: re-run effect if userId changes

    // Helper component to render a single user in the list (UI similar to search page)
    const UserListItem = ({ user }) => (
        <div
            className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => navigate(`/community/profile/${user.id}`)} // Navigate to user's public profile
        >
            <img src={user.avatar || "https://i.pravatar.cc/150?img=15"} alt={user.name || "User Avatar"} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
            <p className="font-semibold text-lg text-gray-800">{user.name || "Unnamed User"}</p>
        </div>
    );

    return (
        <div className="bg-[#FDF9F6] min-h-screen w-full">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#a3bf93] p-4 flex items-center justify-between rounded-b-2xl shadow-md">
                <ArrowLeftIcon
                    className="w-6 h-6 text-gray-800 cursor-pointer"
                    onClick={() => navigate(-1)} // Go back to the previous page
                />
                <h2 className="text-xl font-bold text-white">Connections</h2>
                <div className="w-6"></div> {/* Placeholder for alignment */}
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-around bg-gray-800 text-pink-400 text-sm font-semibold rounded-xl mx-4 mt-4 shadow-lg">
                <button
                    className={`w-full py-3 rounded-l-xl ${activeTab === "followers" ? "bg-pink-500 text-white" : "text-pink-400 hover:bg-gray-700"}`}
                    onClick={() => { setActiveTab("followers"); navigate(`/community/profile/${userId}/connections?tab=followers`, { replace: true }); }}
                >
                    Followers ({followersList.length})
                </button>
                <button
                    className={`w-full py-3 rounded-r-xl ${activeTab === "following" ? "bg-pink-500 text-white" : "text-pink-400 hover:bg-gray-700"}`}
                    onClick={() => { setActiveTab("following"); navigate(`/community/profile/${userId}/connections?tab=following`, { replace: true }); }}
                >
                    Following ({followingList.length})
                </button>
            </div>

            {/* Content Display */}
            <div className="p-4 mt-4">
                {loading && <p className="text-center text-gray-600">Loading connections...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}

                {!loading && !error && (
                    <>
                        {activeTab === "followers" && (
                            followersList.length > 0 ? (
                                followersList.map((user) => (
                                    <UserListItem key={user.id} user={user} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No followers yet.</p>
                            )
                        )}

                        {activeTab === "following" && (
                            followingList.length > 0 ? (
                                followingList.map((user) => (
                                    <UserListItem key={user.id} user={user} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500">Not following anyone yet.</p>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserConnections;