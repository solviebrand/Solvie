import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import DressBlackPage from "./pages/DressBlackPage";
import DressIvoryPage from "./pages/DressIvoryPage";
import CapePage from "./pages/CapePage";
import CapeWhitePage from "./pages/CapeWhitePage";
import PoloBodiPage from "./pages/PoloBodiPage";
import PoloBodiNavyPage from "./pages/PoloBodiNavyPage";
import PoloBodiLightBluePage from "./pages/PoloBodiLightBluePage";
import TweedSuitPage from "./pages/TweedSuitPage";
import SportSetPage from "./pages/SportSetPage";
import SportSetNavyPage from "./pages/SportSetNavyPage";
import SportSetIvoryPage from "./pages/SportSetIvoryPage";
import SupportPage from "./pages/SupportPage";
import AboutPage from "./pages/AboutPage";
import CollectionPage from "./pages/CollectionPage";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import DeliveryPage from "./pages/DeliveryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/collection",
    element: <CollectionPage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/product/dress-black",
    element: <DressBlackPage />,
  },
  {
    path: "/product/dress-ivory",
    element: <DressIvoryPage />,
  },
  {
    path: "/product/cape",
    element: <CapePage />,
  },
  {
    path: "/product/cape-white",
    element: <CapeWhitePage />,
  },
  {
    path: "/product/polo-bodi",
    element: <PoloBodiPage />,
  },
  {
    path: "/product/polo-bodi-navy",
    element: <PoloBodiNavyPage />,
  },
  {
    path: "/product/polo-bodi-light-blue",
    element: <PoloBodiLightBluePage />,
  },
  {
    path: "/product/tweed-suit",
    element: <TweedSuitPage />,
  },
  {
    path: "/product/sport-set",
    element: <SportSetPage />,
  },
  {
    path: "/product/sport-set-navy",
    element: <SportSetNavyPage />,
  },
  {
    path: "/product/sport-set-ivory",
    element: <SportSetIvoryPage />,
  },
  {
    path: "/support",
    element: <SupportPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/delivery",
    element: <DeliveryPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);