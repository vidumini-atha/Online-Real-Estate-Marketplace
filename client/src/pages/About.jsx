import React from 'react'

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-900 text-center'>About us</h1>

      <p className='mb-4 text-slate-800'>
      Welcome to Dream Homes, your trusted partner in finding the perfect home. With a wealth of experience and a passion for excellence, 
      we are dedicated to helping you navigate the real estate market with confidence. Our team of experts is committed to providing 
      personalized service and unparalleled expertise, ensuring you find a property that meets all your needs.
      </p>

      <p className='mb-4 text-slate-800'>
      At Dream Homes, we believe in making your home-buying journey as seamless and enjoyable as possible. 
      Whether you are searching for a cozy apartment, a spacious family home, or an investment property, 
      we have a wide range of options to explore. Our local market knowledge and commitment to client satisfaction set us 
      apart in the industry.
      </p>

      <span className='mb-4 text-slate-800'>Our values:</span>

      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }} className='mb-4 text-slate-800'>
        <li><span className='font-semibold'>Trust:</span> Building honest relationships with our clients.</li>
        <li><span className='font-semibold'>Knowledge:</span> Continuously enhancing our market expertise.</li>
        <li><span className='font-semibold'>Commitment:</span> Devoting ourselves to your real estate success.</li>
        <li><span className='font-semibold'>Community Engagement:</span> Supporting and enriching the communities we serve.</li>
      </ul>

      <p className='mb-4 text-slate-800'> 
      Discover more about our services and browse our listings. Whether you are buying, selling, or investing, we are here 
      to make the process smooth and successful. Let us help you find your dream home today.
      </p>

      <p className='mb-4 text-slate-800'>
      Thank you for choosing Dream Homes. We look forward to working with you.
      </p>

    </div>
  )
}
