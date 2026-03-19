import React, { useState } from "react";
import { Space, Card, Row, Col } from "antd";
import Form from "./Form";
import Button from "./Button";
import SubredditCard from "./SubredditCard";

function App() {
  const [subredditInput, setSubredditInput] = useState("");         
  const [subredditList, setSubredditList] = useState([]); 

  const handleAddSubreddit = () => {
    if (subredditInput.trim() !== "") {
      setSubredditList([...subredditList, subredditInput]);
      setSubredditInput(""); 
    }
  };

  const handleDeleteSubreddit = (subreddit) => {
    setSubredditList(subredditList.filter(item => item !== subreddit));
  };

  return (
    <div
      style={{
        minHeight: "100vh",      
        backgroundColor: "#FF8C00", 
        padding: 20,
      }}
    >
      
    
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card title="Subreddit Manager" style={{ marginBottom: "20px", backgroundColor: "#FFB366" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form input={subredditInput} setInput={setSubredditInput} />
          <Button
            text="Add Subreddit"
            onClick={handleAddSubreddit}
            type="primary"
          />
        </Space>
      </Card>

      {subredditList.length > 0 && (
        <div>
          <h2>Your Subreddits</h2>
          <Row gutter={[16, 16]}>
            {subredditList.map((subreddit) => (
              <Col xs={24} sm={12} md={8} lg={6} key={subreddit}>
                <SubredditCard
                  subreddit={subreddit}
                  onDelete={handleDeleteSubreddit}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;