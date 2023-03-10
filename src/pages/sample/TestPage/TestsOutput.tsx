import { Button, message } from "antd";
import { TestType } from "pages/dashboard/QuizPage/Types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GameOver from "./GameOver";
import Test from "./Test";

type PropType = {
  tests: TestType[] | null;
};

export type natijaType = {
  max: number;
  current: number;
  found: number;
};
function TestOutput({ tests }: PropType): JSX.Element {
  const [testsLength, setTestsLength] = useState<natijaType>({
    max: 0,
    current: 0,
    found: 0,
  });

  useEffect(() => {
    setTestsLength({ ...testsLength, max: tests?.length || 0 });
  }, [tests]);

  const handleAnswer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.dataset.id === "true") {
      setTestsLength({
        ...testsLength,
        current: testsLength.current + 1,
        found: testsLength.found + 1,
      });
      return message.success("Answer is correct ", 2);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    setTestsLength({ ...testsLength, current: testsLength.current + 1 });
    const answer = tests?.[testsLength.current]?.variants.filter(
      (ans: { isAnswer: boolean }) => ans.isAnswer
    );
    message.error("Answer is: " + answer?.[0].title, 2);
  };

  if (!tests || !testsLength.max) {
    return <h1>There is no questions yet</h1>;
  }
  if (testsLength.max === testsLength.current) {
    return <GameOver natija={testsLength} />;
  }
  return (
    <div>
      <Test
        test={tests[testsLength.current]}
        handleAnswer={handleAnswer}
        nextQuestion={nextQuestion}
      />
    </div>
  );
}

export default TestOutput;
