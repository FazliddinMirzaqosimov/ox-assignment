import { Card } from "antd";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import { TopicType } from "pages/dashboard/QuizPage/Types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./topics.style.scss";

function SectionPage() {
  const [topics, setTopics] = useState<TopicType[] | null>(null);
  useEffect(() => {
    jwtAxios.get("/sections").then((res) => setTopics(res.data.data.sections));
  }, []);

  return (
    <>
      <div className="topics ">
        <h1>Topics</h1>
        <div className="cards">
          {topics?.map((topic: TopicType) => (
            <Link to={`/sample/tests/${topic._id}`} className="card">
              <Card>
                <div className="topic-title">{topic.title}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default SectionPage;
