import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import WalletDialog from "../common/components/dialogs/WalletDialog";
import Converter from "../common/components/home/Converter";

const HomeStyles = styled.div`
  margin: 0 auto;
  width: 30vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 767px) {
    width: 80vw;
  }

  .app-info {
    text-align: center;
    margin-bottom: 3rem;
  }
`;

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <HomeStyles>
      <div className="app-info">
        <Image src={"/images/logo.svg"} alt="Logo" width={297} height={48} />
      </div>

      <Converter
        showDialog={() => {
          setShowDialog(true);
        }}
      />
      <WalletDialog open={showDialog} setOpen={setShowDialog} />
    </HomeStyles>
  );
}
