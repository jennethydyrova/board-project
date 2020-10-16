import React, { useState } from "react";
import db from "../../firebaseConfig";
import "antd/dist/antd.css";
import { Button } from "antd";

const Header = () => {
  const [error, setError] = useState("");

  const handleLogOut = () => {
    db.auth()
      .signOut()
      .then(function () {
        console.log("success");
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  return (
    <div className="header">
      <Button
        variant="outline-info"
        style={{ marginTop: "10px" }}
        type="submit"
        size="sm"
        onClick={(e) => handleLogOut(e)}
        className="form-btn logout-btn"
      >
        Log Out
      </Button>
    </div>
  );
};
export default Header;
