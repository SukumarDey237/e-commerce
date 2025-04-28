import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { addToBag, removeFromWishlist } from "@/redux/userSlice";
import { Trash2 } from "lucide-react";

const Wishlist = () => {
  const { wishlist } = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {wishlist.map((item) => {
            const { id, image, title, price } = item;

            return (
              <Card
                key={id}
                className="flex flex-col lg:flex-row gap-5 justify-between p-4 "
              >
                <div className="flex items-center">
                  <img
                    src={image}
                    alt={title}
                    className="w-16 h-16 object-contain p-1 bg-white rounded"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-gray-500">Price: ${price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-1 lg:flex-col mx-1">
                  <Button
                    onClick={() => {
                      dispatch(addToBag(item));
                      dispatch(removeFromWishlist(item));
                    }}
                  >
                    Move to Bag
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => dispatch(removeFromWishlist(item))}
                    className="hover:text-red-500 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
