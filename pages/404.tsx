import Link from "next/link"
import { useRouter } from "next/router"

const NotFound = () => {
  const router = useRouter()
  return (
    <div>
      <h1>No page found on path {router.asPath}</h1>
      <Link href={"/"}>
        <button>Back to home</button>
      </Link>
    </div>
  )
}

export default NotFound
