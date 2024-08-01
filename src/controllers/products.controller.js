import Product from "../models/Product";

//Función para crear
export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;
  const newProduct = new Product({ name, category, price, imgURL });
  const productSaved = await newProduct.save();
  res.status(201).json(productSaved);
  console.log(productSaved);
};

//Función para obtener todos los productos
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
  console.log(products);
};

//Funcíon para obtener un producto mediante su Id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
  console.log(product);
};

//Función para actualizar un producto mediante su Id
export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedProduct);
  console.log(updatedProduct);
};

//Función para eliminar un producto mediante su Id
export const deletProductById = async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.status(204).json();
  console.log("Producto eliminado");
};
