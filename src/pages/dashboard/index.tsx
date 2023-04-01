import { RouteType } from "pages";
import ProductPage from "./ProductPage";
import ProductsPage from "./ProductsPage";
 
export const dashboardPages: RouteType[] = [
    {
        id: "1",
        path: "/dashboard/products",
        pageElement: <ProductsPage />,
      }, {
        id: "2",
        path: "/dashboard/products/:id",
        pageElement: <ProductPage />,
      },
];
