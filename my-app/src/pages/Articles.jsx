import React from 'react';
import { useLoaderData, Await, defer } from 'react-router-dom';
import { getFaqs } from '../api';

export function loader() {
  return defer({ usersFaqs: getFaqs() });
}

function Faqs() {
  const dataPromise = useLoaderData();

  function renderFaqs(allFaqs) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allFaqs.map((faq) => {
          return (
            <div key={faq.id} className="faq-card">
              <div className="faq-info">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <main className="faq-page-container">
      <h3 className="text-xl font-semibold">FAQs</h3>
      <React.Suspense fallback={<h2>Loading FAQs...</h2>}>
        <Await resolve={dataPromise.usersFaqs}>{renderFaqs}</Await>
      </React.Suspense>
    </main>
  );
}

export default Faqs;
