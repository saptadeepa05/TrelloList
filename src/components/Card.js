import React from "react";
import "antd/dist/antd.css";
import { CloseOutlined } from "@ant-design/icons";

const Card = ({ text, onDelete }) => {
  const cardStyle = {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: "4px 8px",
    border: "1px solid lightgray",
    borderRadius: "4px",
  };
  return (
    <div style={{ display: "flex", marginBottom: "12px", cursor: "grab" }}>
      <div style={cardStyle}>{text}</div>
      <button style={{ cursor: "pointer" }} onClick={onDelete}>
        <CloseOutlined />
      </button>
    </div>
  );
};

export default Card;
