import Header from "../components/Home/Header"
import img from '../assets/img-1.jpg';
const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900">
        <Header />
        <div className="h-[700px] w-full flex">
            <div className="w-1/3 bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white mt-20">
                <h2 className="ml-9 mt-2 font-bold text-3xl">Browse mobile recharge plans</h2>
                <img src={img} alt="mobile" className="w-[250px] mt-14 ml-32" />
            </div>
            <div className="w-2/3 bg-bg-gradient-to-b from-black via-gray-950 to-gray-900">
                <div className="relative overflow-hidden  py-2 px-4 mt-3">
                    <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hidden text-2xl">
                        <a href="#data" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-red-600 hover:underline hover:underline-offset-4 focus:text-red-600 focus:underline focus:underline-offset-4 transition duration-300">Data</a>
                        <a href="#truly-unlimited" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-red-600 hover:underline hover:underline-offset-4 focus:text-red-600 focus:underline focus:underline-offset-4 transition duration-300">Truly Unlimited</a>
                        <a href="#talktime" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-red-600 hover:underline hover:underline-offset-4 focus:text-red-600 focus:underline focus:underline-offset-4 transition duration-300">TalkTime</a>
                        <a href="#cricket-packs" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-red-600 hover:underline hover:underline-offset-4 focus:text-red-600 focus:underline focus:underline-offset-4 transition duration-300">Cricket Packs</a>
                        <a href="#international-roaming" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-red-600 hover:underline hover:underline-offset-4 focus:text-red-600 focus:underline focus:underline-offset-4 transition duration-300">International Roaming</a>
                        <a href="#inflight-roaming" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-red-600 hover:underline hover:underline-offset-4 focus:text-red-600 focus:underline focus:underline-offset-4 transition duration-300">Inflight Roaming pack</a>
                        <a href="#plan-vouchers" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-red-600 hover:underline hover:underline-offset-4 focus:text-red-600 focus:underline focus:underline-offset-4 transition duration-300">Plan Vouchers</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products