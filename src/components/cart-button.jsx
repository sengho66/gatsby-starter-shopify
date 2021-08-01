import * as React from "react"
import { Link } from "gatsby"
import CartIcon from "../icons/cart"
import { cartButton, badge } from "./cart-button.module.css"
import { LineItemSide } from "../components/line-item-side"
import { StoreContext } from "../context/store-context"
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
                <DrawerHeader marginBottom="-13px" paddingLeft="19px" paddingBottom="0" paddingRight="19px" paddingTop="5px" alignItems="center" justifyContent="space-between" display="flex"><Heading lineHeight="1.1" as="h2" fontSize="1.25rem">Your Cart{quantity}</Heading>
                <DrawerCloseButton position="unset" />
                </DrawerHeader>      
                <DrawerBody paddingLeft="19px" paddingRight="19px" size="sm">
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
                <Table borderBottom="1px" borderColor="gray.100" size="sm">
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
      
                <DrawerFooter>
                {emptyCart ? (
                  <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                  ) : (
                <>
                <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Save
                  </Button>
                </>
      )}                  
                </DrawerFooter>
                
              </DrawerContent>
            </Drawer>
            </>
  )
}
