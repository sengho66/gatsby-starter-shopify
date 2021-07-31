import * as React from "react"
import debounce from "lodash.debounce"
import { StoreContext } from "../context/store-context"
import { formatPrice } from "../utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import DeleteIcon from "../icons/delete"
import { Spacer, CloseButton, Text, Box, Heading, Flex, ChakraProvider } from "@chakra-ui/react"

import { NumericInput } from "./numeric-input"
import {
  title,
  remove,
  cartTd,
  cartTr,
  cartTdz,
  variant,
  totals,
  priceColumn,
} from "./line-item.module.css"

export function LineItemSide({ item }) {
  const {
    removeLineItem,
    checkout,
    updateLineItem,
    loading,
  } = React.useContext(StoreContext)
  const [quantity, setQuantity] = React.useState(item.quantity)

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  }
  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount)
  )

  const subtotal = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount) * quantity
  )

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  const handleQuantityChange = (value) => {
    if (value !== "" && Number(value) < 1) {
      return
    }
    setQuantity(value)
    if (Number(value) >= 1) {
      debouncedUli(value)
    }
  }

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1)
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1)
  }

  const image = React.useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        crop: "contain",
        width: 42,
        height: 42,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variantImage.src]
  )

  return (
    <ChakraProvider>
    <tr className={cartTr}>
      <td className={cartTd}>
      <Flex alignItems="end" align="center">
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
        <Box display="block">
        <Heading lineHeight="1.1" as="h2" fontSize="1.25rem">{item.title}</Heading>
        <Box>
        <Text fontSize="0.95rem">
          {item.variant.title === "Default Title" ? "" : item.variant.title}, {price}
        </Text>
        </Box>
        </Box>

        </Flex>
      </td>
      <td className={cartTdz}>
      <NumericInput
          disabled={loading}
          value={quantity}
          aria-label="Quantity"
          onIncrement={doIncrement}
          onDecrement={doDecrement}
          onChange={(e) => handleQuantityChange(e.currentTarget.value)}
        />         
</td>
      <td className={cartTd}>
      <Box margin="auto" marginRight="0" maxWidth="47px" minHeight="42px" display="flex" bg="var(--input-background)">
          <CloseButton margin="auto" onClick={handleRemove}>
          
          </CloseButton>
        </Box>
      </td>
    </tr>
    </ChakraProvider>
  )
}