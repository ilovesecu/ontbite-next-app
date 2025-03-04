import Image from "next/image";
import styles from "./page.module.css";
import ClientComponent from "@/app/(with-searchbar)/client-component";
import ServerComponent from "@/app/(with-searchbar)/server-component";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
          INDEX 페이지
          <ClientComponent>
              <ServerComponent/>
          </ClientComponent>
      </div>
    </>
  );
}
