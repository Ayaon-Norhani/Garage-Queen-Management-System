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
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
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
    // Upload file to Cloudinary
    //   const fileBuffer = Buffer.from(await data.file.arrayBuffer());
    //   const fileUpload = await uploadStream(
    //     { resource_type: 'raw' },
    //     fileBuffer
    //   );

    // Upload image to Cloudinary
    const imageBuffer = Buffer.from(await data.image.arrayBuffer());
    const imageUpload = await uploadStream(
      { resource_type: "image" },
      imageBuffer
    );

    // Save product to database
    await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath: "test", // Store Cloudinary URL for file
        imagePath: imageUpload.secure_url, // Store Cloudinary URL for image
      },
    });

    console.log("Product successfully created in the DB");

    // Revalidate paths and redirect
    // Revalidate paths and redirect
    await revalidatePath("/");
    await revalidatePath("/members");

    // Redirect to admin products page
    // return { redirect: "/admin/products" };
  } catch (error) {
    console.error("Error uploading files or saving product:", error);
    throw new Error("Failed to upload files or save product");
  }

  redirect("/admin/members");
};

// export const addProduct = async (prevState: unknown, formData: FormData) => {
//     const result = addSchema.safeParse(
//         Object.fromEntries(formData.entries())
//     )

//     if(result.success === false) {
//         return result.error.formErrors.fieldErrors
//     }

//     const data = result.data

//       // Upload file to Cloudinary
//   const fileUpload = await cloudinary.uploader.upload_stream(
//     { resource_type: 'raw' },
//     (error, result) => {
//       if (error) throw new Error('File upload failed');
//       return result?.secure_url;
//     }
//   ).end(Buffer.from(await data.file.arrayBuffer()));

//   // Upload image to Cloudinary
//   const imageUpload = await cloudinary.uploader.upload_stream(
//     { resource_type: 'image' },
//     (error, result) => {
//       if (error) throw new Error('Image upload failed');
//       return result?.secure_url;
//     //   imagePath = result?.secure_url;
//     }
//   ).end(Buffer.from(await data.image.arrayBuffer()));

//   console.log(imageUpload)

//     // await fs.mkdir("products", {recursive: true})
//     // const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
//     // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

//     // await fs.mkdir("public/products", {recursive: true})
//     // const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
//     // await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

//     await db.product.create({data: {
//         isAvailableForPurchase: false,
//         name: data.name,
//         description: data.description,
//         priceInCents: data.priceInCents,
//         // filePath,
//         // imagePath
//         filePath: "test",
//         // imagePath: "test"
//         // filePath: fileUpload.secure_url, // Store Cloudinary URL
//         imagePath: imageUpload.secure_url, // Store Cloudinary URL
//     }})

//     console.log("Product successfully created in the DB");

//     revalidatePath("/")
//     revalidatePath("/products")
//     redirect("/admin/products")
// }

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
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let filePath = product.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath);
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  console.log("Data before DB insert:", data);

  await db.product.update({
    where: { id },
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  console.log("Product successfully edited in the DB");

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
};

export const toggleProductAvailability = async (
  id: string,
  isAvailableForPurchase: boolean
) => {
  await db.product.update({
    where: { id },
    data: {
      isAvailableForPurchase,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
};

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({ where: { id } });
  if (product == null) return notFound();

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
};
