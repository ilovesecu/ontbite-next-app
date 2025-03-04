'use client'
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import styles from './searchbar.module.css';

export default function Searchbar(){
    const [search, setSearch] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams(); //쿼리 스트링을 가져올 수 있다.

    const q = searchParams.get("q");

    useEffect(()=>{
        setSearch(q || "");
    },[q]);


    const onChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onSubmit = () => {
        if(!search || q===search) return;
        router.push(`/search?q=${search}`);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            onSubmit();
        }
    }

    return(
        <div className={styles.searchbar_container}>
            <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown}/>
            <button onClick={onSubmit}>검색</button>
        </div>
    )
}