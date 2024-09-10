import { NextRequest, NextResponse } from 'next/server'

// Might Use Laterr

// export const GET = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
//     const member = await db.member.findUnique({ where: {id}, select: {filePath: true, name: true}})

//     if (member == null) return notFound()

//     const {size} = await fs.stat(member.filePath)
//     const file = await fs.readFile(member.filePath)
//     const extension = member.filePath.split(".").pop()

//     return new NextResponse(file, {headers : {
//         "Content-Disposition": `attachment; fileName="${member.name}.${extension}"`,
//         "Content-Length": size.toString(),
//     }} )
// }


export async function GET(req: NextRequest, { params: { downloadVerificationId } }: { params: { downloadVerificationId: string } }) {
    return new NextResponse("Placeholder response for download endpoint.", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }