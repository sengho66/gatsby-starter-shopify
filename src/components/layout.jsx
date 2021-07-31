import * as React from "react"
import { SkipNavContent, SkipNavLink } from "./skip-nav"
import { Header } from "./header"
import { Footer } from "./footer"
import { Seo } from "./seo"
import { ChakraProvider } from "@chakra-ui/react"


export function Layout({ children }) {
  return (
    <ChakraProvider>

    <div>
      <Seo />
      <SkipNavLink />
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
    </ChakraProvider>
  )
}
