import React from 'react';

function Terms() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className=" text-3xl uppercase font-bold mb-6 text-gray-800"><span className='text-customOrange'>Terms</span> and Conditions</h1>
        <div className="prose">
          <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to our website providing home gardening services, waste collection,
            and agricultural education. By using our website, you agree to comply with
            these terms and conditions.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-4">2. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this website, including text, graphics, logos, and images, is
            the property of our company unless otherwise stated. Unauthorized use of
            any content on this website is prohibited.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-4">3. Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            We are not liable for any damages or losses incurred from using our services
            or information provided on our website. We recommend following all guidelines
            and safety precautions.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-4">4. Service Changes</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify or discontinue any service or content without
            prior notice. Changes will be effective immediately upon posting.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-4">5. Agreement</h2>
          <p className="text-gray-700 leading-relaxed">
            These terms and conditions constitute the entire agreement between you and us
            regarding your use of our website. By using our website, you accept these terms
            and conditions in full.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Terms;
