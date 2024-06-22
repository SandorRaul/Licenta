import {React,useContext} from 'react'
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({deletedata,deletesize,get,id}) => {

  const {account,setAccount} = useContext(LoginContext);

  const removedata = async(req,res)=>{
    try {
      const res = await fetch(`/remove/${deletedata}/${deletesize}`,{
      method:"DELETE",
      headers:{
        Aceept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    });
    const data = await res.json();
      console.log(data);
      
      if(res.status === 400 || !data){
        console.log("error");
      }else{
        console.log("user delete ");

        setAccount(data);
        toast.success("items remove from cart",{
          position: "top-center"
        })
        get();
      }

    } catch (error) {
      console.log("error");
    }
  }

  return (
    <div className='add_remove_select'>
        
        <p style={{cursor:"pointer"}} onClick={()=>removedata(deletedata,deletesize)}>Delete</p><span>|</span>
        <p className='forremovemedia'><NavLink to ={`/getproducts${id}/${id}`}>See more like this</NavLink></p>
        <ToastContainer/>

    </div>
  )
}

export default Option