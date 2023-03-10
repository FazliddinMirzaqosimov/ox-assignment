import { message } from "antd";
import { TestType } from "pages/dashboard/QuizPage/Types";
import React, { useState, useEffect } from "react";
import Test from "./Test";

type PropType = {
  tests: TestType[] | null;
};
function TestOutput({ tests }: PropType): JSX.Element {
  const [testsLength, setTestsLength] = useState<{
    max: number;
    current: number;
    found: number;
  }>({ max: 0, current: 0, found: 0 });

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
    return (
      <>
        <h1>Game Over </h1>
        <ul>
          <li>Questions - {testsLength.max}</li>
          <li>Found - {testsLength.found}</li>
          <li>
            Precent - {Math.round(100 * (testsLength.found / testsLength.max))}%
          </li>
        </ul>
      </>
    );
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
