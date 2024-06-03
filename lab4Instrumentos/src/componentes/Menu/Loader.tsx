import { Spinner } from "react-bootstrap"


const Loader = () => {
  return (
    <div style={{width:'100vw',height:'100vh', display:"flex", justifyContent:'center', alignItems:'center'}}>
      <Spinner animation="border" role="status">
      </Spinner>
    </div>
  )
}

export default Loader
