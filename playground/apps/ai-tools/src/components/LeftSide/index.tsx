import React from 'react';
import Dropzone from 'react-dropzone';
import styles from './index.module.css';
import messageIcon from '../../assets/icons/message.svg';
import Image from 'next/image';
import { Button, Switch, Textarea } from '@chakra-ui/react';

const LeftSide = () => {
  return (
    <div className={styles.main}>
      {/* <div className={styles.schemes}> */}
        {/* <h1>Chat with Schemes</h1> */}
        {/* @ts-ignore */}
        {/* <Switch/> */}
        {/* <Textarea placeholder="" size="18vw" height="auto" rows={15} /> */}
        {/* <div style={{ margin: '1vh', textAlign: 'center' }}> */}
          {/* @ts-ignore */}
          {/* <Button
            color="black"
            onClick={() => {
              alert('Apply button clicked!');
            }}>
            Apply
          </Button> */}
        {/* </div> */}
      {/* </div> */}
      {/* <div className={styles.linebreak}></div> */}
      <div className={styles.dropzone}>
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
        {['PDF1', 'PDF2'].map((pdf, i) => (
          <div className={styles.pdfElement} key={i}>
            <div className={styles.imageContainer}>
              <Image src={messageIcon} alt="" layout="responsive" />
            </div>
            {pdf}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
