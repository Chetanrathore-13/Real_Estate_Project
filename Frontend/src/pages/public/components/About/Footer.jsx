export default function Footer() {
    return (
        <footer className="bg-white text-[#080E51] py-10">
            <div className="container mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Website Name & Address */}
                    <div>
                        {/* Flex container for logo and heading */}
                        <div className="flex items-center gap-3">
                            <img src="/aboutus/logo.avif" alt="HomeId Logo" className="w-12 h-12" />
                            <h2 className="text-2xl font-bold">HomeId</h2>
                        </div>

                        {/* Address & Contact Info */}
                        <p className="mt-2 text-gray-400 text-sm sm:text-base">
                            58 Howard Street #2, San Francisco <br />
                            contact@grandhome.com <br />
                            (+68)1221 09876
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                            <li><a href="#" className="hover:text-orange-500">Home</a></li>
                            <li><a href="#" className="hover:text-orange-500">About</a></li>
                            <li><a href="#" className="hover:text-orange-500">Services</a></li>
                            <li><a href="#" className="hover:text-orange-500">Blog</a></li>
                            <li><a href="#" className="hover:text-orange-500">Contact</a></li>
                        </ul>
                    </div>

                    {/* Popular Searches */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Popular Searches</h3>
                        <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                            <li><a href="#" className="hover:text-orange-500">Web Design</a></li>
                            <li><a href="#" className="hover:text-orange-500">SEO</a></li>
                            <li><a href="#" className="hover:text-orange-500">Digital Marketing</a></li>
                            <li><a href="#" className="hover:text-orange-500">E-commerce</a></li>
                            <li><a href="#" className="hover:text-orange-500">Branding</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
                        <p className="text-gray-400 text-sm sm:text-base mb-3">Subscribe to get the latest updates.</p>

                        {/* Full-width Input */}
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-gray-200 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3"
                        />

                        {/* Full-width Button Below */}
                        <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
