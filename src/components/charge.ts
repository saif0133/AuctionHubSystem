import { fetchPaymentId, getPaymentDetails } from "./paymentId";

let paymentId: string | null = null;

const initializePaymentId = async () => {
  try {
    await fetchPaymentId(); // Fetch payment details
    const details = getPaymentDetails(); // Retrieve the payment details
    paymentId = details.paymentId; // Set the paymentId
  } catch (error) {
    console.error('Failed to initialize payment ID:', error);
  }
};

// Initialize paymentId when the module is loaded
initializePaymentId();

export const charge = async (amount: string ,description:string): Promise<boolean> => {
  if (!paymentId) {
    console.error('Payment ID is not initialized');
    return false;
  }

  const amountInCents = Math.round(parseFloat(amount) * 100);
  const url = 'http://localhost:8080/api/stripe/charge';
  const userToken = localStorage.getItem('authToken') || '';

  const data = {
    paymentMethodId: paymentId,
    amount: amountInCents,
    currency: "usd",
    description: description
  };

  console.log('Data being sent:', JSON.stringify(data, null, 2));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Response:', result);

    return true;
    
  } catch (error) {
    console.error('Error:', error);
    return false; // Ensure you return false in case of error
  }
};
