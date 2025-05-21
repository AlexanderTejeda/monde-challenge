import { useEffect } from "react";

const Loader = ({ onFinish }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <img src="/loader.png" alt="MONDE logo" className="loader-logo" />
    
      </div>
    </div>
  );
};

export default Loader;
