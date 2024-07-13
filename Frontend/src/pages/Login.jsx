import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData,
    Link
} from "react-router-dom"
import { loginUser } from "../api"
export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/";
    
    try {
        const response = await loginUser({ email, password });
        localStorage.setItem("accessToken", response.userToken);
        window.dispatchEvent(new Event("loginStatusChange")); 
        return redirect(pathname);
    } catch(err) {
        return err.message;
    }
}
export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="login-container">
            <h1>Login</h1>
            {message && <h3 className="red">{message}</h3>}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}

            <Form 
                method="post" 
                className="login-form" 
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Login"
                    }
                </button>
                <p>Don’t have account?<Link to="/signup">Register</Link></p>
            </Form>
        </div>
    )
}
