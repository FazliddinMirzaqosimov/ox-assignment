import jwtAxios from "auth/jwt-auth/jwtaxios";
import { TestType } from "pages/dashboard/QuizPage/Types";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import shuffle from "utils/shuffle";
import TestsOutput from "./TestsOutput";
import "./test.style.scss";

function TestPage() {
  const { topic } = useParams();
  const [tests, setTests] = useState<TestType[] | null>(null);

  useEffect(() => {
    jwtAxios
      .get(`/tests?section=${topic}`)
      .then((res) => setTests(res.data.data.tests))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="tests">
      <TestsOutput tests={tests} />
    </div>
  );
}

export default TestPage;
