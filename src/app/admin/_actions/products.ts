"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/src/db/db";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  nickname: z.string().min(1),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Convert callback-based upload_stream to a Promise-based function
const uploadStream = (options: any, buffer: Buffer) => {
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error("Upload result is undefined"));
          return;
        }
        resolve(result);
      })
      .end(buffer);
  });
};

export const addProduct = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    const imageBuffer = Buffer.from(await data.image.arrayBuffer());
    const imageUpload = await uploadStream(
      { resource_type: "image" },
      imageBuffer
    );

    await db.member.create({
      data: {
        isAvailableForPurchase: true,
        name: data.name,
        description: data.description,
        nickname: data.nickname,
        imagePath: imageUpload.secure_url,
      },
    });

    console.log("Member successfully created in the DB");


    await revalidatePath("/");
    await revalidatePath("/members");

  } catch (error) {
    console.error("Error uploading files or saving product:", error);
    throw new Error("Failed to upload files or save product");
  }

  redirect("/admin/members");
};

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export const updateProduct = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const member = await db.member.findUnique({ where: { id } });

  if (member == null) return notFound();


  let imagePath = member.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${member.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  console.log("Data before DB insert:", data);

  await db.member.update({
    where: { id },
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      nickname: data.nickname,
      imagePath,
    },
  });

  console.log("Member successfully edited in the DB");

  revalidatePath("/");
  revalidatePath("/member");

  redirect("/admin/member");
};

export const toggleProductAvailability = async (
  id: string,
  isAvailableForPurchase: boolean
) => {
  await db.member.update({
    where: { id },
    data: {
      isAvailableForPurchase,
    },
  });

  revalidatePath("/");
  revalidatePath("/members");
};

export const deleteProduct = async (id: string) => {
  const product = await db.member.findUnique({ where: { id } });
  if (product == null) return notFound();

  try {
    const imageUrl = product.imagePath;
    const publicId = imageUrl.split('/').pop()?.split('.')[0];

    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
      console.log('Image successfully deleted from Cloudinary');
    }

    await db.member.delete({ where: { id } });
    
    revalidatePath("/");
    revalidatePath("/member");

    console.log("Member successfully deleted from the DB");
  } catch (error) {
    console.error('Error deleting member or associated image:', error);
    throw new Error('Failed to delete member or associated image');
  }
};
