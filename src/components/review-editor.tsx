'use client';

import {createReviewAction} from "@/actions/create-review.action";
import style from './reivew-editor.module.css';
import {useActionState, useEffect} from "react";

export default function ReviewEditor({bookId}:{bookId:string}) {
    const [state,formAction, isPending] = useActionState(createReviewAction, null);

    useEffect(() => {
        if(state && !state.status){
            alert(state.error);
        }
    }, [state]);

    return <section>
        <form className={style.form_container} action={formAction}>
            <input name="bookId" type="hidden" value={bookId} readOnly/>
            <textarea placeholder="리뷰 내용" name="content" required disabled={isPending}/>
            <div className={style.submit_container}>
                <input placeholder="작성자" name="author" required disabled={isPending}/>
                <button type="submit" disabled={isPending}>{
                    isPending ? "..." : "작성하기"
                }</button>
            </div>

        </form>
    </section>
}