import articles from './articles.json';
import products from './products.json';
import books from './books.json';
import faqs from './faqs.json';
import courses from './courses.json';
import appointemts from './collection_appointments.json';
import gardening_appointemts from './Gardening_appointments.json';
import users from './user_test.json'
import orders from './orders.json'


export async function loginUser({ email, password }) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy authentication logic
    if (email === 'test@example.com' && password === 'password') {
        return 'dummyAccessToken'; // Return a dummy access token on successful login
    } else {
        throw new Error('Invalid email or password'); // Throw an error for invalid credentials
    }
}

// Dummy signupUser function
export async function signupUser({ email, password }) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy user creation logic
    // For simplicity, assume all signups are successful and return a dummy access token
    return 'dummyAccessToken'; // Return a dummy access token on successful signup
}

export async function sendFeedback({name,email,subject,message}) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // if send return ok else not ok

    return 'ok'; 
}

export async function setCollectionAppointment({ type, weight, location, photo, appointment}) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'dummy'; // Return a dummy access token on successful signup
}
export async function setGardeningAppointment({ name,email,phone, address, service_type , appointemt}) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'dummy'; // Return a dummy access token on successful signup
}

export function getArticles() {
    return articles;
  }
  export function getProducts() {
    return products;
  }

  export function getCourses() {
    return courses;
  }

  export function getBooks() {
    return books;
  }
  export function getFaqs() {
    return faqs;
  }
  
  

export function getLatestArticles() {
    return articles.filter(article => article.latest === true);
  }

  export function getAvailableAppointments() {
    return appointemts.filter(appointemt => appointemt.is_free === true);
  }
  export function getAvailableGardeningAppointments(service_type) {
    return gardening_appointemts.filter(appointemt => appointemt.type_of_service === service_type && appointemt.is_free === true);
  }
  export function getUserShoppingCart(userID) {
    const user = users.find(user => user.id === userID);
    return user ? user.cartItems : [];
  }
  export async function processCheckout(checkoutData) {
    // Simulate an API call with a delay to mock async behavior
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Assuming successful processing here, you can modify as needed
        console.log('Processing checkout:', checkoutData);
        resolve({ success: true, message: 'Checkout processed successfully' });
      }, 1000); // Simulate a delay of 1 second (1000 ms)
    });
  }
  export async function submitOrderSummary(orderData) {
    const respone = { "status" : 200}
    return respone
  }
  export async function submitPayment(paymentData) {
    const respone = { "status" : 200}
    return respone
  }

  export async function getOrderInfo(userID) {
    return orders.filter(order => order.userID=== userID);
  }
export function getArticle(id) {
    for (let i = 0; i < articles.length; i++) {
        if (articles[i].id === id) {
            return articles[i];
        }
    }
    return null;
}
export function getProduct(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return products[i];
        }
    }
    return null;
}
export function addItemToCart(userID, itemID) {
    const respone = { "status" : 200}
    return respone
}
export function removeItemCompletelyFromCart(userID, itemID) {
    const respone = { "status" : 200}
  return respone
}

export function removeItemFromCart(userID, itemID) {
    const respone = { "status" : 200}
    return respone
}
export function getCourse(id) {
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === id) {
            return courses[i];
        }
    }
    return null;
}


export function getBook(id) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            return books[i];
        }
    }
    return null;
}