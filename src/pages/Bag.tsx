import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector, useAppDispatch } from "@/redux/reduxHooks";
import { handleQuantityChange, removeFromBag } from "@/redux/userSlice";
import { Trash2 } from "lucide-react";

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

const ProductTable: React.FC<{
  products: (Product & { quantity: number })[];
}> = ({ products }) => {
  const totalPrice = products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Qty.</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                ${(product.quantity * product.price).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} className="font-bold text-right">
              Total Price:
            </TableCell>
            <TableCell className="font-bold">
              ${totalPrice.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

const Bag = () => {
  const { bag } = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const quantityOptions = [...Array(10).keys()].map((num) => num + 1);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Your Bag</h2>

      {bag.length === 0 ? (
        <p className="text-gray-500 text-center">Your bag is empty</p>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          <div className=" lg:m-5 space-y-4 lg:col-span-2">
            {bag.map((item) => {
              const { id, image, title, price, quantity } = item;

              return (
                <Card key={id} className="flex gap-5 justify-between p-4">
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
                      <p className="text-gray-500">
                        Price: ${price.toFixed(2)}
                      </p>

                      <div className="mt-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              Quantity: {quantity}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="grid grid-cols-5">
                            {quantityOptions.map((num) => (
                              <DropdownMenuItem
                                key={num}
                                onSelect={() =>
                                  dispatch(
                                    handleQuantityChange({
                                      id: id,
                                      quantity: num,
                                    })
                                  )
                                }
                              >
                                {num}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <p className="text-lg font-semibold">
                      ${(price * quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => dispatch(removeFromBag(item))}
                      className="hover:text-red-600 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="flex flex-col items-end">
            <p className="font-bold text-2xl my-5 self-start">
              Billing details
            </p>
            <ProductTable products={bag} />
            <Button disabled className="mt-4">
              Pay securely
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bag;
