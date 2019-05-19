import React from "react";
import "./input.css";
const InputBox = props => {
  const { handleInputChange,handleSubmission } = props;
  return (
    <div className="input-box-container">
      <input
        placeholder="Enter Repo Link"
        className="input"
        onChange={e => handleInputChange(e.target.value)}
      />
      <button className="button" onClick={() => handleSubmission()}>
        Submit{" "}
      </button>
    </div>
  );
};
export default InputBox;
