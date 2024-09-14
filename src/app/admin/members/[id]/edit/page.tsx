import React from "react";
import PageHeader from "../../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";
import db from "@/src/db/db";

const EditProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const member = await db.member.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm member={member} />
    </>
  );
};

export default EditProductPage;
