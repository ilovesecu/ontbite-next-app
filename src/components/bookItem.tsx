import {BookData} from "@/types";
import Link from "next/link";
import styles from './bookItem.module.css';
import Image from "next/image";

export default function BookItem({
    id,
    title,
    subTitle,
    author,
    publisher,
    coverImgUrl}:BookData){
    return (
        <>
            <Link href={`/book/${id}`} className={styles.container}>
                <Image src={coverImgUrl} width={80} height={105} alt={`도서 표지 ${title}`}/>
                <div>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subTitle}>{subTitle}</div>
                    <br/>
                    <div className={styles.author}>{author} | {publisher}</div>
                </div>
            </Link>
        </>
    )
}