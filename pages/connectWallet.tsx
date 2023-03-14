import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import ImgBrowser from '../statics/img/browser.svg'
import ImgWallet from '../statics/img/wallet.svg'
import ImgLogo from '../statics/img/logo.png'
import { useAppState, useConnectWallet } from '@web3-onboard/react'
import { useRouter } from "next/router";

export default function ConnectWallet() {

    const router = useRouter()

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

    const [address, setAddress] = useState<string>('')

    useEffect(() => {
        //   setAddress(wallet?.accounts[0].address || "")
        if (wallet?.accounts[0].address) {
            router.push('/querySql')
        }
    }, [wallet])

    return (
        <>
            <div className="container mx-auto flex items-center gap-16 h-screen w-screen bg-[#fff] font-[Arial]">
                <div className="w-1/2">
                    <div className="text-3xl">Unleash the</div>
                    <div className="text-3xl">Intuitive Power of </div>
                    <div className="text-3xl mb-2">Web3 Data Query with LLM</div>
                    <div className="text-2xl">Powered by KNN3 and OpenAI</div>
                </div>
                <div className="rounded-[45px] w-1/2 h-5/6 bg-[#fff] answer-shadow py-[60px] px-[54px] flex items-center justify-center">
                    <div>

                        <Image alt={''} src={ImgLogo} className="h-[100px] w-[100px] bg-gray2 rounded-[24px] flex items-center justify-center answer-shadow mx-[auto]" />

                        <p className="text-center text-[28px] font-[700] my-5">
                            Connect Your Wallet
                        </p>
                        <p className="text-center text-[16px] text-[#959595]">
                            Connect with one of our available wallet providers or create a new
                            one.
                        </p>
                        <div
                            className="flex w-[80%] justify-center items-center mx-[auto] h-[60px] bg-gray2 rounded-[25px] answer-shadow px-5 mt-5 hover:opacity-70 cursor-pointer"
                        >
                            <div onClick={() => connect()}>Connect Wallet</div>
                            {/* <div>
                                <Image alt={''} src={ImgBrowser} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
