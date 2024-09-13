// src/pages/Home.js
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import RenderedContent from '../components/RenderedContent';
import DynamicRenderer from '../components/DynamicRenderer';
import { renderContent } from '../services/renderService';

const Home = () => {
  const [content, setContent] = useState('');

  const handleFileUpload = async (file) => {
    const renderedContent = await renderContent(file);
    setContent(renderedContent);
  };

  return (
    <div className="home">
      <h1>Welcome to Science Hub</h1>
      <DynamicRenderer />
      {/* <FileUpload onFileUpload={handleFileUpload} />
      {content && <RenderedContent content={content} />} */}
    </div>
  );
};

export default Home;
