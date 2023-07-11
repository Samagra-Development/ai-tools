import styles from './index.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { AppContext } from '../../context';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const HomePage: NextPage = () => {
  const context = useContext(AppContext);

  const [file, setFile] = useState(null);

  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileClick = () => {
    document?.getElementById('fileInput')?.click();
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = (event: any) => {
    event.preventDefault();
    // Perform the upload logic here using the 'file' state value
    if (file) {
      console.log('Uploading file:', file);
      // Add upload code here
    } else {
      console.log('No file selected.');
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem('conversationId')) {
      const newConversationId = uuidv4();
      sessionStorage.setItem('conversationId', newConversationId);
      context?.setConversationId(newConversationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Chat with any PDF</h1>
      <div className={styles.upload}>
        <div
          className="drop-area"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          onClick={handleFileClick}>
          <h1>Drop PDF here</h1>
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {/* <button type="submit" onClick={handleUpload}>
            Upload
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
