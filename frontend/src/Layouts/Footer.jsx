import { Box, Flex, Text, IconButton, Image, Link } from "@chakra-ui/react";
import {
  BsInstagram,
  BsLinkedin,
  BsWhatsapp,
  BsTelephoneFill,
  BsTwitter,
} from "react-icons/bs";
import { FaEnvelopeOpenText } from "react-icons/fa";
import logo from "../../public/logorotate.svg";
import instagram from "../Assets/instagram.gif";
import linkedin from "../Assets/linkedin.gif";
import twitter from "../Assets/twitter.gif";
import mail from "../Assets/mail.gif";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      as="footer"
      minH={"10vh"}
      py={4}
      px={{ base: 4, sm: 10}}
      className="bg-gradient-to-b from-[#6a75e4] to-[#5e6be6] py-10 text-white"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        wrap="wrap"
        gap={4}
      >
        {/* Copyright Text */}
        <Flex justifyContent={"center"}  px={{sm:4,md:8}} alignItems={"center"} gap={2}>
          <Image loading="lazy" src={logo} color={"white"} boxSize={75}></Image>{" "}
          <Text className="text-lg lg:text-xl" fontWeight="bold" textAlign="center">
            Copyright © {year} | Vikas Tiwari
          </Text>
        </Flex>

        {/* Contact Us Section */}
        <Flex
          direction="column"
          px={{sm:4,md:12}}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontSize="lg" fontWeight="semibold">
            Contact Us
          </Text>
          <Flex gap={2}>
            <BsTelephoneFill size={20} />
            <Link href="tel:+918090283850" fontSize="md">
              +91 8090283850
            </Link>
          </Flex>
          <Flex gap={2}>
            <FaEnvelopeOpenText size={20} />
            <Link href="mailto:vikastiwari809028@gmail.com" fontSize="md">
              vikastiwari809028@gmail.com
            </Link>
          </Flex>
        </Flex>

        {/* Social Media Icons */}
        <Flex px={{sm:4,md:12}} marginY={2} gap={4}>
          <Link
            href="https://www.instagram.com/_vikas.tiwari__?utm_source=qr&igsh=MXE2aDFudHNsbGU2eg=="
            isExternal
          >
            <Image loading="lazy"
              src={instagram}
              alt="Instagram"
              borderRadius="full"
              boxSize="3rem"
            />
          </Link>
          <Link href="https://x.com/vikas_tiwari80" isExternal>
            <Image loading="lazy"
              src={twitter}
              alt="Twitter"
               boxSize="3rem"
              borderRadius={"full"}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/vikas-tiwari-62a963238"
            isExternal
          >
            <Image loading="lazy"
              src={linkedin}
              alt="LinkedIn"
               boxSize="3rem"
              borderRadius={"full"}
            />
          </Link>

          <Link
            href="mailto:vikastiwari809028@gmail.com?subject=Query&body=Hello%20Vikas%2C%20I%20have%20a%20question..."
            isExternal
          >
            <Image loading="lazy"
              src={mail}
              alt="Mail"
              boxSize="3rem"
              borderRadius={"full"}
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
