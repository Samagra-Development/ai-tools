import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import { AppContext } from '../../context';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const MiddleSide = () => {
  const context = useContext(AppContext);
  const { selectedPdf } = context;
  console.log('hie', selectedPdf);

  return (
    <div className={styles.main}>
      {selectedPdf && selectedPdf.preview && (
        <div key={selectedPdf.file.name}>
          <Document
            file={selectedPdf.preview}
            onLoadSuccess={() => URL.revokeObjectURL(selectedPdf.preview)}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
    </div>
  );
};

export default MiddleSide;
