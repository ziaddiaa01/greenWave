import articles from './articles.json';
import products from './products.json';
import books from './books.json';
import faqs from './faqs.json';
import courses from './courses.json';




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