import { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import { UserContext } from '../context/UserContext';

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', amount: '', validity: '', data: '', type: '' });
  const [editPlan, setEditPlan] = useState({ name: '', amount: '', validity: '', data: '', type: '' });
  const { axiosInstance } = useContext(UserContext);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8080/plans');
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('Error fetching plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [axiosInstance]);

  const onDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/plandelete/${id}`);
      setPlans(plans.filter(plan => plan.id !== id));
    } catch (error) {
      console.error('Error deleting plan:', error);
      setError('Error deleting plan. Please try again later.');
    }
  };

  const handleAddPlans = () => setIsAddModalOpen(true);

  const handleEditPlans = (plan) => {
    setEditPlan(plan);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditPlan(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('http://localhost:8080/plans', newPlan);
      setPlans([...plans, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding plan:', error);
      setError('Error adding plan. Please try again later.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`http://localhost:8080/planupdate/${editPlan.id}`, editPlan);
      setPlans(plans.map(plan => (plan.id === editPlan.id ? response.data : plan)));
      handleCloseModal();
    } catch (error) {
      console.error('Error editing plan:', error);
      setError('Error editing plan. Please try again later.');
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="md:w-3/4 p-6 h-full">
          <div className='flex justify-between items-center mb-6'>
            <h1 className="text-3xl font-bold">Manage Plans</h1>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              onClick={handleAddPlans}
            >
              Add Plan
            </button>
          </div>

          {isAddModalOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCloseModal} />
              <div className="fixed inset-0 flex items-center justify-center z-50 p-10">
                <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-lg transition-transform transform scale-100 hover:scale-105">
                  <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
                    onClick={handleCloseModal}
                    aria-label="Close modal"
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Add Plan</h2>
                  <form onSubmit={handleAddSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newPlan.name}
                        onChange={handleAddInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="amount">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={newPlan.amount}
                        onChange={handleAddInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="validity">Validity</label>
                      <input
                        type="text"
                        name="validity"
                        value={newPlan.validity}
                        onChange={handleAddInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="data">Data</label>
                      <input
                        type="text"
                        name="data"
                        value={newPlan.data}
                        onChange={handleAddInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="type">Type</label>
                      <select
                        name="type"
                        value={newPlan.type}
                        onChange={handleAddInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="" disabled>Select Plan Type</option>
                        <option value="UNLIMITED">UNLIMITED</option>
                        <option value="DATA">DATA</option>
                        <option value="TALKTIME">TALKTIME</option>
                        <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                        <option value="INTERNATIONALROAMING">INTERNATIONALROAMING</option>
                        <option value="OTHERS">OTHERS</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Add</button>
                      <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300" onClick={handleCloseModal}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          {isEditModalOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCloseModal} />
              <div className="fixed inset-0 flex items-center justify-center z-50 p-10">
                <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-lg transition-transform transform scale-100 hover:scale-105">
                  <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
                    onClick={handleCloseModal}
                    aria-label="Close modal"
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Edit Plan</h2>
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editPlan.name}
                        onChange={handleEditInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="amount">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={editPlan.amount}
                        onChange={handleEditInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="validity">Validity</label>
                      <input
                        type="text"
                        name="validity"
                        value={editPlan.validity}
                        onChange={handleEditInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="data">Data</label>
                      <input
                        type="text"
                        name="data"
                        value={editPlan.data}
                        onChange={handleEditInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="type">Type</label>
                      <select
                        name="type"
                        value={editPlan.type}
                        onChange={handleEditInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="" disabled>Select Plan Type</option>
                        <option value="UNLIMITED">UNLIMITED</option>
                        <option value="DATA">DATA</option>
                        <option value="TALKTIME">TALKTIME</option>
                        <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                        <option value="INTERNATIONALROAMING">INTERNATIONALROAMING</option>
                        <option value="OTHERS">OTHERS</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Update</button>
                      <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300" onClick={handleCloseModal}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          <div className="overflow-auto h-[calc(100vh-200px)] rounded-lg scrollbar-hidden">
            <table className="min-w-full bg-gray-900 text-white border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-3 px-4 text-left hidden md:table-cell">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left hidden md:table-cell">Validity</th>
                  <th className="py-3 px-4 text-left hidden md:table-cell">Data</th>
                  <th className="py-3 px-4 text-left hidden md:table-cell">Type</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map(plan => (
                  <tr key={plan.id} className="bg-gray-900 hover:bg-gray-700 transition duration-300">
                    <td className="border px-4 py-2 hidden md:table-cell">{plan.id}</td>
                    <td className="border px-4 py-2">{plan.name}</td>
                    <td className="border px-4 py-2">Rs. {plan.amount}</td>
                    <td className="border px-4 py-2 hidden md:table-cell">{plan.validity}</td>
                    <td className="border px-4 py-2 hidden md:table-cell">{plan.data} MB</td>
                    <td className="border px-4 py-2 hidden md:table-cell">{plan.type}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"
                        onClick={() => handleEditPlans(plan)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => onDelete(plan.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagePlans;
