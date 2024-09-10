"use server"

import db from "@/src/db/db"
import { notFound } from "next/navigation"


export const deleteUser = async (id: string) => {
    const user = await db.member.delete({where: {id}})

    if (user == null) return notFound()
    
    return user
    }