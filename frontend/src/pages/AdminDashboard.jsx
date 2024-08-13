import { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid } from "recharts";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/Admin/Sidebar";

const AdminDashboard = () => {
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [planData, setPlanData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const { axiosInstance } = useContext(UserContext);

    const COLORS = ['#FF204E', '#FFD369', '#AE00FB', '#7C00FE', '#F9E400', '#F9E400'];

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [
                    userResponse,
                    productResponse,
                    commentResponse,
                    plansByTypeResponse,
                    dataResponse,
                    talktimeResponse,
                    internationalRoamingResponse,
                    unlimitedResponse,
                    entertainmentResponse,
                    othersResponse
                ] = await Promise.all([
                    axiosInstance.get('http://localhost:8080/auth/userCount'),
                    axiosInstance.get('http://localhost:8080/plans/planCount'),
                    axiosInstance.get('http://localhost:8080/contactCount'),
                    axiosInstance.get('http://localhost:8080/plans/countByType'),
                    axiosInstance.get('http://localhost:8080/purchase/planCount/DATA'),
                    axiosInstance.get('http://localhost:8080/purchase/planCount/TALKTIME'),
                    axiosInstance.get('http://localhost:8080/purchase/planCount/INTERNATIONALROAMING'),
                    axiosInstance.get('http://localhost:8080/purchase/planCount/UNLIMITED'),
                    axiosInstance.get('http://localhost:8080/purchase/planCount/ENTERTAINMENT'),
                    axiosInstance.get('http://localhost:8080/purchase/planCount/OTHERS')
                ]);

                setTotalCustomers(userResponse.data);
                setTotalProducts(productResponse.data);
                setTotalComments(commentResponse.data);

                const formattedPlanData = Object.entries(plansByTypeResponse.data).map(([type, count]) => ({
                    sector: type,
                    planCount: count,
                }));
                setPlanData(formattedPlanData);

                setPieData([
                    { name: 'DATA', value: dataResponse.data },
                    { name: 'TALKTIME', value: talktimeResponse.data },
                    { name: 'INTERNATIONALROAMING', value: internationalRoamingResponse.data },
                    { name: 'UNLIMITED', value: unlimitedResponse.data },
                    { name: 'ENTERTAINMENT', value: entertainmentResponse.data },
                    { name: 'OTHERS', value: othersResponse.data },
                ]);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, [axiosInstance]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <Sidebar />
            <main className="flex-1 p-6 space-y-8 overflow-auto">
                <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent">
                            Total Customers
                        </h2>
                        <p className="text-4xl font-bold">{totalCustomers}</p>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent">
                            Total Plans
                        </h2>
                        <p className="text-4xl font-bold">{totalProducts}</p>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent">
                            Total Queries
                        </h2>
                        <p className="text-4xl font-bold">{totalComments}</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-3xl font-semibold text-center mb-6 bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent">Plans by Sector</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={planData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                <XAxis 
                                    dataKey="sector" 
                                    stroke="#fff" 
                                    tick={{ fill: '#fff' }} 
                                    angle={-90} 
                                    dy={10} 
                                    dx={-10}
                                    textAnchor="end"
                                />
                                <YAxis stroke="#fff" />
                                <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: 'none' }} />
                                <Bar dataKey="planCount" fill="#C738BD" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-semibold text-center mb-6 bg-gradient-to-r from-red-700 via-orange-300 to-red-700 bg-clip-text text-transparent">Plan Purchase Distribution</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={130}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: 'none',color: 'white' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
