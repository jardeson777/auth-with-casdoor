type ListProductProps = {
  products: {
    name: string;
    price: number;
  }[];
}

const ListProduct = ({ products }: ListProductProps) => {
  return (
    <ul className="list-disc">
      {products.map((product, index) => (
        <li key={product.name + index} className="flex gap-2">
          <h1>- {product.name}</h1>
          <h1>{product.price}</h1>
        </li>
      ))}
    </ul>
  );
}

export default ListProduct;