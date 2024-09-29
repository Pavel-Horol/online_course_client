import { useContext, useEffect, useState } from 'react'
import './App.css'
import  LoginForm  from './components/LoginForm'
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([]) 
  async function getUsers(){
    try{
      const response = await UserService.fetchUsers()
      setUsers(response.data);
     }catch(e) {
    console.log('error', e)
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store]);
 
  if (store.isLoading) {
    return <div>Loading...</div>
  }

 if(!store.isAuth){
    return (
      <LoginForm/>
    )
 } 

  return (
    <div>
      <h1>{store.isAuth ? `User is authorized using ${store.user.email}` : 'Please authorize'}</h1>
      <h1>{store.user.isActivated ? 'Account is activated' : 'Activate account'}</h1>
      <button onClick={store.logout}>Logout</button>
      <div>
        <button
          onClick={getUsers}
        >
          Get users
        </button>
        {users.map(user => 
          <div key={user.email}>{user.email}</div>
        )}
      </div>
    </div>
  )
}

export default observer(App) 