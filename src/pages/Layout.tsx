import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { FC } from "react"
import { Outlet} from "react-router-dom"

const Layout:FC = () => {
  return <>
    <div className="flex flex-col min-h-screen bg-ba">
      <Header/>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  </> 
}

export default Layout