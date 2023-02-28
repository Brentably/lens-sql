import { useEffect, useState } from "react"
import Post from "./Post"



const Publications = ({data}:{data: any[]}) => {
  const [imageUris, setImageUris] = useState<string[]>([])

  useEffect(() => {
    async function ue() {
      let resp = await fetch('/api/getProfileImages', {
        method: "POST",
        body: JSON.stringify(data.map(row => row.user_name)),
      })
      if (resp.status != 200) return console.error('error', resp)
      let response = await resp.json()
      setImageUris(response)
    }
    ue()
  }, [data])

  return (
    <div className="text-center">
      {data.map((post, i) => <Post key={i} {...post} imageUri={imageUris[i]}/>)}
    </div>
  )
}

export default Publications