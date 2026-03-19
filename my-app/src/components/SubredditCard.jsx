import React from "react";
import { Card, Button, Space, Dropdown, Menu } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";


function SubredditCard({ subreddit, onDelete }) {
    const menuItems=[
        {
            key:'refresh',
            label:'Refresh'
        },
        {
            key:'delete',
            label:'Delete',
            danger:true


        }

    ]
    const handleMenuClick = (e) => {
    if (e.key === 'delete') {
      onDelete(subreddit);
    } else if (e.key === 'refresh') {
      
      console.log('Refresh clicked for', subreddit);
    }
  };
  return (
    <Card
      title={<div style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>r/{subreddit}</div>}
      style={{
        marginBottom: 16,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(231, 64, 14, 0.15)",
        padding: 16,
        backgroundColor: "#FFB366",
        minHeight: 220,
        display: "flex",
        flexDirection: "column"
      }}
      extra={
        <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
     <Button icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <Space direction="vertical" size="large" style={{ width: "100%", flex: 1 }}>
        <div>
          <p style={{ margin: "0 0 8px 0", fontSize: 14 }}>
            Subreddit: <strong>{subreddit}</strong>
          </p>
        </div>
        <Space direction="horizontal" wrap style={{ width: "100%" }}>
          <Button 
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
          <Button 
            type="default"
            size="small"
            style={{
              fontSize: 12,
              fontWeight: "bold",
              visibility: "visible",
              opacity: 1
            }}
          >
            View Details
          </Button>
        </Space>
      </Space>
    </Card>
  );
}

export default SubredditCard;
