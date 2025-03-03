'use client'

import ServerComponent from "@/app/(with-searchbar)/server-component";

export default function ClientComponent(){
    console.log('Client Component')
    return (
        <div>
            <ServerComponent></ServerComponent>
        </div>
    )
}