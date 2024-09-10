import { NextRequest, NextResponse } from "next/server";

// Might Use Laterr


// export async function GET(req: NextRequest, {params: {downloadVerificationId}}: {params : {downloadVerificationId: string}}) {
//     const data = await db.downloadVerification.findUnique({where: {id: downloadVerificationId, expiresAt: {gt: new Date()}},
//     select: {product: {select : {imagePath: true, name: true}}}})

//     if(data == null) {
//         return NextResponse.redirect(new URL("/products/download/expired", req.url))
//     }    

//     const {size} = await fs.stat(data.product.filePath)
//     const file = await fs.readFile(data.product.filePath)
//     const extension = data.product.filePath.split(".").pop()

//     return new NextResponse(file, {headers : {
//         "Content-Disposition": `attachment; fileName="${data.product.name}.${extension}"`,
//         "Content-Length": size.toString(),
//     }} )
// }

export async function GET(req: NextRequest, { params: { downloadVerificationId } }: { params: { downloadVerificationId: string } }) {
    return new NextResponse("Placeholder response for download endpoint.", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }