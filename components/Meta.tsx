import Head from "next/head"

interface MetaOptions {
  title: string
  keywords: string
  description: string
}

Meta.defaultProps = {
  title: "boatsout",
  keywords: "boatrental, software, website, managment software, managing boats, boats, rental, boatsrental",
  description: "boatsout is a website where you can manage all your boats which are rented",
}

export default function Meta({ title, keywords, description }: MetaOptions) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  )
}
