// src/components/RenderedContent.js
import React from 'react';

const RenderedContent = ({ content }) => (
  <div className="rendered-content">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export default RenderedContent;
