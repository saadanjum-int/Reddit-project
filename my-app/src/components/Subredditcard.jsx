import React from 'react'
import { Card } from 'antddesign'
import { useState } from 'react'
import Form from './Form'


function Subredditcard(e) {


    const[subreddit,setSubreddit]=useState("")

    const handleChange=(e)=>{
        setSubreddit(e.target.value)

    }
  return (
    <div>
        <Card title="Subreddit Card">
            <Form input={subreddit} setInput={setSubreddit}/>
        </Card>

    </div>
  )
}

export default Subredditcard