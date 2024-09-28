import { RouterProvider } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { Toaster } from "react-hot-toast"
function App() {

  return (
    <>
      <RouterProvider router={AppRoutes}></RouterProvider>
      <Toaster position="top-center"/>
    </>
  )
}

export default App
