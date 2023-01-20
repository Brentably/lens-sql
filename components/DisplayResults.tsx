import Table from "./Table"


const DisplayResults = (props:{data:any[]}) => {
// this component has to take in miscillanious results and return good formatting no matter what. 
// should default to showing a nice looking table
// then afterwards we can go in and see if a row has a contentURI, and if it does, do a post display.


const {data} = props
  return (
    <div className="text-center">
      <Table data={data} />
    </div>
  )
}

export default DisplayResults