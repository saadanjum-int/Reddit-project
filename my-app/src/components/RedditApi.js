export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(
      `https://corsproxy.io/?https://www.reddit.com/r/${subreddit}.json`
    );
    const json = await response.json();
    
    
    const posts = json.data.children.map(post => ({
      id: post.data.id,
      title: post.data.title,
      author: post.data.author,
      score: post.data.score,           
      num_comments: post.data.num_comments,
      created: post.data.created_utc,   
      url: post.data.url,               
      permalink: `https://www.reddit.com${post.data.permalink}`, 
      thumbnail: post.data.thumbnail     
    }));
    
    console.log('Formatted posts:', posts);
    
    return posts;
  } catch (error) {
    
    console.error('Error fetching posts:', error);
    return [];
  }
};