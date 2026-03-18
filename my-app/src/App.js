// App.js
import './App.css';
import SubredditApp from './components/App'; // Renamed to avoid conflict

function App() {
  return (
    <div className="App">
      <h1>Reddit Subreddit Search</h1>  
      <SubredditApp />
    </div>
  );
}

export default App;