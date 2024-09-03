import React, { useEffect, useState } from 'react';

const UserPayment: React.FC = () => {
  const [cardId, setCardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const userToken = localStorage.getItem('authToken'); // Retrieve token from local storage or another source

        const response = await fetch('http://localhost:8080/api/stripe/customer-cards', {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Assuming you want to use the first card from the response
        if (data.length > 0) {
          const firstCard = data[0];
          setCardId(firstCard.id); // Store the card ID in state

          console.log('Card ID:', firstCard.id);
        } else {
          console.log('No payment methods found');
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
   <></>
  );
};

export default UserPayment;
