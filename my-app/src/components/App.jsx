import React, { useState } from "react";
import { Space,  Row, Col, Modal, Button as AntButton} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Form from "./Form";
import Button from "./Button";
import SubredditCard from "./SubredditCard";
import { fetchSubredditPosts } from "./RedditApi";

import Loading from "./Loading";

function App() {
  const [subredditInput, setSubredditInput] = useState("");         
  const [subredditList, setSubredditList] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState({}); 
  const [loadingSubreddits, setLoadingSubreddits] = useState({});
  const [isAdding, setIsAdding] = useState(false);


  const showModal = () => setIsModalOpen(true);
  
 

  const handleAddSubreddit = async () => {
  const newSubreddit = subredditInput.trim();
  if (!newSubreddit) return;

  setIsAdding(true); 
  setLoadingSubreddits(prev => ({ ...prev, [newSubreddit]: true })); 

  try {
    const fetchedPosts = await fetchSubredditPosts(newSubreddit);

    if (!fetchedPosts || fetchedPosts.length === 0) {
      alert('Subreddit not found. Please check the name and try again.');
      return;
    }

    
    if (!subredditList.includes(newSubreddit)) {
      setSubredditList([...subredditList, newSubreddit]);
      setPosts(prev => ({ ...prev, [newSubreddit]: fetchedPosts }));
    }

    setSubredditInput("");
    setIsModalOpen(false);

  } catch (error) {
    console.error("Failed to add subreddit", error);
    alert("Error fetching subreddit posts!");
  } finally {
    setIsAdding(false); 
    setLoadingSubreddits(prev => ({ ...prev, [newSubreddit]: false })); 
  }
};
  const handleDeleteSubreddit = (subreddit) => {
    setSubredditList(subredditList.filter(item => item !== subreddit));
    setLoadingSubreddits(prev => ({ ...prev, [subreddit]: false }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FF8C00",
        padding: 20,
        position: "relative",
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
          fontSize: 24,
          zIndex: 1000,
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
          transition: "all 0.3s ease",
          
        }}
      />

      
      <Modal
        title="Enter the name of subreddit"
        open={isModalOpen}
       
        footer={null}
      >
            <Space 
        direction="vertical" 
        size="large"   // 👈 increases space
        style={{ width: "100%" }}
      >
          <Form input={subredditInput} setInput={setSubredditInput} />
            
          <Button
            type="primary"
            onClick={handleAddSubreddit}
            style={{
              backgroundColor: "blue",
              borderColor: "blue",
              color: "white",
              display: "block",
              width: "100%"
            }}
          >
            Add Subreddit
          </Button>

          
          {isAdding && (
            <Loading 
              tip="Adding subreddit..." 
              height={50} 
              size="small" 
              padding="8px" 
            />
          )}
        </Space>
      </Modal>

      
      <div style={{ padding: "20px 40px" }}>
        <Row gutter={[24, 24]}>
          {subredditList.map((subreddit) => (
            <Col xs={24} sm={24} md={8} key={subreddit}>
              {loadingSubreddits[subreddit] ? (
                <Loading tip={`Loading r/${subreddit}...`} height={150} />
              ) : (
                <SubredditCard
                  subreddit={subreddit}
                  onDelete={handleDeleteSubreddit}
                  setPosts={setPosts}
                  posts={posts}
                />
              )}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default App;