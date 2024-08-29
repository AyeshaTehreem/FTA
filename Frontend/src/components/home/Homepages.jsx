import React from "react"
import Discover from "./discover/Discover"
import Hero from "./hero/Hero"
import NewsSlider from "./slider/SliderDesign"
import NewsSection from "./videodesign/VideoDesign"
import NewsCorner from "./newsCorner/NewsCorner"

const Homepages = () => {
  return (
    <>
    <NewsSlider/>
    <Discover />
    <Hero />
    <NewsCorner/>
    <NewsSection />
    
    </>
  )
}

export default Homepages
