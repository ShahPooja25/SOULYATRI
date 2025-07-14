
import React, { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon, BellIcon } from '@heroicons/react/24/solid';

import { HeartIcon as SolidHeartIcon, ChatBubbleOvalLeftIcon as SolidChatIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon, ChatBubbleOvalLeftIcon as OutlineChatIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    doc,
    where,
    updateDoc,
    getDoc,
    arrayUnion
} from 'firebase/firestore';
import { db } from '../firebase';

function CommunityFilteredFeed() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [activeTag, setActiveTag] = useState('Trending'); // Default to 'Trending'

    const [showCommentBox, setShowCommentBox] = useState({});
    const [commentText, setCommentText] = useState({});
    const [expandedComments, setExpandedComments] = useState({});

/**************************************************************************************** */
    const currentUserUid = 'Madhulikaid'; // Your current user ID
/*********************************************************************************** */


    useEffect(() => {
        const userDocRef = doc(db, 'users', currentUserUid);
        const unsubscribe = onSnapshot(userDocRef, async (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const userPostsQuery = query(
                    collection(db, 'posts'),
                    where('userId', '==', currentUserUid)
                );

                const userPostsSnapshot = await getDocs(userPostsQuery);

                setLoggedInUser({
                    id: docSnapshot.id,
                    ...userData,
                    totalPosts: userPostsSnapshot.size
                });
            } else {
                setLoggedInUser({
                    name: "Guest User",
                    totalPosts: 0,
                    avatar: "https://i.pravatar.cc/150?img=15",
                    badge: "BASIC",
                    badgeColor: "bg-gray-200 text-gray-700"
                });
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchAndSortPosts = async () => {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const usersMap = {};
            usersSnapshot.forEach(userDoc => {
                usersMap[userDoc.id] = userDoc.data();
            });

            // Always fetch all posts ordered by timestamp
            const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                let fetchedPosts = [];
                snapshot.forEach(postDoc => {
                    const postData = postDoc.data();
                    const author = usersMap[postData.userId];
                    if (author) {
                        fetchedPosts.push({
                            id: postDoc.id,
                            ...postData,
                            name: author.name,
                            avatar: author.avatar,
                            badge: author.badge,
                            badgeColor: author.badgeColor,
                            status: author.status,
                            score: author.score,
                            time: postData.timestamp
                                ? new Date(postData.timestamp.toDate()).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                                : 'N/A',
                        });
                    }
                });

                // Apply custom sorting if a specific tag is active (not 'Trending')
                if (activeTag && activeTag !== 'Trending') {
                    const matchingPosts = [];
                    const nonMatchingPosts = [];

                    fetchedPosts.forEach(post => {
                        if (post.tags && post.tags.includes(activeTag)) {
                            matchingPosts.push(post);
                        } else {
                            nonMatchingPosts.push(post);
                        }
                    });
                    // matching posts first, then non-matching posts
                    setPosts([...matchingPosts, ...nonMatchingPosts]);
                } else {
                    // If 'Trending' or no specific tag, display posts as fetched (by timestamp)
                    setPosts(fetchedPosts);
                }
            });

            return () => unsubscribe();
        };
        fetchAndSortPosts();
    }, [activeTag]); // Re-run effect when activeTag changes

    const handleLike = async (postId) => {
        const postRef = doc(db, 'posts', postId);
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

    const handleCommentToggle = (postId) => {
        setShowCommentBox(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const handleCommentSubmit = async (postId) => {
        const text = commentText[postId];
        if (!text || text.trim() === '') return;
        const postRef = doc(db, 'posts', postId);
        const newComment = {
            userId: currentUserUid,
            text: text.trim(),
            timestamp: new Date()
        };
        try {
            await updateDoc(postRef, {
                comments: arrayUnion(newComment)
            });
            setCommentText(prev => ({ ...prev, [postId]: '' }));
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const allTags = ["Trending", "Stress", "Anxiety", "Suicide", "Affirmation", "Self-Care", "Challenge", "Newbie", "Community", "Gratefulness", "Insight", "DeepThought", "Healing", "Happiness"];

    return (
        <div className="relative min-h-screen">
            <div className="bg-[#3B2E2A] rounded-b-3xl pb-6 pt-10 px-5 relative text-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <img src={loggedInUser?.avatar} alt={loggedInUser?.name} className="w-12 h-12 rounded-full border-2 border-white" />
                        <div>
                            <p className="font-semibold text-lg">{loggedInUser?.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <span>{loggedInUser?.totalPosts || 0} Total Posts</span>
                                <span className={`px-2 py-0.5 rounded-md text-xs ${loggedInUser?.badgeColor}`}>{loggedInUser?.badge}</span>
                            </div>
                        </div>
                    </div>
                    <BellIcon className="w-6 h-6 cursor-pointer" />
                </div>
            </div>

            <div className="bg-white rounded-t-3xl p-6 -mt-6 shadow-inner relative z-10 space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Browse By</h2>
                    <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {allTags.map((tag) => (
                        <span
                            key={tag}
                            className={`px-4 py-2 rounded-full text-sm cursor-pointer ${activeTag === tag ? "bg-[#A3BF93] text-white" : "bg-gray-200 text-gray-700"}`}
                            onClick={() => setActiveTag(tag)}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {posts.map((post) => {
                    const comments = Array.isArray(post.comments) ? post.comments : [];

                    const isLiked = post.likedBy?.includes(currentUserUid);
                    const showComments = showCommentBox[post.id];
                    // Determine which comments to show (last 2 or all if expanded)
                    const commentsToDisplay = expandedComments[post.id] ? comments : comments.slice(Math.max(comments.length - 2, 0));

                    return (
                        <div key={post.id} className="bg-white p-4 rounded-3xl shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-sm">{post.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        {post.status === "Pro" && <span className="text-yellow-500">★</span>}
                                        <span>{post.status}</span>
                                        <span className={`px-2 py-0.5 rounded-md text-xs ${post.badgeColor}`}>{post.badge}</span>
                                        <span>• {post.score} Score</span>
                                        <span>• {post.time}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-800 mb-2">{post.content}</p>
                            {post.tags && post.tags.length > 0 && ( // Display tags
                                <div className="text-xs text-gray-500 mb-2">
                                    {post.tags.map(tag => <span key={tag} className="mr-1">#{tag}</span>)}
                                </div>
                            )}
                            {post.image && (
                              <div className="mt-2 relative w-full aspect-[4/5] md:h-56 md:aspect-auto flex justify-center items-center overflow-hidden rounded-2xl bg-gray-100">
    <img src={post.image} alt="post" className="w-full h-full object-cover md:object-contain" />
</div>
                            )}
                            <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded-full transition ${isLiked ? 'bg-pink-100 text-pink-600' : ''}`} onClick={() => handleLike(post.id)}>
                                        {/* MODIFIED: Use Heroicon for Heart */}
                                        {isLiked ? (
                                            <SolidHeartIcon className="w-4 h-4" />
                                        ) : (
                                            <OutlineHeartIcon className="w-4 h-4" />
                                        )}
                                        <span>{post.likes || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleCommentToggle(post.id)}>
                                        {/* MODIFIED: Use Heroicon for Chat */}
                                        <OutlineChatIcon className="w-4 h-4" />
                                        <span>{comments.length}</span>
                                    </div>
                                </div>
                                <div className="cursor-pointer">↗️ Share</div>
                            </div>
                            {showComments && (
                                <div className="mt-3 space-y-2">
                                    {commentsToDisplay.map((comment, index) => (
                                        <div key={index} className="text-sm text-gray-700">
                                            <span className="font-semibold">{comment.userId}:</span> {comment.text}
                                        </div>
                                    ))}
                                    {comments.length > 2 && (
                                        <p className="text-xs text-blue-600 cursor-pointer" onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}>
                                            {expandedComments[post.id] ? 'View less comments' : 'View all comments'}
                                        </p>
                                    )}
                                    <div className="flex gap-2 mt-2">
                                        <input
                                            value={commentText[post.id] || ''}
                                            onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                                            placeholder="Write a comment..."
                                            className="flex-1 px-3 py-2 border rounded-xl text-sm"
                                        />
                                        <button onClick={() => handleCommentSubmit(post.id)} className="text-sm text-blue-600 font-medium">Post</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CommunityFilteredFeed;