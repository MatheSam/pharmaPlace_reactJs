import SearchFilter from "../../Components/Filters/Filter";
import SearchInput from "../../Components/Filters/Input";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { Identify, ProductList } from "./style";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../Providers/products";
import { useContext } from "react";
import ProductCard from "../../Components/ProductCard";
import { UsersContext } from "../../Providers/users";

const PharmaProducts = () => {
  const params = useParams();

  const {
    products,
    inputFilterFunction,
    setFilteredProductsPharma,
    setInputValue,
    filteredProductsPharma,
  } = useContext(ProductsContext);
  const { users } = useContext(UsersContext);

  const pharmaProductsData = products.filter(
    (product) => product.userId === +params.id
  );

  return (
    <>
      <Header />
      <Identify>
        {users.map(
          (user) =>
            user.isPharmacy === true &&
            user.id === +params.id && (
              <div className="identify" key={user.id}>
                <img className="imgPharma" alt="img pharma" src={user.photo} />
                <h3 className="namePharma">{user.name}</h3>
              </div>
            )
        )}
      </Identify>
      <SearchFilter data={pharmaProductsData} set={setFilteredProductsPharma} />
      <SearchInput
        set={setInputValue}
        func={() =>
          inputFilterFunction(pharmaProductsData, setFilteredProductsPharma)
        }
      />

      <ProductList>
        <section className="area">
          {filteredProductsPharma.length > 0
            ? filteredProductsPharma.map(
                ({ image, name, price, id, userId }) =>
                  userId === +params.id && (
                    <ProductCard
                      key={id}
                      image={image}
                      name={name}
                      price={price}
                      id={id}
                    />
                  )
              )
            : pharmaProductsData.map(
                ({ image, name, price, id, userId }) =>
                  userId === +params.id && (
                    <ProductCard
                      key={id}
                      image={image}
                      name={name}
                      price={price}
                      id={id}
                    />
                  )
              )}
        </section>
      </ProductList>

      <Footer />
    </>
  );
};

export default PharmaProducts;
