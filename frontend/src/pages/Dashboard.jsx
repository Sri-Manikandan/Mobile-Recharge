import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/image-2.jpg';
import { UserContext } from '../context/UserContext';
import Offers from '../components/Home/Offers';

const Dashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {axiosInstance} = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (/^\d{10}$/.test(phoneNumber)) {
      setError('');
      navigate('/products', { state: { phoneNumber } });
    } else if (phoneNumber.length > 0) {
      setError('Please enter a valid 10-digit phone number.');
    }
  }, [phoneNumber, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('http://localhost:8080/contactus', formData);
      alert(response.data);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.log('Request failed. Please try again.');
    }
  };

  return (
    <div className='bg-gradient-to-b from-black via-gray-950 to-gray-900'>
      <div className="flex items-center justify-between p-6 bg-gray-900 text-white h-[600px] gap-5">
        <div className="md:w-2/4 md:ml-10 text-center md:text-left">
          <h1 className="text-6xl font-bold mb-10 md:mb-4 bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent">Welcome to<br/>Mario</h1>
          <h1 className="text-4xl font-bold mb-4">Best Plans at Best Price</h1>
          <p className="mb-4">Enter your phone number to explore our plans.</p>
          <form className="flex flex-col space-y-4 justify-center items-center md:justify-start md:items-start">
            <input
              type="tel"
              placeholder="Enter your 10 digit number.."
              className="p-3 rounded-md text-gray-800 w-3/4 md:w-[100%]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        <div className="w-2/4 ml-20 hidden md:block">
          <img src={heroImage} alt="Hero" className="w-[500px] object-cover rounded-md h-[500px] ml-10" />
        </div>
      </div>
      <div className="py-12 px-8">
        <h2 className="text-5xl font-semibold bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent text-center mb-8">Our Best Served Plans</h2>
        <div className="max-w-6xl mx-auto overflow-x-scroll scrollbar-hidden flex gap-8 group-hover:blur-sm">
          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg min-w-[255px]">
            <h3 className="text-2xl font-semibold mb-4 text-white text-center">Truly Unlimited</h3>
            <p className='text-neutral-300'>Get your unlimited access for your mobile calls and messages as much as your plan expires.</p>
          </div>
          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg min-w-[255px]">
            <h3 className="text-2xl font-semibold mb-4 text-white text-center">Cricket Plans</h3>
            <p className='text-neutral-300'>Get the best sporting offers as India plays the world cup to win. Cheer them up, guys!</p>
          </div>
          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg min-w-[255px]">
            <h3 className="text-2xl font-semibold mb-4 text-white text-center">International Roaming</h3>
            <p className='text-neutral-300'>Connect with your faraway friends and revive your friendship with the lowest international roaming offers.</p>
          </div>
          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg min-w-[255px]">
            <h3 className="text-2xl font-semibold mb-4 text-white text-center">Entertainment</h3>
            <p className='text-neutral-300'>Enjoy unlimited access to your favorite movies, shows, and music with our entertainment package.</p>
          </div>
          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg min-w-[255px]">
            <h3 className="text-2xl font-semibold mb-4 text-white text-center">Data Plans</h3>
            <p className='text-neutral-300'>Stay connected with high-speed internet, perfect for browsing, streaming, and more.</p>
          </div>
          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg min-w-[255px]">
            <h3 className="text-2xl font-semibold mb-4 text-white text-center">Talktime</h3>
            <p className='text-neutral-300'>Get the best value for your money with our talktime packages, offering more minutes at lower rates.</p>
          </div>
        </div>
      </div>
      <Offers />
      <div className="py-12 bg-gradient-to-b from-black via-gray-950 to-gray-900 px-8">
        <h2 className="text-5xl font-semibold text-center mb-8 bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent">Contact Us</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-white">Name</label>
              <input type="text" id="name" className="w-full p-3 rounded-md border border-gray-300" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-white">Email</label>
              <input type="email" id="email" className="w-full p-3 rounded-md border border-gray-300" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="message" className="block text-white">Message</label>
              <textarea id="message" className="w-full p-3 rounded-md border border-gray-300" rows="4" name="message" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="bg-red-500 text-white py-3 rounded-md w-full hover:bg-red-600 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Mario. All rights reserved.</p>
          <p className="mt-2">Follow us on social media.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
