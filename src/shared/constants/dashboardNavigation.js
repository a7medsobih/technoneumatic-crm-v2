import {
  BarChart3,
  CircleDollarSign,
  Megaphone,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

export const dashboardNavigationItems = [
  {
    key: "dashboard",
    path: "/",
    icon: BarChart3,
  },
  {
    key: "customers",
    path: "/customers",
    icon: Users,
  },
  {
    key: "orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    key: "ads",
    path: "/ads",
    icon: Megaphone,
  },
  {
    key: "finance",
    path: "/finance",
    icon: CircleDollarSign,
  },
  {
    key: "wallet",
    path: "/wallet",
    icon: Wallet,
  },
];
