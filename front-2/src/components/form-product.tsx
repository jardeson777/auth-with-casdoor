'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Product = {
  name: string;
  price: number;
};


const FormProduct = () => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const { refresh } = useRouter();

  const addProduct = async (input: Product) => {
    await fetch('http://www.meulocal.com.br:5002/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...input }),
    });

    setProductName("");
    setProductPrice(0);
    refresh();
  };

  return (
    <>
      <hr className="bg-white w-full my-5" />

      <div className="flex flex-col gap-5 w-52">
        <h1>Adicionar produto</h1>
        <label className="flex flex-col">
          Nome
          <input defaultValue={productName} value={productName} type="text" name="name" onInput={e => {
            setProductName(e.currentTarget.value);
          }} />
        </label>

        <label className="flex flex-col">
          Preço
          <input defaultValue={productPrice} value={productPrice} type="text" onInput={e => setProductPrice(Number(e.currentTarget.value))} />
        </label>

        <Button onClick={() => addProduct({
          name: productName,
          price: productPrice,
        })}>Adicionar</Button>
      </div>

      <hr className="bg-white w-full my-5" />
    </>
  );
}

export default FormProduct;