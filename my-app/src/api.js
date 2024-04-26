import articles from './articles.json';
import products from './products.json';

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

export function getArticles() {
    return articles;
  }
  export function getProducts() {
    return products;
  }
  

export function getLatestArticles() {
    return articles.filter(article => article.latest === true);
  }
  
export function getArticle(id) {
    console.log(id)
    for (let i = 0; i < articles.length; i++) {
        if (articles[i].id === id) {
            console.log(articles[i])
            return articles[i];
        }
    }
    return null;
}
export function getProduct(id) {
    console.log(id)
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            console.log(products[i])
            return products[i];
        }
    }
    return null;
}