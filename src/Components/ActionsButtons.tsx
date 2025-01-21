import { FaGreaterThan } from "react-icons/fa";

const ActionsButtons = () => {
  return (
    <div className="flex justify-center md:justify-start items-center space-x-4 md:space-x-0 md:space-y-4">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Request a Quote Button */}
        <button className="relative flex items-center justify-center space-x-2 text-black bg-white hover:bg-gradient-to-r from-ofcgreen  px-6 py-3 text-lg sm:text-xl font-bold tracking-wider rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300">
          <span>Request a Quote</span>
          <FaGreaterThan size={16} />
        </button>
      </div>
    </div>
  );
};

export default ActionsButtons;
