import React from "react";

const Help = () => {
  return (
    <div className="help-container">
      <main className="help-main">
        <section className="help-section">
          <h2>General Help</h2>
          <p>
            Welcome to the Auction Hub Help Center. Here you can find answers to
            frequently asked questions and guidance on using our platform.
          </p>
          <h3>1. Getting Started</h3>
          <p>
            To get started with Auction Hub, you need to create an account and
            log in. Once logged in, you can start browsing items, place bids,
            and manage your account.
          </p>
          <h3>2. How to Place a Bid</h3>
          <p>
            Find an item you are interested in, set your bid amount, and submit
            your bid. Make sure to check the auction end time and ensure your
            bid is placed before it closes.
          </p>
        </section>

        <section className="help-section">
          <h2>Troubleshooting</h2>
          <h3>1. Can't Log In</h3>
          <p>
            If you're having trouble logging in, make sure you are using the
            correct username and password. If you've forgotten your password,
            use the "Forgot Password" feature to reset it.
          </p>
          <h3>2. Bid Not Submitting</h3>
          <p>
            If your bid is not submitting, check your internet connection and
            ensure you are meeting all bid requirements. If the problem
            persists, contact support.
          </p>
        </section>

        <section className="help-section">
          <h2>Contact Us</h2>
          <p>
            If you need further assistance, please reach out to our support
            team:
          </p>
          <p>
            Email:{" "}
            <a href="mailto:support@auctionhub.com">support@auctionhub.com</a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Help;
