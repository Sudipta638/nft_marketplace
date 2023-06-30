import { usehooks } from "@components/providers/Web3"

export const useAccount=() =>{
    const hooks= usehooks();
    const swrRes = hooks.useAccount();
    return{
        account:swrRes
    }
}
export const useNetwork = () => {
    const hooks = usehooks();
    const swrRes = hooks.useNetwork();
  
    return {
      network: swrRes
    }
  }
  export const useListedNfts = () => {
    const hooks = usehooks();
    const swrRes = hooks.useListedNfts();
  
    return {
      nfts: swrRes
    }
  }
  export const useOwnedNfts = () => {
    const hooks = usehooks();
    const swrRes = hooks.useOwnedNfts();
  
    return {
      nfts: swrRes
    }
  }
  export const useNetworkds = () => {
    const hooks = usehooks();
    const swrRes = hooks.useNetwork();
  
    return {
      network: swrRes
    }
  }