import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Link to="/sample/topics">
        <Button type="primary">Testni Boshlash</Button>
      </Link>
    </div>
  );
}

export default HomePage;
