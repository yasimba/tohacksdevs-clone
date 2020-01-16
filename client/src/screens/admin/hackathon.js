import React, {useState} from 'react';
import CreateHackathon from '../../components/createHackathon'
import ManageHackathon from '../../components/manageHackathon'


export default function Hackathon(){
    return(
        <div>
            <CreateHackathon/>
            <ManageHackathon/> 
        </div>
    )
}