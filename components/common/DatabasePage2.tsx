import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import Enter from './../../statics/img/Enter.png'
import Loading from './../../statics/img/loading.gif'
import ChartDefault from './../../statics/img/chart-default.svg'
import ChartHover from './../../statics/img/chart-hover.svg'
import DownloadDefault from './../../statics/img/download-default.svg'
import downloadHover from './../../statics/img/download-hover.svg'
import UploadDefault from './../../statics/img/supload.svg'
import Commesdf from './../../statics/img/card-comment.png'
import Mirror from './../../statics/img/mirror.png'
import Like from './../../statics/img/like.png'
import Collect from './../../statics/img/collect.png'
import LensImg from './../../statics/img/lest-head.png'
import PostBg from './../../statics/img/post-bg.png'

import Close from './../../statics/img/close-wi.png'
import Bar from './Bar'
import Line from './Line'
import { canShowPublications, insertLineBreaks } from '../../lib/helpers'
import Table from '../Table'
import examples from '../../lib/examples.json'
import { useAppState, useConnectWallet } from '@web3-onboard/react'
import User from './lens/User'
import Post from './lens/Post'
import Publications from './lens/Publications'



export default function DatabasePage2(props) {
  const [{ wallet }, ,] = useConnectWallet()




  const [showIcon, setShowIcon] = useState<any>([false, false, false])

  const [showSmartContractTip, setShowSmartContractTip] = useState<boolean>(false)

  const [showNotConnectTip, setShowNotConnectTip] = useState<boolean>(false)

  const [saving, setSaving] = useState<boolean>(false)

  const [{ promptText, isSqlLoading, isResultLoading, SQL, results }, setState] = props.store

  const [controllers, setControllers] = useState<AbortController[] | []>([])
  // const controller = new AbortController();
  // const signal = controller.signal;
  const handleClear = () => {
    for(let controller of controllers) controller.abort()
    props.clearState()
  }

  const getResults = async (SQL: string) => {
    // comment back in later
    // if(!wallet) { 
    //   setShowNotConnectTip(true)
    //   return
    // }
    if (!SQL) return // in case someone hits run but there's nothing there
    setState(ps => ({ ...ps, results: [], isResultLoading: true }))
    const controller = new AbortController()
    setControllers(pc => [...pc, controller])
    // handle SQL
    let resp = await fetch('/api/lensRead', {
      method: "POST",
      body: JSON.stringify({ SQL }),
      signal: controller.signal
    })
    let response = await resp.json()
    if (resp.status != 200) return console.error('error', response)
    console.log('SQL resp', response)
    const results: Array<any> = response?.results
    // setResults(results)
    setState(ps => ({ ...ps, results: results, isResultLoading: false }))
  }

  const handleRun = async (prompt = promptText) => {
    console.log(`running!`, prompt, isSqlLoading)
    if (!prompt || isSqlLoading) return
    setState(pS => ({ ...pS, SQL: '', isSqlLoading: true }))
    console.log('fetching with prompt:', prompt)
    const controller = new AbortController()
    setControllers(pc => [...pc, controller])
    let resp = await fetch('/api/genSQL', {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
      signal: controller.signal
    })
    if (resp.status != 200) return console.error('error', resp)
    let response = await resp.json()
    console.log(response)
    //post-API call processing
    const SQL = insertLineBreaks("SELECT " + response.data)
    console.log(SQL)
    setState(pS => ({ ...pS, SQL: SQL, isSqlLoading: false, isResultLoading: true }))

    //handle SQL
    await getResults(SQL)
  }

  const handleSave = async () => {
    if (!wallet) {
      setShowNotConnectTip(true)
      return
    } // in future would like to show error here
    setSaving(true)
    let resp = await fetch('/api/saveQuery', {
      method: "POST",
      body: JSON.stringify({ promptText, SQL, address: wallet?.accounts[0].address })
    })
    if (resp.status != 200) return console.error('error', resp)
    let response = await resp.json()
    console.log(response)
    await props.getFiles()
    setSaving(false)
  }


  return (
    <div>
      {/* search bar / prompt part */}
      <div className='h-[220px] shadow rounded-[16px] p-4 pb-6'>
        <textarea className='w-full h-[120px] border-none rounded-[10px] resize-none' placeholder='Please describe the data you want' value={promptText} onChange={(e) => setState(ps => ({ ...ps, promptText: e.target.value }))}></textarea>
        <div className='bg-[#F4F4F4] w-[fit-content] mr-[20px] ml-[auto] w-[50px] h-[50px] rounded-[50%] flex items-center justify-center shadow'>
          <Image
            className="cursor-pointer"
            src={Enter}
            alt=""
            onClick={() => handleRun()}
          />
        </div>

      </div>
      {!SQL && !isSqlLoading ? <>
        <div className="my-5 text-[26px] font-[700]">Description examples</div>
        {
          examples.slice(0, 4).map((t: any, i: number) => (
            <div key={i} className="shadow rounded-[16px] px-5 py-5 mb-5 cursor-pointer" onClick={() => {
              setState(pS => ({ ...pS, promptText: t.text })) // changes UI
              handleRun(t.text) // setState is async so we have to pass it in manually
            }}>{t.text}</div>
          ))
        }
      </> : <>
        {/* Magic is happening / SQL part */}
        <div className='mt-5'>
          <div className=' w-[fit-content] py-2 text-[26px]'>{SQL ? 'SQL' : 'Magic is happening…'}</div>
          <div className='h-[260px] shadow py-2 px-3 whitespace-pre-line rounded-[16px]'>
            {
              isSqlLoading &&
              <Image
                src={Loading}
                alt=""
              />
            }
            {SQL ?
              <textarea className='w-full h-full border-none rounded-[10px] resize-none' value={SQL}
                onChange={(e) => setState(ps => ({ ...ps, SQL: e.target.value }))}>
                {SQL}
              </textarea>
            : null}
          </div>
        </div>
      </>}

      <div className='flex justify-end my-5'>
        {/* save: onclick should save in the DB fangren mentioned */}
        <button className='w-[100px] flex justify-center items-center h-[46px] rounded-[10px] cursor-pointer shadow mr-5' onClick={handleSave} disabled={saving}>{saving? "Saving" : "Save"}</button>
        {/* <button className='w-[100px] flex justify-center items-center h-[46px] rounded-[10px] cursor-pointer rounded-[10px] shadow mr-5'>Explain</button> */}
        {/* run: should rerun query to show table / chart again */}
        <button className='w-[100px] flex justify-center items-center h-[46px] rounded-[10px] cursor-pointer shadow mr-5' onClick={() => getResults(SQL)}>Run</button>
        <button className='w-[100px] flex justify-center items-center h-[46px] rounded-[10px] cursor-pointer shadow mr-5' onClick={handleClear}>Cancel</button>
      </div>

      <div className='mt-5'>
        <div className='w-[fit-content] py-2 text-[26px]'>Here is your Result</div>
        <div className='shadow p-5 rounded-[16px] mb-5'>
          <div className='flex'>
            <div className='h-[260px] mr-2 w-[calc(100%-70px)]'>
              <div className='h-full w-full mb-5 object-contain overflow-scroll'>
                {isResultLoading ? "Magic is happening..." : results?.length > 0 ? <Table data={results} /> : results != null && "no results"}
              </div>
              <div className='h-full w-full mb-5 invisible'>
                {/* <Bar data={{ xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], yData: [120, 200, 150, 80, 70, 110, 130] }} /> */}
              </div>
              <div className='h-full w-full mb-5 invisible'>
                {/* <Line data={{ xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], yData: [120, 200, 150, 80, 70, 110, 130] }} /> */}
              </div>
            </div>
            <div className='ml-[auto]'>
              <div className='shadow rounded-[50%] flex justify-center items-center h-[40px] w-[40px]'>
                <Image
                  src={ChartHover}
                  className='cursor-pointer h-[24px] w-[24px]'
                  alt=""
                />
              </div>
              <div className='shadow rounded-[50%] flex justify-center items-center h-[40px] w-[40px]'>
                <Image
                  src={downloadHover}
                  className='cursor-pointer h-[24px] w-[24px]'
                  alt=""
                />
              </div>
              <div className='shadow rounded-[50%] flex justify-center items-center h-[40px] w-[40px]'>
                <Image
                  src={UploadDefault}
                  className='cursor-pointer h-[24px] w-[24px]'
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex mb-5 '>
          <div className='w-[calc(50%-10px)] mr-5 rounded-[16px]'>
            <User />
            {canShowPublications(results) ? <Publications data={results} /> : null}
          </div>

          {/* <div className='shadow h-[200px] w-[calc(50%-10px)] rounded-[10px] p-[20px]'>
            description
          </div> */}
        </div>
      </div>
      {
        showSmartContractTip &&
        <div className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0'>
          <div className='w-[460px] database-alert bg-[#fff] rounded-[10px] p-8 shadow'>
            <div className='flex'>
              <div className='w-[80%] flex items-center'>Your Result is being delivered to smart contract</div>
              <div className='cursor-pointer ml-[auto] h-[40px] w-[40px] flex items-center justify-center bg-[#F4F4F4] rounded-[50%] shadow' onClick={() => setShowSmartContractTip(false)}>
                <Image
                  className="h-[20px] w-[20px]"
                  src={Close}
                  alt=""
                />
              </div>
            </div>
            <div className='flex justify-end mt-20'>
              <button className='bg-[#181EFF] px-5 py-2 rounded-[10px] w-[fit-content] text-[#fff]'>Description examples</button>
            </div>
          </div>
        </div>
      }

     
      {
        showNotConnectTip &&
        <div className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0'>
          <div className='w-[460px] database-alert bg-[#fff] rounded-[10px] p-8 shadow'>
            <div className='flex'>
              <div className='w-[80%] flex items-center'>Please connect your wallet first</div>
              <div className='cursor-pointer ml-[auto] h-[40px] w-[40px] flex items-center justify-center bg-[#F4F4F4] rounded-[50%] shadow' onClick={() => setShowNotConnectTip(false)}>
                <Image
                  className="h-[20px] w-[20px]"
                  src={Close}
                  alt=""
                />
              </div>

            </div>
          </div>
        </div>
      }
    </div>
  )
}
