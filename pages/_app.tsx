import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import {InitOptions} from '@web3-onboard/core/dist/types.d'

const rpcUrl = `https://polygon-mainnet.g.alchemy.com/v2/Y0WOab0Tfd2l3l_3h3DaacjeNPIeP1fO`

const injected = injectedModule()
const walletConnect = walletConnectModule()

const initOptions:InitOptions = {
  wallets: [injected, walletConnect],
  chains: [
    {
      id: 137,
      token: 'MATIC',
      label: 'Polygon Mainnet',
      rpcUrl
    }
  ],
  accountCenter: {
    desktop: {
      enabled: false
    },
    mobile: {
      enabled: false
    }
  }
}

const web3Onboard = init(initOptions)



export default function App({ Component, pageProps }: AppProps) {
  return ( 
  <Web3OnboardProvider web3Onboard={web3Onboard}>
    <Component {...pageProps} /> 
  </Web3OnboardProvider>
  )
}