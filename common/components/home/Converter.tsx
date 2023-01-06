import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";

const ConverterStyles = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 5rem;
  color: var(--black);

  h1 {
    margin-bottom: 3rem;
  }

  .label {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .nep {
    margin-bottom: 2rem;
  }

  .busd {
    margin-bottom: 4rem;
  }
`;

const properInputRegex = /^[0-9]*[\.]*?[0-9]{0,2}$/;

interface ConverterProps {
  showDialog: () => void;
}

function Converter({ showDialog }: ConverterProps) {
  const [nep, setNep] = useState<string>("");
  const [busd, setBusd] = useState<string>("");

  const onNepChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setNep("");
      setBusd("");
    } else if (properInputRegex.test(value)) {
      setNep(value);
      setBusd((parseFloat(value) * 3).toFixed(2));
    }
  };

  const onBusdChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setNep("");
      setBusd("");
    } else if (properInputRegex.test(value)) {
      setBusd(value);
      setNep((parseFloat(value) / 3).toFixed(2));
    }
  };

  const clear = () => {
    setNep("");
    setBusd("");
  };

  return (
    <ConverterStyles>
      <h1>Crypto Converter</h1>

      <div className="nep">
        <div className="label">NEP</div>
        <TextInput
          placeholder="0.00"
          value={nep}
          onChange={onNepChanged}
          clear={clear}
        />
      </div>

      <div className="busd">
        <div className="label">BUSD</div>
        <TextInput
          placeholder="0.00"
          value={busd}
          onChange={onBusdChanged}
          clear={clear}
        />
      </div>

      <button className="btn-primary-outline" onClick={showDialog}>
        Check Wallet Details
      </button>
    </ConverterStyles>
  );
}

export default Converter;
