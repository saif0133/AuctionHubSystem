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
        To start using Auction Hub, create an account and log in. After logging in, 
        you can browse available items, place bids, track auctions, and manage your profile.
      </p>

      <h3>2. How to Place a Bid</h3>
      <p>
        To place a bid:
        <ol>
          <li>Browse or search for an item of interest.</li>
          <li>Click on the item to view its details and the current highest bid.</li>
          <li>Enter your bid amount, ensuring it meets or exceeds the minimum required bid increment.</li>
          <li>Click "Submit Bid" to confirm.</li>
        </ol>
      </p>
      <p>
        <strong>Note:</strong> You must have a valid payment method added to your account 
        and pay the reserved amount before placing bids or creating auctions.
      </p>
    </section>

    <section className="help-section">
      <h2>Reserved Amounts</h2>
      <p>
        A reserve price is the minimum price a seller is willing to accept. Additionally, 
        an amount based on the item's price range is calculated and must be paid:
      </p>
      <table style={{border:"1px solid black"}}>
        <thead>
          <tr style={{textAlign:"center",border:"1px solid black"}}>
            <th>Price Range</th>
            <th>Percentage</th>
            <th></th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody >
          <tr style={{border:"1px solid black"}}>
            <td>$1 - $100</td>
            <td>10%</td>
            <td>--</td>
            <td>Price × 0.10</td>
          </tr>
          <tr style={{border:"1px solid black"}}>
            <td>$101 - $1000</td>
            <td>7%</td>
            <td>--</td>
            <td>Price × 0.07</td>
          </tr>
          <tr style={{border:"1px solid black"}}>
            <td>$1001 - $5000</td>
            <td>5%</td>
            <td></td>
            <td>Price × 0.05</td>
          </tr>
          <tr style={{border:"1px solid black"}}>
            <td>$5001 - $10000</td>
            <td>3%</td>
            <td>--</td>
            <td>Price × 0.03</td>
          </tr>
          <tr style={{border:"1px solid black"}}>
            <td>Over $10000</td>
            <td>2%</td>
            <td>--</td>
            <td>Price × 0.02</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section className="help-section">
      <h2>Troubleshooting</h2>
      <h3>1. Can't Log In</h3>
      <p>
        If you're having trouble logging in:
        <ul>
          <li>Verify your username and password are correct.</li>
          <li>If you've forgotten your password, click on "Forgot Password" to reset it.</li>
        </ul>
      </p>
      <h3>2. Bid Not Submitting</h3>
      <p>
        If your bid is not submitting:
        <ul>
          <li>Check that your payment method is active and the reserved amount is paid.</li>
          <li>Ensure your internet connection is stable.</li>
        </ul>
      </p>
    </section>

    <section className="help-section">
      <h2>Contact Us</h2>
      <p>
        If you need further assistance, please reach out to our support team:
      </p>
      <p>
        Email: <a href="mailto:support@auctionhub.com">support@auctionhub.com</a>
      </p>
    </section>
  </main>
</div>

  );
};

export default Help;
