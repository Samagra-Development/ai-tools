import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import nextIcon from '../../assets/icons/nextIcon.svg';
import prevIcon from '../../assets/icons/previousIcon.svg';
import Image from 'next/image';
import { AppContext } from '../../context';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const MiddleSide = () => {
  const context = useContext(AppContext);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { selectedPdf } = context;
  console.log('hie', selectedPdf);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setTotalPages(numPages);
    URL.revokeObjectURL(selectedPdf.preview);
  }

  function handleNext() {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  }
  function handlePrevious() {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  }

  return (
    <div className={styles.main}>
      {selectedPdf && selectedPdf.preview && (
        <>
          <div key={selectedPdf.file.name}>
            <Document
              file={selectedPdf.preview}
              onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <div className={styles.footer}>
              <div className={styles.pageText}>
                Page {pageNumber} of {totalPages}
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={handlePrevious} disabled={pageNumber === 1}>
                <Image src={prevIcon} alt="" width={25} height={25}/>
                </button>
                <button
                  onClick={handleNext}
                  disabled={pageNumber === totalPages}>
                  <Image src={nextIcon} alt="" width={25} height={25}/>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MiddleSide;
