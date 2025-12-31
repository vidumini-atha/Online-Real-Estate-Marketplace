import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if(data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
      
    } catch (error) {
      dispatch(signInFailure(error.message));
      
    }
    
  };

  return (
    <div className='p-8 mt-20 mb-20 max-w-lg mx-auto border border-slate-400 bg-blue-100 rounded-lg shadow-lg'>
      <h1 className='text-3xl text-center font-semibold mb-10'>SIGN IN</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type="email" 
          placeholder='Email' 
          className='border border-slate-400 p-3 rounded-lg' 
          id='email' 
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder='Password' 
          className='border border-slate-400 p-3 rounded-lg' 
          id='password' 
          onChange={handleChange} 
        />
        <button disabled={loading} className='bg-indigo-800 text-white font-semibold p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>}
    </div>
  )
}