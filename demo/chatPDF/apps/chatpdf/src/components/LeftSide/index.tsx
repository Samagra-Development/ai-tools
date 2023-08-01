import React, { useContext } from 'react';
import Dropzone from 'react-dropzone';
import styles from './index.module.css';
import messageIcon from '../../assets/icons/message.svg';
import BurgerIcon from '../../assets/icons/burger-menu';
import Image from 'next/image';
import { AppContext } from '../../context';
import axios from 'axios';
import toast from 'react-hot-toast';

const LeftSide = () => {
  const context = useContext(AppContext);
  const {
    pdfList,
    setPdfList,
    selectedPdf,
    setSelectedPdf,
    setUploadingPdf,
    setUploadProgress,
    setProcessingPdf,
    setMessages,
    collapsed,
    setCollapsed,
  } = context;

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed: any) => !prevCollapsed);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (!localStorage.getItem('userID')) {
      toast.error('No userID found.');
      return;
    }
    setUploadingPdf(true);
    setSelectedPdf(null);
    let updatedPdfList = [...pdfList];
    toast.success('Uploading PDF...');
    console.log(`Uploading ${acceptedFiles.length} file(s)...`);

    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', localStorage.getItem('userID') || '');

      try {
        console.log(`Uploading file ${file.name}...`);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/pdf/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
                if (percentCompleted === 100) {
                  setProcessingPdf(true);
                }
              }
            },
          }
        );

        console.log(`Response for file ${file.name}:`, response.data);

        if (response.data) {
          toast.success('File Uploaded');
          const newPdf = {
            file,
            preview: URL.createObjectURL(file),
            uuid: response.data,
          };
          updatedPdfList.push(newPdf);
        } else {
          console.error(`No UUID received for file ${file.name}`);
        }
      } catch (error) {
        toast.error('File Upload failed');
        console.error(`Upload error for file ${file.name}:`, error);
      }
    }

    console.log(`Updated PDF list after upload:`, updatedPdfList);

    // update the state outside the loop
    setPdfList(updatedPdfList);
    setSelectedPdf(updatedPdfList[updatedPdfList.length - 1]);
    setUploadingPdf(false);
    setProcessingPdf(false);
    setMessages([]);
  };

  // Method to select a PDF
  const selectPdf = (pdf: any) => {
    // Revoke the URL of the currently-selected PDF, if there is one and clear the messages
    if (selectedPdf) {
      URL.revokeObjectURL(selectedPdf.preview);
      setMessages([]);
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
    
    // Run only for mobile view
    window.innerWidth < 768 && setCollapsed((prev:any) => !prev);
  };

  return (
    <div className={styles.main}>
      <div>
        <div className={styles.dropzone}>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!collapsed ? (
                    <>
                      <p>+ New Chat</p>
                      <span>Drop PDF here</span>
                    </>
                  ) : (
                    <p>+</p>
                  )}
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
              <div
                className={styles.imageContainer}
                style={{ width: collapsed ? '100%' : '20%' }}>
                <Image src={messageIcon} alt="" width={25} height={25} />
              </div>
              <div className={styles.mobileView}>{pdf.file.name}</div>
              {!collapsed && (
              <div className={styles.pdfName}>{pdf.file.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.burgerIcon} onClick={handleToggleCollapse}>
        <BurgerIcon color="white" />
      </div>
    </div>
  );
};

export default LeftSide;
