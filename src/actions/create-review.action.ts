'use server'
import {revalidatePath} from "next/cache";

export async function createReviewAction(formData:FormData){

    console.log('server action called');
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();
    const bookId = formData.get('bookId')?.toString();
    if(!content || !author || !bookId){
        return ;
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,{
            method:"post",
            body: JSON.stringify({content,author,bookId})
        })
        console.log(response.status);
        revalidatePath(`/book/${bookId}`); //NEXT SERVER가 자동으로 인수로 전달한 경로의 페이지를 재검증함.
    }catch (e){
        console.error(e);
    }

}