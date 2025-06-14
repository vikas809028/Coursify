import { useNavigate } from "react-router-dom";
import { Box, Button, Text, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Astronaut image
const astronautImg = "https://cdn-icons-png.flaticon.com/512/6033/6033716.png";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100vh"
      bgGradient="linear(to-r, blue.50, blue.100, blue.200)"
      color="black"
      textAlign="center"
      px={4}
      position="relative"
    >
      {/* Oops! You Are Lost Message */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        🚀 Oops! You are lost! 🌌
      </motion.div>

      {/* Animated 404 Text */}
      <motion.h1
        className="text-9xl font-extrabold"
        style={{ fontSize: "10vw", fontWeight: "bold" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        404
      </motion.h1>


      {/* Additional Message */}
      <Text fontSize="lg" mt={4} fontWeight="medium">
        Don't worry, we'll get you back home safely! 🏠
      </Text>

      {/* Go Back Button */}
      <Button
        mt={6}
        colorScheme="blue"
        size="lg"
        onClick={() => navigate("/")}
        as={motion.button}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
      >
        Take me Home 🚀
      </Button>
    </Flex>
  );
}

export default NotFound;
