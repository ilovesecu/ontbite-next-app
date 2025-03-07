"use client";
import {startTransition, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Error({error, reset}: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const router = useRouter();

    return (
        <div>
            <h3>오류가 발생했습니다.</h3>
            <button onClick={() => {
                startTransition(() => {
                    router.refresh();
                    reset();
                })
            }
            }>다시 시도
            </button>
        </div>
    )
}