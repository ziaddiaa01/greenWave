import { Form, redirect, useActionData , useNavigation , Link} from 'react-router-dom';
import { signupUser } from '../api'; 



export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword'); 
    const pathname = new URL(request.url).searchParams.get('redirectTo') || '/home';

    try {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        const token = await signupUser({ email, password });
        localStorage.setItem('accessToken', token);
        return redirect(pathname);
    } catch(err) {
        return err.message
    }
}
export default function Register() {
    const errorMessage = useActionData();
    const navigation = useNavigation();

    return (
        <div className="login-container">
            <h1>Sign Up</h1>
            {errorMessage && <h3 className="red">{errorMessage}</h3>}

            <Form 
                method="post" 
                className="login-form" 
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Creating account..."
                        : "Sign up"
                    }
                </button>
                <p>Already have account?<Link to="/login">Login</Link></p>
            </Form>
        </div>
    );
}
