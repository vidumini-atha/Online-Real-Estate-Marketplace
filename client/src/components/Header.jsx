import {FaSearch} from 'react-icons/fa';
import {Link , useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';

export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-blue-950 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className= 'text-sm  flex flex-wrap'>
          <div className=' flex flex-col'>
            <div className='font-bold'>
            <span style={{ fontStyle: 'italic' }} className= 'text-yellow-400 text-lg sm:text-4xl'>Dream</span>
            <span className= 'text-slate-200 text-lg sm:text-4xl'>Homes</span>
            </div>
            <span className='text-xs sm:text-sm text-white font-medium'>Where Dreams Become Homes</span>
          </div>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input 
              type='text' 
              placeholder='Search...' 
              className='bg-transparent focus:outline-none w-24 sm:w-64'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
            <FaSearch className='text-slate-700' />
            </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-white text-lg font-medium'>
            Home
          </li>
          </Link>
          <Link to='/about'>
          <li className='hidden sm:inline text-white text-lg font-medium'>
            About
          </li>
          </Link>
          <Link to='/profile'>
            { currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />

            ): (
             <li className='text-white text-lg font-medium'>Sign in</li>  
            )}
          </Link>
          
        </ul>
      </div>
    </header>
  )
}
