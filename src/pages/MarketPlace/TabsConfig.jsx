import Aunction from "./SubPages/Aunction";
import HotProducts from "./SubPages/HotProducts";
import LiveShop from "./SubPages/LiveShop";
import Shops from "./SubPages/Shops";
import { BsFire, BsShop, BsShopWindow } from "react-icons/bs";
import { CgShoppingBag } from "react-icons/cg";
import { FaCircle } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";

export const Tabs = [
  {
    id: 0,
    label: "Hot",
    tabIcon: <BsFire className="mr-1 text-orange-500" />,
    tabPage: <HotProducts />,
  },
  {
    id: 1,
    label: "Shops",
    tabIcon: <CgShoppingBag className="mr-1 text-teal-700" />,
    tabPage: <Shops />,
  },

  // {
  //   id: 2,
  //   label: "Live Shop",
  //   tabIcon: <FaCircle color="red" size={8} className="mr-1" />,
  //   tabPage: <LiveShop />,
  // },
];
