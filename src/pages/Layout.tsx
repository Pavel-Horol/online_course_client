import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { checkAuthUser } from "@/store/slices/userSlice"
import { RootState, useAppDispatch } from "@/store/store"
import { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

const Layout:FC = () => {
  const {isAuth} = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()  
 const dispatch = useAppDispatch()
 useEffect(() => {
  dispatch(checkAuthUser()) 
  if(!isAuth) {
    navigate('/auth')
  }
 }, [isAuth, navigate]); 
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