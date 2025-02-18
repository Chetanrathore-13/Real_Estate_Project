import React from 'react'
import { gsap } from "gsap";
    
import { Flip } from "gsap/Flip";

const Animation = () => {
  return (
    <div>
      gsap.registerPlugin(Flip);
    </div>
  )
}

export default Animation
