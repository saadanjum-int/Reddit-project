import React, { useState } from "react";
import { Space, List, Card } from "antd";
import Form from "./Form";
import Button from "./Button";

function App() {
  const [subredditInput, setSubredditInput] = useState("");         
  const [subredditList, setSubredditList] = useState([]); 

  const handleAddSubreddit = () => {
    if (subredditInput.trim() !== "") {
      setSubredditList([...subredditList, subredditInput]);
      setSubredditInput(""); 
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Card title="Subreddit Manager" style={{ marginBottom: "20px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form input={subredditInput} setInput={setSubredditInput} />
          <Button onClick={handleAddSubreddit} text="Add Subreddit" type="primary" />
        </Space>
      </Card>

      {subredditList.length > 0 && (
        <Card title="Your Subreddits">
          <List
            dataSource={subredditList}
            renderItem={(subreddit, index) => (
              <List.Item key={index}>
                <span>{subreddit}</span>
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
}

export default App;