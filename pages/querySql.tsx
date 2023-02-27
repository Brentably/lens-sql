import { useEffect, useState } from 'react'
import Nav from '../components/common/Nav'
import TreeNode from '../components/common/TreeNode'
import DatabasePage1 from '../components/common/DatabasePage1'
import DatabasePage2 from '../components/common/DatabasePage2'
import FilePage from '../components/common/FilePage'
import { useConnectWallet } from '@web3-onboard/react'

const tabs = ['Database','Files']

const databaseData = [{
  id: '1', 
  title: "lens_bak", 
  level:1,
  children: [
    {
      id: '1-1',
      title: "Follows",
      level:2,
      children: [
        {
          id: '1-1-1',
          title: "follower_id",
          level:3,
        },
        {
          id: '1-1-2',
          title: "follower_address",
          level:3,
        },
        {
          id: '1-1-2',
          title: "follower_name",
          level:3,
        },
        {
          id: '1-1-2',
          title: "followee_id",
          level:3,
        },
        {
          id: '1-1-2',
          title: "followee_address",
          level:3,
        },
        {
          id: '1-1-2',
          title: "followee_name",
          level:3,
        },
        {
          id: '1-1-2',
          title: "timestamp",
          level:3,
        }
      ],
    },
    {
      id: '1-2',
      title: "Users",
      level:2,
      children: [
        {
          id: '1-2-1',
          title: "user_id",
          level:3,
        },
        {
          id: '1-2-2',
          title: "metadata",
          level:3,
        },
        {
          id: '1-2-2',
          title: "user_name",
          level:3,
        },
        {
          id: '1-2-2',
          title: "address",
          level:3,
        },
        {
          id: '1-2-2',
          title: "imageURI",
          level:3,
        },
        {
          id: '1-2-2',
          title: "timestamp",
          level:3,
        },
      ],
    },
    {
      id: '1-2',
      title: "Publications",
      level:2,
      children: [
        {
          id: '1-2-1',
          title: "user_id",
          level:3,
        },
        {
          id: '1-2-2',
          title: "address",
          level:3,
        },
        {
          id: '1-2-2',
          title: "user_name",
          level:3,
        },
        {
          id: '1-2-2',
          title: "in_reply_to_user_id",
          level:3,
        },
        {
          id: '1-2-2',
          title: "in_reply_to_post_id",
          level:3,
        },
        {
          id: '1-2-2',
          title: "in_reply_to_address",
          level:3,
        },
        {
          id: '1-2-2',
          title: "in_reply_to_user_name",
          level:3,
        },
        {
          id: '1-2-2',
          title: "post_id",
          level:3,
        },
        {
          id: '1-2-2',
          title: "content_URI",
          level:3,
        },
        {
          id: '1-2-2',
          title: "type",
          level:3,
        },
        {
          id: '1-2-2',
          title: "timestamp",
          level:3,
        },
        {
          id: '1-2-2',
          title: "comment_count",
          level:3,
        },
        {
          id: '1-2-2',
          title: "mirror_count",
          level:3,
        },
        {
          id: '1-2-2',
          title: "content",
          level:3,
        },
        {
          id: '1-2-2',
          title: "image",
          level:3,
        }
      ],
    },
  ]
}
// ,
// {
//   id: '2', 
//   title: "dataBase1", 
//   level:1,
//   children: [
//     {
//       id: '2-1',
//       title: "github_events1",
//       level:2,
//       children: [
//         {
//           id: '2-1-1',
//           title: "id",
//           level:3,
//         },
//         {
//           id: '2-1-2',
//           title: "type",
//           level:3,
//         }
//       ],
//     },
//     {
//       id: '2-2',
//       title: "github_events2",
//       level:2,
//       children: [
//         {
//           id: '2-2-1',
//           title: "id",
//           level:3,
//         }
//       ],
//     },
    
//   ]
// }
]

const files = [{
  id: '1', 
  title: "file1", 
  level:1,
  children: []
},
{
  id: '2', 
  title: "file2", 
  level:1,
  children: []
}]

export default function Home() {

  const [{ wallet }, , ] = useConnectWallet()
  const [address, setAddress] = useState<string>('')
  
  useEffect(() => {
    setAddress(wallet?.accounts[0].address || "")
  }, [wallet])

  // set files. IDEALLY 
  useEffect(() => {
    if(!address) return
    async function getFiles() {
    let resp = await fetch('/api/getFiles', {
      method: "POST",
      body: JSON.stringify({ address }),
    })
    if(resp.status != 200) return console.error('error', resp)
    let response = await resp.json()
    console.log(response)
    } 
    getFiles()
  }, [address])

  const [activeTab,setActiveTab] = useState<any>(0)

  const [selectId,setSelectId] = useState<any>('1')

  const [database,setDatabase] = useState<any>('')

  const treeChange = (items:any) => {
    if(items && items.level === 1){
      setSelectId(items.id)
      setDatabase('')
    }
  }

  return (
    <div className='w-full h-full bg-[#fff] font-[Arial]'>
      <Nav />
      <div className='w-full h-[calc(100vh-140px)] border-t-[2px] border-[#000] flex'>
        <div className='h-full w-[300px] border-r-[2px] border-[#000]'>
          <div className='flex h-[46px]'>
              {
                tabs.map((t:any,i:number) => (
                  <div key={i} onClick={() => setActiveTab(i)} className={`cursor-pointer flex-1 flex justify-center items-center border-b-[2px] ${activeTab === i ? 'bg-[#181EFF] text-[#fff]' : ''} ${i === 0 ? 'border-r-[2px]' : ''} border-[#000]`}>{t}</div>
                ))
              }
          </div>
          <div className='p-4 bg-[#000] h-full overflow-y-auto'>
            {
              activeTab === 0 && 
              <>
                {
                  databaseData.map((t:any,i:number) => (
                    <TreeNode data={t} key={t.id} onchange={(items:any) => treeChange(items)} defaultSelectId={selectId}/>
                  ))
                }
              </>
            }
            {
              activeTab === 1 && 
              <>
                {
                  files.map((t:any,i:number) => (
                    <TreeNode data={t} key={t.id} onchange={(items:any) => treeChange(items)} defaultSelectId={selectId}/>
                  ))
                }
              </>
            }
          </div>
        </div>
        <div className='h-full w-[calc(100%-300px)] p-6 overflow-y-auto'>

        {/* What was this code for? */}
          {/* {
            activeTab === 0 && !database && 
            <DatabasePage1 onchange={(t) => setDatabase(t)}/>
          } */}

          {/* {
            activeTab === 0 && database &&  */}
            <DatabasePage2 />
          {/* } */}
{/* 
          {
            activeTab === 1 && 
            <FilePage/>
          } */}
        </div>
      </div>
    </div>
  )
}