import React from "react";

const Image3d = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="images-container">
          <span style={{ "--i": 1 }}>
            <img className="images" src="../1.jpeg" alt="img1" />
          </span>
          <span style={{ "--i": 2 }}>
            <img className="images" src="./2.jpg" alt="img2" />
          </span>
          <span style={{ "--i": 3 }}>
            <img className="images" src="./3.jpg" alt="img3" />
          </span>
          <span style={{ "--i": 4 }}>
            <img className="images" src="./4.jpg" alt="img4" />
          </span>
          <span style={{ "--i": 5 }}>
            <img className="images" src="./5.jpg" alt="img5" />
          </span>
          <span style={{ "--i": 6 }}>
            <img className="images" src="./6.webp" alt="img6" />
          </span>
          <span style={{ "--i": 7 }}>
            <img className="images" src="./7.jpg" alt="img7" />
          </span>
          <span style={{ "--i": 8 }}>
            <img className="images" src="./8.jpg" alt="img8" />
          </span>
          <span style={{ "--i": 9 }}>
            <img className="images" src="./9.jpg" alt="img9" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Image3d;
