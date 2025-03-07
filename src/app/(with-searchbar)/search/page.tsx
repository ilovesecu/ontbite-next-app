import BookItem from "@/components/bookItem";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";

async function SearchResult({q}:{q:string}){
    await delay(1500);
    const cacheOption:RequestInit = {
        cache: 'force-cache'
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,cacheOption);
    if(!response.ok){
        return <div>오류가 발생했습니다.</div>
    }

    const books:BookData[] = await response.json();

    return (
        <div>
            {
                books.map(book => {
                    return (
                        <BookItem key={book.id} {...book}/>
                    )
                })
            }
        </div>
    )
}
export default async function Page({searchParams}
                                       :
                                       { searchParams: Promise<{ q: string }> }) {
    const {q} = await searchParams;
    return <Suspense key={q} fallback={<div>Loading...</div>}>
        <SearchResult q={q || ""}/>
    </Suspense>

}