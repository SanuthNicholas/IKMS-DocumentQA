import React from "react"

import { useRef } from 'react';
import { Plus } from 'lucide-react';

import { Input } from "./ui/input";

export function DocumentUploadArea({ onFileUpload, isLoading }) {

// File Selection Handler
const fileInputRef = useRef(null);

const handleClick = () => {
    fileInputRef.current?.click();
};

const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

// Create FormData for multipart file upload
    const formData = new FormData();
    formData.append("file", file);

    onFileUpload(formData);
};


  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-border rounded-lg bg-card">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-muted-foreground border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground font-medium">Processing your document...</p>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={handleClick}
            className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-border rounded-lg bg-card hover:bg-accent/10 transition-colors cursor-pointer"
            aria-label="Upload document"
          >
            <Plus className="w-24 h-24 text-muted-foreground mb-4" strokeWidth={1.5} />
            <p className="text-lg font-semibold text-foreground">Click to upload a document</p>
            <p className="text-sm text-muted-foreground mt-2">PDF format supported</p>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="hidden"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}