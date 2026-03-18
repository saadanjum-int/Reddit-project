import React from "react";
import { Input } from "antd";

function Form({ input, setInput }) {
  const handleChange = (e) => setInput(e.target.value);

  return (
    <div>
      <label htmlFor="subreddit-input">Subreddit Name: </label>
      <Input
        id="subreddit-input"
        placeholder="Enter subreddit"
        value={input}
        onChange={handleChange}
        style={{ width: 200, marginRight: 10 }}
      />
    </div>
  );
}

export default Form;