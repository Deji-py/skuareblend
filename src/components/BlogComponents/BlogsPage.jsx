import BigPostBanner from "../BigPostBanner";
import FabMainButton from "../ReUsables/FAB/FabMainButton";
import SmallCard from "../SmallCard";
import emptyblog from "../../assets/icons/emptyblog.png";
import getBlogsByUserId from "../../Services/getBlogsByUserRef";
import { Button, Center, IconButton, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { AuthContext } from "../../App";

export default function BlogsPage({ friendBlogs, friendId }) {
  const { userData, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [myblogs, setMyBlogs] = useState([]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const userBlogs = await getBlogsByUserId(friendId ? friendId : userId);
      setMyBlogs(userBlogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, [friendId]);

  if (loading) {
    return (
      <Center className="  w-full h-[50vh] z-50 bg-[rgba(255,255,255,0.8)] ">
        <PulseLoader
          color={"#004E64"}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Center>
    );
  }

  return (
    <div className=" relative  w-full mb-[120px]">
      {!friendBlogs && (
        <div className="px-2 py-2">
          <Link to={"/profile"}>
            <Button>
              <MdChevronLeft />
            </Button>
          </Link>
        </div>
      )}
      {myblogs?.length === 0 ? (
        <Center h={"full"} py={20} flexDirection={"column"}>
          <Image
            alt="emptyblog"
            src={emptyblog}
            className="w-[100px] h-[100px]"
          />
          <h2 className=" text-2xl my-2 text-gray-700 font-bold">
            No Blog Posts
          </h2>
          {!friendId && (
            <p className="px-20 text-gray-500 text-sm text-center">
              You can create a new post by clicking the pen icon
            </p>
          )}
        </Center>
      ) : (
        <div className="md:flex flex-col  gap-5 grid grid-cols-2">
          {myblogs?.map((blog) => (
            <>
              {friendBlogs ? (
                <BigPostBanner blog={blog} />
              ) : (
                <div className="px-3">
                  <SmallCard key={blog?.id} blog={blog} />
                </div>
              )}
            </>
          ))}
        </div>
      )}
      <div className="md:block grid grid-cols-2"></div>
      {!friendBlogs && (
        <Link to={"/new-blog"}>
          <FabMainButton icon={<FaPen />} />
        </Link>
      )}
    </div>
  );
}
