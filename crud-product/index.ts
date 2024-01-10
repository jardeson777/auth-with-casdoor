import fastify from 'fastify'

const server = fastify();

type Product = {
  name: string;
  price: number;
};

const products: Product[] = [];

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.post('/product', async (request, reply) => {
  const product = request.body as Product;

  products.push(product);

  return { success: true };
});

server.get('/product', async (request, reply) => {
  return { products };
});
