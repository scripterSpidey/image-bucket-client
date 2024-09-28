import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424] text-white">
      <h1 className="text-brand-color text-9xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! Page not found</p>
      <p className="text-xl mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button asChild>
        <Link to="/">
          Go back home
        </Link>
      </Button>
    </div>
  )
}