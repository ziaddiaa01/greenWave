import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getArticle } from '../api';
import FontAwesome from 'react-fontawesome';

import defaultImage from '../images/article-1.jpg';

export function loader({ params }) {
  const id = Number(params.id);
  const article = getArticle(id);
  return article;
}

export default function ArticleDetail() {
  const article = useLoaderData();
  const parts = defaultImage.split('-');
  parts[parts.length - 1] = `${article.id}.jpg`;
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

  return (
    <div className="article-container">
      <div className="article">
        <img src={imageUrl} alt="Article" />
        <h3 className="article-name">{colorFirstAndSecondWords(article.title)}</h3>
        <div className="article-author">
          <h3>By {article.author}</h3>
          <h3>{article.day + article.month}</h3>
        </div>
        <div className="article-content">
          {[article.content].map((line, index) => {
            // Check if the line starts with a number followed by a dot
            const isSectionHeader = /^\d+\./.test(line);
            return (
              <p key={index} className={isSectionHeader ? 'section-header' : 'regular-text'}>
                {line}
              </p>
            );
          })}
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
