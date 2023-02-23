import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import Enter from './../../statics/img/Enter.svg'
import Loading from './../../statics/img/loading.gif'
import ChartDefault from './../../statics/img/chart-default.svg'
import ChartHover from './../../statics/img/chart-hover.svg'
import DownloadDefault from './../../statics/img/download-default.svg'
import downloadHover from './../../statics/img/download-hover.svg'
import UploadDefault from './../../statics/img/supload.svg'
import Close from './../../statics/img/close.svg'
import Bar from './Bar'
import Line from './Line'
import { insertLineBreaks } from '../../lib/helpers'
import Table from '../Table'
import examples from '../../lib/examples.json'
import { pseudoRandomBytes } from 'crypto'
import { setConstantValue } from 'typescript'


export type databasePageState = {
  promptText: string
  isSqlLoading: boolean
  isResultLoading: boolean
  SQL: string
  results: any[]
}

export type databasePageStore = [databasePageState, Dispatch<SetStateAction<databasePageState>>]


const defaultState:databasePageState = {
  promptText: '',
  isSqlLoading: false,
  isResultLoading: false,
  SQL: '',
  results: [],
}

export default function DatabasePage2(props) {

  // const [isSqlLoading, setIsSqlLoading] = useState<boolean>(false)

  const [showIcon, setShowIcon] = useState<any>([false, false, false])

  const [showTip, setShowTip] = useState<boolean>(false) 

  // prompt
  // const [textData, setTextData] = useState<string>('')
  //SQL
  // const [SQL, setSQL] = useState<string>('')
  // results
  // const [results, setResults] = useState<any[]>([])

  const store = useState<databasePageState>(defaultState)
  const [{promptText, isSqlLoading, isResultLoading, SQL, results}, setState] = store

  const getResults = async (SQL: string) => {
    setState(ps=>({...ps, results: [], isResultLoading: true}))
    // handle SQL
    let resp = await fetch('/api/lensRead', {
      method: "POST",
      body: JSON.stringify({ SQL }),
    })
    let response = await resp.json()
    if(resp.status != 200) return console.error('error', response)
    console.log('SQL resp', response)
    const results:Array<any> = response?.results
    // setResults(results)
    setState(ps=>({...ps, results: results, isResultLoading: false}))
  }

  const handleRun = async (prompt = promptText) => {
    console.log(`running!`, prompt, isSqlLoading)
    if(!prompt || isSqlLoading) return
    setState(pS => ({...pS, SQL: '', isSqlLoading: true}))
    console.log('fetching with prompt:', prompt)
    let resp = await fetch('/api/genSQL', {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
    })
    if(resp.status != 200) return console.error('error', resp)
    let response = await resp.json()
    console.log(response)
    //post-API call processing
    const SQL = insertLineBreaks("SELECT " + response.data)
    console.log(SQL)
    setState(pS => ({...pS, SQL: SQL, isSqlLoading: false, isResultLoading: true}))
    
    //handle SQL
    await getResults(SQL)
  }

  return (
    <div>
      {/* search bar / prompt part */}
      <div className='h-[200px] border-[2px] border-[#000] rounded-[10px]'>
        <textarea className='w-full h-[120px] border-none rounded-[10px] resize-none' placeholder='Please describe the data you want' value={promptText} onChange={(e) => setState(ps => ({...ps, promptText: e.target.value}))}></textarea>
        <Image
          className="transDatabaseBtn ml-[auto] cursor-pointer mr-[20px]"
          src={Enter}
          alt=""
          onClick={() => handleRun()}
        />
      </div>
      {!SQL && !isSqlLoading ? <>
      <div className="my-5 text-[20px] font-[700]">Description examples</div>
      {
        examples.slice(0,4).map((t: any, i: number) => (
          <div key={i} className="border-[2px] border-[#000] rounded-[10px] px-5 py-5 mb-5 cursor-pointer" onClick={() => {
            setState(pS => ({...pS, promptText: t.text})) // changes UI
            handleRun(t.text) // setState is async so we have to pass it in manually
          }}>{t.text}</div>
        ))
      }
     </> : <>
      {/* Magic is happening / SQL part */}
      <div className='mt-5'>
        <div className='border-[2px] border-b-[0px] border-[#000] rounded-tl-[10px] rounded-tr-[10px] w-[fit-content] px-5 py-2 bg-[#181EFF] text-[#fff]'>{SQL ? 'SQL' : 'Magic is happening…'}</div>
        <div className='h-[260px] border-[2px] border-[#000] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] py-2 px-3 whitespace-pre-line'>
          {
            isSqlLoading &&
            <Image
              src={Loading}
              alt=""
            />
          }
          { SQL ?
          <textarea  className='w-full h-full border-none rounded-[10px] resize-none' value={SQL} 
          onChange={(e) => setState(ps => ({...ps, SQL: e.target.value}))}>
            {SQL}
          </textarea>
          : null }
        </div>
      </div>
      </> }

      <div className='flex justify-end my-5'>
        {/* save: onclick should save in the DB fangren mentioned */}
        <button className='w-[100px] flex justify-center items-center bg-[#000] text-[#fff] h-[46px] rounded-[10px] cursor-pointer hover:bg-[#181EFF] mr-5'>Save</button>
        <button className='w-[100px] flex justify-center items-center bg-[#000] text-[#fff] h-[46px] rounded-[10px] cursor-pointer hover:bg-[#181EFF] mr-5'>Explain</button>
        {/* run: should rerun query to show table / chart again */}
        <button className='w-[100px] flex justify-center items-center bg-[#000] text-[#fff] h-[46px] rounded-[10px] cursor-pointer hover:bg-[#181EFF] mr-5' onClick={() => getResults(SQL)}>Run</button>
        <button className='w-[100px] flex justify-center items-center bg-[#000] text-[#fff] h-[46px] rounded-[10px] cursor-pointer hover:bg-[#181EFF] mr-5'>Cancel</button>
      </div>

      <div className='mt-5'>
        <div className='border-[2px] border-b-[0px] border-[#000] rounded-tl-[10px] rounded-tr-[10px] w-[fit-content] px-5 py-2 bg-[#181EFF] text-[#fff]'>Here is your Result</div>
        <div className='border-[2px] border-[#000] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] p-5'>
          <div className='flex justify-end'>
            <Image
              src={ChartHover}
              className='cursor-pointer h-[30px] w-[30px] mr-4'
              alt=""
            />
            <Image
              src={downloadHover}
              className='cursor-pointer h-[36px] w-[36px] mr-4'
              alt=""
            />
            <Image
              src={UploadDefault}
              className='cursor-pointer h-[36px] w-[36px] mr-4'
              alt=""
            />
          </div>
          <div className='h-[260px] border-[2px] border-[#000] rounded-[10px] mb-5 object-contain overflow-scroll'>
            {isResultLoading ? "Magic is happening..." : results.length > 0 && <Table data={results} />}
          </div>


          <div className='h-[260px] border-[2px] border-[#000] rounded-[10px] mb-5 invisible'>
            {/* <Bar data={{ xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], yData: [120, 200, 150, 80, 70, 110, 130] }} /> */}
          </div>
          <div className='h-[260px] border-[2px] border-[#000] rounded-[10px] invisible'>
            {/* <Line data={{ xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], yData: [120, 200, 150, 80, 70, 110, 130] }} /> */}
          </div>

          <div className='h-[260px] border-[2px] border-[#000] rounded-[10px] p-5 flex invisible'>
            <div className='border-[2px] border-[#000] w-[calc(50%-10px)] mr-5 rounded-[10px]'>

              <div className='py-[20px] px-[20px] rounded-[4px] relative my-[10px]'>
                <div className='flex'>
                  <div>Pub #pubId</div>
                </div>
                <div className='text-[14px] my-[10px]'>
                  1 h
                </div>
                <p className='text-[14px]'>
                  content
                </p>
              </div>

            </div>

            <div className='border-[2px] border-[#000] w-[calc(50%-10px)] rounded-[10px]'>
              description
            </div>
          </div>
        </div>
      </div>
      {
        showTip &&
        <div className='w-[460px] border-[2px] border-[#000] database-alert bg-[#fff] rounded-[10px] p-8'>
          <div className='flex'>
            <div className='w-[80%]'>Your Result is being delivered to smart contract</div>
            <Image
              className="cursor-pointer h-[40px] w-[40px] ml-[auto]"
              onClick={() => setShowTip(false)}
              src={Close}
              alt=""
            />
          </div>
          <div className='flex justify-end mt-20'>
            <button className='bg-[#181EFF] px-5 py-2 rounded-[10px] w-[fit-content] text-[#fff]'>Description examples</button>
          </div>
        </div>
      }
    </div>
  )
}
