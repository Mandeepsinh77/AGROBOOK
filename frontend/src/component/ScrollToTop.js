import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsVisible(false);
  };

  const handleScroll = () => {
    // Set isVisible to true when you're near the bottom of the page (adjust 200 to your preference)
    if (window.scrollY > window.innerHeight - 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`scroll-to-top`}
      onClick={scrollToTop}
    >
      {isVisible ? (
        <span
          className="text-5xl cursor-pointer sticky text-white hover:text-[#6AB187]"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            cursor: "pointer",
          }}
        >
          <ion-icon name="caret-up-circle-outline"></ion-icon>
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default ScrollToTop;
