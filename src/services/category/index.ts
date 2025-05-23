"use server"

import { cookies } from "next/headers";

export const createCategory = async(data:FormData) => {
   try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
        method: "POST",
        headers: {
            Authorization: (await cookies()).get("accessToken")!.value
        },
        body: data,
       
      });
     return res.json();
   }
   catch (err:any) {
    return Error(err)
   }
}


export const getAllCategory = async() => {
    try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`);
      return res.json();
    }
    catch (err:any) {
     return Error(err)
    }
 }