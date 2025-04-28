import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, StarIcon } from "lucide-react";
import { addToBag, addToWishlist, removeFromWishlist } from "@/redux/userSlice";
import { cn } from "@/lib/utils";

// Define the Product Type
interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductDetail() {
  const { product_id } = useParams<{ product_id: string }>();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userState = useAppSelector((state) => state.user.value);

  const findInBag = (product: Product): boolean => {
    return userState.bag.some((p) => p.id === product.id);
  };

  const findInWishlist = (product: Product): boolean => {
    return userState.wishlist.some((p) => p.id === product.id);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${product_id}`
        );
        const data = await res.json();
        setProduct(data);
        console.log(loading, data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [product_id]);

  if (loading || !product) {
    return <div className="p-10 text-center text-lg">Loading...</div>;
  }

  const { title, image, category, price, description, rating } = product;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <Card className="shadow-lg border rounded-lg overflow-hidden p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded relative">
            <img
              src={image}
              alt={title}
              className="w-full h-96 object-contain bg-white rounded"
            />
            <span className="absolute top-4 left-4 bg-gray-800 text-white px-2 py-1 rounded text-xs">
              {category}
            </span>
          </div>
          <div className="flex flex-col justify-between">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-bold mb-2">{title}</CardTitle>
              <p className="text-gray-500 font-bold text-xl mb-4">
                ${price.toFixed(2)}
              </p>
            </CardHeader>

            <CardContent className="p-0 flex-grow">
              <p className="text-gray-600 mb-4">{description}</p>
              <div className="flex items-center mb-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={cn(
                      index < Math.round(rating?.rate)
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-5 w-5"
                    )}
                  />
                ))}
                <span className="ml-2 text-gray-500 text-sm">
                  {rating?.rate} ({rating?.count} reviews)
                </span>
              </div>
              <div className="flex space-x-3">
                <Button
                  className="w-full"
                  disabled={findInBag(product)}
                  onClick={() => dispatch(addToBag(product))}
                >
                  Add to Bag
                </Button>
                <Button
                  variant="ghost"
                  aria-label={
                    findInWishlist(product)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  onClick={() => {
                    if (findInWishlist(product)) {
                      dispatch(removeFromWishlist(product));
                    } else {
                      dispatch(addToWishlist(product));
                    }
                  }}
                >
                  {findInWishlist(product) ? (
                    <Heart fill="red" className="h-5 w-5 text-red-700" />
                  ) : (
                    <Heart className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
