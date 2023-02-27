import Post from "./Post"



const Publications = ({data}:{data: any[]}) => {

 

  return (
    <div className="text-center">
      {data.map((post, i) => <Post key={i} {...post} />)}
    </div>
  )
}

export default Publications