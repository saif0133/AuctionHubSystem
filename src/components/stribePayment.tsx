import React, { useEffect, useState } from "react";

interface PaymentProps {
  amount: string;
  description: string;
  paymentMethodId: string;
  closePopup: () => void;
}

const PaymentComponent: React.FC<PaymentProps> = ({ amount, description, paymentMethodId, closePopup }) => {
  const [loading, setLoading] = useState(true); // Start loading
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const handlePayment = async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await fetch("http://localhost:8080/api/stripe/charge", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            paymentMethodId,
            amount,
            currency: "usd",
            description
          })
        });

        if (response.ok) {
          const data = await response.json();
          setSuccess(true);
          setTimeout(() => closePopup(), 4000); // Close popup after 4 seconds
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Payment failed. Please try again.");
        }
      } catch (err) {
        setError("Payment failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    handlePayment();
  }, [amount, description, paymentMethodId, authToken, closePopup]);

  // Optionally show a loading spinner or something similar
  return (
    <div>
      {loading && <p>Processing payment...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Payment successful!</p>}
    </div>
  );
}

export default PaymentComponent;
