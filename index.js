import React from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successNotice, errorNotice } from "./notice";
import './form.css';

export default function MyForm() {

    /*Create States*/
    let [success, setSuccess] = useState(false);

    const [showValue , setShowvalue] = useState({
        firstName:"",
        secondName:"",
        mobile:"",
        email:"",
        password:"" 
    })

    const [showError , setShowError] = useState({
        firstName:"",
        secondName:"",
        mobile:"",
        email:"", 
        password:"" 
    })

    /*ON Change Handal*/
    function handalChange(e){

        /* Set and Show Value*/
        if(e.target.value){ setShowvalue({...showValue,[e.target.name]:e.target.value}); }
        else{setShowvalue({...showValue,[e.target.name]:''});}
        /*Set and Show Error */
        const showErrorObj = validation(e.target.name,e.target.value)
        setShowError({...showError,[e.target.name]:showErrorObj})
    }

    /* Validation */
    function validation(name,value){

        switch(name){
            case 'firstName':
                if(!value){return "First Name Is Required!";}
                else if(!value.match( /^[a-z ,.'-]+$/i)){return "This Is Not A Valid First Name."}
                else return "";

            case 'secondName':
                if(!value){return "Second Name Is Required!";}
                else if(!value.match(/^[a-z ,.'-]+$/i)){return "This Is Not A Valid Second Name."}
                else return "";

            case 'mobile':
                if(!value){return "Mobile Is Required!";}
                else if(!value.match(/^([+]\d{2})?\d{10}$/)){return "This Is Not A Valid Mobile."}
                else return "";

            case 'email':
                if(!value){return "Email Is Required!";}
                else if(!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)){return "This Is Not A Valid Eamil."}
                else return "";

            case 'password':
                if(!value){return "Password Is Required!";}
                else if(!value.match( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){return "This Is Not A Valid Password."}
                else return "";

            default: return "";
        }
    }
     
    /*On Submit Form*/
    function handalSubmit(e){
        e.preventDefault();
        
        let errorObj={};
        Object.keys(showValue).forEach((item)=>{

            errorObj = {...errorObj,[item]:validation(item,showValue[item])}
        })
        setShowError({...showError,...errorObj});

        Object.keys(errorObj).every((item)=>{

        if(errorObj[item] !== ''){
            success=false;
            return false;
         }
         success=true;
         return true;
       
    })
   
    
        if(success){
            //API call shoul goes here
            successNotice('Success');
        }else{
            errorNotice('Error');
        }
    }

  return (
    <div className='mainCondiv'>
    <ToastContainer/>
 
        <h1>Form validation</h1>
        <form onSubmit={handalSubmit} className='formCon'>
            <div className='inputCon'>
                <input
                type='text'
                placeholder='First Name'
                name='firstName'
                value={showValue.firstName}
                onChange={handalChange}
                />
                {showError.firstName && <span>{showError.firstName}</span>}
            </div>
            <div className='inputCon'>
                <input
                type='text'
                placeholder='Second Name'
                name='secondName'
                value={showValue.secondName}
                onChange={handalChange}
                />
                {showError.secondName && <span>{showError.secondName}</span>}
            </div>
            <div className='inputCon'>
                <input
                type='text'
                placeholder='Mobile'
                name='mobile'
                value={showValue.mobile}
                onChange={handalChange}
                />
                {showError.mobile && <span>{showError.mobile}</span>}
            </div>
            <div className='inputCon'>
                <input
                type='text'
                placeholder='Email'
                name='email'
                value={showValue.email}
                onChange={handalChange}
                />
                {showError.email && <span>{showError.email}</span>}
            </div>
            <div className='inputCon'>
                <input
                type='password'
                placeholder='Password'
                name='password'
                value={showValue.password}
                onChange={handalChange}
                />
                {showError.password && <span>{showError.password}</span>}
            </div>
            <div className='inputCon'>
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}
