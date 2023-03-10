import { Button, Card, Col, Image, Row } from "antd";
import { AnswerType, TestType } from "pages/dashboard/QuizPage/Types";
import shuffle from "utils/shuffle";

type PropTypes = {
  test: TestType;
  handleAnswer: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  nextQuestion: () => void;
};

function Test({ test, handleAnswer, nextQuestion }: PropTypes) {
  return (
    <div className="Test">
      <div className="question">
        <Card>
          {test.image ? (
            <div className="image-container">
              <Image src={test.image} className="image-test" />
            </div>
          ) : (
            ""
          )}
          <p className="question-text">{test.question}</p>
        </Card>
        <div className="answers">
          {shuffle<AnswerType>(test.variants).map((el) => (
            <div
              className="answer"
              data-id={el.isAnswer}
              onClick={handleAnswer}
            >
              <Card>{el.title}</Card>
            </div>
          ))}
        </div>
        <Row justify={"end"}>
          <Col>
            <Button type="primary" onClick={nextQuestion}>
              Next
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Test;
