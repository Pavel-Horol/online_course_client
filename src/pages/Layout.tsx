import { FC } from "react"
import { Outlet } from "react-router-dom"

const Layout:FC = () => {
  return <>
    <div className="flex flex-col min-h-screen bg-ba">
      <header className="bg-background-secondary p-4 rounded-md m-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Header</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-background-secondary p-4 rounded-md m-4 text-center">
        <div className="container mx-auto">
          <p className="text-center">Footer</p>
        </div>
      </footer>
    </div>
  </> 
}

export default Layout