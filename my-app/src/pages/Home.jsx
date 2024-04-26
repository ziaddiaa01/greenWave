import React from "react";
import { defer, Link, useLoaderData, Await } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { getLatestArticles } from "../api";
import defaultImage from "../images/article-1.jpg";

export function loader() {
  return defer({ articles: getLatestArticles() });
}

function Home() {
  const dataPromise = useLoaderData();

  function renderLatestArticles(articles) {
    const latestArticles = articles.map((article) => {
      const parts = defaultImage.split("-");
      parts[parts.length - 1] = `${article.id}.jpg`;
      const imageUrl = parts.join("-");
      
      return (
        <div key={article.id} className="card">
          <Link to={`articles/${article.id}`}>
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
              <Link className="article-read" to={`articles/${article.id}`}>
                Read more <FontAwesome name="fa-thin fa-arrow-right" />
              </Link>
            </div>
          </Link>
        </div>
      );
    });
    return (
      <>
        <div className="latest-articles">{latestArticles}</div>
      </>
    );
  }
  return (
    <main className="home-page-container">
      <section className="shop-ads">
        <h1>
          Sustainable &<br></br> Gardening Tools
        </h1>
        <div className="offer-details">
          <h3>
            Sale up to <span id="sale-amount"> 30% off</span>
          </h3>
          <p>Free shipping on all your order.</p>
        </div>
        <div className="main-button">
          <Link to="/shop">
            Shop Now <FontAwesome name="fa-thin fa-arrow-right" />
          </Link>
        </div>
      </section>
      <section className="service-feature">
        <div className="feature">
          <FontAwesome
            name="fa-light fa-truck fa-flip-horizontal fa-lg"
            className="icon"
          />
          <div className="feature-text">
            <h4>Free Shipping</h4>
            <p>Free shipping on all your order</p>
          </div>
        </div>
        <div className="feature">
          <FontAwesome name="fa-solid fa-phone fa-lg" className="icon" />
          <div className="feature-text">
            <h4>Customer Support 24/7</h4>
            <p>Instant Support</p>
          </div>
        </div>
        <div className="feature">
          <FontAwesome name="fa-solid fa-lock fa-lg" className="icon" />
          <div className="feature-text">
            <h4>100% Secure Payment</h4>
            <p>We ensure your security</p>
          </div>
        </div>
        <div className="feature">
          <FontAwesome name="fa-solid fa-credit-card fa-lg" className="icon" />
          <div className="feature-text">
            <h4>Money-Back</h4>
            <p>30 Days Money-Back</p>
          </div>
        </div>
      </section>
      <h3>Latest Articles</h3>
      <React.Suspense fallback={<h2>Loading latest articles...</h2>}>
        <Await resolve={dataPromise.articles}>{renderLatestArticles}</Await>
      </React.Suspense>
    </main>
  );
}

export default Home;
