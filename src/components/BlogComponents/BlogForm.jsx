import BlogTextArea from "../BlogTextArea";
import FileUplaoder from "../FileUplaoder";
import PulseLoader from "react-spinners/PulseLoader";
import Selector from "../Selector";
import TextInput from "../TextInput";
import compressImagesForUpload from "../../utility/compressImageForUpload";
import draftToHtml from "draftjs-to-html";
import submitBlog from "../../Services/SubmitBlog";
import { SearchIcon } from "@chakra-ui/icons";
import { EditorState, convertToRaw } from "draft-js";
import { collection, getDocs, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { FaHeading } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { db, storage } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Spinner,
  Tag,
  useToast,
} from "@chakra-ui/react";

function BlogForm() {
  const [blogTitle, setBlogTitle] = useState("");
  const { userData, userId } = useContext(AuthContext);
  const [searchKeywords, setSearchKeyWords] = useState([]);
  const [image, setImage] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [category, setCategory] = useState("Technology");
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [chipText, setChipText] = useState("");
  const toast = useToast();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      let categoryList = [];
      let result = await getDocs(collection(db, "categories"));
      result.forEach((item) => {
        categoryList.push(item.data());
      });
      setCategories(categoryList);
    };
    fetchCategory();
  }, []);

  const isUnchangedOrTooSmall = () => {
    const currentContentState = editorState.getCurrentContent();
    const currentText = currentContentState.getPlainText();

    // Compare the current content state with the initial one
    const isUnchanged = currentContentState.equals(editorState);

    // Check if the length of the text is too small (e.g., less than 10 characters)
    const isTooSmall = currentText.length < 500;

    return isUnchanged || isTooSmall;
  };

  const handleSubmit = async () => {
    // Check if any required fields are empty
    const contentState = editorState.getCurrentContent();
    const contentStateHTML = draftToHtml(convertToRaw(contentState));
    if (!blogTitle || !category || !image) {
      // Display an error toast
      toast({
        title: "Error",
        position: "top",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 5000, // Display for 5 seconds
        isClosable: true, // Allow the user to close the toast
      });

      return; // Stop the submission
    }
    if (isUnchangedOrTooSmall()) {
      toast({
        title: "Heads up!",
        position: "top",
        description:
          "Sorry the article is too small for a blog should be about 500 characters long",
        status: "warning",
        duration: 5000, // Display for 5 seconds
        isClosable: true, // Allow the user to close the toast
      });
      return;
    }

    try {
      setLoading(true);
      const blogId = v4();
      // Generate a unique file name (e.g., using a timestamp)
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${image.name}`;

      // Create a reference to the storage location
      const storageRef = ref(storage, `${userId}/blogImages/${fileName}`);

      // Upload the image to Firebase Storage
      const compressedImage = await compressImagesForUpload(image);
      await uploadBytes(storageRef, compressedImage[0]);

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Submit the blog with the image URL
      await submitBlog(
        userId,
        {
          id: blogId,
          blogContent: contentStateHTML,
          category,
          authorId: userId,
          authorName: userData.username,
          authorPic: userData.profilepic,
          createdAt: serverTimestamp(),
          title: blogTitle,
          cover: imageUrl,
          likes: [],
          comments: [],
          votes: [],
          title_lower: blogTitle.toLowerCase(),
          searchKeywords: [blogTitle, ...searchKeywords],
          feedType: "blog", // Use the image URL in the submission
        },
        blogId
      );

      // Display a success toast and navigate to the profile page
      toast({
        title: "Published",
        position: "top",
        description: "Blog post successfully published",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image or submitting the blog:", error);
      // Display an error toast for any other errors that occur
      toast({
        title: "Error",
        position: "top",
        description: "An error occurred while submitting the blog.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSpacebarPress = (e) => {
    if (e.key === " " && chipText.trim() !== "") {
      // Check if the pressed key is the spacebar and the input is not empty
      handleAddChip(); // Add the keyword
    }
  };

  useEffect(() => {
    // Add an event listener to the document for keydown events
    document.addEventListener("keyup", handleSpacebarPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keyup", handleSpacebarPress);
    };
  }, [chipText]);

  const handleAddChip = () => {
    const trimmedText = chipText.trim();

    if (trimmedText === "") {
      return; // Don't add empty or whitespace-only chips
    }

    setSearchKeyWords([...searchKeywords, trimmedText.toLocaleLowerCase()]);
    setChipText(""); // Optionally clear the input field after adding the chip
  };

  const handleRemoveChip = (text) => {
    let newList = searchKeywords.filter((item) => item !== text);
    setSearchKeyWords(newList);
  };

  if (loading) {
    return (
      <Center className="h-[70vh]">
        <Spinner />
      </Center>
    );
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className=" overflow-hidden w-full pb-10 "
    >
      <FileUplaoder state={image} setState={setImage} />
      <TextInput
        setState={setBlogTitle}
        state={blogTitle}
        placeholder={" a short title that describes the article"}
        label={"Blog Title"}
        icon={<FaHeading />}
      />
      <Selector
        state={category}
        setState={setCategory}
        list={categories}
        label={"Category"}
        forWhat={"category"}
      />

      <Box>
        <p className="text-[14px] font-bold mt-5">Keywords</p>
        <Flex className="w-full gap-2" alignItems={"center"}>
          <input
            value={chipText}
            onChange={(e) => setChipText(e.target.value)}
            className="text-sm border-[1.5px] flex-1 p-2 rounded-xl"
            type="text"
            placeholder="type keywords..."
          />

          <Box>
            <Button
              onClick={handleAddChip}
              _hover={{ bg: "black" }}
              className="bg-primary"
              bg={""}
              color={"white"}
              size={"sm"}
              rounded={"full"}
            >
              Add
            </Button>
          </Box>
        </Flex>
        <div className="mt-2">
          <Flex gap={2} flexWrap={"wrap"} alignItems={"center"}>
            {searchKeywords?.map((item, key) => (
              <Tag
                key={key}
                size={"sm"}
                p={2}
                rounded={"full"}
                bg={""}
                border=""
                color={""}
                colorScheme="blue"
                className="border-[1.5px] text-primary border-primary"
              >
                <BsX onClick={() => handleRemoveChip(item)} size={15} /> {item}
              </Tag>
            ))}
          </Flex>
        </div>
      </Box>

      <BlogTextArea state={editorState} setState={setEditorState} />
      <Flex className="w-full justify-end mb-10">
        <Button
          type="submit"
          bg={""}
          onClick={handleSubmit}
          _hover={{ bg: "orangered" }}
          color={"white"}
          className=" bg-primary"
        >
          Publish
          <MdSend className=" ml-2" />
        </Button>
      </Flex>
    </form>
  );
}

export default BlogForm;
