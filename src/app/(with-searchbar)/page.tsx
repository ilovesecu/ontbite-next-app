import Image from "next/image";
import styles from "./page.module.css";
import ClientComponent from "@/components/client-component";
import ServerComponent from "@/components/server-component";
import books from "@/mock/books.json";
import BookItem from "@/components/bookItem";
import {BookData} from "@/types";

async function AllBooks(){
    const cacheOption:RequestInit = {
        cache:'no-store',
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
              <RecBooks/>
          </section>
          <section>
              <h3>등록된 모든 도서</h3>
              <AllBooks />
          </section>
      </div>
    </>
  );
}
