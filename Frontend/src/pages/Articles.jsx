import React from 'react';
import { Link, useLoaderData, Await, defer } from 'react-router-dom';
import defaultImage from '../images/article-1.jpg';
import { getArticles } from '../api';
import FontAwesome from 'react-fontawesome';

export async function loader() {
  return defer({ articles: await getArticles() });
}


function Articles() {
  const dataPromise = useLoaderData();

  function renderArticles(articles) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {articles.map((article) => {
          const parts = defaultImage.split('-');
          parts[parts.length - 1] = `${article.id}.jpg`;
          const imageUrl = parts.join('-');

          return (
            <div key={article._id} className="card">
              <Link to={`${article._id}`}>
                <img className="article-cover" src={imageUrl} alt="Article Cover" />
                <div className="article-info">
                  <h3 className="article-date">
                    {article.day}
                    <span>{article.month}</span>
                  </h3>
                  <div className="article-details">
                    <h3 className="article-category">
                      <FontAwesome name="fa-solid fa-list" className="article-icon" />
                      {article.category}
                    </h3>
                    <h3 className="article-author">
                      <FontAwesome
                        name="fa-regular fa-user"
                        className="article-icon"
                      />
                      {article.author}
                    </h3>
                    <h3 className="article-comments">
                      <FontAwesome
                        name="fa-regular fa-comment"
                        className="article-icon"
                      />
                      {article.comments} Comments
                    </h3>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <Link className="article-read" to={`${article._id}`}>
                    Read more <FontAwesome name="fa-thin fa-arrow-right" />
                  </Link>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <main className="home-page-container">
      <h3 className="text-xl font-semibold">Articles</h3>
      <React.Suspense fallback={<h2>Loading articles...</h2>}>
        <Await resolve={dataPromise.articles}>{renderArticles}</Await>
      </React.Suspense>
    </main>
  );
}

export default Articles;