import * as React from "react"
import { Link } from "gatsby"
import CartIcon from "../icons/cart"
import { cartButton, badge } from "./cart-button.module.css"
import { LineItemSide } from "../components/line-item-side"
import { StoreContext } from "../context/store-context"
import { Table,
  Thead,
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
                <DrawerCloseButton />
                <DrawerHeader>Your Cart</DrawerHeader>
      
                <DrawerBody size="sm">
                <Table borderBottom="1px" borderColor="gray.100" size="sm">
        <Thead>
          <Tr>
            <Th paddingLeft="0">Product</Th>
            <Th textAlign="center" paddingLeft="12px" paddingRight="0">Qty.</Th>
            <Th textAlign="right" paddingRight="0" paddingLeft="0">Remove</Th>
          </Tr>
        </Thead>
        <Tbody>
        {checkout.lineItems.map((item) => (
                        <LineItemSide item={item} key={item.id} />
                      ))}
      
        </Tbody>
      
      </Table>
                </DrawerBody>
      
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            </>
  )
}
