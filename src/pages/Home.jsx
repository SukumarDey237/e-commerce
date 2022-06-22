import ProductsGrid from "../components/ProductsGrid";

const Home = () => {
  return (
    <>
      <div className="hero">
        <img
          style={{ width: "100vw", aspectRatio: "3/1" }}
          src="/resources/hero.png"
          alt="hero.img"
        />
      </div>
      <br />
      <h1 className="text-center my-3">Latest products</h1>
      <hr />
      <ProductsGrid />
    </>
  );
};

export default Home;
