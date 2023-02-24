import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddEmployee from "./AddEmployee";

const Empedit = () => {
    const { id } = useParams();
    const [empdata, empdatachange] = useState({});
  
    useEffect(() => {
        fetch('http://192.168.29.146:7071/emp/emp_1/' + id)
          .then((res) => {
            return res.json()
          })
          .then((resp) => {
            empdatachange(resp)
          })
          .catch((err) => {
            console.log(err.message)
          })
      }, [])

    return ( 
        empdata ?
        <AddEmployee data={empdata}/>
        :
        <h3>Loading....</h3>
     );
}
 
export default Empedit;