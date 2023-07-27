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

  const onDrop = (acceptedFiles: File[]) => {
    const updatedPdfList = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPdfList([...pdfList, ...updatedPdfList]);
    setSelectedPdf(updatedPdfList[updatedPdfList.length - 1]); // set the last uploaded file as selected
  };

  // Method to select a PDF
  const selectPdf = (pdf: any) => {
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
  const newPdfList = pdfList.map(p => p.file.name === pdf.file.name ? newPdf : p);
  setPdfList(newPdfList);
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
          <div className={styles.pdfElement} key={i} onClick={() => selectPdf(pdf)}>
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
