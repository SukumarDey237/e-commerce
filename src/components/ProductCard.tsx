import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Heart, StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { addToBag, addToWishlist, removeFromWishlist } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";

// Define the product type
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { id, title, price, category, description, image, rating } = product;

  const userState = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const findInBag = (product: Product): boolean => {
    return userState.bag.some((p) => p.id === product.id);
  };

  const findInWishlist = (product: Product): boolean => {
    return userState.wishlist.some((p) => p.id === product.id);
  };

  return (
    <Card className="m-5 max-w-sm shadow-lg border rounded-lg overflow-hidden p-2 transition hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-48 rounded p-2 bg-white object-contain cursor-pointer"
          onClick={() => navigate(`/product/${id}`)}
        />
        <span className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
          {category}
        </span>
      </div>

      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg font-bold">
          {title}
        </CardTitle>
        <p className="text-gray-500 font-bold text-l">${price.toFixed(2)}</p>
      </CardHeader>

      <CardContent className="pb-2">
        <p className=" line-clamp-3 text-gray-500 text-sm mb-2">
          {description}
        </p>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                className={cn(
                  index < Math.round(rating.rate)
                    ? "text-yellow-400"
                    : "text-gray-300",
                  "h-5 w-5"
                )}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-500 text-sm">
            {rating.rate} ({rating.count} reviews)
          </span>
        </div>

        <div className="flex space-x-2 mt-5">
          <Button
            disabled={findInBag(product)}
            className="w-full"
            onClick={() => {
              dispatch(addToBag(product));
            }}
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
    </Card>
  );
};

export default ProductCard;
