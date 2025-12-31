import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import PropertyItem from '../components/PropertyItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=3');
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>

      {/* top */}
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
        }}
        initial={{ opacity: 0 }} // Initial state
        animate={{ opacity: 1 }} // End state
        transition={{ duration: 1.5 }} // Duration of the fade-in effect
      >
        <motion.div
          style={{
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/06/24/11/49/architecture-1477103_1280.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            opacity: 0.9,
            top: 0,
            left: 0,
            width: '100%',
            height: '94%',
            zIndex: -1,
          }}
          initial={{ scale: 1.2 }} // Start with a zoomed image
          animate={{ scale: 1 }} // Slowly zoom out to normal size
          transition={{ duration: 2 }} // Animation duration
        />
        <motion.div
          className='flex flex-col gap-6 p-20 px-3 max-w-6xl mx-auto'
          initial={{ y: 100, opacity: 0 }} // Start position and opacity
          animate={{ y: 0, opacity: 1 }} // End position and opacity
          transition={{ type: 'spring', stiffness: 40, delay: 0.5 }} // Spring-like animation with delay
        >
          <h1 className='text-slate-950 font-bold text-3xl lg:text-6xl'>
            Discover Your <span className='text-blue-400'> Ideal House </span> Today
          </h1>
          <div className='text-indigo-600 text-xs sm:text-sm'>
            Discover the perfect home for you and your family. With our diverse selection of properties,
            <br />
            we make it easy to find a place that suits your lifestyle and budget.
            <br />
            Begin your search now and take the first step toward your dream home.
            <br />
            <span style={{ fontStyle: 'italic' }} className='font-semibold'> Your perfect house is waiting for you!</span>
          </div>

          <Link to={"/search"} >
            <motion.button
              className='bg-blue-800 font-semibold text-white p-3 rounded-lg uppercase hover:opacity-95'
              whileHover={{ scale: 1.1 }} // Scale up on hover
              whileTap={{ scale: 0.95 }} // Scale down on tap
            >
              Let's get started...
            </motion.button>
          </Link>

        </motion.div>
      </motion.div>

      {/*results*/}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Start with fade-in and upward motion
            animate={{ opacity: 1, y: 0 }} // End with no motion and full opacity
            transition={{ duration: 1.2 }} // Control transition speed
          >
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-900'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-10'>
              {offerListings.map((listing) => (
                <PropertyItem listing={listing} key={listing._id} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
