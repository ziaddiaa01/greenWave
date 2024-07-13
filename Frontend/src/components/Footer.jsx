import { Link } from "react-router-dom";
import FontAwesome from 'react-fontawesome';
import logo from '../images/logo2.png'; // Import the logo
import { isLoggedIn } from "../utils";
import { useEffect , useState } from "react";
import { getUserData } from "../api";
export default function Footer() {

    const [userData, setUserData] = useState({});

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userInfo = await getUserData();
          if (userInfo) {
            setUserData(userInfo.user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, []);
    const request = new Request(window.location.href);
    const pathname = new URL(request.url).pathname;
    
    const isAdmin = userData.role === "Admin";

      
  return (
    <footer>
        {isAdmin ? (
            <>
            <div className="footer-content">
            <div  className="left-side">
                <div className="logo">
                    <img src={logo} alt="Logo" /> {/* Use the imported logo */}
                    <h3>GreenWave</h3>
                </div>
                <p>Create an account today, and let's embark on a journey towards a more eco-conscious lifestyle. Together, we can make a positive impact on our planet.</p>
                <h6>GreenWave@gmail.com</h6>
            </div>
            <div  className="right-side">
                <h5>Helps</h5>
                <ul>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/faqs">Faqs</Link></li>
                    <li><Link to="/terms">Terms & Condition</Link></li>
                </ul>
            </div>
            <div  className="right-side">
                <h5>Proxy</h5>
                <ul>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
            <div  className="right-side">
                <h5>Our Items</h5>
                <ul>
                    <li><Link to="/all-books">Books</Link></li>
                    <li><Link to="/all-courses">Courses</Link></li>
                    <li><Link to="/all-articles">Articles</Link></li>
                    <li><Link to="/all-products">Products</Link></li>

                </ul>
            </div>
            
        </div>
        <div className="footer-end">
            <p>GreenWave eCommerce © 2024. All Rights Reserved</p>
            <div className="payment-icons">
                <FontAwesome name="fa-brands fa-cc-apple-pay" />
                <FontAwesome name="fa-brands fa-cc-visa" />
                <FontAwesome name="fa-brands fa-cc-discover" />
                <FontAwesome name="fa-brands fa-cc-mastercard" />
                <FontAwesome name="fa-brands fa-cc-amazon-pay" />
            </div>
        </div> </> ) : ( <> <div className="footer-content">
            <div  className="left-side">
                <div className="logo">
                    <img src={logo} alt="Logo" /> {/* Use the imported logo */}
                    <h3>GreenWave</h3>
                </div>
                <p>Create an account today, and let's embark on a journey towards a more eco-conscious lifestyle. Together, we can make a positive impact on our planet.</p>
                <h6>GreenWave@gmail.com</h6>
            </div>
            <div  className="right-side">
                <h5>My Account</h5>
                <ul>
                    <li><Link to="/settings">My Account</Link></li> 
                    <li><Link to="/orders">Order History</Link></li>
                    <li>
                        <Link to={isLoggedIn() ? "/cart" : `/login?message=You must log in first.&redirectTo=${pathname}` }>
                    Shopping Cart
                    </Link>
                    </li>
                </ul>
            </div>
            <div  className="right-side">
                <h5>Helps</h5>
                <ul>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/faqs">Faqs</Link></li>
                    <li><Link to="/terms">Terms & Condition</Link></li>
                </ul>
            </div>
            <div  className="right-side">
                <h5>Proxy</h5>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/products">Shop</Link></li>
                </ul>
            </div>
            <div  className="right-side">
                <h5>Educational resources</h5>
                <ul>
                    <li><Link to="/books">Books</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/articles">Articles</Link></li>
                </ul>
            </div>
            
        </div>
        <div className="footer-end">
            <p>GreenWave eCommerce © 2024. All Rights Reserved</p>
            <div className="payment-icons">
                <FontAwesome name="fa-brands fa-cc-apple-pay" />
                <FontAwesome name="fa-brands fa-cc-visa" />
                <FontAwesome name="fa-brands fa-cc-discover" />
                <FontAwesome name="fa-brands fa-cc-mastercard" />
                <FontAwesome name="fa-brands fa-cc-amazon-pay" />
            </div>
        </div> </>)}
        
    </footer>
  );
}
