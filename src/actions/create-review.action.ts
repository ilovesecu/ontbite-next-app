'use server'
import {revalidatePath, revalidateTag} from "next/cache";
import {delay} from "@/util/delay";

export async function createReviewAction(_:any, formData:FormData){
    await delay(2000);
    console.log('server action called');
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();
    const bookId = formData.get('bookId')?.toString();
    if(!content || !author || !bookId){
        return {
            status: false,
            error: "리뷰 내용과 작성자를 입력해주세요",
        };
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,{
            method:"post",
            body: JSON.stringify({content,author,bookId})
        })
        console.log(response.status);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        //revalidatePath(`/book/${bookId}`); //NEXT SERVER가 자동으로 인수로 전달한 경로의 페이지를 재검증함.
        revalidateTag(`review-${bookId}`);
        return {
            status:true,
            error:""
        }
    }catch (e){
        console.error(e);
        return{
            status:false,
            error:`리뷰 저장에 실패했습니다. ${e}`
        }
    }

}