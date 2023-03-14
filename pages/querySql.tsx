import { Dispatch, SetStateAction, useCallback, useEffect, useState, useRef } from 'react'
import Nav from '../components/common/Nav'
import TreeNode from '../components/common/TreeNode'
import DatabasePage1 from '../components/common/DatabasePage1'
import DatabasePage2 from '../components/common/DatabasePage2'
import FilePage from '../components/common/FilePage'
import { useConnectWallet } from '@web3-onboard/react'
import FileCard from '../components/common/FileCard'
import { BrowserProvider, ethers } from 'ethers'
import Image from 'next/image'
import Enter from './../statics/img/Enter.png'
import ImgSQL from './../statics/img/SQL-blue.png'
import ImgBI from './../statics/img/BI.svg'
import ImgSQLSwitch from './../statics/img/SQL-switch.svg'
import { RightOutlined, CloseOutlined } from '@ant-design/icons'
import { Drawer } from 'antd';
import examples from '../lib/examples.json'
import chatApi from "./api";
import { v4 as uuidv4 } from 'uuid'

const tabs = ['Database', 'Files']

const sqlDescription = '“Welcome to Easy Query! Please describe the data you want.”'

const biDescription = '“Please chat to generate data insights.”'

const contractDescription = '“Your Result is being delivered to smart contract”'

const suggestions = ['AAAAAA', 'BBBBBB', 'CCCCCC']

const biexamples = [{
  text: 'please tell me the trend of the data'
}, {
  text: 'what information does the data tell me?'
}]

const databaseData = [{
  id: '1',
  title: "lens_bak",
  level: 1,
  children: [
    {
      id: '1-1',
      title: "Follows",
      level: 2,
      children: [
        {
          id: '1-1-1',
          title: "follower_id",
          level: 3,
        },
        {
          id: '1-1-2',
          title: "follower_address",
          level: 3,
        },
        {
          id: '1-1-2',
          title: "follower_name",
          level: 3,
        },
        {
          id: '1-1-2',
          title: "followee_id",
          level: 3,
        },
        {
          id: '1-1-2',
          title: "followee_address",
          level: 3,
        },
        {
          id: '1-1-2',
          title: "followee_name",
          level: 3,
        },
        {
          id: '1-1-2',
          title: "timestamp",
          level: 3,
        }
      ],
    },
    {
      id: '1-2',
      title: "Users",
      level: 2,
      children: [
        {
          id: '1-2-1',
          title: "user_id",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "metadata",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "user_name",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "address",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "imageURI",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "timestamp",
          level: 3,
        },
      ],
    },
    {
      id: '1-2',
      title: "Publications",
      level: 2,
      children: [
        {
          id: '1-2-1',
          title: "user_id",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "address",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "user_name",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "in_reply_to_user_id",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "in_reply_to_post_id",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "in_reply_to_address",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "in_reply_to_user_name",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "post_id",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "content_URI",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "type",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "timestamp",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "comment_count",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "mirror_count",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "content",
          level: 3,
        },
        {
          id: '1-2-2',
          title: "image",
          level: 3,
        }
      ],
    },
  ]
}
]



export type databasePageState = {
  promptText: string
  isSqlLoading: boolean
  isResultLoading: boolean
  SQL: string
  results: any[] | null,
  biPromptText:string
}

export type databasePageStore = [databasePageState, Dispatch<SetStateAction<databasePageState>>]


const defaultState: databasePageState = {
  promptText: '',
  isSqlLoading: false,
  isResultLoading: false,
  SQL: '',
  results: null,
  biPromptText: '',
}


export default function Home() {
  const ref = useRef<any>(null)
  let refPage = useRef<any>()
  const [{ wallet }, ,] = useConnectWallet()
  const [ethersProvider, setEthersProvider] = useState<BrowserProvider | null>(null)

  useEffect(() => {
    if (wallet) {
      setEthersProvider(new ethers.BrowserProvider(wallet.provider, 'any'))
    }
  }, [wallet])

  const store = useState<databasePageState>(defaultState)
  const clearState = () => store[1](defaultState)
  const [{ promptText, isSqlLoading, isResultLoading, SQL, results,biPromptText }, setState] = store

  const [address, setAddress] = useState<string>('')
  const [files, setFiles] = useState<any[]>([{ id: 1, prompt: "connect wallet to see files" }])
  const [isSql, setIsSql] = useState<boolean>(true)
  const [page, setPage] = useState<string>('main')

  useEffect(() => {
    setAddress(wallet?.accounts[0].address || "")
  }, [wallet])


  const getFiles = useCallback(async function getFiles() {
    let resp = await fetch('/api/getFiles', {
      method: "POST",
      body: JSON.stringify({ address }),
    })
    if (resp.status != 200) return console.error('error', resp)
    let response = await resp.json()
    setFiles(response.results)
    console.log(response.results)
  }, [address])
  // set files. IDEALLY 
  useEffect(() => {

    address ? getFiles() : setFiles([{ id: 1, prompt: "connect wallet to see files" }])
  }, [address, getFiles])

  const [activeTab, setActiveTab] = useState<any>(0)

  const [selectId, setSelectId] = useState<any>('1')

  const [database, setDatabase] = useState<any>('')

  const [question, setQuestion] = useState<any>('')

  const [answer, setAnswer] = useState<any>('')

  const [showPage, setShowPage] = useState<boolean>(false)

  const [showBtn, setShowBtn] = useState<boolean>(false)

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const [defaultExam, setDefaultExam] = useState<any>([])

  const treeChange = (items: any) => {
    if (items && items.level === 1) {
      setSelectId(items.id)
      setDatabase('')
    }
  }

  const examplesChange = (text: any) => {
    ref?.current?.focus()
    console.log(text)
    refPage.current?.handleRun(text)
  }

  const handleRun = () => {
    refPage.current?.handleRun()
  }

  const handleBiChat = async () => {

    // let dataArray = [{ "user_name": "femboy", "count": 20634 }, { "user_name": "fortunetrees", "count": 15641 }, { "user_name": "billym2k", "count": 15436 }, { "user_name": "0xzelda", "count": 14602 }, { "user_name": "gotenks", "count": 9956 }]
    // const res = await chatApi.post("/bi_chat", {
    //   address: '',
    //   conId: uuidv4(),
    //   traceId: uuidv4(),
    //   input: 'please tell me the trend of the data',
    //   sqlReq: 'Show me the top 5 posters on lens',
    //   data: JSON.stringify(dataArray)

    // });
    // console.log(res)
    // if (!res) {
    //   return
    // }

    const res = await chatApi.post("/bi_chat", {
      address: '',
      conId: uuidv4(),
      traceId: uuidv4(),
      input: biPromptText,
      sqlReq: promptText,
      data: JSON.stringify(results)
    });
    console.log(res)
  }

  useEffect(() => {
    if (isSql) {
      setDefaultExam(examples)
    } else {
      setDefaultExam(biexamples)
    }
  }, [isSql])

  return (
    <div className="container mx-auto flex items-center gap-16 h-screen">
      {/* <div onClick={() => handleBiChat()}>test</div> */}
      <div className='flex items-center fixed top-4 left-4 hover:opacity-70' onClick={() => setDrawerOpen(true)}>
        <div className='h-[50px] w-[50px] bg-[#fff] answer-shadow p-1 rounded-[10px] cursor-pointer flex items-center justify-center mr-[10px]'>
          <Image
            src={ImgSQL}
            alt=""
          />
        </div>
        <RightOutlined className='text-[#181EFF]' />
      </div>
      <Drawer
        className='easy-pop'
        title=""
        placement={'left'}
        closable={false}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <div className='h-full rounded-[20px]'>
          <div className='flex p-4'>
            {
              tabs.map((t: any, i: number) => (
                <div key={i} onClick={() => setActiveTab(i)} className={`cursor-pointer h-[46px] flex-1 flex justify-center items-center ${activeTab === i ? 'bg-[#181EFF] text-[#fff]' : ''} shadow rounded-[10px] ${i === 0 ? 'mr-4' : ''}`}>{t}</div>
              ))
            }
          </div>
          <div className='p-4 pt-0 h-full overflow-y-auto'>
            {
              activeTab === 0 &&
              <>
                {
                  databaseData.map((t: any, i: number) => (
                    <TreeNode data={t} key={t.id} onchange={(items: any) => treeChange(items)} defaultSelectId={selectId} />
                  ))
                }
              </>
            }
            {
              activeTab === 1 &&
              <>
                {
                  files.map((file: any, i: number) => (
                    <FileCard key={i} prompt={file.prompt} store={store} file={file} />
                  ))
                }
              </>
            }
          </div>
        </div>
      </Drawer>
      <div className="w-1/2">
        {
          page === 'main' &&
          <>
            <div className="text-3xl mb-10 font-[600] flex items-center">
              {
                true &&
                <div className='shrink-0'>
                  <Image
                    onClick={() => setIsSql(!isSql)}
                    className='cursor-pointer hover:opacity-70 h-[60px] w-[fit-content]'
                    src={isSql ? ImgSQLSwitch : ImgBI}
                    alt=""
                  />
                </div>
              }
              <div onClick={() => handleBiChat()}>{isSql ? sqlDescription : biDescription}</div>
            </div>
            <div className="bg-gray2 rounded-[25px] py-[18px] px-[12px] question-shadow">
              <div className="flex items-center gap-3 flex-wrap mb-5">
                {
                  defaultExam.slice(0, isSql ? 4 : 2).map((t: any, i: number) => (
                    <div key={i} className="rounded-lg suggestion-shadow active:suggestion-active-shadow hover:-translate-y-[2px] transition-all py-[6px] px-[20px] text-left cursor-pointer" onClick={() => {
                      setState(pS => ({ ...pS, promptText: t.text })) // changes UI
                      examplesChange(t.text) // setState is async so we have to pass it in manually
                    }}>{t.text}</div>
                  ))
                }
              </div>
              {
                isSql &&
                <div className='flex items-center'>
                  <input
                    value={promptText}
                    onChange={(e) => setState(ps => ({ ...ps, promptText: e.target.value }))}
                    type="text"
                    className={`border-none px-3 bg-transparent w-full text-xl outline-none placeholder:text-[#a4a4a4] w-[calc(100%-50px)]`}
                    placeholder="Something for me to write"
                    onKeyUp={(e) => e.key === 'Enter' && handleRun()}
                    ref={ref}
                  />
                  <div className='bg-[#F4F4F4] mr-[20px] ml-[auto] w-[50px] h-[50px] rounded-[50%] flex items-center justify-center shadow'>
                    <Image
                      className="cursor-pointer"
                      src={Enter}
                      alt=""
                      onClick={() => handleRun()}
                    />
                  </div>
                </div>
              }

              {
                !isSql &&
                <div className='flex items-center'>
                  <input
                    value={biPromptText}
                    onChange={(e) => setState(ps => ({ ...ps, biPromptText: e.target.value }))}
                    type="text"
                    className={`border-none px-3 bg-transparent w-full text-xl outline-none placeholder:text-[#a4a4a4] w-[calc(100%-50px)]`}
                    placeholder="Something for me to write"
                    onKeyUp={(e) => e.key === 'Enter' && handleBiChat()}
                    ref={ref}
                  />
                  <div className='bg-[#F4F4F4] mr-[20px] ml-[auto] w-[50px] h-[50px] rounded-[50%] flex items-center justify-center shadow'>
                    <Image
                      className="cursor-pointer"
                      src={Enter}
                      alt=""
                      onClick={() => handleBiChat()}
                    />
                  </div>
                </div>
              }
            </div>
          </>
        }

        {
          page === 'polygon' &&
          <div>
            <div className="text-3xl mb-10 font-[600] flex items-center">
              {contractDescription}
            </div>
            <div className='flex'>
              <div className='rounded-lg suggestion-shadow active:suggestion-active-shadow py-[6px] px-[20px] text-left cursor-pointer flex items-center'>View from Polygon</div>
              <div className='h-[50px] w-[50px] suggestion-shadow rounded-[50%] flex items-center justify-center cursor-pointer ml-4' onClick={() => setPage('main')}><CloseOutlined /></div>
            </div>
          </div>
        }

      </div>
      <div className="w-1/2 h-5/6 relative overflow-y-auto px-[24px] py-[24px] noscroll">
        <DatabasePage2 store={store} getFiles={getFiles} clearState={clearState} ref={refPage} changePage={(e) => setPage(e)} showBtn={(e) => setShowBtn(e)} />
      </div>
    </div>

    // <div className='w-full h-full bg-[#fff] font-[Arial]'>
    //   <div className='w-full h-[calc(100vh-140px)] flex px-6'>
    //     <div className='h-full w-[300px] shadow rounded-[20px]'>
    //       <div className='flex p-4 bg-[#F4F4F4]'>
    //           {
    //             tabs.map((t:any,i:number) => (
    //               <div key={i} onClick={() => setActiveTab(i)} className={`cursor-pointer h-[46px] flex-1 flex justify-center items-center ${activeTab === i ? 'bg-[#181EFF] text-[#fff]' : ''} shadow rounded-[10px] ${i === 0 ? 'mr-4' : ''}`}>{t}</div>
    //             ))
    //           }
    //       </div>
    //       <div className='p-4 pt-0 bg-[#F4F4F4] h-full overflow-y-auto'>
    //         {
    //           activeTab === 0 && 
    //           <>
    //             {
    //               databaseData.map((t:any,i:number) => (
    //                 <TreeNode data={t} key={t.id} onchange={(items:any) => treeChange(items)} defaultSelectId={selectId}/>
    //               ))
    //             }
    //           </>
    //         }
    //         {
    //           activeTab === 1 && 
    //           <>
    //             {
    //               files.map((file:any,i:number) => (
    //                 <FileCard key={i} prompt={file.prompt} store={store} file={file}/>
    //               ))
    //             }
    //           </>
    //         }
    //       </div>
    //     </div>
    //     <div className='h-full w-[calc(100%-300px)] p-6 overflow-y-auto'>

    //         <DatabasePage2 store={store} getFiles={getFiles} clearState={clearState} />

    //     </div>
    //   </div>
    // </div>
  )
}