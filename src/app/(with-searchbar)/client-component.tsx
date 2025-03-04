'use client'

import ServerComponent from "@/app/(with-searchbar)/server-component";
import {ReactNode} from "react";

export default function ClientComponent({children}:{children:ReactNode}){
    console.log('Client Component')
    return (
        <div>
            {children}
        </div>
    )
}