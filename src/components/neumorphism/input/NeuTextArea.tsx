import React, { ChangeEventHandler } from 'react';
import NeuTextField, { NeuTextFieldProps } from './NeuTextField';

interface NeuTextAreaProps extends NeuTextFieldProps {
  autoExpand?: boolean;
  inputStyles?: React.CSSProperties;
  rows?: number;
}

const NeuTextArea: React.FC<NeuTextAreaProps> = (props) => {
  const { autoExpand, inputStyles, dense, rows, ...others } = props;
  const minHeight = dense ? 32 : 40;

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!autoExpand) return;
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = '0px';
    textarea.style.height = `${Math.max(minHeight, textarea.scrollHeight)}px`;
  };

  return (
    <NeuTextField
      multiline
      minRows={dense ? 1 : 2}
      maxRows={autoExpand ? undefined : rows}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onInput={handleInput as any}
      inputProps={{ style: { ...inputStyles, resize: autoExpand ? 'none' : 'vertical' } }}
      {...others}
    />
  );
};

export default NeuTextArea;
