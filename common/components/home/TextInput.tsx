import React, { createRef, useRef } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

interface TextInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clear?: () => void;
}

const TextInputStyles = styled.div`
  position: relative;

  input {
    border: 1.5px solid var(--divider);
    padding: 1rem 1.25rem;
    width: 100%;
    border-radius: 0.5rem;
  }

  .clear {
    position: absolute;

    top: 0.8rem;
    right: 1rem;
  }
`;

function TextInput({ value, onChange, placeholder, clear }: TextInputProps) {
  const inputRef = createRef<HTMLInputElement>();

  const clearInput = () => {
    clear?.();
    inputRef.current?.focus();
  };

  return (
    <TextInputStyles>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
      />

      {value && value.length > 0 && (
        <div
          tabIndex={0}
          role="button"
          aria-pressed="false"
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              clearInput();
            }
          }}
          className="clear"
          onClick={() => {
            clearInput();
          }}
        >
          <FiX size={20} />
        </div>
      )}
    </TextInputStyles>
  );
}

export default TextInput;
