import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductsContext";
import { useEffect } from "react";

const ProductsFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { products, getSingleProduct, createProduct, updateProduct } =
    useProduct();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      console.log(params);

      if (params.id) {
        const product = await getSingleProduct(params.id);
        setValue("productName", product.productName);
        setValue("productDescription", product.productDescription);
        setValue("productPrice", product.productPrice);
        setValue("productImage", product.productImage);
      }
    }
    loadProduct();
  }, []);

  console.log(products);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productDescription", data.productDescription);
    formData.append("productPrice", data.productPrice);
    formData.append("productImage", data.productImage[0]);
    if (params.id) {
      await updateProduct(params.id, formData);
    } else {
      await createProduct(formData);
    }
    navigate("/products");
  });

  return (
    <section>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="productName">Producto:</label>
          <input
            type="text"
            placeholder="Producto"
            {...register("productName")}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            autoFocus
          />
          <label htmlFor="productImage">Imagen</label>
          <input
            type="file"
            {...register("productImage")}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          />
          <label htmlFor="productDescription">Descripción:</label>
          <textarea
            rows="10"
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            {...register("productDescription")}
          />

          <label htmlFor="productPrice">Precio:</label>
          <input
            type="number"
            placeholder="Precio"
            {...register("productPrice")}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          />
          <button
            type="submit"
            className=" text-white py-3 px-5 bg-indigo-500 rounded-md hover:bg-indigo-600"
          >
            Guardar
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductsFormPage;