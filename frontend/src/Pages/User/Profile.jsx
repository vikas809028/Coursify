/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

const MotionBox = motion(Box);

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  async function handleCancellation() {
    const toastId = toast.loading("Initiating cancellation...");
    try {
      await dispatch(cancelCourseBundle()).unwrap();
      toast.success("Cancellation completed!");
      await dispatch(getUserData());
    } catch (error) {
      toast.error("Cancellation failed. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <HomeLayout>
      <Flex minH="76vh" align="center" mx={4} justify="center">
        <MotionBox
          className="p-6 w-96 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          bg="white"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          border="1px solid rgba(255, 255, 255, 0.2)"
        >
          <VStack spacing={4} textAlign="center">
            <Image loading="lazy"
              src={userData?.avatar?.secure_url || "/default-avatar.jpg"}
              alt="User Avatar"
              borderRadius="full"
              boxSize="100px"
              border="2px solid white"
              shadow="md"
            />
            <Text className="text-xl font-semibold capitalize">
              {userData?.fullName || "User Name"}
            </Text>

            <Box className="w-full text-sm text-gray-800 space-y-1">
              <Flex justify="space-between">
                <Text>Email:</Text>
                <Text>{userData?.email || "Not provided"}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Role:</Text>
                <Text>{userData?.role || "N/A"}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Subscription:</Text>
                <Text className={`font-semibold ${userData?.subscription?.status === "active" ? "text-green-400" : "text-red-400"}`}>
                  {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
                </Text>
              </Flex>
            </Box>

            <Flex w="full" gap={2}>
              <Link to="/user/changepassword" className="w-1/2">
                <Button w="full" colorScheme="blue">Change Password</Button>
              </Link>
              <Link to="/user/editprofile" className="w-1/2">
                <Button w="full" colorScheme="blue">Edit Profile</Button>
              </Link>
            </Flex>

            {userData?.subscription?.status === "active" && (
              <Button
                w="full"
                colorScheme="red"
                onClick={handleCancellation}
                whileHover={{ scale: 1.05 }}
              >
                Cancel Subscription
              </Button>
            )}
          </VStack>
        </MotionBox>
      </Flex>
    </HomeLayout>
  );
}

export default Profile;
