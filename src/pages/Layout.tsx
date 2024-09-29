import { FC } from "react"
import { Outlet } from "react-router-dom"

const Layout:FC = () => {
  return <>
    <header>Header</header>
    <main>
    <Outlet/>
    </main>
    <footer>Footer</footer>
  </> 
}

export default Layout