import React, { useState } from "react";
import { Card, Button, Space, Modal } from "antd";

import { fetchSubredditPosts } from "./RedditApi";
import Loading from "./Loading";

function SubredditCard({ subreddit, onDelete, setPosts, posts }) {
  const [isPostsModalOpen, setIsPostsModalOpen] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  


  const handleViewPosts = async () => {
    setIsLoadingPosts(true);
    setIsPostsModalOpen(true);
    try {
      const fetchedPosts = await fetchSubredditPosts(subreddit);
      
      setPosts(prevPosts => ({
        ...prevPosts,
        [subreddit]: fetchedPosts
      }));
      
      console.log('Posts stored for', subreddit, fetchedPosts);
    } catch (e) {
      console.error("Failed to fetch posts", e);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  return (
    <>
      <Card
        title={<div style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>r/{subreddit}</div>}
        style={{
          marginBottom: 16,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(231, 64, 14, 0.15)",
          padding: 16,
          backgroundColor: "#FFB366",
          display: "flex",
          flexDirection: "column",  
          width: '100%',
          opacity: 1,
          border: '1px solid #e67a00',
          background: '#FFB366', // fallback for backgroundColor
          zIndex: 1
        }}
        bodyStyle={{
          backgroundColor: '#FFB366',
          opacity: 1,
          background: '#FFB366',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-middle', marginBottom: 16 }}>
          <Button
            onClick={() => onDelete(subreddit)}
            type="primary"
            danger
            icon={<span role="img" aria-label="delete">🗑️</span>}
            size="small"
            style={{
              backgroundColor: '#ff4d4f',
              borderColor: '#ff4d4f',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 12,
              boxShadow: '0 2px 8px rgba(255,77,79,0.15)'
            }}
          >
            Delete
          </Button>
        </div>
        <Space direction="vertical" size="large" style={{ width: "100%", flex: 1 }}>
          <div>
            <p style={{ margin: "0 0 8px 0", fontSize: 14 }}>
              Subreddit: <strong>{subreddit}</strong>
            </p>
          </div>
          <Space direction="horizontal" wrap style={{ width: "100%" }}>
            <Button 
              onClick={handleViewPosts}
              type="default"
              size="small"
              style={{
                fontSize: 12,
                fontWeight: "bold",
                visibility: "visible",
                opacity: 1
              }}
            >
              View Posts
            </Button>
          </Space>
        </Space>
      </Card>

      <>
      <Modal
        title={`Posts from r/${subreddit}`}
        open={isPostsModalOpen}
        onCancel={() => setIsPostsModalOpen(false)}
        footer={null}
        width={900}
        bodyStyle={{
          maxHeight: "400px", 
          overflowY: "auto",  
          padding: "16px",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button
            onClick={handleViewPosts}
            loading={isLoadingPosts}
            type="primary"
            size="small"
            style={{ marginBottom: 8 ,
                  color: "white",
                  backgroundColor: 'blue',
                  borderColor: 'blue',
                  fontSize: 12,
                  fontWeight: "bold",
                  visibility: "visible",
                  opacity: 1
                 }
             }
          >
            Refresh
          </Button>
        </div>
        {isLoadingPosts ? (
          <Loading 
            tip={`Loading posts from r/${subreddit}...`} 
            height={100} 
            size="default" 
            padding="24px" 
          />
        ) : posts[subreddit] && posts[subreddit].length > 0 ? (
          <div>
            {posts[subreddit].map(post => (
              <div key={post.id} style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
                <h3>{post.title}</h3>
                <p>👤 {post.author} | ⬆️ {post.score} | 💬 {post.num_comments}</p>
                <a href={post.permalink} target="_blank" rel="noopener noreferrer">View on Reddit</a>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts loaded yet</p>
        )}
      </Modal>
    </></>
  );
}

export default SubredditCard;