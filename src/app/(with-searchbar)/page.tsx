import Image from "next/image";
import styles from "./page.module.css";
import ClientComponent from "@/components/client-component";
import ServerComponent from "@/components/server-component";
import books from "@/mock/books.json";
import BookItem from "@/components/bookItem";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
          <section>
              <h3>지금 추천하는 도서</h3>
              {
                  books.map(book => {
                      return (<BookItem key={book.id} {...book}/>)
                  })
              }
          </section>
          <section>
              <h3>등록된 모든 도서</h3>
              {
                  books.map(book => {
                      return (<BookItem key={book.id} {...book}/>)
                  })
              }
          </section>
      </div>
    </>
  );
}
