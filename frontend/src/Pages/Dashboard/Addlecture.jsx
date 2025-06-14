import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  IconButton,
  useToast,
  AspectRatio,
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import HomeLayout from "../../Layouts/HomeLayout";

function AddLecture() {
  const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    if (video) {
      const source = URL.createObjectURL(video);
      setUserInput({ ...userInput, lecture: video, videoSrc: source });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast({
        title: "Error",
        description: "All fields are mandatory",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const response = await dispatch(addCourseLecture(userInput));
    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <HomeLayout>
      <Flex className="flex justify-center items-center min-h-[81vh] lg:min-h-[76vh]">
      <VStack p={{base:4,md:8}} bg={"white"} boxShadow={"lg"} borderRadius={"lg"} spacing={6} align="stretch">
        <Box  display="flex" alignItems="center">
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            aria-label="Back"
            colorScheme="blue"
            borderRadius={"full"}
          />
          <Heading size="lg" ml={4}>
            Add New Lecture
          </Heading>
        </Box>

        <form onSubmit={onFormSubmit}>
          <VStack spacing={5} align="stretch">
            <FormControl isRequired>
              <FormLabel>Lecture Title</FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Enter lecture title"
                onChange={handleInputChange}
                value={userInput.title}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Enter lecture description"
                onChange={handleInputChange}
                value={userInput.description}
                resize="vertical"
              />
            </FormControl>

            {userInput.videoSrc ? (
              <AspectRatio ratio={16 / 9}>
                <video
                  src={userInput.videoSrc}
                  controls
                  className="rounded-md"
                />
              </AspectRatio>
            ) : (
              <FormControl isRequired>
                <FormLabel>Upload Video</FormLabel>
                <Input
                  type="file"
                  accept="video/mp4,video/x-mp4,video/*"
                  onChange={handleVideo}
                />
              </FormControl>
            )}

            <Button colorScheme="blue" type="submit" size="lg">
              Add Lecture
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
    </HomeLayout>
  );
}

export default AddLecture;
