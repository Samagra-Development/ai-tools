import React, { useContext } from 'react';
import styles from './index.module.css';
import { AppContext } from '../../context';
import { Worker, Viewer, ProgressBar, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { searchPlugin, FlagKeyword } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/search/lib/styles/index.css';

const MiddleSide = () => {
  const context = useContext(AppContext);
  const { selectedPdf, uploadingPdf, uploadProgress, processingPdf } = context;
  const newPlugin = defaultLayoutPlugin();
  console.log('hie', selectedPdf);

  const [currentKeyword, setCurrentKeyword] = React.useState<FlagKeyword>({
    keyword: '',
    matchCase: false,
    wholeWords: false,
  });

  const searchPluginInstance = searchPlugin();
  const { highlight } = searchPluginInstance;

  const search = (keyword: FlagKeyword) => {
    highlight(keyword);
  };

  return (
    <div className={styles.main}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {uploadingPdf ? (
          processingPdf ? (
            <div className={styles.noPdf}>
              <div>Processing...</div>
            </div>
          ) : (
            <div
              style={{
                width: '35vw',
                position: 'relative',
                top: '50%',
                margin: 'auto',
              }}>
              <ProgressBar progress={uploadProgress} />
            </div>
          )
        ) : selectedPdf && selectedPdf.preview ? (
          <>
            <Viewer
              defaultScale={SpecialZoomLevel.PageFit}
              plugins={[newPlugin, searchPluginInstance]}
              fileUrl={selectedPdf.preview}
              initialPage={0}
              renderLoader={(percentages: number) => (
                <div style={{ width: '35vw' }}>
                  <ProgressBar progress={Math.round(percentages)} />
                </div>
              )}
            />
          </>
        ) : (
          <div className={styles.noPdf}>No PDF</div>
        )}
      </Worker>
    </div>
  );
};

export default MiddleSide;
