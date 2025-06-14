import { useState } from "react";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Image,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import HomeLayout from "../../Layouts/HomeLayout";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setUserInput((prev) => ({
          ...prev,
          previewImage: fileReader.result,
          thumbnail: uploadedImage,
        }));
      };
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast({
        title: "All fields are mandatory",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <Flex
        py={10}
        className="flex justify-center items-center min-h-[81vh] lg:min-h-[76vh]"
      >
        <Box
          bg={cardBg}
          p={6}
          rounded="xl"
          shadow="lg"
          width={{ base: "95%", md: "70%", lg: "50%" }}
        >
          <Flex className="flex items-center">
            <IconButton
              as={Link}
              to="/courses"
              bg={"blue.400"}
              color={"white"}
              icon={<AiOutlineArrowLeft />}
              aria-label="Back"
              variant="ghost"
              borderRadius={"full"}
            />
            <Text
            width={"full"}
              className="text-center text-xl lg:text-3xl font-semibold"
              color={textColor}
              textAlign="center"
            >
              Create New Course
            </Text>
          </Flex>

          {/* Image Upload Section */}
          <FormControl mt={4} textAlign="center">
            <label htmlFor="image_uploads" className="cursor-pointer">
              {userInput.previewImage ? (
                <Image
                  src={userInput.previewImage}
                  alt="Course Thumbnail"
                  borderRadius="md"
                />
              ) : (
                <Box
                  w="full"
                  h={20}
                  border="2px dashed gray"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  Click to Upload Course Thumbnail
                </Box>
              )}
            </label>
            <Input
              type="file"
              id="image_uploads"
              hidden
              onChange={handleImageUpload}
              accept=".jpg, .jpeg, .png"
            />
          </FormControl>

          {/* Input Fields */}
          <FormControl mt={4}>
            <FormLabel>Course Title</FormLabel>
            <Input
              type="text"
              name="title"
              placeholder="Enter course title"
              value={userInput.title}
              onChange={handleUserInput}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Instructor Name</FormLabel>
            <Input
              type="text"
              name="createdBy"
              placeholder="Enter instructor name"
              value={userInput.createdBy}
              onChange={handleUserInput}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Input
              type="text"
              name="category"
              placeholder="Enter category"
              value={userInput.category}
              onChange={handleUserInput}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Enter course description"
              value={userInput.description}
              onChange={handleUserInput}
            />
          </FormControl>

          {/* Submit Button */}
          <Button mt={6} colorScheme="blue" width="full" onClick={onFormSubmit}>
            Create Course
          </Button>
        </Box>
      </Flex>
    </HomeLayout>
  );
}

export default CreateCourse;
