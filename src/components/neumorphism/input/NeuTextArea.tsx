import React, { ChangeEventHandler, useRef, useEffect } from 'react';
import NeuTextField, { NeuTextFieldProps } from './NeuTextField';
import { styled } from '@mui/system';

interface NeuTextAreaProps extends NeuTextFieldProps {
  autoExpand?: boolean;
  inputStyles?: React.CSSProperties;
  rows?: number;
}

const CustomTextareaAutosize = styled('textarea')({
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f0f0f0',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '10px',
    border: '2px solid #f0f0f0',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  scrollbarWidth: 'thin',
  scrollbarColor: '#888 #f0f0f0',
  resize: 'none', // Prevent resizing
  padding: '12px', // Add padding to fix the text position
  lineHeight: '1.5', // Adjust line height for better text appearance
  boxSizing: 'border-box', // Ensure padding is included in height calculation
  minHeight: '40px', // Ensure minimum height is applied
  width: '100%', // Ensure width is 100%
  border: 'none', // Remove border to avoid conflicts with surrounding styling
  outline: 'none', // Remove outline to match styling
  fontFamily: 'inherit', // Inherit font from parent
  fontSize: 'inherit', // Inherit font size from parent
  color: 'inherit', // Inherit color from parent
  backgroundColor: 'transparent', // Transparent background to match parent styling
});

const NeuTextArea: React.FC<NeuTextAreaProps> = (props) => {
  const { autoExpand, inputStyles, dense, rows, ...others } = props;
  const minHeight = dense ? 32 : 40;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!autoExpand) return;
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(minHeight, textarea.scrollHeight)}px`;
  };

  useEffect(() => {
    if (textareaRef.current && autoExpand) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(minHeight, textareaRef.current.scrollHeight)}px`;
    }
  }, [autoExpand, minHeight]);

  return (
    <NeuTextField
      multiline
      minRows={dense ? 1 : 2}
      maxRows={autoExpand ? undefined : rows}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onInput={handleInput as any}
      inputProps={{ style: { ...inputStyles, resize: 'none' } }}
      InputProps={{
        inputComponent: CustomTextareaAutosize,
        inputRef: textareaRef,
      }}
      {...others}
    />
  );
};

export default NeuTextArea;
