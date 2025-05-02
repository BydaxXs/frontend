import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateUser from "../components/CreateUser";

export default function CreateUserPage() {
  return(
    <>
    <GenericNavbar/>
    <br/>
    <div className="container">
      <CreateUser/>
    </div>
    </>
  )
}
