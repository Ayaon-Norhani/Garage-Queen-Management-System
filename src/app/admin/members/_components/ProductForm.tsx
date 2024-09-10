"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { formatCurrency } from "@/src/lib/formatter";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Member } from "@prisma/client";
import Image from "next/image";

type Props = {
  member?: Member | null;
};

const ProductForm = ({ member }: Props) => {
  const [error, action] = useFormState(
    member == null ? addProduct : updateProduct.bind(null, member.id),
    {}
  );

  return (
    <form action={action} className="space-y-8">
      <div className="flex space-x-4">
        <div className="space-y-2 w-[75%]">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={member?.name || ""}
          />
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2 w-[25%]">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            type="string"
            id="nickname"
            name="nickname"
            required
            value={member?.nickname}
            defaultValue={member?.nickname || ""}
          />
          <div className="text-muted-foreground">
            {error.nickname && (
              <div className="text-destructive">{error.nickname}</div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={member?.description || ""}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={member == null} />
        {member != null && (
          <Image
            src={member.imagePath}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
};

export default ProductForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};
