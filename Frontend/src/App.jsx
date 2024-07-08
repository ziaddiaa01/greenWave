import './App.css'
import Layout  from './components/Layout';
import Home , { loader as homeLoader} from './pages/Home'
import Login , { loader as loginLoader, action as loginAction } from './pages/Login'
import Register , {action as signUpAction } from './pages/Register'
import ArticleDetail , { loader as articleDetailLoader} from './pages/ArticleDetail'
import Articles , { loader as articleLoader} from './pages/Articles'
import Shop , { loader as shopLoader} from './pages/Shop'
import ProductDetail , { loader as productDetailLoader} from './pages/ProductDetail'
import Books , { loader as booksLoader} from './pages/Books'
import BooksDetail , { loader as booksDetailLoader} from './pages/BooksDetail'
import Faqs , { loader as faqsLoader} from './pages/Faqs'
import Contact , {action as contactAction } from './pages/Contact'
import Courses , {loader as coursesLoader } from './pages/Courses'
import CourseDetail , { loader as courseDetailLoader} from './pages/CourseDetail'
import Terms from './pages/Terms'
import About from './pages/About'
import Waste, { loader as collectionLoader, action as collectionAction }from './pages/Waste'
import Gardening, { loader as gardeningLoader, action as gardeningAction }from './pages/Gardening'
import ShoppingCart, { loader as shoppingCartLoader }from './pages/ShoppingCart'
import Checkout, { loader as checkoutLoader, action as  checkoutAction }from './pages/Checkout'
import ConfirmEmail, {action as  confirmEmailAction }from './pages/ConfirmEmail'
import ChatBot from './pages/ChatBot'
import ThankYou from './pages/ThankYou'
import Settings from './pages/Settings'
import OrderHistory, {loader as  orderHistoryLoader }from './pages/OrderHistory'





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
      path="products" 
      element={<Shop />} 
      loader={shopLoader}
    />
    <Route 
      path="products/:id" 
      element={<ProductDetail />} 
      loader={productDetailLoader}
    />
    <Route 
      path="books" 
      element={<Books />} 
      loader={booksLoader}
    />
    <Route 
      path="books/:id" 
      element={<BooksDetail />} 
      loader={booksDetailLoader}
    />
    <Route 
      path="faqs" 
      element={<Faqs />} 
      loader={faqsLoader}
    />
    <Route 
      path="contact" 
      element={<Contact />} 
      action={contactAction}
    />
    <Route 
      path="courses" 
      element={<Courses />} 
      loader={coursesLoader}
    />
    <Route 
      path="courses/:id" 
      element={<CourseDetail />} 
      loader={courseDetailLoader}
    />
    <Route 
      path="terms" 
      element={<Terms />} 
    />
    <Route 
      path="about" 
      element={<About />} 
    />
    <Route 
      path="waste" 
      element={<Waste />}
      loader={collectionLoader}
      action={collectionAction}
    />
    <Route 
      path="gardening" 
      element={<Gardening />}
      loader={gardeningLoader}
      action={gardeningAction}
    />
    <Route 
      path="cart" 
      element={<ShoppingCart />}
      loader={shoppingCartLoader}
    />
    <Route 
      path="checkout" 
      element={<Checkout />}
      loader={checkoutLoader}
      action={checkoutAction}
    />
    <Route 
      path="confirm" 
      element={<ConfirmEmail />}
      action={confirmEmailAction}
    />
    <Route 
      path="chatbot" 
      element={<ChatBot />}
    />
    <Route 
      path="thanks" 
      element={<ThankYou />}
    />
    <Route 
      path="settings" 
      element={<Settings />}
    />
    <Route 
      path="orders" 
      element={<OrderHistory />}
      loader={orderHistoryLoader}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App
