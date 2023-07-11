import React from 'react';
import { Button } from '../Button';
import { useLocale } from '../LocaleProvider';

interface SendButtonProps {
  btnColor: string;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SendButton = ({ disabled, onClick, btnColor }: SendButtonProps) => {
  const { trans } = useLocale('Composer');
  return (
    <div className="Composer-actions">
      <Button
        className="Composer-sendBtn"
        disabled={disabled}
        onMouseDown={onClick}
        color="primary"
        btnColor={btnColor}
      >
        {trans('send')}
      </Button>
    </div>
  );
};
