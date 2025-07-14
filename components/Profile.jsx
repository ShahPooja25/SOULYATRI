// src/components/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    where,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    increment
} from 'firebase/firestore';
import { db } from '../firebase';
import { HeartIcon as SolidHeartIcon, ChatBubbleOvalLeftIcon as SolidChatIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon, ChatBubbleOvalLeftIcon as OutlineChatIcon } from '@heroicons/react/24/outline';

const Profile = () => {
    /***************************************************************** */
    const currentUserUid = "Madhulikaid"; 
    /****************************************************************** */
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({ name: "Loading…", avatar: "https://i.pravatar.cc/150?img=15", bio: "", followers: 0, following: 0 });
    const [posts, setPosts] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [activeTab, setActiveTab] = useState("posts");
    const [showCommentBox, setShowCommentBox] = useState({});
    const [commentText, setCommentText] = useState({});
    const [expandedComments, setExpandedComments] = useState({});
    const [menuOpen, setMenuOpen] = useState(null);

    useEffect(() => {
        console.log("[Profile DEBUG] Profile component mounted or currentUserUid changed. Current UID:", currentUserUid);

        const unsubUser = onSnapshot(doc(db, "users", currentUserUid), (snap) => {
            if (snap.exists()) {
                const d = snap.data();
                console.log("[Profile DEBUG] Raw user data from Firestore:", d);

                const actualFollowers = d.followers || [];
                const actualFollowing = d.following || [];

                setUserInfo({
                    name: d.name || "Unnamed",
                    avatar: d.avatar || "https://i.pravatar.cc/150?img=15",
                    bio: d.bio || "", 
                    followers: actualFollowers.length,
                    following: actualFollowing.length
                });
                console.log("[Profile DEBUG] Updated userInfo state (calculated counts):", {
                    name: d.name || "Unnamed",
                    followers: actualFollowers.length,
                    following: actualFollowing.length,
                    bio: d.bio || ""
                });
            } else {
                console.log("[Profile DEBUG] User document not found for UID:", currentUserUid);
                setUserInfo(prev => ({ ...prev, name: "User Not Found" }));
            }
        }, (error) => {
            console.error("[Profile DEBUG] Error fetching user info:", error);
        });

        const unsubPosts = onSnapshot(
            query(collection(db, "posts"), where("userId", "==", currentUserUid), orderBy("timestamp", "desc")),
            (snap) => {
                const arr = [];
                snap.forEach((p) => arr.push({ id: p.id, ...p.data() }));
                setPosts(arr);
                console.log("[Profile DEBUG] Posts received:", arr.length);
            }
        );

        const unsubDrafts = onSnapshot(
            query(collection(db, "drafts"), where("userId", "==", currentUserUid), orderBy("draftTimestamp", "desc")),
            (snap) => {
                const arr = [];
                snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
                setDrafts(arr);
                console.log("[Profile DEBUG] Drafts received:", arr.length);
            }
        );

        return () => {
            unsubUser();
            unsubPosts();
            unsubDrafts();
        };
    }, [currentUserUid]);

    const handleLike = async (postId) => {
        const ref = doc(db, "posts", postId);
        const snap = await getDoc(ref);
        if (!snap.exists()) return;
        const data = snap.data();
        const likedBy = data.likedBy || [];
        const isLiked = likedBy.includes(currentUserUid);
        await updateDoc(ref, {
            likedBy: isLiked ? likedBy.filter((u) => u !== currentUserUid) : [...likedBy, currentUserUid],
            likes: isLiked ? (data.likes || 1) - 1 : (data.likes || 0) + 1
        });
    };

    const toggleComments = (pid) => setShowCommentBox((p) => ({ ...p, [pid]: !p[pid] }));

    const submitComment = async (pid) => {
        const text = (commentText[pid] || "").trim();
        if (!text) return;
        await updateDoc(doc(db, "posts", pid), { comments: arrayUnion({ userId: currentUserUid, text, timestamp: new Date() }) });
        setCommentText((p) => ({ ...p, [pid]: "" }));
    };

    const handleDeletePost = async (postId) => {
        const confirm = window.confirm("Are you sure you want to delete this post?");
        if (confirm) {
            await deleteDoc(doc(db, "posts", postId));
            alert("Post deleted successfully!");
        }
    };

    const handleDeleteDraft = async (draftId) => {
        const confirm = window.confirm("Are you sure you want to delete this draft?");
        if (confirm) {
            await deleteDoc(doc(db, "drafts", draftId));
            alert("Draft deleted successfully!");
        }
    };

    const handleEditPost = (post) => {
        navigate("/community/create", { state: { editMode: true, post } });
    };

    const handleEditAndPostDraft = (draft) => {
        navigate("/community/create", { state: { editDraftMode: true, draft } });
    };

    const Stat = ({ num, label }) => (
        <div className="text-center text-sm font-medium cursor-pointer">
            <p>{num}</p>
            <p className="text-gray-600">{label}</p>
        </div>
    );

    const renderWithLineBreaks = (text) => {
        return text.split('\n').map((item, key) => (
            <React.Fragment key={key}>
                {item}
                {key < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="bg-[#FDF9F6] min-h-screen w-full">
            <div className="sticky top-0 z-20 bg-[#a3bf93] pb-2 px-4"> 
                <div className="flex justify-between items-center pt-4">
                    <h2 className="text-xl font-bold">Profile</h2>
                    <Link to="/community/settings">
                        <Cog6ToothIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                    </Link>
                </div>
                <div className="bg-[#a3bf93] mt-2 py-4 rounded-xl">
                    <div className="flex items-center gap-4">
                        <img
                            src={userInfo.avatar}
                            alt="avatar"
                            className="w-24 h-24 rounded-full object-cover border-2 border-white shadow"
                        />
                        <div className="min-w-0"> 
                            <p className="font-semibold text-lg">{userInfo.name}</p>
                            {userInfo.bio && (
                                <p className="text-sm text-gray-700 mt-1 break-words"> 
                                    {renderWithLineBreaks(userInfo.bio)}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-around mt-4">
                        <Stat num={posts.length} label="posts" />
                        <Link to={`/community/profile/${currentUserUid}/connections?tab=followers`}>
                            <Stat num={userInfo.followers} label="followers" />
                        </Link>
                        <Link to={`/community/profile/${currentUserUid}/connections?tab=following`}>
                            <Stat num={userInfo.following} label="following" />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-around bg-gray-800 text-pink-400 text-sm font-semibold rounded-xl mt-4">
                    <button
                        className={`w-full py-2 ${activeTab === "posts" ? "text-white border-b-2 border-pink-400" : ""}`}
                        onClick={() => setActiveTab("posts")}
                    >
                        posts
                    </button>
                    <button
                        className={`w-full py-2 ${activeTab === "drafts" ? "text-white border-b-2 border-pink-400" : ""}`}
                        onClick={() => setActiveTab("drafts")}
                    >
                        drafts
                    </button>
                </div>
            </div>

            <div className="px-4 mt-4 space-y-6">
                {activeTab === "posts" && posts.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">No posts yet.</p>
                )}
                {activeTab === "drafts" && drafts.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">No drafts yet.</p>
                )}

                {activeTab === "posts" ? (
                    posts.map((post) => {
                        const commentsArr = Array.isArray(post.comments) ? post.comments : [];
                        const latest = commentsArr.slice(-2);
                        const isLiked = (post.likedBy || []).includes(currentUserUid);
                        return (
                            <div key={post.id} className="bg-white p-4 rounded-3xl shadow-md">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <img src={userInfo.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                                        <div className="min-w-0"> 
                                            <p className="font-semibold text-sm">{userInfo.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {post.timestamp ? new Date(post.timestamp.toDate()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div onClick={() => setMenuOpen(menuOpen === post.id ? null : post.id)} className="cursor-pointer text-xl">⋮</div>
                                        {menuOpen === post.id && (
                                            <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-md z-10">
                                                <button onClick={() => handleEditPost(post)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">✏️ Edit</button>
                                                <button onClick={() => handleDeletePost(post.id)} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">🗑 Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 mb-2 break-words">{post.content}</p>
                                {post.image && (
                                    <div className="mt-2 relative w-full aspect-[4/5] md:h-56 md:aspect-auto flex justify-center items-center overflow-hidden rounded-2xl bg-gray-100">
                                        <img src={post.image} alt="post" className="w-full h-full object-cover md:object-contain" />
                                    </div>
                                )}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-2 mb-2">
                                        {post.tags.map(tag => <span key={tag} className="mr-1">#{tag}</span>)}
                                    </div>
                                )}
                                <div className="flex justify-between items-center mt-4 px-1 text-gray-600 text-sm">
                                    <div className="flex items-center gap-4">
                                        <div
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded-full transition ${isLiked ? "bg-pink-100 text-pink-600" : ""}`}
                                        >
                                            <SolidHeartIcon className="w-5 h-5" />
                                            <span>{post.likes || 0}</span>
                                        </div>
                                        <div onClick={() => toggleComments(post.id)} className="flex items-center gap-1 cursor-pointer">
                                            <OutlineChatIcon className="w-5 h-5" />
                                            <span>{commentsArr.length}</span>
                                        </div>
                                    </div>
                                    <div className="cursor-pointer">↗️ Share</div>
                                </div>
                                {showCommentBox[post.id] && (
                                    <div className="mt-3 space-y-2">
                                        {latest.map((c, i) => (
                                            <div key={i} className="text-sm text-gray-700">
                                                <span className="font-semibold">{c.userId}:</span> {c.text}
                                            </div>
                                        ))}
                                        {commentsArr.length > 2 && (
                                            <p onClick={() => setExpandedComments((p) => ({ ...p, [post.id]: !p[post.id] }))} className="text-xs text-blue-600 cursor-pointer">
                                                {expandedComments[post.id] ? "View less" : "View all comments"}
                                            </p>
                                        )}
                                        <div className="flex gap-2 mt-2">
                                            <input
                                                className="flex-1 px-3 py-2 border rounded-xl text-sm"
                                                placeholder="Write a comment…"
                                                value={commentText[post.id] || ""}
                                                onChange={(e) => setCommentText((p) => ({ ...p, [post.id]: e.target.value }))}
                                            />
                                            <button className="text-blue-600 text-sm font-medium" onClick={() => submitComment(post.id)}>
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    drafts.map((draft) => (
                        <div key={draft.id} className="bg-white p-4 rounded-3xl shadow-md border-2 border-dashed border-gray-300">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <img src={userInfo.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                                    <div className="min-w-0"> 
                                        <p className="font-semibold text-sm">{userInfo.name}</p>
                                        <p className="text-xs text-gray-500">
                                            Draft • {draft.draftTimestamp ? new Date(draft.draftTimestamp.toDate()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div onClick={() => setMenuOpen(menuOpen === draft.id ? null : draft.id)} className="cursor-pointer text-xl">⋮</div>
                                    {menuOpen === draft.id && (
                                        <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-md z-10">
                                            <button onClick={() => handleEditAndPostDraft(draft)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">✏️ Edit & Post</button>
                                            <button onClick={() => handleDeleteDraft(draft.id)} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">🗑 Delete Draft</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-gray-800 mb-2 break-words">{draft.content}</p>
                            {draft.image && (
                                <div className="mt-2 relative w-full aspect-[4/5] md:h-56 md:aspect-auto flex justify-center items-center overflow-hidden rounded-2xl bg-gray-100">
                                    <img src={draft.image} alt="draft" className="w-full h-full object-cover md:object-contain" />
                                </div>
                            )}
                            {draft.tags && draft.tags.length > 0 && (
                                <div className="text-xs text-gray-500 mt-2 mb-2">
                                    {draft.tags.map(tag => <span key={tag} className="mr-1">#{tag}</span>)}
                                </div>
                            )}
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => handleEditAndPostDraft(draft)}
                                    className="bg-[#A3BF93] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                                >
                                    Edit & Post
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Profile;