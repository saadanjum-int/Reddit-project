import React, { useState } from "react";
import { Space, Card } from "antd";
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
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card title="Subreddit Manager" style={{ marginBottom: "20px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form input={subredditInput} setInput={setSubredditInput} />
          <Button
            text="Add Subreddit"
            onClick={handleAddSubreddit}
            type="primary"
              style={{ color: "yellow", backgroundColor: "blue" }}
          />
        </Space>
      </Card>

      {subredditList.length > 0 && (
        <div>
          <h2>Your Subreddits</h2>
          {subredditList.map((subreddit) => (
            <SubredditCard
              key={subreddit}
              subreddit={subreddit}
              onDelete={handleDeleteSubreddit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;