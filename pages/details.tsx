import Link from 'next/link';

export interface ListProps{
    ownerList: OwnersList[] | undefined;
}
export default function Details({ ownerList }: ListProps){
    return <div>
        {ownerList?.map(e=>(
            <div key={e.id}>
                <Link as={`/${e.vehicle}/${e.ownerName}`} href='/[vehicle]/[person]'>
                    Navigate to {e.ownerName} s {e.vehicle}
                </Link>
            </div>
        ))}

    </div>
}

export interface OwnersList {
    id: 'string';
    details: 'string';
    ownerName: 'string';
    vehicle: 'string';
}

Details.getInitialProps = async () =>{
    const res = await fetch('http://localhost:3001/vehicles');
    const ownersList: OwnersList[] | undefined  = await res.json();
    return{
        ownerList: ownersList
    }
}