import {ReactNode} from "react";
import Link from "next/link";

export default function Layout({children, sidebar, feed}: { children: ReactNode; sidebar: ReactNode, feed:ReactNode }) {
    return <div>
        <div>
            <Link href="/parallel">Parallel</Link> &nbsp;
            <Link href="/parallel/setting">Parallel / setting</Link>
        </div>
        <br/>
        {sidebar}
        {children}
        {feed}
    </div>
}