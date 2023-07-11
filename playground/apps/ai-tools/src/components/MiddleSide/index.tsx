import React, { useState } from 'react';
import styles from './index.module.css';
import { Input, Select } from '@chakra-ui/react';
import * as flow from "./flow.json"
import { Button } from '@chakra-ui/react';

const MiddleSide = () => {
  const [selectedFlow, setSelectedFlow] = useState(0);
  const [selectedState, setSelectedState] = useState(0);
  return (
    <div className={styles.main}>
      <h2 className={styles.header}>EDITOR</h2>

      <div className={styles.flowContainer}>
        <h3>Select Flow</h3>
        <div className={styles.flowList}>
          {['Prompt with translate', 'Prompt'].map(
            (flow, i) => (
              <div
                className={`${styles.element}${
                  i == selectedFlow ? ' ' + styles.selectedElement : ''
                }`}
                key={`${flow}-${i}`}
                onClick={() => setSelectedFlow(i)}>
                {flow}
              </div>
            )
          )}
        </div>
      </div>

      <div className={styles.linebreak}></div>
      <h3>States</h3>
      <div className={styles.flowDisplay}>
        {
          flow[selectedFlow].states.map((state,i)=>(
            <div 
              key={i} 
              className={`${styles.state}${i == selectedState ? ' ' + styles.selectedState : ''}`}
              onClick={() => setSelectedState(i)}
            >
              <p>{state.name}</p>
            </div>
          ))
        }
      </div>

      <div className={styles.linebreak}></div>

      <h3 className={styles.editFlowHeading}>Edit Flow</h3>
      <div className={styles.editFlowContainer}>
        <div>
          <h3>Name</h3>
          {/* @ts-ignore */}
          <Input placeholder="Enter name" value={flow[selectedFlow]?.states[selectedState]?.name}/>
        </div>
        <div>
          <h3>Service Type</h3>
          <Select placeholder="Select Service Type">
            <option value="text_lang_detection_bhashini">text_lang_detection_bhashini</option>
            <option value="text_translation_bhashini">text_translation_bhashini</option>
            <option value="text_translation_google">text_translation_google</option>
            <option value="t2embedding_openai">t2embedding_openai</option>
            <option value="llm_openai_gpt3">llm_openai_gpt3</option>
          </Select>
        </div>
        <div>
          <h3>Function</h3>
          <Select placeholder="Select Function">
            <option value="api_call">api_call</option>
            <option value="get_history">get_history</option>
            <option value="send_response">send_response</option>
          </Select>
        </div>
        <div>
          <h3>Service</h3>
          <Input placeholder="Service name" isDisabled/>
        </div>
        <div>
          <h3>On Done</h3>
          <Select placeholder="On Done">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div>
          <h3>On Error</h3>
          <Select placeholder="On Error">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div style={{ margin: '1vh', textAlign: 'center' }}>
          {/* @ts-ignore */}
          <Button
            color="black"
            onClick={() => {
              alert('Apply button clicked!');
            }}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiddleSide;
