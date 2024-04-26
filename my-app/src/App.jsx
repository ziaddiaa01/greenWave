import './App.css'
import Layout  from './components/Layout';
import Home , { loader as homeLoader} from './pages/Home'
import Login , { loader as loginLoader, action as loginAction } from './pages/Login'
import Register , {action as signUpAction } from './pages/Register'
import ArticleDetail , { loader as articleDetailLoader} from './pages/ArticleDetail'
import Articles , { loader as articleLoader} from './pages/Articles'
import Shop , { loader as shopLoader} from './pages/Shop'
import Product , { loader as productLoader} from './pages/Product'



import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index
           element={<Home />}
           loader={homeLoader}
    />
    <Route path="login"
           element={<Login />}
           loader={loginLoader}
           action={loginAction}
    />
    <Route path="signup"
           element={<Register />}
           action={signUpAction}
    />
    <Route 
      path="articles" 
      element={<Articles />} 
      loader={articleLoader}
    />
    <Route 
      path="articles/:id" 
      element={<ArticleDetail />} 
      loader={articleDetailLoader}
    />
    <Route 
      path="shop" 
      element={<Shop />} 
      loader={shopLoader}
    />
    <Route 
      path="product/:id" 
      element={<Product />} 
      loader={productLoader}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App
