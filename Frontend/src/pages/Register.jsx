import { Form, redirect, useActionData, useNavigation, Link } from 'react-router-dom';
import { signupUser } from '../api';

export async function action({ request }) {
    const formData = await request.formData();
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const phone = formData.get('phone');
    const DOB = formData.get('DOB');
    try {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        const response = await signupUser({ firstName, lastName, email, password, phone, DOB });
        if(response.status == 200){
            return redirect('/confirm');
        }
        else{
            return { error: response.data };
        }
        
    } catch (err) {
        return { error: err.message };
    }
}

export default function Register() {
    const data = useActionData();
    const navigation = useNavigation();
    const errorMessage = data?.error;

    return (
        <div className="login-container">
            <h1>Sign Up</h1>
            {errorMessage && <h3 className="red">{errorMessage}</h3>}

            <Form method="post" className="login-form" replace>
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                />
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
                <input
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    required
                />
                <input
                    name="DOB"
                    type="date"
                    placeholder="Date of Birth"
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
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </Form>
        </div>
    );
}
