import styles from "./page.module.css";
import BookItem from "@/components/bookItem";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";
import BoookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

export const dynamic = 'force-dynamic';
async function AllBooks(){
    await delay(1500);
    const cacheOption:RequestInit = {
        cache:"force-cache",
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,cacheOption);
    if(!response.ok){
        return <div>오류가 발생했습니다.</div>
    }
    const allBooks :BookData[] = await response.json();
    return (
        <div>
            {
                allBooks.map(book => {
                    return (<BookItem key={book.id} {...book}/>)
                })
            }
        </div>
    )
}

async function RecBooks(){
    await delay(3000);
    const cacheOption:RequestInit = {
        next:{
            revalidate:3
        }
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,cacheOption);
    if(!response.ok){
        return <div>오류가 발생했습니다.</div>;
    }
    const recBooks:BookData[] = await response.json();

    return (
        <div>
            {
                recBooks.map(book=>{
                    return (<BookItem key={book.id} {...book}/>)
                })
            }
        </div>
    )
}

export default function Home() {
  return (
    <>
      <div className={styles.container}>
          <section>
              <h3>지금 추천하는 도서</h3>
              <Suspense fallback={<BookListSkeleton count={3}/>}>
                <RecBooks/>
              </Suspense>
          </section>
          <section>
              <h3>등록된 모든 도서</h3>
              <Suspense fallback={<BookListSkeleton count={10}/>}>
                <AllBooks />
              </Suspense>
          </section>
      </div>
    </>
  );
}
