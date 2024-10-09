import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './UserContext';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Homepages from './components/home/Homepages';
import PendingImage from './components/Verification/pendingImage';
import VerifyImage from './components/Verification/verifyimage';
import ManageVerification from './components/Verification/ManageVerifiedNews';
import ViewVerified from './components/Verification/ViewVerifiedNews';
import Report from './components/Verification/Report';
import Login from './components/loginPage/Login';
import NotAllowed from './components/loginPage/NotAllowed';
import Contact from './components/contactPage/Contact';
import SingleBlogPost from './components/blogPost/SingleBlogPost';
import EditorBlog from './components/blogPost/EditorBlog';
import ShowAllBlogs from './components/blogPost/ShowAllBlogs';
import AboutPage from './components/about/About';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';
import ChatBot from './components/ChatBot';
const App = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (

    <UserProvider>
      <Router>
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
              <Route path="/blogs" element={<ShowAllBlogs />} />
              <Route path="/blogs/:id" element={<SingleBlogPost />} />

              <Route
                path="/editorblog"
                element={
                  user?.isLoggedIn && user?.role === 'editor' ? (
                    <EditorBlog />
                  ) : (
                    <NotAllowed />
                  )
                }
              />

              <Route
                path="/manageverified"
                element={
                  user?.isLoggedIn && user?.role === 'admin' ? (
                    <ManageVerification />
                  ) : (
                    <NotAllowed />
                  )
                }
              />
              <Route path="/aboutpage" element={<AboutPage />} />
              <Route path="/fakenews" element={<ViewVerified />} />
              <Route
                path="/pendingimages"
                element={
                  user?.isLoggedIn && user?.role === 'verifier' ? (
                    <PendingImage />
                  ) : (
                    <NotAllowed />
                  )
                }
              />
              <Route
                path="/verifyimage"
                element={
                  user?.isLoggedIn ? (
                    <VerifyImage />
                  ) : (
                    <NotAllowed />
                  )
                }
              />
              <Route
                path="/report"
                element={
                  user?.isLoggedIn ? (
                    <Report />
                  ) : (
                    <NotAllowed />
                  )
                }
              />
            </Routes>
            <Footer />
          </>
        )}
                <ChatBot />

      </Router>
    </UserProvider>
  );
};

export default App;
