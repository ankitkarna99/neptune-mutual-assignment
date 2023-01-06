import { getWeb3ReactContext, useWeb3React } from "@web3-react/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { TbWalletOff } from "react-icons/tb";
import { Audio } from "react-loader-spinner";
import styled from "styled-components";
import { ChainIdNetworkChainModel } from "../../../core/types/chain";
import { injected } from "../../../core/web3/wallet/connector";
import shortenAccount from "../../utils/shortenAccount";

const WalletDialogStyles = styled.div`
  .card {
    position: fixed;
    left: 50%;
    top: 100vh;
    opacity: 0;
    z-index: 100;
    background-color: var(--white);
    color: var(--black);
    width: 40vw;
    padding: 2rem;
    border-radius: 1rem;
    transform: translate(-50%, 0%);
    pointer-events: none;
    transition: all 0.3s ease-out;

    @media (max-width: 767px) {
      width: 90vw;
    }

    &.open {
      top: 50%;
      opacity: 1;
      transform: translate(-50%, -50%);
      pointer-events: all;
    }

    .close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      cursor: pointer;
    }

    .disconnected {
      margin-top: 4rem;
      text-align: center;

      h2 {
        margin-bottom: 4rem;
        margin-top: 1rem;
      }
    }

    .connected {
      margin-top: 4rem;

      .table {
        margin-bottom: 4rem;

        .thead {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .tvalue {
          font-size: 1.4rem;
        }

        hr {
          margin: 1.5rem 0;

          &:first-of-type {
            margin-top: 1rem;
          }
        }
      }
    }

    .table {
    }
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in;

    &.open {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

interface WalletDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

function WalletDialog({ open, setOpen }: WalletDialogProps) {
  const { active, account, library, chainId, connector, activate, deactivate } =
    useWeb3React();

  const [balance, setBalance] = useState<string | undefined>();
  const [chainInfo, setChainInfo] = useState<
    ChainIdNetworkChainModel | undefined
  >();

  const [loadingBalance, setLoadingBalance] = useState(false);

  const getBalance = async () => {
    setLoadingBalance(true);

    try {
      const bal = await library.eth.getBalance(account);

      setBalance(library.utils.fromWei(bal).toString(10));
    } catch (err) {}

    setLoadingBalance(false);
  };

  const getChainInfo = async () => {
    try {
      const response = await axios.get("https://chainid.network/chains.json");

      const data = response.data as ChainIdNetworkChainModel[];

      setChainInfo(data.find((c) => c.chainId === chainId));
    } catch (err) {}
  };

  useEffect(() => {
    if (account) {
      getBalance();
    } else {
      setBalance(undefined);
    }
  }, [chainId]);

  useEffect(() => {
    if (chainId) {
      getChainInfo();
    } else {
      setChainInfo(undefined);
    }
  }, [chainId]);

  const connect = async () => {
    try {
      await activate(injected);
    } catch (err) {}
  };

  return (
    <WalletDialogStyles>
      <div
        className={`card${open ? " open" : ""}`}
        aria-hidden={!open}
        aria-describedby="wallet-dialog-details"
      >
        <div
          tabIndex={0}
          role="button"
          aria-pressed="false"
          className="close"
          onClick={() => {
            setOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              setOpen(false);
            }
          }}
        >
          <FiX size={24} />
        </div>

        <h1 id="wallet-dialog-details">Wallet Details</h1>

        {!active && (
          <div className="disconnected">
            <TbWalletOff size={64} />

            <h2>Wallet is not connected.</h2>

            <div className="grid-1-1">
              <button
                className="btn-default-outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button onClick={connect} className="btn-primary">
                Connect Wallet
              </button>
            </div>
          </div>
        )}

        {active && (
          <div className="connected">
            <div className="table">
              <div className="flex jcsb">
                <div className="thead">Key</div>
                <div className="thead">Value</div>
              </div>

              <hr />

              <div className="flex jcsb">
                <div className="tvalue">Account</div>
                <div className="tvalue">{shortenAccount(account!)}</div>
              </div>

              <hr />

              <div className="flex jcsb">
                <div className="tvalue">Chain</div>
                <div className="tvalue">
                  {chainInfo && chainInfo.chain} [ {chainId} ]
                </div>
              </div>

              <hr />

              <div className="flex jcsb">
                <div className="tvalue">Balance</div>
                <div className="tvalue">
                  {loadingBalance ? (
                    <Audio
                      height="16"
                      width="16"
                      color="green"
                      ariaLabel="loading"
                    />
                  ) : (
                    balance
                  )}
                </div>
              </div>
              <hr />
            </div>
            <div className="flex">
              <button onClick={deactivate} className="btn-danger">
                Disconnect Wallet
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`background${open ? " open" : ""}`}></div>
    </WalletDialogStyles>
  );
}

export default WalletDialog;
