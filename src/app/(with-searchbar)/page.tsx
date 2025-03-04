import Image from "next/image";
import styles from "./page.module.css";
import ClientComponent from "@/components/client-component";
import ServerComponent from "@/components/server-component";
import books from "@/mock/books.json";
import BookItem from "@/components/bookItem";
import {BookData} from "@/types";

async function AllBooks(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`);
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
