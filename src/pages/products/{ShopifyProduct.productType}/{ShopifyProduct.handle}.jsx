import * as React from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "../../../components/layout"
import isEqual from "lodash.isequal"
import { ProductReviews } from "../../../components/product-reviews"
import { SuggestListing } from "../../../components/suggest-listing"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { StoreContext } from "../../../context/store-context"
import { AddToCart } from "../../../components/add-to-cart"
import { NumericInput } from "../../../components/numeric-input"
import { formatPrice } from "../../../utils/format-price"
import { Seo } from "../../../components/seo"
import { Tabs, TabList, Tab, TabPanels, TabPanel, Text, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { CgChevronRight as ChevronIcon } from "react-icons/cg"
import { ChevronRightIcon } from '@chakra-ui/icons'
import { ComponentName } from "../../../components/product-metafields"
import {
  productBox,
  container,
  header,
  productImageWrapper,
  productImageList,
  productImageListItem,
  scrollForMore,
  noImagePreview,
  optionsWrapper,
  priceValue,
  selectVariant,
  labelFont,
  breadcrumb,
  tagList,
  addToCartStyle,
  metaSection,
  productDescription,
} from "./product-page.module.css"

export default function Product({ data: { product, suggestions, ratings, reviews } }) {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    slug,
    title,
    description,
    metafields,
    yotpoProductBottomline,
    allYotpoProductReview,
    images,
    images: [firstImage],
  } = product
  const { client } = React.useContext(StoreContext)

  const [variant, setVariant] = React.useState({ ...initialVariant })
  const [quantity, setQuantity] = React.useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale
  )

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleOptionChange = (index, event) => {
    const value = event.target.value

    if (value === "") {
      return
    }

    const currentOptions = [...variant.selectedOptions]

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions)
    })

    setVariant({ ...selectedVariant })
  }

  React.useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0
  const hasMultipleImages = true || images.length > 1

  return (
    <Layout>
      {firstImage ? (
        <Seo
          title={title}
          description={description}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
      <div className={container}>
      <Box>
      <Breadcrumb paddingBottom="1.3rem" fontSize="15px" spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
                  <BreadcrumbLink _hover={{color: "cyan.500",}} href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink _hover={{color: "cyan.500",}} href="/products/">Products</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                <BreadcrumbLink _hover={{color: "cyan.500",}} href={product.productTypeSlug}>{product.productType}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink _hover={{textDecoration: "none"}} cursor="">{title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              </Box>
        <div className={productBox}>
          {hasImages && (
            <div className={productImageWrapper}>
              <div
                role="group"
                aria-label="gallery"
                aria-describedby="instructions"
              >
                <ul className={productImageList}>
                  {images.map((image, index) => (
                    <li
                      key={`product-image-${image.id}`}
                      className={productImageListItem}
                    >
                      <GatsbyImage
                        objectFit="contain"
                        loading={index === 0 ? "eager" : "lazy"}
                        alt={
                          image.altText
                            ? image.altText
                            : `Product Image of ${title} #${index + 1}`
                        }
                        image={image.gatsbyImageData}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {hasMultipleImages && (
                <div className={scrollForMore} id="instructions">
                  <span aria-hidden="true">←</span> scroll for more{" "}
                  <span aria-hidden="true">→</span>
                </div>
              )}
            </div>
          )}
          {!hasImages && (
            <span className={noImagePreview}>No Preview image</span>
          )}
          <div>
            <h1 className={header}>{title}</h1>
            <h2 className={priceValue}>
              <span>{price}</span>
            </h2>
            <span>{ratings.productIdentifier}</span>
            {metafields.map(({ namespace, value }) => (
              <li>{namespace}
                <span>{value}</span>
              </li>
            ))}

            <Box maxWidth="max-content" bg="blue.200" w="100%" p={4} color="white" fontWeight="semibold">
              33 users have been eyeing this product!
            </Box>
            <p className={productDescription}>{description}</p>
            <fieldset className={optionsWrapper}>
              {hasVariants &&
                options.map(({ id, name, values }, index) => (
                  <div className={selectVariant} key={id}>
                    <select
                      aria-label="Variants"
                      onChange={(event) => handleOptionChange(index, event)}
                    >
                      <option value="">{`Select ${name}`}</option>
                      {values.map((value) => (
                        <option value={value} key={`${name}-${value}`}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </fieldset>
            <div className={addToCartStyle}>
              <NumericInput
                aria-label="Quantity"
                onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                value={quantity}
                min="1"
                max="20"
              />
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
          </div>
        </div>
        <Box>
            <Tabs>

              <TabList justifyContent="center">
                            {metafields.map(({ namespace, value }) => (

                <Tab>{namespace}</Tab>
                ))}

                </TabList>
                <TabPanels display="flex" justifyContent="center">
                {metafields.map(({ namespace, value }) => (

                <TabPanel>
                <Box dangerouslySetInnerHTML={{ __html: value }}></Box>
                </TabPanel>
                                          ))}

              </TabPanels>
            </Tabs>
                        </Box>
        <div>
        <h1 className={title}>You May Also Like</h1>
        <SuggestListing products={suggestions.nodes} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      metafields {
        namespace
        value
      }
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 20
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
    ratings: yotpoProductBottomline {
      totalReviews
      score
    }
    reviews: allYotpoProductReview {
      nodes {
        productIdentifier
        title
        score
        sentiment
        votesUp
        votesDown
        createdAt
        name
        reviewerType
      }
    }
  }
`
