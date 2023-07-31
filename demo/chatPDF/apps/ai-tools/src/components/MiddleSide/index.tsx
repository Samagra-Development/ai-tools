import React, { useContext } from 'react';
import styles from './index.module.css';
import { AppContext } from '../../context';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer, ProgressBar, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {
  highlightPlugin,
  Trigger,
  // RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';

// const areas = [
//   {
//     pageIndex: 3,
//     height: 1.55401,
//     width: 52,
//     left: 27.5399,
//     top: 15.0772,
//   },
// ];

const MiddleSide = () => {
  const context = useContext(AppContext);
  const { selectedPdf, uploadingPdf, uploadProgress, processingPdf } = context;
  console.log('hie', selectedPdf);

  const newPlugin = defaultLayoutPlugin();

  // const renderHighlights = (props: RenderHighlightsProps) => (
  //   <div>
  //     {areas
  //       .filter((area) => area.pageIndex === props.pageIndex)
  //       .map((area, idx) => (
  //         <div
  //           key={idx}
  //           className="highlight-area"
  //           style={Object.assign(
  //             {},
  //             {
  //               background: 'yellow',
  //               opacity: 0.4,
  //             },
  //             // Calculate the position
  //             // to make the highlight area displayed at the desired position
  //             // when users zoom or rotate the document
  //             props.getCssProperties(area, props.rotation)
  //           )}
  //         />
  //       ))}
  //   </div>
  // );

  const highlightPluginInstance = highlightPlugin({
    // renderHighlights,
    trigger: Trigger.None,
  });

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
              plugins={[newPlugin, highlightPluginInstance]}
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
