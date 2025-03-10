'use client'
import {useActionState, useEffect, useRef} from "react";
import {deleteReviewAction} from "@/actions/delete-review-action";

export default function ReviewItemDeleteButton({bookId, reviewId}:{bookId:number; reviewId:number}){
    const [state,formAction,isPending] = useActionState(deleteReviewAction, null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(()=>{
        if(state && !state.status){
            alert(state.error);
        }
    },[state])

    return <form ref={formRef} action={formAction}>
        <input name="bookId" type="hidden" value={bookId}/>
        <input name="reviewId" type="hidden" value={reviewId}/>
        {
            isPending ? <div>...</div> :<div onClick={()=>formRef.current?.requestSubmit()}>삭제하기</div>
        }
    </form>
}