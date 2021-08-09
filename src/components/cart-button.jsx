import * as React from "react"
import { Link } from "gatsby"
import CartIcon from "../icons/cart"
import { cartButton, badge, badge1 } from "./cart-button.module.css"
import { LineItemSide } from "../components/line-item-side"
import { StoreContext } from "../context/store-context"
import { formatPrice } from "../utils/format-price"
import { Table,
  Thead,
  Heading,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  useBreakpointValue,
  DrawerCloseButton,
  Input,
  DrawerFooter,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Button,
  Box,
  ChakraProvider,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Spacer } from "@chakra-ui/react"

export function CartButton({ quantity }) {
  const size = useBreakpointValue({base: 'sm', md: 'sm'})
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0
  
  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }
  return (
    <>
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      onClick={onOpen}
      to="#"
      className={cartButton}
    >
      <CartIcon />
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </Link>
              <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
              size={size}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader marginBottom="-13px" paddingLeft="22px" paddingBottom="0" paddingRight="22px" paddingTop="5px" alignItems="center" justifyContent="space-between" display="flex">
                  <Box position="relative">
                    <Heading fontWeight="600" color="cyan.600" lineHeight="1.1" as="h2" fontSize="1.25rem">Your Cart</Heading>
                    <div className={badge1}>{quantity}</div>
                  </Box>                
                <DrawerCloseButton _focus="none" _active="none" position="unset" />
                </DrawerHeader>      
                <DrawerBody paddingLeft="22px" paddingRight="22px" size="sm">
                {emptyCart ? (
                  <div>
                    <h1>Your cart is empty</h1>
                    <p>
                    Looks like you haven’t found anything yet. We understand that
                    sometimes it’s hard to chose — maybe this helps:
                    </p>
                    <Link to="/search?s=BEST_SELLING">
                    View trending products
                    </Link>
                    </div>
                  ) : (
                <>  
                <Table size="sm">
        <Thead>
          <Tr>
            <Th paddingLeft="0"></Th>
            <Th textAlign="right" paddingRight="0" paddingLeft="0"></Th>
          </Tr>
        </Thead>
        <Tbody>
        {checkout.lineItems.map((item) => (
                        <LineItemSide item={item} key={item.id} />
                      ))}
      
        </Tbody>
      
      </Table>
      
      </>
      )}
                </DrawerBody>
      
                <DrawerFooter borderTop="1px" borderColor="gray.100" paddingLeft="22px" paddingRight="22px" flexDirection="column">
                {emptyCart ? (
                  <Button _active="none" _focus="none" _hover={{bgGradient: "linear(to-r, cyan.700,cyan.700)",}} fontWeight="600" height="48px" textTransform="uppercase" bgGradient="linear(to-r, cyan.600,cyan.700)" color="#fff" marginBottom="12px" target="/cart" padding="0" width="100%" onClick={onClose} variant="outline">
                  Continue Shopping
                </Button>
                  ) : (
                <>
                <Box width="100%">
                <Box marginBottom="32px" display="inline-flex" justifyContent="space-between" width="100%">
                  <Box width="100%" textAlign="left">
                  <Text fontWeight="600" color="cyan.600" fontSize="1.3em">
                    Subtotal
                  </Text>
                  </Box>
                  <Spacer />
<Box width="100%" textAlign="right">
                  <Text fontWeight="600" color="cyan.600" fontSize="1.3em">
                  {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </Text>
                  </Box>
                </Box>
                </Box>
                <Button _active="none" _focus="none" _hover={{bgGradient: "linear(to-r, yellow.400,yellow.400)",}} fontWeight="600" height="48px" textTransform="uppercase" bgGradient="linear(to-r, yellow.300,yellow.400)" marginBottom="4px" padding="0" width="100%" variant="outline" disabled={loading} onClick={handleCheckout}>
                    Checkout
                  </Button>
                  <Box marginBottom="4px" height="35px" width="100%">
                    <Link to="/cart">
                  <Button _active="none" _focus="none" _hover={{bgGradient: "linear(to-r, cyan.700,cyan.700)",}} fontWeight="600" height="35px" textTransform="uppercase" bgGradient="linear(to-r, cyan.600,cyan.700)" color="#fff" target="/cart" padding="0" width="100%" variant="outline">
                    Cart
                  </Button>
                  </Link>
                  </Box>
                  <Button _active="none" _focus="none" _hover={{bgGradient: "linear(to-r, cyan.700,cyan.700)",}} fontWeight="600" height="48px" textTransform="uppercase" bgGradient="linear(to-r, cyan.600,cyan.700)" color="#fff" marginBottom="12px" target="/cart" padding="0" width="100%" onClick={onClose} variant="outline">
                    Continue Shopping
                  </Button>
                </>
      )}                  
                </DrawerFooter>
                
              </DrawerContent>
            </Drawer>
            </>
  )
}
