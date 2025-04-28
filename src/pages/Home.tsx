import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (category !== "all") {
      filtered = products.filter((product) => product.category === category);
    }

    if (sort === "PRICE_LOW") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "PRICE_HIGH") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "RATING_LOW") {
      filtered.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (sort === "RATING_HIGH") {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return filtered;
  }, [products, category, sort]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-5 my-5">
        <h1 className="flex-1 mx-5 font-semibold">
          Shop the latest trends at{" "}
          <span className="font-extrabold text-lg">Shop In </span>!
        </h1>

        <div className="mx-5 flex items-center ">
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-[160px] mx-5 capitalize">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSort}>
            <SelectTrigger className="w-[180px] mx-5 capitalize">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"PRICE_HIGH"} className="capitalize">
                Price High to Low
              </SelectItem>
              <SelectItem value={"PRICE_LOW"} className="capitalize">
                Price Low to High
              </SelectItem>
              <SelectItem value={"RATING_HIGH"} className="capitalize">
                Rating High to Low
              </SelectItem>
              <SelectItem value={"RATING_LOW"} className="capitalize">
                Rating Low to High
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default Home;
