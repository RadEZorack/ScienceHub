import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const DynamicRenderer = () => {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');

  // Use environment variables for service URLs
  const cdnUrl = process.env.REACT_APP_CDN_URL || 'http://localhost:8080/';
  const latexRendererUrl = process.env.REACT_APP_LATEX_RENDERER_URL || 'http://localhost:5001/render';
  const pythonRendererUrl = process.env.REACT_APP_PYTHON_RENDERER_URL || 'http://localhost:5002/execute';
  const rRendererUrl = process.env.REACT_APP_R_RENDERER_URL || 'http://localhost:5003/execute';

  // Function to handle URL change
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  // Function to handle link clicks inside the iframe
  const handleLinkClick = (event) => {
    event.preventDefault(); // Prevent default link navigation
    const newUrl = event.target.href; // Get the URL from the clicked link
    setUrl(newUrl); // Set the new URL
  };

  // Effect to fetch content whenever the URL changes
  useEffect(() => {
    parseContentFromUrl(url);
  }, [url]);

  const parseContentFromUrl = async (targetUrl) => {
    try {
      const response = await axios.get(targetUrl);
      let fetchedContent = response.data;

      if (url.endsWith('.pyml')) {
        fetchedContent = await parsePyml(fetchedContent, targetUrl);
      } else {
        fetchedContent = await parseCustomTags(fetchedContent, targetUrl);
      }

      setContent(fetchedContent);
    } catch (error) {
      console.error('Error fetching or parsing content:', error);
    }
  };

  const parsePyml = async (content) => {
    let parsedContent = content;
    parsedContent = await parseCustomTags(parsedContent);
    return parsedContent;
  };

  // Function to parse custom tags and adjust links
  const parseCustomTags = async (htmlContent, baseUrl) => {
    // Use a DOM parser to update relative links
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Adjust all <a> tags with relative hrefs
    doc.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('//')) {
        // Convert relative hrefs to absolute using the base URL from the input
        link.setAttribute('href', new URL(href, baseUrl).toString());
      }
    });

    // Serialize the adjusted HTML back to a string
    const adjustedHtml = new XMLSerializer().serializeToString(doc);

    // Handle custom tags like <latex>, <python>, etc.
    let parsedContent = await replaceCustomTags(
      adjustedHtml,
      /<latex>([\s\S]*?)<\/latex>/gi,
      'latex_code',
      cdnUrl,
      latexRendererUrl,
      'pdf'
    );
    // htmlContent = await replaceCustomTags(
    //   htmlContent,
    //   /<python>([\s\S]*?)<\/python>/gi,
    //   'python_code',
    //   cdnUrl,
    //   pythonRendererUrl,
    //   'html'
    // );
    // htmlContent = await replaceCustomTags(
    //   htmlContent,
    //   /<r>([\s\S]*?)<\/r>/gi,
    //   'r_code',
    //   cdnUrl,
    //   rRendererUrl,
    //   'html'
    // );
    return parsedContent;
  };

  const replaceCustomTags = async (htmlContent, regex, queryParam, cdnUrl, backendUrl, fileExtension) => {
    // Match all instances of the custom tags
    const matches = [...htmlContent.matchAll(regex)];
    
    // Process each match asynchronously
    for (const match of matches) {
      const [fullMatch, code] = match;
      const codeHash = CryptoJS.MD5(code.trim()).toString();
      const fileUrl = `${cdnUrl}${codeHash}.${fileExtension}`;
  
      let replacement;
  
      try {
        // Check if the file already exists on the CDN
        const headResponse = await axios.head(fileUrl);
        if (headResponse.status === 200) {
          replacement = `<iframe src="${fileUrl}" width="600" height="600" frameborder="0"></iframe>`;
        }
      } catch (error) {
        try {
          // If not found, request rendering from the backend
          const response = await axios.post(backendUrl, { [queryParam]: code.trim(), hash: codeHash }, { responseType: 'json' });
          replacement = `<iframe src="${response.data.url}" width="600" height="600" frameborder="0"></iframe>`;
        } catch (error) {
          console.error('Error processing custom tag:', error);
        }
      }
  
      // Replace the match with the replacement content
      if (replacement) {
        htmlContent = htmlContent.replace(fullMatch, replacement);
      }
    }
  
    return htmlContent;
  };

  return (
    <div>
      <h1>Dynamic Content Renderer</h1>
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter a URL (e.g., https://raw.githubusercontent.com/.../index.html)"
        style={{ width: '100%' }}
      />
      <button onClick={() => parseContentFromUrl(url)}>Render from URL</button>
      
      {/* Render the fetched content inside an iframe */}
      <iframe
        srcDoc={content}
        onLoad={(event) => {
          // Attach a click event listener to links inside the iframe
          const iframeDocument = event.target.contentDocument || event.target.contentWindow.document;
          const links = iframeDocument.querySelectorAll('a');

          links.forEach((link) => {
            link.addEventListener('click', handleLinkClick);
          });
        }}
        style={{ width: '100%', height: '600px', border: 'none' }}
        title="Dynamic Content"
      />
    </div>
  );
};

export default DynamicRenderer;
