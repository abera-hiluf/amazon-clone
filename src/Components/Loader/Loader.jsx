import React from 'react'
import { FadeLoader } from 'react-spinners'

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // important to stack spinner and text
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <FadeLoader color="#36d7b7" />
      <p style={{ marginTop: "1rem", color: "#555" }}>Loading...</p>
    </div>
  );
}


export default Loader
