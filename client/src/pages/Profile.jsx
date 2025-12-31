import React from 'react';
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, 
  deleteUserStart, deleteUserSuccess, signOutUserStart, 
  signOutUserFailure, signOutUserSuccess} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showPropertiesError,setShowPropertiesError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  },[file]);

  //uploading profilr photo
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({...formData, avatar: downloadURL });
        })
      }
    );
  };

  //make changes in profile
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  //deleting a user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  
  //signout
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowProperties = async () => {
    try {
      setShowPropertiesError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowPropertiesError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowPropertiesError(true);
    }
  };

  const handlePropertyDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen md:w-1/3'>
      <h1 className='text-3xl border-b font-semibold text-center mb-4'> PROFILE</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])} 
          type="file" 
          ref={fileRef} 
          hidden accept="image/*"
         />
        <img 
          onClick={()=>fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} 
          alt="Profile" 
          className="rounded-full border border-black h-24 w-24 object-cover cursor-pointer self-center mt-6 mb-0" 
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload
            (Image should be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
              <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
              ''
        )}
        </p>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="bg-red-400 text-white rounded-md p-2 hover:opacity-90 cursor-pointer">Delete account</span>
        <button onClick={handleSignOut} className="bg-red-400 text-white rounded-md p-2 hover:opacity-90 cursor-pointer">Sign out</button>
      </div>

      <p className='text-red-600 mt-5'>{error ? error : ''}</p>
      <p className='text-green-600 mt-5'>{updateSuccess ? 'User is updated successfully!' : ''}</p>

        <Link className='bg-teal-700 text-white p-2 rounded-lg uppercase text-center hover:opacity-95' to={"/add-property"}>
          Add new property
        </Link>

      </form>
      </div>

      <div className="flex flex-col gap-7 p-12 mt-14 ml-10 w-full max-w-md">
        <input 
          type="text" 
          placeholder="username" 
          defaultValue={currentUser.username} 
          id="username" 
          className="border border-slate-400 p-3 rounded-lg w-[600px]"
          onChange={handleChange} 
        />

        <input 
          type="email" 
          placeholder="email" 
          defaultValue={currentUser.email} 
          id="email" 
          className="border border-slate-400 p-3 rounded-lg w-[600px]"
          onChange={handleChange} 
        />

        <input 
          type="password" 
          placeholder="password" 
          id="password" 
          className="border border-slate-400 p-3 rounded-lg w-[600px]"
          onChange={handleChange} 
        />

        <button disabled={loading} className="bg-indigo-800 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80 w-[275px]">
          {loading ? 'Loading...' : 'Update'}
        </button>

        <button onClick={handleShowProperties} className='text-blue-800 w-full font-medium hover:underline mt-8 text-left'>
        My properties
      </button>
      <p className='text-red-600 mt-5'>
        {showPropertiesError ? 'Error showing properties' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4 w-[600px]'
            >
              <Link to={`/property/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain'/>
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1 ml-6'
                to={`/property/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <Link to={`/update-property/${listing._id}`}>
                  <button className='text-green-600 uppercase hover:underline'>Edit</button>
                </Link>
                <button
                  onClick={() => handlePropertyDelete(listing._id)}
                  className='text-red-600 uppercase hover:underline'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

    </div>
  )
}
