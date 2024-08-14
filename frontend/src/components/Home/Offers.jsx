import React from 'react';
import cashback from '../../assets/cashback.webp';
import weekend from '../../assets/mobiledata.avif';
import jio from '../../assets/jio.jpg';

const offers = [
  {
    title: '50% Off on First Recharge',
    description: 'Get 50% off on your first mobile recharge with promo code WELCOME50.',
    image: cashback,
  },
  {
    title: 'Double Data on Weekends',
    description: 'Enjoy double data on all weekend recharges. No extra cost!',
    image: weekend,
  },
  {
    title: '3 Months Unlimited Data',
    description: 'Get free 3 Months Data Unlimited At ₹309. Offer valid for new users only.',
    image: jio,
  },
];

const Offers = () => {
  return (
    <div className="py-12 px-8 bg-gray-900">
      <h2 className="text-5xl font-semibold bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent text-center mb-8">Exclusive Offers</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div key={index} className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:bg-neutral-700 transition duration-300">
            <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-white">{offer.title}</h3>
            <p className="text-neutral-300">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
