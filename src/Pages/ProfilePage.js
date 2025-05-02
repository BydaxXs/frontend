import React from "react";
import ProfileCard from '../components/ProfileCard'
import GenericNavbar from '../components/GenericNavbar'

export default function ProfilePage(){
    return(
        <>
            <GenericNavbar/>
            <br/>
            <div className="container">
                <ProfileCard/>
            </div>
            
        </>
    )
}