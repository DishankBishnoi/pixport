"use client"
import React from 'react'
import Image from 'next/image';
import { HiSearch, HiBell , HiChat} from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react"
import app from "./../Shared/firebaseConfig"; 

import {doc,getFirestore,setDoc} from "firebase/firestore";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const db = getFirestore(app);
    
    useEffect(()=>{
      saveUserInfo();
    },[session])

    const saveUserInfo=async()=>{
      if(session?.user){
        await setDoc(doc(db, "user", session.user.email), {
          userName: session.user.name,
          email: session.user.email,
          userImage: session.user.image,
        });
      }
    }

    
  return (
    <div className='flex gap-3 items-center p-4'>
        <Image src ="/logo.png" alt="logo" width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />
        <button className='bg-black text-white p-2 rounded-full px-4 '> Home</button>
        <button className='font-semibold p-2 rounded-full  hidden md:block px-4'> Create</button>
        <div className='bg-[#e9e9e9] p-3  gap-3 w-full rounded-full hidden md:flex'>
        
        <HiSearch className='text-[25px] text-grey-500 md:hidden ' />
        <input type="text" placeholder='Search' className='bg-transparent outline-none '/>
       
        </div>
        <HiBell className='text-[40px] text-gray-500 '/>
        <HiChat className='text-[40px] text-gray-500'/>
        {session?.user? <Image src={session?.user?.image} onClick={()=>router.push('/'+session.user.email)} alt='user-image' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />:
        
        <button onClick={() => signIn()} className='font-semibold p-2 rounded-full  hidden md:block px-4'>Login</button>}
        
    </div>
    
  );
}
