import React from "react";
import PageHeader from "../../_components/PageHeader";
import ProductForm from "../_components/ProductForm";

type Props = {};

const NewProductPage = (props: Props) => {
  return (
    <>
      <PageHeader>Add member</PageHeader>
      <ProductForm />
    </>
  );
};

export default NewProductPage;
