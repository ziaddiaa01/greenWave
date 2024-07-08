import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getArticle } from '../api';
import FontAwesome from 'react-fontawesome';

import defaultImage from '../images/article-6686cf5b4515995779e96b3a.jpg';

export async function loader({ params }) {
  const { id } = params; // Ensure 'id' matches the route parameter name
  try {
    const article = await getArticle({ id });
    return article;
  } catch (error) {
    console.error('Error loading article:', error);
    throw error;
  }
}

export default function ArticleDetail() {
  const article = useLoaderData();
  const parts = defaultImage.split('-');
  parts[parts.length - 1] = `${article._id}.jpg`;
  const imageUrl = parts.join('-');

  // State to track the scroll position
  const [scrollY, setScrollY] = useState(0);

  // Function to handle smooth scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling behavior
    });
  };

  // Event listener to update scroll position
  window.addEventListener('scroll', () => {
    setScrollY(window.scrollY);
  });

  // Function to color the first word in the title
  const colorFirstAndSecondWords = (title) => {
    const words = title.split(' ');
    const firstWord = words.shift();
    const secondWord = words.shift();
    const restOfTitle = words.join(' ');
    return (
      <span>
        <span style={{ color: '#FF8A00' }}>{firstWord}</span> <span style={{ color: '#FF8A00' }}>{secondWord}</span> {restOfTitle}
      </span>
    );
  };

  const extractAndBoldTitles = (content) => {
    const sentences = String(content).split('.');
    const titlesAndContent = sentences.map(sentence => {
      const parts = sentence.split(':');
      if (parts.length > 1) {
        const title = parts[0].trim();
        const content = parts.slice(1).join(':').trim();
        return (
          <>
            <b>{title}</b> <br />
            {content} <br />
          </>
        );
      }
      return null;
    });
    return titlesAndContent.filter(Boolean);
  };

   return (
    <div className="article-container">
      <div className="article">
        <img src={imageUrl}  alt="Article" />
        <h3 className="article-name">{colorFirstAndSecondWords(article.title)}</h3>
        <div className="article-author">
          <h3>By {article.author}</h3>
          <h3>{article.day + article.month}</h3>
        </div>
        <div className="article-content">
          <p>
            {extractAndBoldTitles(article.content)}
          </p>
          <p>
            <b>{article.conclusion}</b>
          </p>
        </div>
        {/* Button to scroll to the top */}
        {scrollY > 100 && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <FontAwesome name="fa-solid fa-arrow-up" />
          </button>
        )}
      </div>
    </div>
  );
}
