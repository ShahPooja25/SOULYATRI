// src/components/CreatePost.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PaperAirplaneIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { collection, addDoc, serverTimestamp, doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Check if we are editing an existing post OR a draft
  const editingPost = location.state?.editMode ? location.state.post : null;
  const editingDraft = location.state?.editDraftMode ? location.state.draft : null;

  const [postText, setPostText] = useState(editingPost?.content || editingDraft?.content || "");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingPost?.image || editingDraft?.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTags, setSelectedTags] = useState(editingPost?.tags || editingDraft?.tags || []); // State for selected tags
/********************************************************************************* */
  const currentUserUid = 'Madhulikaid';
/************************************************************************************ */
  useEffect(() => {
    const userDocRef = doc(db, 'users', currentUserUid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setLoggedInUser({ id: docSnapshot.id, ...docSnapshot.data() });
      } else {
        setLoggedInUser({ name: "Guest User", avatar: "https://i.pravatar.cc/150?img=15" });
      }
    });
    return () => unsubscribe();
  }, []);

  const triggerFileInput = () => fileInputRef.current.click();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // !!! HARDCODED CLOUDINARY PRESET AND FOLDER !!!
      
    /***************************************** *******/
    formData.append("upload_preset", "soul-yatri-posts"); 
    formData.append("folder", "soul-yatri-posts");         
    /***************************************************** */

    try {
      const res = await axios.post(
        /********************************************************************** */
        /*"dbv7ximdy" is my Cloudinary cloud name. This is specific to my account.*/
        "https://api.cloudinary.com/v1_1/dbv7ximdy/image/upload",         // url
        /********************************************************************* */
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary Upload Error:", err.response?.data || err.message);
      return null;
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const savePost = async (isDraft = false) => {
    if (!postText.trim() && !selectedImage) {
      alert(`Post content or an image is required to ${isDraft ? 'save as draft' : 'post'}!`);
      return;
    }

    if (!loggedInUser) {
      alert("User not loaded or ID not set. Cannot proceed.");
      return;
    }

    setIsUploading(true);
    let imageUrl = imagePreview;
    if (selectedImage) {
      const uploadedUrl = await uploadToCloudinary(selectedImage);
      if (!uploadedUrl) {
        alert("Error uploading image. Please try again.");
        setIsUploading(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    try {
      const postData = {
        userId: currentUserUid,
        content: postText.trim(),
        image: imageUrl,
        additionalImages: [],
        tags: selectedTags,
      };

      if (isDraft) {
        // Saving as a draft
        if (editingDraft) {
          // Update existing draft
          await updateDoc(doc(db, 'drafts', editingDraft.id), {
            ...postData,
            draftTimestamp: serverTimestamp(), // Update draft timestamp
          });
          alert("Draft updated successfully!");
        } else {
          // Save new draft
          await addDoc(collection(db, 'drafts'), {
            ...postData,
            draftTimestamp: serverTimestamp(),
          });
          alert("Draft saved successfully!");
        }
      } else {
        // Posting (either new or from editing an existing post/draft)
        if (editingPost) {
          // Update existing community post
          await updateDoc(doc(db, 'posts', editingPost.id), {
            ...postData,
            timestamp: serverTimestamp(), // Update post timestamp
          });
          alert("Post updated successfully!");
        } else if (editingDraft) {
          // Move draft to posts
          await addDoc(collection(db, 'posts'), {
            ...postData,
            likes: 0,
            comments: [],
            timestamp: serverTimestamp(),
          });
          // Delete the draft after it's posted
          await deleteDoc(doc(db, 'drafts', editingDraft.id));
          alert("Draft posted successfully!");
        } else {
          // Create new community post
          await addDoc(collection(db, 'posts'), {
            ...postData,
            likes: 0,
            comments: [],
            timestamp: serverTimestamp(),
          });
          alert("Post created successfully!");
        }
      }

      // Clear form and navigate
      setPostText("");
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedTags([]);
      navigate('/community/main'); // Navigate to main community feed after post/draft operations
    } catch (error) {
      console.error(`Error ${isDraft ? 'saving draft' : 'submitting post'}:`, error);
      alert(`Error ${isDraft ? 'saving draft' : 'saving post'}. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  const AttachmentIcon = ({ label, bgColor, textColor, children, onClick }) => (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold ${bgColor} ${textColor} p-4`}>
        {children}
      </div>
      <span className="mt-2 text-xs font-medium text-gray-700">{label}</span>
    </div>
  );

  const TagAttachmentCircle = ({ tag, selected, onClick }) => {
    const bgColor = selected ? "bg-[#A3BF93]" : "bg-gray-200";
    const textColor = selected ? "text-white" : "text-gray-700";
    const circleText = tag.charAt(0).toUpperCase();

    return (
      <div className="flex flex-col items-center cursor-pointer" onClick={() => onClick(tag)}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold ${bgColor} ${textColor} p-4`}>
          {circleText}
        </div>
        <span className="mt-2 text-xs font-medium text-gray-700">{tag}</span>
      </div>
    );
  };

  const availableTags = ["Stress", "Anxiety", "Healing", "Happiness", "Suicide", "Affirmation", "Grateful", "Insight", "Community", "Self-Care", "DeepThought"];

  return (
    <div className="min-h-screen bg-[#FDF9F6] relative">
      <div className="bg-[#F26A2E] h-[150px] rounded-b-3xl relative flex items-start justify-between p-4">
        <div className="text-white text-xl font-bold cursor-pointer mt-2" onClick={() => navigate(-1)}>←</div>
        <div className="bg-[#D6F0C4] text-[#4A7C1A] text-xs font-semibold px-3 py-1 rounded-full mt-2">
          {editingPost || editingDraft ? 'EDIT POST' : 'COMMUNITY POST'}
        </div>
      </div>

      <div className="absolute top-[100px] left-0 right-0 mx-4 bg-white p-5 rounded-3xl shadow-lg z-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{editingPost || editingDraft ? 'Edit Post' : 'Create Post'}</h2>
        <div className="bg-[#F9F9F9] p-4 rounded-2xl relative">
          <div className="flex items-start gap-3">
            <img src={loggedInUser?.avatar || "https://i.pravatar.cc/150?img=20"} alt={loggedInUser?.name || "user"} className="w-10 h-10 rounded-full flex-shrink-0 mt-1" />
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              maxLength={1000} 
              rows={selectedImage || imagePreview ? 3 : 5}
              placeholder="I started using this app, 4 months back..."
              className="flex-1 bg-transparent outline-none text-sm resize-none placeholder:text-gray-500 pt-1"
            />
          </div>
          {imagePreview && (
            <div className="mt-4 relative">
              <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
              <button onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs">X</button>
            </div>
          )}
          <div className="absolute bottom-2 right-4 text-xs text-gray-400">{postText.length}/1000</div> 
        </div>

        <div className="flex justify-between mt-6 mb-8">
          <button
            className="flex items-center gap-2 border border-black text-black px-6 py-2 rounded-full text-sm font-semibold"
            onClick={() => savePost(true)} // Call with isDraft = true
            disabled={isUploading}
          >
            Save to Draft <DocumentTextIcon className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 bg-[#3B2E2A] text-white px-8 py-2 rounded-full text-sm font-semibold"
            onClick={() => savePost(false)} // Call with isDraft = false
            disabled={isUploading}
          >
            {isUploading ? 'Saving...' : (editingPost || editingDraft) ? 'Save' : 'Post'} <PaperAirplaneIcon className="w-4 h-4 transform rotate-90" />
          </button>
        </div>

        <h3 className="mb-4 text-base font-semibold text-gray-800">Add An Attachment</h3>
        <div className="grid grid-cols-3 gap-y-6 gap-x-4 text-center">
          <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
          <AttachmentIcon label="Photo" bgColor="bg-[#E2F0D9]" textColor="text-[#558B55]" onClick={triggerFileInput}>
            <PhotoIcon className="w-8 h-8 text-[#558B55]" />
          </AttachmentIcon>
        </div>

        <h3 className="mt-6 mb-4 text-base font-semibold text-gray-800">Tags</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-6 justify-start">
          {availableTags.map(tag => (
            <TagAttachmentCircle
              key={tag}
              tag={tag}
              selected={selectedTags.includes(tag)}
              onClick={handleTagToggle}
            />
          ))}
        </div>
      </div>
      <div className="h-40"></div>
    </div>
  );
};

export default CreatePost;
