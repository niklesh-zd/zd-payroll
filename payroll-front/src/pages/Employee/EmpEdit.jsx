import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddEmployee from "./AddEmployee";

const Empedit = () => {
    const { id } = useParams();
    const [empdata, empdatachange] = useState({});

    // useEffect((id) => {
    //     axios.post("http://192.168.29.37:7071/emp/update/" + id ).then((res) => {
    //         // return res.json();
    //     }).then((resp) => {
    //         console.log({resp}, "----lll----------");
    //         empdatachange(resp)
    //         namechange(resp.name);
    //         emailchange(resp.email);
    //         phonechange(resp.phone);
    //         // activechange(resp.isactive);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
    // }, []);

    useEffect(() => {
        fetch('http://192.168.29.37:7071/emp/emp_1/' + id)
          .then((res) => {
            return res.json()
          })
          .then((resp) => {
            console.log('r================esp', resp)
            empdatachange(resp)
          })
          .catch((err) => {
            console.log(err.message)
          })
      }, [])

      console.log('empdata',empdata);
    return ( 
        empdata ?
        <AddEmployee data={empdata}/>

        :
        <h3>Loading....</h3>
     );
}
 
export default Empedit;