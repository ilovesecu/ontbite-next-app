import BookItem from "@/components/bookItem";
import {BookData} from "@/types";
export default async function Page({searchParams}
                                       :
                                       { searchParams: Promise<{ q: string }> }) {
    const {q} = await searchParams;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`);
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