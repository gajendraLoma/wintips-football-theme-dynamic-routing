"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useTranslations } from "next-intl";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight/2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <div className="scroll-to-top-button text-center" onClick={scrollToTop}>
          <Image src="/images/up-arrow.png" alt="arrow" width={30} height={30} className='back-to-top-text' />
        <div className="back-to-top-text" style={{fontSize: "13px", lineHeight: "1"}}> {t("back-to-top")} </div> 
      </div>
    )
  );
};

export default ScrollToTopButton;
