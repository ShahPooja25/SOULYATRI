// src/components/UserPublicProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove, 
    increment, 
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


const UserPublicProfile = () => {
    const { userId } = useParams(); 
    const navigate = useNavigate();

   /*************************************************************** */
    const currentUserUid = "Madhulikaid";
    /********************************************************** */


    const [profileUser, setProfileUser] = useState(null); 
    const [isFollowing, setIsFollowing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("posts"); 
    const [showCommentBox, setShowCommentBox] = useState({});
    const [commentText, setCommentText] = useState({});
    const [expandedComments, setExpandedComments] = useState({});

    useEffect(() => {
    
        if (!userId || !currentUserUid) {
            setLoading(false);
            setError("User ID or current user UID is missing.");
            return;
        }

     
        if (userId === currentUserUid) {
            navigate('/community/profile'); 
            return;
        }

        setLoading(true); 

      
        const unsubProfileUser = onSnapshot(doc(db, 'users', userId), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfileUser({
                    id: docSnap.id,
                    name: data.name || "Unnamed User",
                    avatar: data.avatar || "https://i.pravatar.cc/150?img=15",
                    bio: data.bio || "",
                    followersCount: data.followersCount || 0,
                    followingCount: data.followingCount || 0,
               
                    followers: data.followers || [],
                    following: data.following || []
                });
            } else {
                setError("User not found.");
                setProfileUser(null); 
            }
        }, (err) => {
            console.error("Error listening to profile user doc:", err);
            setError("Failed to load profile data.");
        });

       
        const unsubCurrentUser = onSnapshot(doc(db, 'users', currentUserUid), (docSnap) => {
            if (docSnap.exists()) {
                const currentUserData = docSnap.data();
                const currentUserFollowing = currentUserData.following || []; 
                setIsFollowing(currentUserFollowing.includes(userId)); 
            } else {
                console.warn("Current user document not found. Cannot determine follow status.");
                setIsFollowing(false); 
            }
            setLoading(false); 
        }, (err) => {
            console.error("Error listening to current user doc for follow status:", err);
            setLoading(false);
        });

     
        const unsubPosts = onSnapshot(
            query(collection(db, "posts"), where("userId", "==", userId), orderBy("timestamp", "desc")),
            (snap) => {
                const arr = [];
                snap.forEach((p) => arr.push({ id: p.id, ...p.data() }));
                setPosts(arr);
            }, (err) => {
                console.error("Error listening to public user posts:", err);
            }
        );

        
        return () => {
            unsubProfileUser();
            unsubCurrentUser();
            unsubPosts();
        };

    }, [userId, currentUserUid, navigate]); 

  
    const handleFollowToggle = async () => {
       
        if (!currentUserUid || !userId || currentUserUid === userId) {
            console.warn("Invalid follow/unfollow attempt: Current user or target user UID is invalid, or attempting to follow self.");
            return;
        }

        const currentUserDocRef = doc(db, "users", currentUserUid);
        const targetUserDocRef = doc(db, "users", userId);

        try {
            if (isFollowing) {
                // Unfollow logic
                await updateDoc(currentUserDocRef, {
                    following: arrayRemove(userId), // Remove target user's UID from current user's following array
                    followingCount: increment(-1) // Decrement current user's following count
                });
                await updateDoc(targetUserDocRef, {
                    followers: arrayRemove(currentUserUid), // Remove current user's UID from target user's followers array
                    followersCount: increment(-1) // Decrement target user's followers count
                });
                console.log(`[Follow] ${currentUserUid} unfollowed ${userId}`);
            } else {
                // Follow logic
                await updateDoc(currentUserDocRef, {
                    following: arrayUnion(userId), // Add target user's UID to current user's following array
                    followingCount: increment(1) // Increment current user's following count
                });
                await updateDoc(targetUserDocRef, {
                    followers: arrayUnion(currentUserUid), // Add current user's UID to target user's followers array
                    followersCount: increment(1) // Increment target user's followers count
                });
                console.log(`[Follow] ${currentUserUid} followed ${userId}`);
            }
            // The UI (button text and counts) will update automatically due to onSnapshot listeners
        } catch (error) {
            console.error("Error toggling follow status:", error);
            // Optionally show a user-friendly error message
            // alert("Failed to update follow status. Please try again."); // Avoid alert() in Canvas
        }
    };

    const handleLike = async (postId) => {
   
        const postRef = doc(db, "posts", postId);
        try {
            const postSnapshot = await getDoc(postRef);
            if (!postSnapshot.exists()) return;
            const postData = postSnapshot.data();
            const likedBy = postData.likedBy || [];
            const isLiked = likedBy.includes(currentUserUid);
            const updatedLikes = isLiked ? postData.likes - 1 : postData.likes + 1;
            const updatedLikedBy = isLiked ? likedBy.filter(uid => uid !== currentUserUid) : [...likedBy, currentUserUid];
            await updateDoc(postRef, {
                likes: updatedLikes,
                likedBy: updatedLikedBy
            });
        } catch (error) {
            console.error("Error toggling like: ", error);
        }
    };

    const toggleComments = (pid) => setShowCommentBox((p) => ({ ...p, [pid]: !p[pid] }));

    const submitComment = async (pid) => {
        //  by the currentUserUid
        const text = (commentText[pid] || "").trim();
        if (!text) return;
        await updateDoc(doc(db, "posts", pid), { comments: arrayUnion({ userId: currentUserUid, text, timestamp: new Date() }) });
        setCommentText((p) => ({ ...p, [pid]: "" }));
    };

    
    const Stat = ({ num, label, onClick }) => (
        <div
            className="text-center text-sm font-medium cursor-pointer"
            onClick={onClick}
        >
            <p>{num}</p>
            <p className="text-gray-600">{label}</p>
        </div>
    );

    // Conditional Rendering for loading, error, and no profile found states
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDF9F6] flex items-center justify-center">
                <p className="text-gray-500">Loading user profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FDF9F6] flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="min-h-screen bg-[#FDF9F6] flex items-center justify-center">
                <p className="text-gray-500">User profile not found.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#FDF9F6] min-h-screen w-full">
            <div className="sticky top-0 z-20 bg-[#a3bf93] pb-2">
                <div className="flex justify-between items-center px-4 pt-4">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-600 cursor-pointer" onClick={() => navigate(-1)} />
                    <h2 className="text-xl font-bold">User Profile</h2>
                    {/* */}
                </div>
                <div className="bg-[#a3bf93] mt-2 px-4 py-4 rounded-xl mx-4">
                    <div className="flex items-center gap-4">
                        <img src={profileUser.avatar || "https://i.pravatar.cc/150?img=15"} alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow" />
                        <div>
                            <p className="font-semibold text-lg">{profileUser.name}</p>
                            {profileUser.bio && (<p className="text-sm text-gray-700 mt-1">{profileUser.bio}</p>)}
                        </div>
                    </div>
                    {/* Followers/Following Counts and Posts Count - CLICKABLE */}
                    <div className="flex justify-around mt-4">
                        <Stat
                            num={profileUser.followersCount || 0}
                            label="Followers"
                            onClick={() => navigate(`/community/profile/${userId}/connections?tab=followers`)}
                        />
                        <Stat
                            num={profileUser.followingCount || 0}
                            label="Following"
                            onClick={() => navigate(`/community/profile/${userId}/connections?tab=following`)}
                        />
                        <Stat num={posts.length} label="posts" /> {/* Posts non-clickable */}
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {currentUserUid !== userId && (
                            <button
                                onClick={handleFollowToggle}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                                    isFollowing
                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Styling for 'Following' state
                                        : 'bg-blue-500 text-white hover:bg-blue-600' // Styling for 'Follow' state
                                }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        )}
                        
                        <button
                            onClick={() => console.log('Message button clicked for', profileUser.name)} // Placeholder for Message functionality
                            className="px-6 py-2 rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                        >
                            Message
                        </button>
                    </div>
                </div>
                {/* Only 'posts' tab for public profile, no drafts tab */}
                <div className="flex justify-around bg-gray-800 text-pink-400 text-sm font-semibold rounded-xl mx-4 mt-4">
                    <button className={`w-full py-2 text-white border-b-2 border-pink-400`}>posts</button>
                </div>
            </div>

            <div className="px-4 mt-4 space-y-6">
                {posts.length === 0 && (<p className="text-center text-gray-500 mt-6">No posts yet.</p>)}

                {posts.map((post) => {
                    const commentsArr = Array.isArray(post.comments) ? post.comments : [];
                    const commentsToDisplay = expandedComments[post.id] ? commentsArr : commentsArr.slice(Math.max(commentsArr.length - 2, 0));
                    const isLiked = (post.likedBy || []).includes(currentUserUid);
                    return (
                        <div key={post.id} className="bg-white p-4 rounded-3xl shadow-md">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <img src={profileUser.avatar || "https://i.pravatar.cc/150?img=15"} alt="avatar" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-sm">{profileUser.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {post.timestamp ? new Date(post.timestamp.toDate()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                                        </p>
                                    </div>
                                </div>
                                {/* No menu for edit/delete on public profile */}
                            </div>
                            <p className="text-sm text-gray-800 mb-2">{post.content}</p>
                            {post.tags && post.tags.length > 0 && (
                                <div className="text-xs text-gray-500 mt-2 mb-2">
                                    {post.tags.map(tag => <span key={tag} className="mr-1">#{tag}</span>)}
                                </div>
                            )}
                            {post.image && <div className="mt-2 relative w-full h-56 flex justify-center items-center overflow-hidden rounded-2xl bg-gray-100"><img src={post.image} alt="post" className="w-full h-full object-contain" /></div>}
                            <div className="flex justify-between items-center mt-4 px-1 text-gray-600 text-sm">
                                <div className="flex items-center gap-4">
                                    <div onClick={() => handleLike(post.id)} className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded-full transition ${isLiked ? "bg-pink-100 text-pink-600" : ""}`}>❤️ <span>{post.likes || 0}</span></div>
                                    <div onClick={() => toggleComments(post.id)} className="flex items-center gap-1 cursor-pointer">💬 <span>{commentsArr.length}</span></div>
                                </div>
                                <div className="cursor-pointer">↗️ Share</div>
                            </div>
                            {showCommentBox[post.id] && (
                                <div className="mt-3 space-y-2">
                                    {commentsToDisplay.map((c, i) => (<div key={i} className="text-sm text-gray-700"><span className="font-semibold">{c.userId}:</span> {c.text}</div>))}
                                    {commentsArr.length > 2 && (<p onClick={() => setExpandedComments((p) => ({ ...p, [post.id]: !p[post.id] }))} className="text-xs text-blue-600 cursor-pointer">{expandedComments[post.id] ? "View less" : "View all comments"}</p>)}
                                    <div className="flex gap-2 mt-2">
                                        <input className="flex-1 px-3 py-2 border rounded-xl text-sm" placeholder="Write a comment…" value={commentText[post.id] || ""} onChange={(e) => setCommentText((p) => ({ ...p, [post.id]: e.target.value }))} />
                                        <button className="text-blue-600 text-sm font-medium" onClick={() => submitComment(post.id)}>Post</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserPublicProfile;