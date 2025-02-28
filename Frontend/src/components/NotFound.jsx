import { Link } from "react-router-dom"
import { Button } from "./ui/button"

function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
      <Link to="/">
        <Button>Return to Blog List</Button>
      </Link>
    </div>
  )
}

export default NotFound

