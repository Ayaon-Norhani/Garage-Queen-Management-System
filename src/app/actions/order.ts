"use server"

import db from "@/src/db/db"


export async function userOrderExists(email: string, memberId: string) {
  return (
    (await db.order.findFirst({
      where: { user: { email }, memberId },
      select: { id: true },
    })) != null
  )
}