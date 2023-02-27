import Posts from "./common/lens/Posts"
import Table from "./Table"


const DisplayResults = (props:{data:any[]}) => {
  const {data} = props
// this component has to take in miscillanious results and return good formatting no matter what. 
// should default to showing a nice looking table
// then afterwards we can go in and see if a row has a contentURI, and if it does, do a post display.

let posts = (Object.keys(data[0]).includes('contentURI')) 



  return (
    <div className="text-center">
      {posts? 
      <Posts data={data} /> 
      : 
      <Table data={data} />}
    </div>
  )
}

export default DisplayResults