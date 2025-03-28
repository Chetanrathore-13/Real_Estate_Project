import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "/images/Logo.svg"; // Ensure correct path

export default function FooterMine() {
    return (
        <footer className="bg-white text-[#080E51] py-10">
            <div className="container mx-auto px-6 sm:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    
                    {/* Logo Section */}
                    <div className="mb-6 md:mb-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src={logo} className="mr-3 w-24 h-24" alt="Real Estate Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">
                                Real Estate
                            </span>
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                            <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
                            <li><Link to="/about-us" className="hover:text-orange-500">About</Link></li>
                            <li><Link to="/service" className="hover:text-orange-500">Services</Link></li>
                            <li><Link to="/Blog" className="hover:text-orange-500">Blog</Link></li>
                            <li><Link to="/contact-us" className="hover:text-orange-500">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-orange-500">fAQ</Link></li>
                        </ul>
                    </div>

                    {/* Popular Searches */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Popular Searches</h3>
                        <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                            <li><Link to="/agency" className="hover:text-orange-500">Agency</Link></li>
                            <li><Link to="/agent" className="hover:text-orange-500">Agents</Link></li>
                            <li><Link to="/" className="hover:text-orange-500">Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="w-full md:w-auto">
                        <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
                        <p className="text-gray-400 text-sm sm:text-base mb-3">
                            Subscribe to get the latest updates.
                        </p>

                        {/* Full-width Input */}
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-gray-200 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3"
                        />

                        {/* Full-width Button */}
                        <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                            Subscribe
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}
