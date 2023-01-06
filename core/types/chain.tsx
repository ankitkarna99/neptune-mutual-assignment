export interface ChainIdNetworkChainModel {
  name: string;
  chain: string;
  icon?: string;
  rpc: string[];
  features?: Feature[];
  faucets: string[];
  nativeCurrency: NativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  ens?: Ens;
  explorers?: (Explorer | Explorers2)[];
  title?: string;
  redFlags?: string[];
  parent?: Parent;
  status?: string;
}

interface Parent {
  type: string;
  chain: string;
  bridges?: Bridge[];
}

interface Bridge {
  url: string;
}

interface Explorers2 {
  name: string;
  url: string;
  standard: string;
}

interface Explorer {
  name: string;
  url: string;
  icon: string;
  standard: string;
}

interface Ens {
  registry: string;
}

interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

interface Feature {
  name: string;
}
