import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, User, Menu, Tv, Refrigerator, 
  Wind, WashingMachine, Cpu, ChevronRight,
  Zap, X, Loader2
} from 'lucide-react';

const MOCK_CATEGORIES = [
  { id: 'c1', name: 'TV & Audio', icon: <Tv className="w-5 h-5 md:w-6 md:h-6" />, style: 'bg-blue-50 text-blue-500' },
  { id: 'c2', name: 'Refrigerators', icon: <Refrigerator className="w-5 h-5 md:w-6 md:h-6" />, style: 'bg-cyan-50 text-cyan-500' },
  { id: 'c3', name: 'Air Cond.', icon: <Wind className="w-5 h-5 md:w-6 md:h-6" />, style: 'bg-teal-50 text-teal-500' },
  { id: 'c4', name: 'Appliances', icon: <WashingMachine className="w-5 h-5 md:w-6 md:h-6" />, style: 'bg-indigo-50 text-indigo-500' },
  { id: 'c5', name: 'Smart Digital', icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />, style: 'bg-purple-50 text-purple-500' },
];

const MOCK_PRODUCTS = [
  {
    id: 101,
    title: 'Haier 500L Smart Inverter Double Door Refrigerator',
    desc: 'Grade 1 Energy Efficiency | No Frost | Smart Phone Control',
    price: 799,
    marketPrice: 899,
    coverUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    tags: ['Best Seller', 'Free Shipping']
  },
  {
    id: 102,
    title: 'SONY 65-inch 4K UHD Full-Screen Smart TV',
    desc: '120Hz Refresh Rate, XR Cognitive Chip, Dolby Atmos Sound',
    price: 999, 
    coverUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600',
    tags: ['New Arrival']
  },
  {
    id: 103,
    title: 'Midea Fully Automatic Inverter Washer-Dryer Combo 10KG',
    desc: 'Steam Sterilization, Smart Dispensing, Low Noise Operation',
    price: 549,
    marketPrice: 649,
    coverUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 104,
    title: 'GREE 1.5HP Inverter Wall-mounted Air Conditioner',
    desc: 'Rapid Cooling/Heating, Self-cleaning, Sleep Mode, Energy Saving',
    price: 399,
    marketPrice: 459,
    coverUrl: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&q=80&w=600',
    tags: ['Limited Offer']
  }
];

const ProductCard = ({ data, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100/80 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-square bg-gray-50 overflow-hidden cursor-pointer shrink-0">
        <img 
          src={data.coverUrl} 
          alt={data.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {data.tags?.length > 0 && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 flex gap-1 flex-wrap">
            {data.tags.map(tag => (
              <span key={tag} className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium px-1.5 py-0.5 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
        {/* Added line-clamp-2 to ensure titles don't break card heights on mobile */}
        <h3 className="text-sm md:text-base font-bold text-gray-800 mb-1 md:mb-1.5 leading-snug cursor-pointer group-hover:text-blue-600 transition-colors line-clamp-2">
          {data.title}
        </h3>
        {/* Added line-clamp-2 for descriptions */}
        <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 line-clamp-2">
          {data.desc}
        </p>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-baseline text-red-600">
              <span className="text-xs md:text-sm font-bold mr-0.5">$</span>
              <span className="text-lg md:text-2xl font-bold">{data.price}</span>
            </div>
            {data.marketPrice && (
              <div className="text-[10px] md:text-sm text-gray-400 line-through mt-0.5">
                ${data.marketPrice}
              </div>
            )}
          </div>
          <button 
            onClick={() => onAddToCart(data)}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors active:scale-95 shrink-0"
          >
            <ShoppingCart size={14} className="md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGoods(MOCK_PRODUCTS);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleAddCart = (item) => {
    setCartList(prev => [...prev, item]);
  };

  const cartTotalCount = cartList.length;

  return (
    <div className="min-h-screen bg-[#f5f7fa] font-sans text-gray-800 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-blue-600 p-1 md:p-1.5 rounded-lg">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
                Smart<span className="text-blue-600">Shop</span>
              </span>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-12">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search for appliances..."
                  className="w-full bg-gray-100/80 border-2 border-transparent text-base rounded-full pl-5 pr-12 py-2.5 outline-none focus:border-blue-200 focus:bg-white transition-all"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-7">
              <div className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 cursor-pointer">
                <User size={22} />
                <span className="text-base font-medium">Login</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 cursor-pointer relative group">
                <div className="relative">
                  <ShoppingCart size={22} />
                  {cartTotalCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-5 flex items-center justify-center px-1 border border-white">
                      {cartTotalCount}
                    </span>
                  )}
                </div>
                <span className="text-base font-medium">Cart</span>
              </div>
            </div>

            <div className="flex md:hidden items-center gap-4">
              <div className="relative cursor-pointer text-gray-700">
                <ShoppingCart size={22} />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center border border-white">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <button 
                className="text-gray-700 p-1 -mr-1 outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <nav className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 flex gap-8 text-base">
            <a href="#" className="py-2.5 text-blue-600 font-bold border-b-2 border-blue-600">Home Recommend</a>
            <a href="#" className="py-2.5 text-gray-600 hover:text-blue-600">Appliances</a>
            <a href="#" className="py-2.5 text-gray-600 hover:text-blue-600">Digital</a>
            <a href="#" className="py-2.5 text-gray-600 hover:text-blue-600 flex items-center gap-1">
              Trade-in <span className="bg-red-100 text-red-500 text-xs px-1.5 rounded">Hot</span>
            </a>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-md absolute w-full z-30">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 rounded-full pl-4 pr-10 py-2 text-sm outline-none"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="p-2.5 bg-blue-50 text-blue-600 rounded font-medium text-sm">Home Recommend</span>
            <span className="p-2.5 text-gray-700 active:bg-gray-50 rounded text-sm">Appliances</span>
            <span className="p-2.5 text-gray-700 active:bg-gray-50 rounded text-sm flex items-center justify-between">
              Trade-in <span className="bg-red-100 text-red-500 text-[10px] px-1.5 py-0.5 rounded">Hot</span>
            </span>
            <div className="h-px bg-gray-100 my-1"></div>
            <span className="p-2.5 text-gray-700 active:bg-gray-50 rounded text-sm flex items-center gap-2">
              <User size={16} /> Login
            </span>
          </div>
        </div>
      )}

      <main className="flex-1">
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:px-8 md:mt-6">
          <div className="relative bg-gray-900 md:rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] flex items-center">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=2000"
              alt="Smart Kitchen"
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            
            <div className="relative z-10 px-5 md:px-12 w-full sm:w-3/4 md:w-2/3">
              <span className="inline-block py-0.5 md:py-1 px-2 md:px-2.5 rounded text-blue-300 bg-blue-500/20 text-xs md:text-sm font-bold border border-blue-400/30 mb-2 md:mb-3 backdrop-blur-sm">
                2026 New Releases
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2 md:mb-5">
                Smart Living <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Within Reach</span>
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm md:text-lg mb-4 md:mb-8 max-w-md hidden sm:block leading-relaxed">
                Curated whole-house smart appliances, one-stop shopping. Using the latest IoT technology to make your home understand you better.
              </p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm md:text-base font-bold py-2 px-5 md:py-3 md:px-8 rounded-full transition-all shadow-lg hover:shadow-blue-600/40">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="grid grid-cols-5 gap-1 sm:gap-3 md:gap-6">
            {MOCK_CATEGORIES.map(cat => (
              <div key={cat.id} className="flex flex-col items-center cursor-pointer group">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-[1.2rem] flex items-center justify-center mb-1.5 md:mb-3 transition-transform group-hover:-translate-y-1 ${cat.style}`}>
                  {cat.icon}
                </div>
                {/* Text scales down heavily on mobile to prevent squishing */}
                <span className="text-[10px] sm:text-xs md:text-base font-medium text-gray-700 group-hover:text-blue-600 text-center leading-tight whitespace-nowrap">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16">
          <div className="flex justify-between items-baseline mb-4 md:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
              <div className="w-1 md:w-1.5 h-5 md:h-7 bg-blue-600 rounded-sm"></div>
              Recommended
            </h2>
            <a href="#" className="text-xs md:text-base text-gray-500 hover:text-blue-600 flex items-center">
              View More <ChevronRight size={16} className="w-3 h-3 md:w-4 md:h-4" />
            </a>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 md:py-20 text-gray-400">
              <Loader2 className="animate-spin mb-2 w-6 h-6 md:w-9 md:h-9" />
              <span className="text-sm md:text-base">Loading products...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 items-stretch">
              {goods.map(item => (
                <ProductCard key={item.id} data={item} onAddToCart={handleAddCart} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Removed "hidden md:block" so footer displays consistently across devices, stacking nicely on mobile */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
            <div className="col-span-1 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                <span className="text-lg md:text-xl font-black text-gray-900">SmartShop</span>
              </div>
              <p className="text-xs md:text-sm text-gray-500 leading-loose">
                Hotline: 400-123-4567<br/>
                Hours: 08:00 - 22:00
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm md:text-base mb-3 md:mb-4">Shopping Guide</h4>
              <ul className="text-xs md:text-sm text-gray-500 space-y-2 md:space-y-2.5 flex flex-col items-center md:items-start">
                <li className="cursor-pointer hover:text-blue-600">Process</li>
                <li className="cursor-pointer hover:text-blue-600">Membership</li>
                <li className="cursor-pointer hover:text-blue-600">FAQs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm md:text-base mb-3 md:mb-4">About Us</h4>
              <ul className="text-xs md:text-sm text-gray-500 space-y-2 md:space-y-2.5 flex flex-col items-center md:items-start">
                <li className="cursor-pointer hover:text-blue-600">Profile</li>
                <li className="cursor-pointer hover:text-blue-600">Careers</li>
                <li className="cursor-pointer hover:text-blue-600">Contact</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 md:mt-8 pt-6 border-t border-gray-100 text-center text-xs md:text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SmartShop. For demo purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}