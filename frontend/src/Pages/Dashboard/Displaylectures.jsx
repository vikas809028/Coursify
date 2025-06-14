import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
  Text,
  useToast,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";
import ReactPlayer from "react-player";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    dispatch(getCourseLectures(state._id));
  }, [dispatch, state._id]);

  useEffect(() => {
    if (videoRef.current && lectures.length > 0) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .catch((error) => console.log("Autoplay failed", error));
    }
  }, [lectures]);

  const onLectureDelete = async (courseId, lectureId) => {
    await dispatch(deleteCourseLecture({ courseId, lectureId }));
    await dispatch(getCourseLectures(courseId));
    toast({
      title: "Lecture Deleted",
      description: "The lecture has been successfully removed.",
      status: "success",
      position:"top",
      duration: 3000,
      isClosable: true,
    });
  };
  const size = useBreakpointValue({ base: "sm", md: "lg", lg: "xl" });
  return (
    <HomeLayout>
      <Box className="flex flex-col my-4 min-h-[80vh] lg:min-h-[76vh]">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="blue.400"
          textAlign="center"
          marginY={4}
        >
          Course: {state?.title}
        </Text>

        {lectures && lectures.length > 0 ? (
          <Flex direction={{ base: "column", lg: "row" }} gap={2} width="full">
            {/* Left - Accordion List */}
            <Box className="w-full lg:w-1/4 p-4 bg-white min-h-[72h]  h-full overflow-y-auto">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="blue.400"
                textAlign="center"
              >
                Lectures
              </Text>
              <Divider className="my-4" />

              <Accordion allowToggle className="mt-4">
                {lectures.map((lecture, idx) => (
                  <AccordionItem
                    key={lecture._id}
                    className="my-2"
                    border="none"
                  >
                    <h2>
                      <AccordionButton
                        onClick={() => {
                          setCurrentVideo(idx);
                          if (videoRef.current) {
                            videoRef.current.src =
                              lectures[idx]?.lecture?.secure_url;
                            videoRef.current.muted = true;
                            videoRef.current
                              .play()
                              .catch((error) =>
                                console.log("Autoplay failed", error)
                              );
                          }
                        }}
                        _expanded={{ bg: "blue.500", color: "black" }}
                        className="rounded-md transition-all duration-300 p-2 hover:bg-gray-700"
                      >
                        <Box flex="1" textAlign="left">
                          {idx + 1}. {lecture?.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={2}>
                      <Text>{lecture?.description}</Text>
                      {role === "ADMIN" && (
                        <Button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          colorScheme="red"
                          size="xs"
                          mt={2}
                        >
                          Delete
                        </Button>
                      )}
                    </AccordionPanel>
                    <Divider className="text-gray-500" />
                  </AccordionItem>
                ))}
              </Accordion>

              {role === "ADMIN" && (
                <Button
                  onClick={() => navigate("/course/addlecture", { state })}
                  colorScheme="yellow"
                  size="sm"
                  mt={4}
                >
                  + Add Lecture
                </Button>
              )}
            </Box>

            {/* Right - Video Player */}
            <Box className="w-full lg:w-3/4 lg:my-0">
              <ReactPlayer
                url={lectures[currentVideo]?.lecture?.secure_url}
                width="100%"
                height="100%"
                controls
                playing
                muted
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
              {(size === "sm" || size === "md") && (
                <Box className="my-4 p-4">
                  <Text className="text-xl lg:text-2xl font-bold">
                    {lectures[currentVideo]?.title}
                  </Text>
                  <Text className="fone-semibold">
                    {lectures[currentVideo]?.description}
                  </Text>
                </Box>
              )}
            </Box>
          </Flex>
        ) : (
          role === "ADMIN" && (
            <Flex justifyContent={"center"} h={"full"}>
              <Button
              onClick={() => navigate("/course/addlecture", { state })}
              colorScheme="blue"
              size="lg"
              className="mt-48"
              maxWidth={"500px"}
            >
              Add new lecture
            </Button>
            </Flex>
            
          )
        )}
      </Box>
    </HomeLayout>
  );
}

export default DisplayLectures;
