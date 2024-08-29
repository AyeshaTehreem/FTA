import React, { useState, useEffect } from "react";
import Header from "./components/common/header/Header";
import "./App.css";
import Homepages from "./components/home/Homepages";
import Footer from "./components/common/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/loginPage/Login";
import Contact from "./components/contactPage/Contact";
import BlogPost from "./components/blogPost/BlogPost";
import LoadingScreen from "./components/LoadingScreen";
import ThemeToggle from "./components/ThemeToggle";
import AboutPage from "./components/about/About";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Header />
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Homepages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogpost" element={<BlogPost />} />
            <Route path="/aboutpage" element={<AboutPage />} />

          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
};

export default App;
