import articles from "./articles.json";
import products from "./products.json";
import books from "./books.json";
import faqs from "./faqs.json";
import courses from "./courses.json";
import appointemts from "./collection_appointments.json";
import gardening_appointemts from "./Gardening_appointments.json";
import users from "./user_test.json";
import orders from "./orders.json";

export async function loginUser({ email, password }) {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const data = await response.json();
  return data;
}

export async function signupUser({
  firstName,
  lastName,
  email,
  password,
  phone,
  DOB,
}) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password, phone, DOB }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
}

export async function confirmEmail({ email, code }) {
  const response = await fetch("/api/auth/confirm-email", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Email confirmation failed");
  }

  return data;
}

export async function getUserData() {
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";
  const response = await fetch("/api/auth/getuser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `${BEARER_KEY}${token}`
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "User data fetch failed");
  }
  return data;
}

export async function sendFeedback({ name, email, subject, message }) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // if send return ok else not ok

  return "ok";
}

export async function setCollectionAppointment({
  wasteType,
  amount,
  date,
  time,
  location,
}) {
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";
    const response = await fetch("/api/waste-collection/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${BEARER_KEY}${token}`
      },
      body: JSON.stringify({ wasteType, amount, date, time, location }),
    });

    console.log(response)
    return response ;
}





export async function setGardeningAppointment({userId, name, phone, address, greeningType, date, time}) {
  console.log(userId)
    const response = await fetch("/api/urban-greening/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, name, phone, address, greeningType, date, time }),
    });

    console.log(response)
    return response ;
}



export async function getArticles() {
  const response = await fetch("/api/article/getAllArticles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Article fetch failed");
  }
  return data;
}
export async function createOrder(orderData) {
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";
  const response = await fetch("/api/order/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `${BEARER_KEY}${token}`
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data || "Order creation failed");
  }
  return data;
}


export async function getProducts() {
  const response = await fetch("/api/product/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Products fetch failed");
  }
  return data;
}

export async function getOrders() {
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";
  const response = await fetch("/api/order/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `${BEARER_KEY}${token}`
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Orders fetch failed");
  }
  return data;
}



export async function getBooks() {
  const response = await fetch("/api/book/getall", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Books fetch failed");
  }
  return data;
}

export async function getCourses() {
  const response = await fetch("/api/course/allCourses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Courses fetch failed");
  }
  return data;
}


export function getFaqs() {
  return faqs;
}

export function getLatestArticles() {
  return articles.filter((article) => article.latest === true);
}

export function getAvailableAppointments() {
  return appointemts.filter((appointemt) => appointemt.is_free === true);
}
export function getAvailableGardeningAppointments(service_type) {
  return gardening_appointemts.filter(
    (appointemt) =>
      appointemt.type_of_service === service_type && appointemt.is_free === true
  );
}
export async function processCheckout(checkoutData) {
  // Simulate an API call with a delay to mock async behavior
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Assuming successful processing here, you can modify as needed
      console.log("Processing checkout:", checkoutData);
      resolve({ success: true, message: "Checkout processed successfully" });
    }, 1000); // Simulate a delay of 1 second (1000 ms)
  });
}

export async function submitOrderSummary(orderData) {
  const respone = { status: 200 };
  return respone;
}

export async function submitPayment(paymentData) {
  const respone = { status: 200 };
  return respone;
}

export async function getOrderInfo(userID) {
  return orders.filter((order) => order.userID === userID);
}


export async function getProduct({id}) {
  const response = await fetch(`/api/product/getbyid/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Product fetch failed");
  }
  return data;
}

export async function getBook({id}) {
  const response = await fetch(`/api/book/getById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Book fetch failed");
  }
  return data;
}

export async function getArticle({id}) {
  const response = await fetch(`/api/article/getById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Article fetch failed");
  }
  return data;
}

export async function getUserShoppingCart() {
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";
  const response = await fetch(`/api/cart/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${BEARER_KEY}${token}`, // Include the token in the headers
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Cart fetch failed");
  }
  return data;
}


// api.js
export async function addItemToCart({productId, bookId, courseId, quantity}) {
  try {
    const token = localStorage.getItem("accessToken");
    const BEARER_KEY = "Test_";

    const response = await fetch(`/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${BEARER_KEY}${token}`, // Prepend BEARER_KEY
      },
      body: JSON.stringify({ productId, bookId, courseId, quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add item to cart');
    }

    const data = await response.json();
    return data; // Assuming the server responds with a message or confirmation
  } catch (error) {
    console.error('Error:', error);
    throw error; // Propagate the error for handling in your component
  }
}



export async function removeItemFromCart({productId, bookId, courseId}) {
  try {
    const id = productId || bookId || courseId;
    const token = localStorage.getItem("accessToken");
    const BEARER_KEY = "Test_";

    const response = await fetch(`/api/cart/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${BEARER_KEY}${token}`, // Include the token in the headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to remove item from cart');
    }

    const data = await response.json();
    return data; // Assuming the server responds with a message or confirmation
  } catch (error) {
    console.error('Error:', error);
    throw error; // Propagate the error for handling in your component
  }
}

export async function getCourse({id}) {
  const response = await fetch(`/api/course/getById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Course fetch failed");
  }
  return data;
}

export async function getOrderById({id}) {
  const response = await fetch(`/api/order/getbyid/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "order fetch failed");
  }
  console.log(data)
  return data;
}


export async function logout() {
  try {
    const token = localStorage.getItem("accessToken");
    const BEARER_KEY = "Test_";
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }


    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `${BEARER_KEY}${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message); // Throw an error if the response status is not OK
    }
    
    const data = await response.json();
    console.log(data.message); // Logged out successfully
    return response; // Return the entire response object
  } catch (error) {
    console.error('Logout failed:', error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
export async function sendCode({email}) {
  try {
    const response = await fetch("/api/auth/send-code", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Sending code failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error sending code:", error.message);
    throw error;
  }
}

export async function resetPassword({email, code, newPassword}) {
  try {
    const response = await fetch("/api/auth/reset-pass", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code, password: newPassword }),
    });

    if (!response.ok) {
      throw new Error("Resetting password failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error resetting password:", error.message);
    throw error;
  }
}

export async function changePassword({oldPassword, newPassword}) {
  try {
    const token = localStorage.getItem("accessToken");
    const BEARER_KEY = "Test_";
    const response = await fetch("/api/auth/change-pass", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${BEARER_KEY}${token}`,
      },
      body: JSON.stringify({ oldpass: oldPassword, newpass: newPassword }),
    });

    if (!response.ok) {
      throw new Error("Changing password failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error changing password:", error.message);
    throw error;
  }
}
export async function softDeleteUser() {
  try {
    const token = localStorage.getItem("accessToken");
    const BEARER_KEY = "Test_";
    const response = await fetch("/api/auth/soft-del", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${BEARER_KEY}${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Soft delete failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error during soft delete:", error.message);
    throw error;
  }
}
export async function updateUser(userData) {
  try {
    const token = localStorage.getItem("accessToken");
    const BEARER_KEY = "Test_";
    const response = await fetch("/api/auth/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${BEARER_KEY}${token}`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Updating user failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
}
export async function cancelOrder({ cancelingOrderId, cancelReason }) {
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";
  const response = await fetch(`/api/order/cancel/${cancelingOrderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${BEARER_KEY}${token}`,
    },
    body: JSON.stringify({cancelReason}), // Ensure cancelReason is not wrapped in extra quotes
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Order cancel failed");
  }
  return data;
}

export async function redeem() {
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";
  const response = await fetch(`/api/coupon/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${BEARER_KEY}${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "redeem points failed");
  }
  return data;
}

export async function addProduct({ name, description, stock, price, discount, categoryId, brandId, image }) {
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("stock", stock);
  formData.append("price", price);
  formData.append("discount", discount);
  formData.append("categoryId", categoryId);
  formData.append("brandId", brandId);
  formData.append("image", image); // Assuming "imageFile" is the actual file input
  console.log("Image File:", image);
  const response = await fetch("/api/product/add", {
      method: "POST",
      headers: {
          "Authorization": `${BEARER_KEY}${token}`,
      },
      body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
      throw new Error(data.message || "Product addition failed");
  }
  return data;
}

export async function addArticle({ title, content, author }) {
  const response = await fetch("/api/article/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, author }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Article addition failed");
  }
  return data;
}

export async function addBook({ name, author, price, stock, description }) {
  const response = await fetch("/api/book/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, author, price, stock, description }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Book addition failed");
  }
  return data;
}

export async function addCourse({ name, instructor, price, description }) {
  const response = await fetch("/api/course/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, instructor, price, description }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Course addition failed");
  }
  return data;
}


export async function addReview({productId , bookId , courseId , articleId, comment}) {
  
  const token = localStorage.getItem("accessToken");
  const BEARER_KEY = "Test_";
  const response = await fetch(`/api/review/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${BEARER_KEY}${token}`,
    },
    body: JSON.stringify({ productId , bookId , courseId , articleId, comment }),
  });
  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    throw new Error(data.msgError || "add review  failed");
  }
  return data;
}

export async function deleteProduct({productId}) {
  try {
    
    const response = await fetch(`/api/product/delete/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Delete Product failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error during delete product:", error.message);
    throw error;
  }
}

export async function deleteCourse({courseId}) {
  try {

    const response = await fetch(`/api/course/delete/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Delete course failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error during delete course:", error.message);
    throw error;
  }
}

export async function deleteArticle({articleId}) {
  try {

    const response = await fetch(`/api/article/delete/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Delete article failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error during delete article:", error.message);
    throw error;
  }
}

export async function deleteBook({bookId}) {
  try {
    console.log(bookId)
    const response = await fetch(`/api/book/delete/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Delete book failed");
    }

    const data = await response.json();
    return data; // Return any relevant response data
  } catch (error) {
    console.error("Error during book delete:", error.message);
    throw error;
  }
}

