import { useEffect, useState } from "react"

const Post = (props:any) => {
  const {contentURI, handle} = props
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    async function ue() {
      // HAS TO HANDLE `IPFS://aljksdfhadslkjhglsjgd` style URIs
      // const resp = await fetch(contentURI)
      // const data = await resp.json()
      // setContent(JSON.stringify(data))
    }
    ue()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>{content}</div>
  )
}

export default Post