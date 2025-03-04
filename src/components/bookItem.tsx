import {BookData} from "@/types";
import Link from "next/link";
import styles from './bookItem.module.css';

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
                <img src={coverImgUrl}/>
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