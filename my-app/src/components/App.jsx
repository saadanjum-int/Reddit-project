import React, { useState } from "react";
import { Space, Card, Row, Col, Modal, Button as AntButton } from "antd";
import { PlusOutlined } from "@ant-design/icons"; 
import Form from "./Form";
import Button from "./Button";
import SubredditCard from "./SubredditCard";

function App() {
  const [subredditInput, setSubredditInput] = useState("");         
  const [subredditList, setSubredditList] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddSubreddit = () => {
    if (subredditInput.trim() !== "") {
      setSubredditList([...subredditList, subredditInput]);
      setSubredditInput(""); 
      setIsModalOpen(false);
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
      
      <AntButton 
        type="primary" 
        shape="circle" 
        icon={<PlusOutlined />} 
        onClick={showModal}
        size="large"
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          fontSize: 24
        }}
      />

      
      <Modal
        title="Enter the name of subreddit"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form input={subredditInput} setInput={setSubredditInput} />
          <Button
            text="Add Subreddit"
            onClick={handleAddSubreddit}
            type="primary"
          />
        </Space>
      </Modal>
    
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        

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