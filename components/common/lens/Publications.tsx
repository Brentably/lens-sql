import Post from "./Post"



const Publications = ({data}:{data: any[]}) => {
  

  // const ipfs = await IPFS.create()
  // const fetch = await makeIpfsFetch({ipfs})
 

  return (
    <div className="text-center">
      {data.map((post, i) => <Post key={i} {...post} />)}
    </div>
  )
}

export default Publications