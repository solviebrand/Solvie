import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import DressBlackPage from "./pages/DressBlackPage";
import DressIvoryPage from "./pages/DressIvoryPage";
import CapePage from "./pages/CapePage";
import PoloBodiPage from "./pages/PoloBodiPage";
import TweedSuitPage from "./pages/TweedSuitPage";
import SportSetPage from "./pages/SportSetPage";
import SportSetNavyPage from "./pages/SportSetNavyPage";
import SportSetIvoryPage from "./pages/SportSetIvoryPage";
import SupportPage from "./pages/SupportPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/product/dress-black",
    Component: DressBlackPage,
  },
  {
    path: "/product/dress-ivory",
    Component: DressIvoryPage,
  },
  {
    path: "/product/cape",
    Component: CapePage,
  },
  {
    path: "/product/polo-bodi",
    Component: PoloBodiPage,
  },
  {
    path: "/product/tweed-suit",
    Component: TweedSuitPage,
  },
  {
    path: "/product/sport-set",
    Component: SportSetPage,
  },
  {
    path: "/product/sport-set-navy",
    Component: SportSetNavyPage,
  },
  {
    path: "/product/sport-set-ivory",
    Component: SportSetIvoryPage,
  },
  {
    path: "/support",
    Component: SupportPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);