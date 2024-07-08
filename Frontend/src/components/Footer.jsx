import { Link } from "react-router-dom";
import FontAwesome from 'react-fontawesome';
import logo from '../images/logo2.png'; // Import the logo
import { isLoggedIn } from "../utils";

export default function Footer() {
    const request = new Request(window.location.href);
    const pathname = new URL(request.url).pathname;
  
   
      
  return (
    <footer>
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
                <h5>My Account</h5>
                <ul>
                    <li><Link to="/seetings">My Account</Link></li> 
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
                    <li><Link to="/track-order">Track Order</Link></li>
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
        </div>
    </footer>
  );
}
