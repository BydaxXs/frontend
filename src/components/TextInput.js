import React from "react";
 export default function TextInput(props){
  return (
    <>
      <input 
      type = 'text'
      className = 'form-control' 
      required 
      autoComplete = "off" 
      onChange = {props.onChange}
      />
    </>
  )
 }
