import { Music } from "lucide-react";
import React, { useCallback, useState } from "react";

// Props for file upload
interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  onShowModal?: (title: string, message: string) => void;
  acceptedTypes?: string;
  maxSize?: number;
}

function FileUpload({
  onFileSelect,
  onShowModal,
  acceptedTypes = "audio/*, .mp3, .wav",
  maxSize = 10,
}: FileUploadProps) {
  // Set states for dragging and selected file
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handler for when user drags over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handler for when user leaves the dragging area
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Handler for when the user actually drops a file
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // Get files
    const files = Array.from(e.dataTransfer.files);

    // Then get the first file if user uploaded many files
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  // Handler for basic file selection
  const handleFileSelection = (file: File) => {
    // Validate file size, btw maxSize (which is 10) is in terms of MB
    if (file.size > maxSize * 1024 * 1024) {
      if (onShowModal) {
        onShowModal(
          "File Too Large",
          `File size should not exceed ${maxSize} MB. Please choose a smaller file.`
        );
      } else {
        alert(`File size should not exceed ${maxSize}MB`);
      }

      // Reset the file input and selected file state
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;

      if (fileInput) {
        fileInput.value = "";
      }

      setSelectedFile(null);
      onFileSelect(null);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  // Handler for when the user changes the file uploaded
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  return (
    <div className="w-full">
      {/* Actual input for the file */}
      <input
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
        id="file-upload"
      />

      {/* Label instructions */}
      <label
        htmlFor="file-upload"
        className={`
        bg-white dark:bg-black-dark border-2 border-dashed rounded-lg p-8 sm:p-12 md:p-16 text-center cursor-pointer transition-all duration-200 block min-h-48 sm:min-h-52 md:min-h-60 h-48 sm:h-52 md:h-60
          ${
            isDragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-400 dark:border-gray-600 hover:border-gray-500"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-3">
          <Music className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          <div className="text-gray-700 dark:text-gray-300">
            {selectedFile ? (
              <span className="text-blue-custom">{selectedFile.name}</span>
            ) : (
              <>
                <p>
                  Click to upload or drag and drop
                  <br />
                  <strong>MP3</strong> or <strong>WAV</strong> file up to 10 MB
                </p>
              </>
            )}
          </div>
        </div>
      </label>
    </div>
  );
}

export default FileUpload;
