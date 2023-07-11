export const getInitialMsgs = (t: any): any => {
  return {
    payload: {
      buttonChoices: [
        {
          key: '1',
          text:  `${t('message.example_ques_one')}`,
        },
        {
          key: '2',
          text:  `${t('message.example_ques_two')}`,
        },
        {
          key: '3',
          text:  `${t('message.example_ques_three')}`,
        },
      ],
      text: t('label.examples'),
    },
    position: 'left',
    exampleOptions: true,
  };
};
