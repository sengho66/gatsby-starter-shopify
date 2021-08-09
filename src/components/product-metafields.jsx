import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ComponentName = () => {
  const data = useStaticQuery(graphql`
    {
      shopifyProduct {
        metafields {
          namespace
          value
        }
      }
    }
  `)
  return <div>{JSON.stringify(data, null, 4)}</div>
}

export default ComponentName