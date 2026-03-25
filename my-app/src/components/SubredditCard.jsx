import React, { useState } from "react";
import { Card, Button, Space, Modal } from "antd";
import { DeleteOutlined, ReloadOutlined, EyeOutlined,CloseOutlined } from "@ant-design/icons";

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
        title={
          <div style={{ 
            fontSize: 20, 
            fontWeight: "700", 
            color: "#ffffff", // Changed to white
            letterSpacing: "0.3px"
          }}>
            r/{subreddit}
          </div>
        }
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)", // Darker shadow
          border: "1px solid #000000",
          backgroundColor: "#141414", // Dark background
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
        bodyStyle={{
          padding: "20px",
          backgroundColor: "#141414", // Dark background
        }}
        headStyle={{
          backgroundColor: "#1f1f1f", // Dark gray header
          borderBottom: "2px solid #ff9933",
          padding: "16px 20px",
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          
          <div style={{ 
            padding: "12px 16px",
            backgroundColor: "#262626", // Darker info box
            borderRadius: 8,
            border: "1px solid #434343" // Dark border
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: 15,
              color: "#e0e0e0" // Light gray text
            }}>
              📱 Subreddit: <strong style={{ color: "#ff9933" }}>{subreddit}</strong>
            </p>
          </div>

          
          <Space 
            direction="horizontal" 
            style={{ 
              width: "100%",
              justifyContent: "space-between",
              marginTop: 8
            }}
          >
            <Button 
              onClick={handleViewPosts}
              type="primary"
              icon={<EyeOutlined />}
              size="middle"
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                fontWeight: "600",
                borderRadius: 6,
                boxShadow: "0 2px 6px rgba(24, 144, 255, 0.2)",
                flex: 1,
                marginRight: 8
              }}
            >
              View Posts
            </Button>

            <Button
              onClick={() => onDelete(subreddit)}
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="middle"
              style={{
                fontWeight: "600",
                borderRadius: 6,
                boxShadow: "0 2px 6px rgba(255, 77, 79, 0.2)"
              }}
            >
              Delete
            </Button>
          </Space>
        </Space>
      </Card>

      
      <Modal
        title={
          <div style={{ 
            fontSize: 18, 
            fontWeight: "700",
            color: "#ffffff", 
            backgroundColor: "#141414" 
          }}>
             Posts from r/{subreddit}
          </div>
        }
        open={isPostsModalOpen}
        onCancel={() => setIsPostsModalOpen(false)}
        footer={null}
        width={900}
        closeIcon={
    <div style={{
      backgroundColor: '#333333', // Dark background for the button
      color: '#ffffff',           // White cross icon
      borderRadius: '50%',        // Makes the background a perfect circle
      width: '32px',              // Total width of the circle
      height: '32px',             // Total height of the circle
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',           // Size of the cross itself
      transition: 'background-color 0.3s ease',
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555555'} // Hover effect
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
    >
      <CloseOutlined />
    </div>
  }
        styles={{ 
          body: {
            maxHeight: "500px",
            overflowY: "auto",
            padding: "24px",
            backgroundColor: "#141414" // Dark modal body
          },
          content: {
            backgroundColor: '#141414', // Dark modal content wrapper
          },
          header: {
            backgroundColor: '#141414', // Dark modal header
            borderBottom: '1px solid #333'
          }
        }}
        
        bodyStyle={{
          maxHeight: "500px",
          overflowY: "auto",
          padding: "24px",
          backgroundColor: "#141414"
        }}
      >
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: 20 
        }}>
          <Button
            onClick={handleViewPosts}
            loading={isLoadingPosts}
            type="primary"
            icon={<ReloadOutlined />}
            size="middle"
            style={{ 
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
              fontWeight: "600",
              borderRadius: 6,
              boxShadow: "0 2px 6px rgba(24, 144, 255, 0.2)"
            }}
          >
            Refresh Posts
          </Button>
        </div>

        
        {isLoadingPosts ? (
          <Loading 
            tip={`Loading posts from r/${subreddit}...`} 
            height={200} 
            size="default" 
            padding="40px" 
          />
        ) : posts[subreddit] && posts[subreddit].length > 0 ? (
          <div>
            {posts[subreddit].map((post, index) => (
              <div 
                key={post.id} 
                style={{ 
                  marginBottom: 16,
                  padding: 20,
                  backgroundColor: '#1f1f1f', 
                  border: '1px solid #333', 
                  borderRadius: 10,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#555';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                <h3 style={{ 
                  margin: '0 0 12px 0',
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#ffffff', 
                  lineHeight: '1.5'
                }}>
                  {index + 1}. {post.title}
                </h3>
                
                <div style={{ 
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                  marginBottom: 12,
                  fontSize: 14,
                  color: '#b3b3b3' 
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    👤 <strong style={{ color: '#e0e0e0' }}>{post.author}</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    ⬆️ <strong style={{ color: '#ff6600' }}>{post.score}</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    💬 <strong style={{ color: '#40a9ff' }}>{post.num_comments}</strong>
                  </span>
                </div>

                <a 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#40a9ff', 
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: 14,
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#69c0ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#40a9ff'}
                >
                  🔗 View on Reddit →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#777', 
            fontSize: 16
          }}>
            <p style={{ fontSize: 48, margin: '0 0 16px 0' }}>📭</p>
            <p style={{ margin: 0, fontWeight: '500', color: '#ccc' }}>No posts loaded yet</p>
            <p style={{ margin: '8px 0 0 0', fontSize: 14 }}>Click "Refresh Posts" to load content</p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default SubredditCard;