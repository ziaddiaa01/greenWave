import { Form, useActionData, useNavigation } from 'react-router-dom';
import { confirmEmail } from '../api';

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const code = formData.get('code');

    try {
        const result = await confirmEmail({ email, code });
        return { message: result.message };
    } catch (err) {
        return { error: err.message };
    }
}

export default function ConfirmEmail() {
    const data = useActionData();
    const navigation = useNavigation();
    const successMessage = data?.message;
    const errorMessage = data?.error;

    return (
        <div className="my-[30px] flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Confirm Email</h1>

                {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

                <Form method="post" className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        required
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <input
                        name="code"
                        type="text"
                        placeholder="Confirmation Code"
                        required
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        disabled={navigation.state === "submitting"}
                        className={`w-full py-2 px-4 rounded-md font-semibold text-white bg-[#2DA884] hover:bg-white hover:text-[#2DA884] border hover:border-[#2DA884] ${navigation.state === "submitting" ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {navigation.state === "submitting" ? "Confirming..." : "Confirm Email"}
                    </button>
                </Form>
            </div>
        </div>
    );
}
