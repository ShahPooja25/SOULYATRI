import React, { useState, useEffect } from 'react';
import { UserGroupIcon, DocumentTextIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { HeartIcon as SolidHeartIcon, ChatBubbleOvalLeftIcon as SolidChatIcon } from '@heroicons/react/24/solid'; // NEW: Solid icons
import { HeartIcon as OutlineHeartIcon, ChatBubbleOvalLeftIcon as OutlineChatIcon } from '@heroicons/react/24/outline'; // NEW: Outline icons
import { useNavigate } from 'react-router-dom';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    doc,
    updateDoc,
    getDoc,
    arrayUnion
} from 'firebase/firestore';
import { db } from '../firebase';


function CommunityFeed() {
    const navigate = useNavigate();
    const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);             // header size based on scroll
    const [posts, setPosts] = useState([]);                                // to store fetched posts 
    const [totalMembers, setTotalMembers] = useState('0');                   // total members 
    const [totalPostsCount, setTotalPostsCount] = useState('0');            // total posts 
    const [showCommentBox, setShowCommentBox] = useState({});                  // comment visibility
    const [commentText, setCommentText] = useState({});                    // to store comment text 
    const [expandedComments, setExpandedComments] = useState({});    // to control all comments 

/*********************************************************************** */
    const currentUserUid = 'Madhulikaid';                           /* should be dynamically come from firebase 
/************************************************************************ */



    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderShrunk(window.scrollY > 50);                    // header shirk
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    //useEffect hook for fetching posts and user data from Firestore.
    useEffect(() => {
        const fetchPosts = async () => {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const usersMap = {};
            usersSnapshot.forEach(doc => {
                usersMap[doc.id] = doc.data();
            });

 // update total members based on the fetched data above 
            setTotalMembers(usersSnapshot.size.toLocaleString());

//listener for 'posts' collection
            const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedPosts = [];
                let currentTotalPosts = 0;
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
                            time: postData.timestamp ? new Date(postData.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A',
                        });
                        currentTotalPosts++;
                    }
                });
                setPosts(fetchedPosts);
                setTotalPostsCount(currentTotalPosts.toLocaleString());
            });
            return () => unsubscribe();
        };
        fetchPosts();
    }, []);

//  Function to handle liking/unliking a post.
    const handleLike = async (postId) => {
        const postRef = doc(db, 'posts', postId);
        try {
            const postSnapshot = await getDoc(postRef);                // current state of the post.
            if (!postSnapshot.exists()) return;
            const postData = postSnapshot.data();
            const likedBy = postData.likedBy || [];
            const isLiked = likedBy.includes(currentUserUid);
            const updatedLikes = isLiked ? postData.likes - 1 : postData.likes + 1;
            const updatedLikedBy = isLiked ?
                likedBy.filter(uid => uid !== currentUserUid) : [...likedBy, currentUserUid];
            await updateDoc(postRef, {
                likes: updatedLikes,
                likedBy: updatedLikedBy
            });
        } catch (error) {
            console.error("Error toggling like: ", error);
        }
    };


    const handleComment = (postId) => {
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


    return (
        <div className="relative min-h-screen">
            {/* Header */}
            <div className={`bg-[#A3BF93] rounded-b-3xl px-5 relative z-20 flex flex-col justify-end transition-all duration-300 ease-in-out ${isHeaderShrunk ? 'pt-4 pb-2 h-20 shadow-md fixed top-0 left-0 w-full' : 'pt-10 pb-6 h-40'}`}>
                <div className={`absolute left-4 text-white text-xl font-bold cursor-pointer ${isHeaderShrunk ? 'top-4' : 'top-10'}`} onClick={() => navigate(-1)}>
                    <ArrowLeftIcon className="w-6 h-6" />
                </div>
                <h1 className={`font-bold text-white mb-2 ${isHeaderShrunk ? 'text-xl' : 'text-2xl'}`}>Soul Community</h1>
                <div className={`flex items-center gap-4 text-white text-sm ${isHeaderShrunk ? 'hidden' : 'flex'}`}>
                    <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{totalMembers} Total Members</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DocumentTextIcon className="w-4 h-4" />
                        <span>{totalPostsCount} Total Posts</span>
                    </div>
                </div>
            </div>
            {isHeaderShrunk && <div className="h-20" />}


            {/* Feed */}
            <div className="space-y-6 bg-white rounded-t-3xl p-6 -mt-6 shadow-inner relative z-10">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="bg-white p-4 rounded-3xl shadow-md">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-1 bg-gray-300 rounded-full" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-sm">{post.name}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            {post.status === 'Pro' && <span className="text-yellow-500">★</span>}
                                            <span>{post.status}</span>
                                            <span className={`px-2 py-0.5 rounded-md text-xs ${post.badgeColor}`}>{post.badge}</span>
                                            <span>• {post.score} Score</span>
                                            <span>• {post.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-gray-500 cursor-pointer text-xl">⋮</div>
                            </div>
                            <p className="text-sm mt-3 text-gray-800">{post.content}</p>
                            {post.tags && post.tags.length > 0 && ( // Display tags
                                <div className="text-xs text-gray-500 mt-1">
                                    {post.tags.map(tag => <span key={tag} className="mr-1">#{tag}</span>)}
                                </div>
                            )}
                            {post.image && (
                               <div className="mt-2 relative w-full aspect-[4/5] md:h-56 md:aspect-auto flex justify-center items-center overflow-hidden rounded-2xl bg-gray-100">
    <img src={post.image} alt="post" className="w-full h-full object-cover md:object-contain" />
</div>
                            )}
                            <div className="flex justify-between items-center mt-4 px-1 text-gray-600 text-sm">
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded-full transition ${post.likedBy?.includes(currentUserUid) ?
                                        'bg-pink-100 text-pink-600' : ''}`} onClick={() => handleLike(post.id)}>
                                        {post.likedBy?.includes(currentUserUid) ? (
                                            <SolidHeartIcon className="w-4 h-4" /> // Changed to Heroicon with w-4 h-4
                                        ) : (
                                            <OutlineHeartIcon className="w-4 h-4" /> // Changed to Heroicon with w-4 h-4
                                        )}
                                        <span>{post.likes || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleComment(post.id)}>
                                        <OutlineChatIcon className="w-4 h-4" /> {/* Changed to Heroicon with w-4 h-4 */}
                                        <span>{(post.comments || []).length}</span>
                                    </div>
                                </div>
                                <div className="cursor-pointer">↗️ Share</div>
                            </div>


                            {/* Comment Section */}
                            {showCommentBox[post.id] && (
                                <div className="mt-3 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={commentText[post.id] || ''}
                                        onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
                                    />
                                    <button onClick={() => handleCommentSubmit(post.id)} className="bg-[#A3BF93] text-white px-4 py-1 rounded-full text-sm">
                                        Post
                                    </button>
                                    <div className="space-y-1 text-sm text-gray-700 mt-2">
                                        {(post.comments || []).slice(expandedComments[post.id] ? 0 : -2).map((comment, index) => (
                                            <div key={index}>
                                                <span className="font-medium">{comment.userId}:</span> <span>{comment.text}</span>
                                            </div>
                                        ))}
                                        {(post.comments || []).length > 2 && (
                                            <p
                                                className="text-blue-500 cursor-pointer text-xs mt-1"
                                                onClick={() =>
                                                    setExpandedComments((prev) => ({
                                                        ...prev,
                                                        [post.id]: !prev[post.id],
                                                    }))
                                                }
                                            >
                                                {expandedComments[post.id] ? 'View less comments' : 'View more comments'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-10">Loading posts...</p>
                )}
            </div>
        </div>
    );
}


export default CommunityFeed;