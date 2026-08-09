// src/App.jsx
import React from 'react';
import HomePageTP from './Components/HomePageTP';
import ProjectDetail from './Components/ProjectDetail';

function App() {
  const params = new URLSearchParams(window.location.search);
  const projectKey = params.get('project');

  return (
    <div className="App">
      {projectKey ? <ProjectDetail /> : <HomePageTP />}
    </div>
  );
}

export default App;
