import * as React from "react"
import { StoreContext } from "../context/store-context"
import Logo from "../icons/logo"
import { Navigation } from "./navigation"
import { CartButton } from "./cart-button"
import SearchIcon from "../icons/search"
import { Toast } from "./toast"
import {
  header,
  container,
  logo as logoCss,
  searchButton,
  nav,
} from "./header.module.css"
import {
  chakra,
  Link,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  ChakraProvider,
} from "@chakra-ui/react";
import {   AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";

export function Header() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)
  
  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <Box className={container}>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex maxW="1250px" alignItems="center" justifyContent="space-between" mx="auto">
        <Box display={{ base: "inline-flex", lg: "none" }}>
              <IconButton
                display={{ base: "flex", lg: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Logo />
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              Choc
            </chakra.h1>
          </Flex>
          <HStack display={{ base: "none", lg: "flex" }} alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              color="gray.600"
              fontWeight="bold"
              fontSize="md"
              display={{ base: "none", lg: "inline-flex" }}
            >
              <Button
                  bg={bg}
                  color="#585c5c"
                  fontWeight="bold"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: "cyan.500" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Blog
                </Button>
                <Button
                  bg={bg}
                  color="#585c5c"
                  fontWeight="bold"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: "cyan.500" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Blog
                </Button>
                <Button
                  bg={bg}
                  color="#585c5c"
                  fontWeight="bold"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: "cyan.500" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Blog
                </Button>
                <Button
                  bg={bg}
                  color="#585c5c"
                  fontWeight="bold"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: "cyan.500" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Blog
                </Button>
                <Button
                  as="a"
                  bg={bg}
                  color="#585c5c"
                  fontWeight="bold"
                  display="inline-flex"
                  alignItems="center"
                  href="/"
                  fontSize="md"
                  _hover={{ color: "cyan.500" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Blog
                </Button>
            </HStack>
          </HStack>
          <CartButton quantity={quantity} />
          <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          "Updating…"
        ) : (
          <>
            Added to cart{" "}
            <svg
              width="14"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                fill="#fff"
              />
              <path
                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                fill="#fff"
              />
              <path
                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                fill="#fff"
              />
            </svg>
          </>
        )}
      </Toast>
        </Flex>
      </chakra.header>
    </Box>
  )
}
