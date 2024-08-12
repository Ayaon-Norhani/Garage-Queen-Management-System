"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"


export const deleteUser = async (id: string) => {
    const user = await db.product.delete({where: {id}})

    if (user == null) return notFound()
    
    return user
    }