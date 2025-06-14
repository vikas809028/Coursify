import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Image,
  Avatar,
  Text,
  useBreakpointValue,
  IconButton,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { logout } from "../Redux/Slices/AuthSlice";
import Footer from "./Footer";
import { MdLogout, MdPerson } from "react-icons/md";
import home from "../Assets/sidabaricons/home.png";
import about from "../Assets/sidabaricons/about.png";
import courses from "../Assets/sidabaricons/courses.png";
import phone from "../Assets/sidabaricons/phone.png";
import createcourse from "../Assets/sidabaricons/createcourse.png";
import admindashboard from "../Assets/sidabaricons/admindashboard.png";
import { FaArrowLeft, FaSignInAlt, FaUserPlus } from "react-icons/fa";
function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userData = useSelector((state) => state?.auth?.data);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  }

  const size = useBreakpointValue({ base: "sm", md: "lg", lg: "xl" });

  return (
    <Box minH={"100vh"} className="bg-gradient-to-r from-white to-blue-200">
      <Flex
        top={0}
        position={"sticky"}
        minH={{ sm: "5vh", lg: "10vh" }}
        bg={"white"}
        px={4}
        zIndex={100}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        boxShadow={"lg"}
      >
        {size !== "sm" && (
          <Flex justifyContent={"space-between"} w={"100%"} px={4}>
            <Image loading="lazy" boxSize={"5rem"} src="/logo.svg" alt="Logo" />
            <Flex
              flexDirection={"row"}
              gap={{ base: 4, lg: 10 }}
              fontSize={"larger"}
              alignItems={"center"}
            >
              <Link to="/">
                <Text>Home</Text>
              </Link>
              <Link to="/courses">
                <Text>All&nbsp;Courses</Text>
              </Link>
              <Link to="/contact">
                <Text>Contact&nbsp;Us</Text>
              </Link>
              <Link to="/about">
                <Text>About&nbsp;Us</Text>
              </Link>

              {isLoggedIn && role === "ADMIN" && (
                <>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </>
              )}
              {!isLoggedIn ? (
                <Button as={Link} to="/login" colorScheme="blue">
                  Login
                </Button>
              ) : (
                <Flex direction="row" gap={4} align="center">
                  {/* Popover for Avatar Click */}
                  <Popover>
                    <PopoverTrigger>
                      <Avatar
                        cursor="pointer"
                        size={{ base: "sm", md: "md" }}
                        src={userData?.avatar?.secure_url}
                        _hover={{ transform: "scale(1.1)" }}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      width="150px"
                      bg={"white"}
                      color="white"
                      borderRadius="md"
                      boxShadow="xl"
                    >
                      <PopoverArrow />
                      <PopoverCloseButton color="white" />
                      <PopoverBody>
                        <VStack align="stretch">
                          <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            onClick={() => navigate("/user/profile")}
                            bg="blue.600"
                            color={"white"}
                            _hover={{ bg: "blue.500", color: "white" }}
                          >
                            Profile
                          </Button>
                          <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            onClick={handleLogout}
                            bg="red.600"
                            color={"white"}
                            _hover={{ bg: "red.500", color: "white" }}
                          >
                            Logout
                          </Button>
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              )}
            </Flex>
          </Flex>
        )}
        {/* for small screens */}
        {size === "sm" && (
          <Flex
            w={{ base: "100vw", md: "98vw" }}
            px={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <IconButton
              aria-label="Open Menu"
              icon={<FiMenu />}
              onClick={onOpen}
              size={{ base: "sm", md: "md" }}
              variant="outline"
              zIndex={2}
              border={"1px"}
              borderColor={"black"}
              color={"gray.800"}
            />{" "}
            <Image loading="lazy" boxSize={"4rem"} src="/logo.svg" alt="Logo" />
            <Flex display={"flex"} alignItems={"center"} gap={4}>
              {!isLoggedIn ? (
                <Button as={Link} to="/login" colorScheme="blue">
                  Login
                </Button>
              ) : (
                <Avatar
                  cursor="pointer"
                  size={{ base: "sm", md: "lg" }}
                  src={userData?.avatar?.secure_url}
                  _hover={{ transform: "scale(1.1)" }}
                />
              )}
            </Flex>
          </Flex>
        )}
      </Flex>

      {/* Drawer */}
      {size === "sm" && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent minW={{ xs: "100vw", sm: "60vw" }} color={"gray.800"}>
            <Flex p={4} justify="flex-start">
              <IconButton
                bg={"blue.400"}
                borderRadius={"full"}
                icon={<FaArrowLeft />}
                onClick={onClose}
                variant="ghost"
                color={"white"}
                aria-label="Close Menu"
              />
            </Flex>

            <List spacing={5} p={4}>
              <ListItem>
                <Link to="/">
                  <Flex align="center" gap={2}>
                    <Image src={home} boxSize={6} />{" "}
                    <Text className="text-xl pl-2 cursor-pointer">Home</Text>
                  </Flex>
                </Link>
              </ListItem>

              {isLoggedIn && role === "ADMIN" && (
                <>
                  <ListItem>
                    <Link to="/admin/dashboard">
                      <Flex align="center" gap={2}>
                        <Image src={admindashboard} boxSize={6} />{" "}
                        <Text className="text-xl pl-2 cursor-pointer">
                          Admin Dashboard
                        </Text>
                      </Flex>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/course/create">
                      <Flex align="center" gap={2}>
                        <Image src={createcourse} boxSize={6} />{" "}
                        <Text className="text-xl pl-2 cursor-pointer">
                          Create Course
                        </Text>
                      </Flex>
                    </Link>
                  </ListItem>
                </>
              )}

              <ListItem>
                <Link to="/courses">
                  <Flex align="center" gap={2}>
                    <Image src={courses} boxSize={6} />{" "}
                    <Text className="text-xl pl-2 cursor-pointer">
                      All Courses
                    </Text>
                  </Flex>
                </Link>
              </ListItem>

              <ListItem>
                <Link to="/contact">
                  <Flex align="center" gap={2}>
                    <Image src={phone} boxSize={6} />{" "}
                    <Text className="text-xl pl-2 cursor-pointer">Contact</Text>
                  </Flex>
                </Link>
              </ListItem>

              <ListItem>
                <Link to="/about">
                  <Flex align="center" gap={2}>
                    <Image src={about} boxSize={6} />{" "}
                    <Text className="text-xl pl-2 cursor-pointer">
                      About us
                    </Text>
                  </Flex>
                </Link>
              </ListItem>
            </List>
            {!isLoggedIn ? (
              <Flex
                direction="row"
                mx={2}
                gap={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Button
                  as={Link}
                  to="/login"
                  colorScheme="blue"
                  width="full"
                  leftIcon={<FaSignInAlt />}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/signup"
                  colorScheme="blue"
                  width="full"
                  leftIcon={<FaUserPlus />}
                >
                  Signup
                </Button>
              </Flex>
            ) : (
              <Flex
                direction="row"
                mx={2}
                gap={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Button
                  as={Link}
                  to="/user/profile"
                  colorScheme="blue"
                  width="full"
                  leftIcon={<MdPerson />}
                >
                  Profile
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleLogout}
                  width="full"
                  leftIcon={<MdLogout />}
                >
                  Logout
                </Button>
              </Flex>
            )}
          </DrawerContent>
        </Drawer>
      )}

      <Box overflowX={"hidden"}>{children}</Box>
      <Footer />
    </Box>
  );
}

export default HomeLayout;
