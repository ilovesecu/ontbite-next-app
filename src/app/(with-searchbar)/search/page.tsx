import ClientComponent from "@/components/client-component";

export default async function Page({searchParams}
                                       :
                                       { searchParams: Promise<{ q: string }> }) {
    const {q} = await searchParams;
    return (
        <div>Serach 페이지:{q}
            <ClientComponent>
                <></>
            </ClientComponent>
        </div>
    )
}