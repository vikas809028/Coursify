import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import NumberTicker from './ui/number-ticker';
import { FaUserGraduate, FaEye, FaUsers } from "react-icons/fa";
const AudienceSection = () => {
  return (
    <Flex
      mt="50px"
      px={4}
      py={8}
      direction="column"
      align="center"
      className="relative w-full bg-gradient-to-b from-[#6a75e4] to-[#5e6be6] py-10 text-white"
    >
      <h1 className="text-center text-xl font-bold">
        INDIA'S MOST LOVED CODING COMMUNITY ❤️
      </h1>

      <Flex
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={6}
        w="100%"
      >
        {[
          { label: "Happy Learners", value: 9999, icon: FaUserGraduate },
          { label: "Monthly Views", value: 5000, icon: FaEye },
          { label: "New Subscribers", value: 1000, icon: FaUsers },
        ].map((item, index) => (
          <Box key={index} p={4} textAlign="center">
            <Flex align="center" justify="center" gap={2}>
              <item.icon size={40} className="font-semibold" />
              <NumberTicker value={item.value} />
            </Flex>
            <Text fontSize="xl" fontWeight="semibold" color="white" mt={2}>
              {item.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default AudienceSection;
