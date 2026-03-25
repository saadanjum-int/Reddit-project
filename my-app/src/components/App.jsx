import React, { useState } from "react";
import { Space, Row, Col, Modal, Button as AntButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Form from "./Form";
import Button from "./Button";
import SubredditCard from "./SubredditCard";
import { fetchSubredditPosts } from "./RedditApi";

import Loading from "./Loading";
import Prism from "./Prism";


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
    setLoadingSubreddits((currentDictionary) => {
  
      const updatedDictionary = { ...currentDictionary };

    
      updatedDictionary[newSubreddit] = true;

      
      return updatedDictionary;
    });

    try {
      const fetchedPosts = await fetchSubredditPosts(newSubreddit);

      if (!fetchedPosts || fetchedPosts.length === 0) {
        alert("Subreddit not found. Please check the name and try again.");
        return;
      }

      if (!subredditList.includes(newSubreddit)) {
        setSubredditList([...subredditList, newSubreddit]);
        setPosts((currentPostsStorage) => {
  
        const updatedPosts = { ...currentPostsStorage };

 
        updatedPosts[newSubreddit] = fetchedPosts;

        
        return updatedPosts;
      });
      }

      setSubredditInput("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add subreddit", error);
      alert("Error fetching subreddit posts!");
    } finally {
      setIsAdding(false);
      setLoadingSubreddits((prev) => ({ ...prev, [newSubreddit]: false }));
    }
  };

  const handleDeleteSubreddit = (subreddit) => {
    setSubredditList(subredditList.filter((item) => item !== subreddit));
    setLoadingSubreddits((prev) => ({ ...prev, [subreddit]: false }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color:'white',
        backgroundColor: "black"
      }}
    >
      
      <div style={{ 
  position: 'absolute', 
  top: 0, 
  left: 0, 
  width: '100%', 
  height: '100%', 
  zIndex: 0 
}}>
  <Prism
    animationType="rotate"
    timeScale={0.5}
    height={3.5}
    baseWidth={5.5}
    scale={3.6}
    hueShift={0}
    colorFrequency={1}
    noise={0}
    glow={1}
  />
</div>

      
      <div style={{ position: "relative", zIndex: 1 }}>
        
        <AntButton
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            width: 60,
            height: 60,
            fontSize: 24,
            zIndex: 1000,
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            color: "#fff",
            boxShadow: "0 6px 20px rgba(24, 144, 255, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(24, 144, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(24, 144, 255, 0.4)";
          }}
        />

        
        {subredditList.length === 0 && (
          <div
            style={{
              position: "fixed",
              bottom: 100,
              right: 100,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              animation: "bounce 2s infinite",
              zIndex: 999,
            }}
          >
            <span
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "12px 18px",
                borderRadius: "10px",
                fontWeight: "bold",
                color: "#FF8C00",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap",
                fontSize: "15px",
                border: "2px solid #FFB366",
              }}
            >
              Click here to add subreddit
            </span>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              style={{
                transform: "rotate(45deg)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            >
              <path
                d="M 10 30 L 40 30 L 30 40 M 40 30 L 30 20"
                stroke="#FF8C00"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        
        <style>
          {`
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          `}
        </style>

        
        <Modal
          title={
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a1a" }}>
               Enter the name of subreddit
            </span>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Form input={subredditInput} setInput={setSubredditInput} />

            <Button
              type="primary"
              onClick={handleAddSubreddit}
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                color: "white",
                display: "block",
                width: "100%",
                height: "40px",
                fontSize: "15px",
                fontWeight: "600",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(24, 144, 255, 0.3)",
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
    </div>
  );
}

export default App;