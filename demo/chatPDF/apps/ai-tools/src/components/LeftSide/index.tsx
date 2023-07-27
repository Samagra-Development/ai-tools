import React, { useContext, useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from './index.module.css';
import messageIcon from '../../assets/icons/message.svg';
import Image from 'next/image';
import { AppContext } from '../../context';
import axios from 'axios';

const LeftSide = () => {
  const context = useContext(AppContext);
  const { pdfList, setPdfList, selectedPdf, setSelectedPdf } = context;

  const onDrop = async (acceptedFiles: File[]) => {
    const updatedPdfList = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPdfList([...pdfList, ...updatedPdfList]);
    setSelectedPdf(updatedPdfList[updatedPdfList.length - 1]); // set the last uploaded file as selected

    // Send each file to the API
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      
      // Modify the URL and headers according to your API
      // const response = await axios.post('/api/your-endpoint', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      // // Handle the response here
      // console.log(response.data);
    }
  };

  // Method to select a PDF
  const selectPdf = (pdf: any) => {
    console.log("hie", pdf)
    // Revoke the URL of the currently-selected PDF, if there is one
    if (selectedPdf) {
      URL.revokeObjectURL(selectedPdf.preview);
    }

    // Create a new object URL for the selected PDF
    const newPreview = URL.createObjectURL(pdf.file);

    // Update the preview for the selected PDF and set it as selected
    const newPdf = { ...pdf, preview: newPreview };
    setSelectedPdf(newPdf);

    // Update the preview in the pdfList
    const newPdfList = pdfList.map((p: any) =>
      p.file.name === pdf.file.name ? newPdf : p
    );
    setPdfList(newPdfList);


    // Read pdf text
    

  };

  return (
    <div className={styles.main}>
      <div className={styles.dropzone}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>+ New Chat</p>
                <span>Drop PDF here</span>
              </div>
            </section>
          )}
        </Dropzone>
      </div>

      <div className={styles.pdflist}>
        {pdfList.map((pdf: any, i: number) => (
          <div
            className={styles.pdfElement}
            key={i}
            onClick={() => selectPdf(pdf)}>
            <div className={styles.imageContainer}>
              <Image src={messageIcon} alt="" layout="responsive" />
            </div>
            {pdf.file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
