import {createReviewAction} from "@/actions/create-review.action";
import style from './reivew-editor.module.css';

export default function ReviewEditor({bookId}:{bookId:string}) {
    return <section>
        <form className={style.form_container} action={createReviewAction}>
            <input name="bookId" type="hidden" value={bookId} readOnly/>
            <textarea placeholder="리뷰 내용" name="content" required/>
            <div className={style.submit_container}>
                <input placeholder="작성자" name="author" required/>
                <button type="submit">작성하기</button>
            </div>

        </form>
    </section>
}