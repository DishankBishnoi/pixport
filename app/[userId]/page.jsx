"use client";

import { getFirestore } from 'firebase/firestore';
import { use } from 'react';
import { useEffect } from 'react';
import app from "./../Shared/firebaseConfig"; 

function Profile({ params }) {
    const { userId } = use(params);
    const db = getFirestore(app);

    useEffect(() => {
        console.log(userId.replace('%40', '@'));
    }, [userId]);

    // const getUserInfo()=>{

    // }
    return (
        <div>
            Profile: 
        </div>
    );
}

export default Profile;
