import { Button, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { natijaType } from "./TestsOutput";

type PropTypes = {
  natija: natijaType;
};

function GameOver({ natija }: PropTypes) {
  const cols = [
    { key: 1, title: "Questions", dataIndex: "max" },
    { key: 2, title: "Found", dataIndex: "found" },
    {
      key: 3,
      title: "Precent",
      render: () => `${Math.round(100 * (natija.found / natija.max))}%`,
    },
  ];
  return (
    <>
      <h1>Game Over </h1>

      <Table dataSource={[natija]} columns={cols} />
      <Link to="/sample/topics">
        <Button type="primary">Back</Button>
      </Link>
    </>
  );
}

export default GameOver;
