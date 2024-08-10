import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises"

export async function GET(req: NextRequest, {params: {downloadVerificationId}}: {params : {downloadVerificationId: string}}) {
    const data = await db.downloadVerification.findUnique({where: {id: downloadVerificationId, expiresAt: {gt: new Date()}},
    select: {Product: {select : {filePath: true, name: true}}}})

    if(data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url))
    }    

    const {size} = await fs.stat(data.Product.filePath)
    const file = await fs.readFile(data.Product.filePath)
    const extension = data.Product.filePath.split(".").pop()

    return new NextResponse(file, {headers : {
        "Content-Disposition": `attachment; fileName="${data.Product.name}.${extension}"`,
        "Content-Length": size.toString(),
    }} )
}