import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers, FaTrashAlt, FaChalkboardTeacher } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import {
  Button,
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import HomeLayout from "../../Layouts/HomeLayout";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );
  const myCourses = useSelector((state) => state?.course?.courseData);

  const userData = {
    labels: ["Registered Users", "Enrolled Users"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["#FFD700", "#32CD32"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: "#FF4500",
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <Box
        bg={bgColor}
        p={5}
        className="min-h-[81vh] lg:min-h-[76vh] max-w-[100vw]"
      >
        <Heading textAlign="center" color="blue.500" py={4} mb={5}>
          Admin Dashboard
        </Heading>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={6}
          wrap="wrap"
          justify="center"
          align="center"
        >
          {/* Sales Chart */}
          <VStack
            bg={cardBg}
            p={5}
            shadow="lg"
            borderRadius="lg"
            w={{ base: "100%", md: "80%", lg: "48%" }}
          >
            <Flex w="full" justify="center">
              <Box minW="100%" maxW="600px" h="300px">
                <Bar
                  data={salesData}
                  options={{ maintainAspectRatio: false }}
                />
              </Box>
            </Flex>
            <Flex justify="center" mt={4} w="full">
              <VStack>
                <Text fontSize="lg" fontWeight="bold">
                  Total Revenue
                </Text>
                <Text fontSize="2xl">$ {allPayments?.count * 499}</Text>
              </VStack>
            </Flex>
          </VStack>

          {/* User Data Pie Chart */}
          <VStack
            bg={cardBg}
            p={5}
            shadow="lg"
            borderRadius="lg"
            w={{ base: "100%", md: "80%", lg: "48%" }}
          >
            <Flex w="full" justify="center">
              <Box minW="100%" maxW="300px" h="300px">
                <Pie data={userData} options={{ maintainAspectRatio: false }} />
              </Box>
            </Flex>
            <Flex justify="space-between" w="full">
              <VStack>
                <Text fontSize="lg" fontWeight="bold">
                  Registered Users
                </Text>
              </VStack>
              <Flex>
                <Text fontSize="2xl" color="blue.500" mr={2}>
                  {allUsersCount}
                </Text>
                <Icon as={FaUsers} color="blue.500" boxSize={10} />
              </Flex>
            </Flex>
            <Flex justify="space-between" w="full">
              <VStack>
                <Text fontSize="lg" fontWeight="bold">
                  Subscribed Users
                </Text>
              </VStack>
              <Flex>
                <Text fontSize="2xl" color="green.500" mr={2}>
                  {subscribedCount}
                </Text>
                <Icon as={FaUsers} color="green.500" boxSize={10} />
              </Flex>
            </Flex>
          </VStack>
        </Flex>

        {/* Course Overview - Responsive Fix */}
        <Box mt={10} p={5} bg={cardBg} shadow="lg" borderRadius="lg">
          <Flex
            justify="space-between"
            mb={4}
            align={{ base: "start", md: "center" }}
          >
            <Heading size="md">Courses Overview</Heading>
            <Button
              colorScheme="blue"
              onClick={() => navigate("/course/create")}
            >
              Create New Course
            </Button>
          </Flex>

          <Box overflowX="auto">
            <Table variant="simple" minW="600px">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Instructor</Th>
                  <Th>Lectures</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {myCourses?.map((course, idx) => (
                  <Tr key={course._id}>
                    <Td>{idx + 1}</Td>
                    <Td>{course.title}</Td>
                    <Td>{course.category}</Td>
                    <Td>{course.createdBy}</Td>
                    <Td>{course.numberOfLectures}</Td>
                    <Td>
                      <Flex gap={2} wrap="wrap">
                        <Button
                          colorScheme="green"
                          onClick={() =>
                            navigate("/course/displaylectures", {
                              state: course,
                            })
                          }
                        >
                          <Icon as={FaChalkboardTeacher} />
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => onCourseDelete(course._id)}
                        >
                          <Icon as={FaTrashAlt} />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </HomeLayout>
  );
}

export default AdminDashboard;
