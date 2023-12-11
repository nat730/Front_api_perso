import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Connexion from './routes/Connexion'
import Home from './routes/Home'
import Inscription from './routes/inscription'

const router = createBrowserRouter([
  {
    path: '/connexion',
    element: <Connexion />,
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path:'/register',
    element: <Inscription />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
