import { Form, useActionData, useNavigation } from "react-router-dom";
import { addProduct, addArticle, addBook, addCourse } from "../api";

export async function action({ request }) {
  const formData = await request.formData();
  const type = formData.get("type");
  let dataToAdd;

  try {
    switch (type) {
      case "product":
        dataToAdd = {
          name: formData.get("name"),
          description: formData.get("description"),
          stock: formData.get("stock"),
          price: formData.get("price"),
          discount: formData.get("discount"),
          categoryId: formData.get("categoryId"),
          brandId: formData.get("brandId"),
          image: formData.get("image"),
        };
        await addProduct(dataToAdd);
        break;
      case "article":
        dataToAdd = {
          title: formData.get('title'),
          content: formData.get('content'),
          author: formData.get('author'),
          tags: formData.get('tags'),
        };
        await addArticle(dataToAdd);
        break;
      case "book":
        dataToAdd = {
          name: formData.get('name'),
          author: formData.get('author'),
          genre: formData.get('genre'),
          publishedDate: formData.get('publishedDate'),
          price: formData.get('price'),
          description: formData.get('description'),
          coverImage: formData.get('coverImage'), 
        };
        await addBook(dataToAdd);
        break;
      case "course":
        dataToAdd= {
          name: formData.get('name'),
          description: formData.get('description'),
          duration: formData.get('duration'),
          price: formData.get('price'),
          instructor: formData.get('instructor'),
          category: formData.get('category'),
          image: formData.get('image'),
        };
        await addCourse(dataToAdd);
        break;
      default:
        throw new Error("Unknown form type");
    }
    return `${type} added successfully`;
  } catch (error) {
    return error.message;
  }
}

const AdminDashboard = () => {
  const errorMessage = useActionData();
  const navigation = useNavigation();

  const isSuccessMessage = (message) => {
    return message && message.toLowerCase().includes("successfully");
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 to-black">
      <div className="container mx-auto pb-10 pt-10 px-[10%]">
        {isSuccessMessage(errorMessage) ? (
          <h3 className="text-customGreen">{errorMessage}</h3>
        ) : (
          <h3 className="text-red-600">{errorMessage}</h3>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {/* Add Product Form */}
          <Form
            method="post"
            encType="multipart/form-data"
            className="p-4 border border-[#939292] gap-3 flex flex-col bg-[#c1c1c1] rounded-lg shadow-lg"
          >
            <input type="hidden" name="type" value="product" />
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-field"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="input-field"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="input-field"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input-field"
              required
            />
            <input
              type="number"
              name="discount"
              placeholder="Discount"
              className="input-field"
            />
            <input
              type="text"
              name="categoryId"
              placeholder="Category ID"
              className="input-field"
              required
            />
            <input
              type="text"
              name="brandId"
              placeholder="Brand ID"
              className="input-field"
              required
            />
            <input
              type="file"
              name="image"
              placeholder="Image"
              accept="image/png, image/jpeg"
              className="input-field"
              required
            />
            <input type="hidden" name="createdBy" value="userId" />
            <button
              type="submit"
              className="button-primary"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting"
                ? "Adding ..."
                : "Add Product"}
            </button>
          </Form>

          {/* Add Book Form */}
          <Form
            method="post"
            encType="multipart/form-data"
            className="p-4 border-[#939292] gap-3 justify-between flex flex-col bg-[#c1c1c1] rounded-lg shadow-md"
          >
            <input type="hidden" name="type" value="book" />
            <h2 className="text-2xl font-bold mb-4">Add Book</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-field"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              className="input-field"
              required
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              className="input-field"
              required
            />
            <input
              type="date"
              name="publishedDate"
              placeholder="Published Date"
              className="input-field"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input-field"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="input-field"
              required
            />
            <input
              type="file"
              name="coverImage"
              placeholder="Cover Image"
              className="input-field"
              required
            />
            <input type="hidden" name="createdBy" value="userId" />
            <button
              type="submit"
              className="button-primary"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting" ? "Adding ..." : "Add Book"}
            </button>
          </Form>
          
          {/* Add Course Form */}
          <Form
            method="post"
            encType="multipart/form-data"
            className="p-4 border-[#939292] gap-3 flex flex-col bg-[#c1c1c1] rounded-lg shadow-md"
          >
            <input type="hidden" name="type" value="course" />
            <h2 className="text-2xl font-bold mb-4">Add Course</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-field"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="input-field"
              required
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              className="input-field"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input-field"
              required
            />
            <input
              type="text"
              name="instructor"
              placeholder="Instructor"
              className="input-field"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="input-field"
              required
            />
            <input
              type="file"
              name="image"
              placeholder="Image"
              className="input-field"
              required
            />
            <input type="hidden" name="createdBy" value="userId" />
            <button
              type="submit"
              className="button-primary"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting" ? "Adding ..." : "Add Course"}
            </button>
          </Form>
          
          {/* Add Article Form */}
          <Form
            method="post"
            encType="multipart/form-data"
            className="p-4 border-[#939292] gap-3 flex justify-between flex-col bg-[#c1c1c1] rounded-lg shadow-md"
          >
            <input type="hidden" name="type" value="article" />
            <h2 className="text-2xl font-bold mb-4">Add Article</h2>
            <input
              type="text"
              name="title"
              placeholder="Name"
              className="input-field"
              required
            />
            <input
              type="text"
              name="content"
              placeholder="Content"
              className="input-field"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              className="input-field"
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags"
              className="input-field"
              required
            />
            <input type="hidden" name="createdBy" value="userId" />
            <button
              type="submit"
              className="button-primary"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting" ? "Adding ..." : "Add Article"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
