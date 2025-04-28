import { Heart, ShoppingBag } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/reduxHooks";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const userState = useAppSelector((state) => state.user.value);
  const navigate = useNavigate();
  return (
    <header className="flex sticky top-0 z-50 p-2 items-center py-5 border-b-2 bg-card">
      <Link to={"/"} className="font-extrabold text-3xl mr-auto">
        Shop In
      </Link>
      <div className="flex gap-3 flex-shrink">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/wishlist")}
        >
          <Heart />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate("/bag")}>
          <ShoppingBag />
          {userState.bag.length > 0 && (
            <sup className="text-xs align-super">{userState.bag.length}</sup>
          )}
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
