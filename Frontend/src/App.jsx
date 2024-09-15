import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Homepages from "./components/home/Homepages";
import PendingImage from "./components/Verification/pendingImage"; // correct casing
import VerifyImage from "./components/Verification/verifyimage";
import Report from "./components/Verification/Report"; // Import the Report component
import Login from "./components/loginPage/Login";
import Contact from "./components/contactPage/Contact";
import BlogPost from "./components/blogPost/BlogPost";
import AboutPage from "./components/about/About";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogpost" element={<BlogPost />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/pendingimages" element={<PendingImage />} /> {/* Add this route */}
        <Route path="/verifyimage" element={<VerifyImage />} /> {/* Add this route */}
        <Route path="/report" element={<Report />} /> {/* Add the Report route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
