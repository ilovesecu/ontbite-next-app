import ClientComponent from "@/components/client-component";
import books from "@/mock/books.json";
import BookItem from "@/components/bookItem";
export default async function Page({searchParams}
                                       :
                                       { searchParams: Promise<{ q: string }> }) {
    const {q} = await searchParams;
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