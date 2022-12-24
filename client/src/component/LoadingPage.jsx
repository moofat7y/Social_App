import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
const LoadingPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 3500);
  return (
    <>
      {loading ? (
        <div className="loading bg-white">
          <div className="box">
            <div className="fading-line rounded-pill bg-primary"></div>
            <div className="fading-line rounded-pill mx-3 bg-primary"></div>
            <div className="fading-line rounded-pill bg-primary"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoadingPage;
