import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AddProperty from './pages/AddProperty';
import UpdateProperty from './pages/UpdateProperty';
import Property from './pages/Property';
import Search from './pages/Search';
import Footer from './components/Footer';

export default function App() {
  return ( 
   <BrowserRouter>
     <Header />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/sign-in" element={<Signin />} />
       <Route path="/sign-up" element={<SignUp />} />
       <Route path="/about" element={<About />} />
       <Route path="/search" element={<Search />} />
       <Route path="/property/:listingId" element={<Property />} />
       <Route element={<PrivateRoute />} >
         <Route path="/profile" element={<Profile />} />
         <Route path="/add-property" element={<AddProperty />} />
         <Route path="/update-property/:listingId" element={<UpdateProperty />} />
       </Route>
     </Routes>
     <Footer/>
  </BrowserRouter>
  );
}

