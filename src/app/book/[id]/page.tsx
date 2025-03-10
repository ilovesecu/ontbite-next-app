import style from './page.module.css';
import {notFound} from "next/navigation";
import {BookData, ReviewData} from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";
import {Metadata} from "next";

export const dynamicParams = true;

export function generateStaticParams() {
    return [
        {id: "1"}, {id: "2"}, {id: "3"}
    ]
}

async function BookDetail({bookId}: { bookId: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        return (<div>오류가 발생했습니다...</div>);
    }
    const book = await response.json();
    const {
        id, title, subTitle, description, author, publisher, coverImgUrl
    } = book;


    return (
        <>
            <section>
                <div className={style.cover_img_container} style={{backgroundImage: `url('${coverImgUrl}')`}}>
                    <Image src={coverImgUrl} alt={`${title}표지`} width={240} height={300}/>
                </div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <div className={style.author}>
                    {author} | {publisher}
                </div>
                <div className={style.description}>{description}</div>
            </section>
        </>
    )
}

async function ReviewList({bookId}:{bookId:string}){
    //현재 도서에 등록된 리뷰를 보여주는 컴포넌트

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,{
        next: {tags: [`review-${bookId}`]}
    });
    if(!response.ok){
        throw new Error(`Review fetch failed:${response.statusText}`);
    }
    const reviews:ReviewData[] = await response.json();

    return <section>
        {
            reviews.map((review)=><ReviewItem {...review} key={`review-item-${review.id}`}/>)
        }
    </section>
}

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
    const {id} = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`);
    if(!response.ok){
        throw new Error(response.statusText);
    }
    const book:BookData = await response.json();
    return {
        title: `${book.title} - 한입`,
        description: `${book.description}`,
        openGraph:{
            title: `${book.title} - 한입`,
            description: `${book.description}`,
            images: [book.coverImgUrl],
        }
    }
}
export default async function Page({params}:
                                       { params: Promise<{ id: string }> }) {

    const {id} = await params;
    return <div className={style.container}>
        <BookDetail bookId={id}/>
        <ReviewEditor bookId={id}/>
        <ReviewList bookId={id}/>
    </div>
}