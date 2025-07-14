// src/components/Search.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import UserSearchResultItem from './UserSearchResultItem'; 

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
/********************************************************* */
    const currentUserUid = 'Madhulikaid'; 
/********************************************************* */
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]); 
            return;
        }

        const q = query(
            collection(db, 'users'),
            where('name', '>=', searchQuery),
            where('name', '<=', searchQuery + '\uf8ff'),
            orderBy('name')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            setSearchResults(results);
        }, (error) => {
            console.error("Error fetching search results:", error);
        });

        return () => unsubscribe(); 
    }, [searchQuery]);

    const handleUserClick = (userId) => {
     
        if (userId === currentUserUid) {
            navigate('/profile'); 
        } else {
            navigate(`/community/profile/${userId}`); 
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF9F6] relative p-4">
            <div className="flex items-center gap-4 mb-6">
                <ArrowLeftIcon className="w-6 h-6 text-gray-800 cursor-pointer" onClick={() => navigate(-1)} />
                <h2 className="text-xl font-bold text-gray-800">Search Users</h2>
            </div>

            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A3BF93]"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
                {searchResults.length > 0 ? (
                    searchResults.map((user) => (
                        <UserSearchResultItem
                            key={user.id} 
                            user={user}
                            currentUserUid={currentUserUid}
                            handleUserClick={handleUserClick}
                        />
                    ))
                ) : (
                    searchQuery.trim() !== '' && <p className="text-center text-gray-500 mt-10">No users found.</p>
                )}
                {searchQuery.trim() === '' && <p className="text-center text-gray-500 mt-10">Start typing to search for users.</p>}
            </div>
        </div>
    );
};

export default Search;