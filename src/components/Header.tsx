import { useSelector } from "react-redux"
import Logout from "./Logout"
import { RootState } from "@/store/store"

const Header = () => {
  const {isAuth} = useSelector((state:RootState) => state.user)  
  return (
      <header className="bg-background-secondary p-4 rounded-md m-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Header</h1>
        {isAuth && 
          <Logout/>
        }
        </div>
      </header>
  )
}

export default Header


{/* 
import { checkAuthUser } from "@/store/slices/userSlice"
const dispatch = useAppDispatch()
<button
  className="px-4 py-2 bg-accent rounded-md" 
  onClick={() => {
    dispatch(checkAuthUser())
  }}
>
  refresh
</button> */}