import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='bg-sky-900 px-4 md:px-1 lg:px-28 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            <div>
                <h2 className='pb-3'>
                  <span style={{ fontStyle: 'italic' }} className= 'text-yellow-400 text-lg sm:text-4xl font-semibold'>Dream</span>
                  <span className= 'text-slate-200 text-lg sm:text-4xl font-semibold'>Homes</span>
                </h2>
                <p className='text-gray-300'>
                Join us as we embark on an exploration of diverse real estate opportunities, 
                where you can discover the ideal house that fits your lifestyle and aspirations perfectly.
                </p>
            </div>
            <div>
                <h2 className='text-lg font-bold mb-4 text-white'>
                    Contact us
                </h2>
                <ul>
                    <li className='text-gray-300'>Phone : +94 11 456-7890</li>
                    <li className='text-gray-300'>Fax : +94 11 456-7892</li>
                    <li className='text-gray-300'>Email : dreamhomes@gmail.com</li>
                </ul>
            </div>
            <div>
                <h2 className='text-lg font-bold mb-4 text-white'>
                    Follow us
                </h2>
                <ul className='flex space-x-4'>
                    <li className='text-gray-300'> <FaFacebookF className='text-blue-500'/> Facebook </li>
                    <li className='text-gray-300'> <FaTwitter className='text-sky-500'/> Twitter </li>
                    <li className='text-gray-300'> <FaInstagram className='text-orange-500'/> Instagram </li>
                </ul>
            </div>
        </div>
        <div className='border-t border-gray-900 pt-6 text-gray-300 text-center mt-6'>
            <p>© 2024 Dreamhomes.com - All Rights Reserved.</p>
        </div>
    </footer>
  )
}
