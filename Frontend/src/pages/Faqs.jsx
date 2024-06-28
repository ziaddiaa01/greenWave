import React, { useState, useRef } from 'react';
import { useLoaderData, Await, defer } from 'react-router-dom';
import { getFaqs } from '../api';

// Define a loader function to fetch FAQ data
export function loader() {
  return defer({ faqs: getFaqs() });
}

function FAQ() {
  // Fetch FAQ data using useLoaderData hook
  const dataPromise = useLoaderData();
  
  // State to handle menu toggling
  const [openMenuId, setOpenMenuId] = useState(null);
  const contentRef = useRef([]);

  // Function to toggle menu
  const toggleMenu = (id) => {
    setOpenMenuId(prevId => (prevId === id ? null : id));
  };

  // Function to render FAQ items
  function renderFAQs(faqs) {
    return (
      <div className="container mx-auto w-3/4 px-4 py-8">
        <h3 className="text-3xl font-semibold mb-8 text-center">Frequently Asked <span className='text-customGreenTwo'>Questions</span></h3>
        <div className="accordion grid gap-4 justify-center">
          {faqs.map((faq) => (
            <div key={faq.id} className={`py-4 px-6 rounded-lg shadow-lg ${openMenuId === faq.id ? 'bg-customGreenTwo text-white' : 'bg-white text-black'}`}>
              <div
                className={`accordion-label flex justify-between items-center cursor-pointer`}
                onClick={() => toggleMenu(faq.id)}
              >
                <span className="text-xl font-medium">{faq.question}</span>
                <span className={`accordion-icon ${openMenuId === faq.id ? 'text-white' : 'text-black'}`}>{openMenuId === faq.id ? '-' : '+'}</span>
              </div>
              <div
                className={`accordion-content overflow-hidden transition-max-height duration-300`}
                style={{ maxHeight: openMenuId === faq.id ? contentRef.current[faq.id].offsetHeight + 'px' : '0px' }}
              >
                <div ref={el => (contentRef.current[faq.id] = el)}>
                  <p className="text-sm">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="faq-page-container bg-gray-100 flex flex-col items-center">
      <React.Suspense fallback={<h2>Loading FAQs...</h2>}>
        <Await resolve={dataPromise.faqs}>{renderFAQs}</Await>
      </React.Suspense>
    </main>
  );
}

export default FAQ;
