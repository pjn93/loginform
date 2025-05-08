import Login from './auth/Login';
import { Toaster } from 'react-hot-toast'


function App() {

  return (
      <div>
        <Login/>
        <Toaster position="bottom-left" toastOptions={{ duration: 5000 }} />
      </div>
  )
}

export default App
