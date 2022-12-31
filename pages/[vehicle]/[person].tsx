import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { OwnersList } from "../details";

export interface PersonProps {
  ownerList: OwnersList[];
}

export default function Person({ ownerList }: PersonProps) {
  const router = useRouter();
  const [owners, setOwners] = useState(ownerList);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(
        "http://localhost:3001/vehicles?ownerName=" +
          router.query.person +
          "&vehicle=" +
          router.query.vehicle
      );
      const ownersLst: OwnersList[] | [] = await res.json();
      setOwners(ownersLst);
    }
    if (ownerList.length == 0) {
      console.log("here");
      loadData();
    }
  }, []);
  if (!owners?.[0]) {
    return <div>loading...</div>;
  }
  return <pre>{owners[0]?.vehicle}</pre>;
}

interface MyNextPageContex extends NextPageContext {
  query: {
    person: string;
    vehicle: string;
  };
}

Person.getInitialProps = async ({ query }: MyNextPageContex) => {
  //   if (!ctx.req) {
  //     return { ownersList: [] };
  //   }
  const res = await fetch(
    "http://localhost:3001/vehicles?ownerName=" +
      query.person +
      "&vehicle=" +
      query.vehicle
  );
  const ownersList = await res.json();
  return {
    ownerList: ownersList,
  };
};
