'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    // Create floating elements
    const elements = Array.from({ length: 20 }, () => {
      const element = document.createElement('div');
      element.className = 'absolute bg-accent-600/10 rounded-full';
      element.style.width = `${Math.random() * 100 + 50}px`;
      element.style.height = element.style.width;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      background.appendChild(element);
      return element;
    });

    // Animate each element
    elements.forEach((element, index) => {
      gsap.to(element, {
        y: '+=50',
        x: '+=30',
        rotation: 360,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      });
    });

    // Parallax effect on scroll
    gsap.to(background, {
      backgroundPosition: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: background,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      // Cleanup
      while (background.firstChild) {
        background.removeChild(background.firstChild);
      }
    };
  }, []);

  return (
    <motion.div
      ref={backgroundRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-accent-50 to-accent-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default AnimatedBackground; 