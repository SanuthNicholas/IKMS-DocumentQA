//'use client';
import React from 'react'
import { useState } from 'react'


import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'

import { DocumentUploadArea } from './components/document-upload-area';
import { ChatInterface } from './components/chat-interface';
import MessageInput from './components/MessageInput';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (formData) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8001/index-pdf", {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      // Store minimal metadata only
      setUploadedFile({
        name: result.filename,
        chunksIndexed: result.chunks_indexed,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to upload document");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

 return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Document Q&A</h1>
          <p className="text-muted-foreground">Upload a document and ask questions about its contents</p>
        </div>

        {!uploadedFile ? (
          <DocumentUploadArea onFileUpload={handleFileUpload} isLoading={isLoading} />
        ) : (
          
          <ChatInterface uploadedFile={uploadedFile} onRemoveFile={handleRemoveFile} />
        )}
      </div>
    </main>
  );
  
}

export default App
