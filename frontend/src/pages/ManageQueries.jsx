import { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import { UserContext } from '../context/UserContext';

const ManageQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { axiosInstance } = useContext(UserContext);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8080/getAllContacts');
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching queries:', error);
        setError('Error fetching queries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [axiosInstance]);

  const onDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/deleteContact/${id}`);
      setQueries(queries.filter(query => query.id !== id));
    } catch (error) {
      console.error('Error deleting query:', error);
      setError('Error deleting query. Please try again later.');
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
          <h1 className="text-2xl font-bold mb-4 text-center">Manage Customer Queries</h1>
          <div className="overflow-auto h-[calc(100vh-200px)]">
            <table className="min-w-full bg-gray-800 text-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-3 px-4 hidden md:table-cell">Name</th>
                  <th className="py-3 px-4 hidden md:table-cell">Email</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queries.map(query => (
                  <tr key={query.id} className="bg-gray-900 hover:bg-gray-700 transition duration-300">
                    <td className="border px-4 py-3 hidden md:table-cell">{query.name}</td>
                    <td className="border px-4 py-3 hidden md:table-cell">{query.email}</td>
                    <td className="border px-4 py-3">{query.message}</td>
                    <td className="border px-4 py-3 flex justify-center">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => onDelete(query.id)}
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

export default ManageQueries;
