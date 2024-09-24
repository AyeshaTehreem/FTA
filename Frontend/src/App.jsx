import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './UserContext';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Homepages from './components/home/Homepages';
import PendingImage from './components/Verification/pendingImage';
import VerifyImage from './components/Verification/verifyimage';
import Report from './components/Verification/Report';
import Login from './components/loginPage/Login';
import NotAllowed from './components/loginPage/NotAllowed';
import Contact from './components/contactPage/Contact';
import BlogPost from './components/blogPost/BlogPost';
import EditorBlog from './components/blogPost/EditorBlog';
import AboutPage from './components/about/About';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';

const AppRoutes = () => {
  const { user } = useContext(UserContext); // Make sure to use user context here
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        keepalive: true,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Homepages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notallowed" element={<NotAllowed />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogpost" element={<BlogPost />} />
            <Route
              path="/editorblog"
              element={
                user?.isLoggedIn && user?.role === 'editor' ? (
                  <EditorBlog />
                ) : (
                  <Navigate to="/notallowed" />
                )
              }
            />
            <Route path="/aboutpage" element={<AboutPage />} />
            <Route
              path="/pendingimages"
              element={
                user?.isLoggedIn && user?.role === 'verifier' ? (
                  <PendingImage />
                ) : (
                  <Navigate to="/notallowed" />
                )
              }
            />
            <Route
              path="/verifyimage"
              element={
                user?.isLoggedIn ? (
                  <VerifyImage />
                ) : (
                  <Navigate to="/notallowed" />
                )
              }
            />
            <Route
              path="/report"
              element={
                user?.isLoggedIn ? (
                  <Report />
                ) : (
                  <Navigate to="/notallowed" />
                )
              }
            />
          </Routes>
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
