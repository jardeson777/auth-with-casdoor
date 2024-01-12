import FormProduct from "../../../components/form-product";
import ListProduct from "../../../components/list-product";

type Product = {
  name: string;
  price: number;
};

type Response = {
  data: {
    products: Product[];
  };
  success: boolean;
  status: number;
}

const HomePage = async () => {
  const response: Response = await fetch('http://localhost:5001/api/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-cache',
  }).then((response) => response.json());

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1>Área logada front 1</h1>

      <FormProduct />

      <div className="w-52 flex flex-col gap-5">
        <h1>Lista de produtos</h1>

        <ListProduct products={response.data.products} />
      </div>
    </div>
  );
}

export default HomePage;