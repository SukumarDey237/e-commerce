import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";

import Bag from "./pages/Bag.tsx";
import Home from "./pages/Home.tsx";
import Wishlist from "./pages/Wishlist.tsx";

import { SearchX } from "lucide-react";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Product from "./pages/Product.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div className="m-8">
        <SearchX className="text-center w-full " size={64} />
        <p className="text-6xl text-center mb-8">404 !</p>
        <p className="text-center">Page you are looking for does not exist</p>
      </div>
    ),

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product/:product_id",
        element: <Product />,
      },
      {
        path: "bag",
        element: <Bag />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
