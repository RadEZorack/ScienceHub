// src/services/renderService.js
export const renderContent = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/api/render', {
      method: 'POST',
      body: formData,
    });
  
    if (response.ok) {
      return await response.text();
    } else {
      console.error('Failed to render content:', response.statusText);
      return 'Error rendering content.';
    }
  };
  