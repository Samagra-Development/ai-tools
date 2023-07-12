import React, { useCallback, useState } from 'react';
import styles from './index.module.css';
import { Input, Select, Button } from '@chakra-ui/react';
import * as flows from './flow.json';
import { v4 as uuidv4 } from 'uuid';

const MiddleSide = () => {
  const [selectedFlow, setSelectedFlow] = useState(0);
  const [selectedState, setSelectedState] = useState(0);
  // Need to get this data from API
  const services = [
    'text_lang_detection_bhashini',
    'text_translation_bhashini',
    'text_translation_google',
    't2embedding_openai',
    'llm_openai_gpt3',
  ];
  const xstateFunctions = ['api_call', 'get_history', 'send_response'];
  const errorHandlers = ['handle_error'];

  const GI = ({ identifier }: any) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '1vh' }}>
        <h3>Guard</h3>
        <div>
          {/* @ts-ignore */}
          <Select placeholder="N/A">
            <option value="if null">if null</option>
            <option value="if null">if empty array</option>
            <option value="if null">if error</option>
          </Select>
        </div>
        <h3>Invoke</h3>
        <div>
          <Select placeholder="N/A">
            {flows[selectedFlow].states.map((xstate, i) => (
              <option key={i} value={xstate.name}>
                {xstate.name}
              </option>
            ))}
          </Select>
        </div>
        <div
          onClick={() => {
            deleteHandler(identifier);
          }}>
          <Button color="black" size="sm" marginLeft={2}>
            -
          </Button>
        </div>
      </div>
    );
  };

  const [guardInvokeList, setGuardInvokeList] = useState<React.ReactNode[]>([]);

  const onAddBtnClick = () => {
    setGuardInvokeList((prevState) => {
      const identifier = uuidv4();
      const newComponent = (
        <GI key={identifier} identifier={identifier} />
      );
      return [...prevState, newComponent];
    });
  };
  
  const deleteHandler = useCallback((key:any) => {
    setGuardInvokeList((prevState) => {
      const updatedList = prevState.filter(
        (GI:any) => GI.props.identifier !== key
      );
      return updatedList;
    });
    console.log(guardInvokeList)
  }, [guardInvokeList]);

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>EDITOR</h2>

      <div className={styles.flowContainer}>
        <h3>Select Flow</h3>
        <div className={styles.flowList}>
          {['Prompt with translate', 'Prompt'].map((flow, i) => (
            <div
              className={`${styles.element}${
                i == selectedFlow ? ' ' + styles.selectedElement : ''
              }`}
              key={`${flow}-${i}`}
              onClick={() => setSelectedFlow(i)}>
              {flow}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.linebreak}></div>
      <h3>States</h3>
      <div className={styles.flowDisplay}>
        {flows[selectedFlow].states.map((state, i) => (
          <div
            key={i}
            className={`${styles.state}${
              i == selectedState ? ' ' + styles.selectedState : ''
            }`}
            onClick={() => setSelectedState(i)}>
            <p>{state.name}</p>
          </div>
        ))}
      </div>

      <div className={styles.linebreak}></div>

      <h3 className={styles.editFlowHeading}>Edit Flow</h3>
      <div className={styles.editFlowContainer}>
        <div>
          <h3>Name</h3>
          {/* @ts-ignore */}
          <Input
            placeholder="Enter name"
            value={flows[selectedFlow]?.states[selectedState]?.name}
            isDisabled
          />
        </div>
        <div>
          <h3>Service Type</h3>
          <Select
            placeholder="Select Service Type"
            defaultValue={
              flows[selectedFlow]?.states[selectedState]?.service_type || ''
            }>
            {services.map((service, i) => {
              return (
                <option value={service} key={i}>
                  {service}
                </option>
              );
            })}
          </Select>
        </div>
        <div>
          <h3>Function</h3>
          <Select
            placeholder="Select Function"
            defaultValue={flows[selectedFlow]?.states[selectedState]?.function}>
            {xstateFunctions.map((function_name, i) => (
              <option value={function_name} key={i}>
                {function_name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <h3>Service</h3>
          <Input
            placeholder="Service name"
            isDisabled
            value={`${
              flows[selectedFlow]?.states[selectedState]?.service_type + '-' ||
              ''
            }${flows[selectedFlow]?.states[selectedState]?.function}`}
          />
        </div>
        <div className={styles.onDone}>
          <h3>On Done</h3>
          <div className={styles.onDoneSelects}>
            <Select placeholder="On Done">
              {flows[selectedFlow].states.map((xstate, i) => (
                <option key={i} value={xstate.name}>
                  {xstate.name}
                </option>
              ))}
            </Select>
          </div>
          <div className={styles.addButton} onClick={onAddBtnClick}>
            <Button color="black" size="sm">
              +
            </Button>
          </div>
        </div>
        <div className={styles.guardInvoke}>{guardInvokeList}</div>
        <div>
          <h3>On Error</h3>
          <Select
            placeholder="On Error"
            defaultValue={flows[selectedFlow]?.states[selectedState]?.onError}>
            {errorHandlers.map((handler, i) => (
              <option key={i} value={handler}>
                {handler}
              </option>
            ))}
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
