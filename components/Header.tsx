import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppState, useConnectWallet } from '@web3-onboard/react'

const Header = () => {
const router = useRouter()
const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  return (
  <div className="flex row justify-between items-center m-3">
    <div className="flex row items-center gap-5">
      <div className='bg-gray-500 w-20 h-20 rounded-full flex items-center justify-center'>Logo</div>
      <div className="text-red-600 text-3xl font-semibold">EASY QUERY</div>
      
      <div className="flex row self-stretch">

        <Link href='/' 
          className={router.pathname == '/' ? 'bg-red-600 text-white flex items-center my-3 p-5' 
          : 'bg-red-600 text-gray-600 flex items-center my-3 p-5'}>
            Home
        </Link>
        <Link href='/query' 
          className={router.pathname == '/query' ? 'bg-red-600 text-white flex items-center my-3 p-5' 
          : 'bg-red-600 text-gray-600 flex items-center my-3 p-5'}>
            Query
        </Link>
      </div>
    </div>
    <button className='bg-red-600 text-white p-2 rounded-lg' disabled={connecting} onClick={()=>(wallet ? disconnect(wallet) : connect())}>
          {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect Wallet'}
        </button>
    {/* <div className="bg-red-600 text-white p-2 rounded-lg">Connect Wallet</div> */}
  </div>
  )
}

export default Header