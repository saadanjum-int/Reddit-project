import React from "react";
import { Card, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function SubredditCard({ subreddit, onDelete }) {
  return (
    <Card
      title={`r/${subreddit}`}
      style={{ marginBottom: 16 }}
      extra={
        <Button
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(subreddit)}
        >
          Remove
        </Button>
      }
    >
      <Space direction="vertical">
        <p>Subreddit: <strong>{subreddit}</strong></p>
        <Space>
          <Button type="link">View Posts</Button>
          <Button type="link">View Details</Button>
        </Space>
      </Space>
    </Card>
  );
}

export default SubredditCard;
