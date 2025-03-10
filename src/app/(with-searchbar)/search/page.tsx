import BookItem from "@/components/bookItem";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import {Metadata} from "next";

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

export async function generateMetadata({searchParams}:{searchParams:Promise<{ q: string }>}):Promise<Metadata>{
    //현재 페이지 메타 데이터를 동적으로 생성하는 역할
    //props를 그대로 전달받을 수 있다.
    const {q} = await searchParams;
    return {
        title:`${q} : 한입북스 검색`,
        description:`${q}의 검새 결과입니다.`,
        openGraph:{
            title:`한입 북스 : ${q}`,
            description: `${q} 검색 결과`,
            images:['/thumbnail.png']
        }
    }
}
export default async function Page({searchParams}
                                       :
                                       { searchParams: Promise<{ q: string }> }) {
    const {q} = await searchParams;
    return <Suspense key={q} fallback={<BookListSkeleton count={3}/>}>
        <SearchResult q={q || ""}/>
    </Suspense>

}