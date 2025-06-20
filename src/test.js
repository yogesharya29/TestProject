import React, { useState, useMemo, useCallback } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// --- MOCK DATA ---
// In a real-world application, this would come from an API.
const carData = [
  {
    id: 1,
    brand: "Tesla",
    model: "Model S",
    price: 79990,
    weight: 2108, // in kg
    rating: 4.8,
    type: "Electric",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF?text=Tesla+Model+S",
    specifications: {
      range: "405 miles",
      topSpeed: "200 mph",
      acceleration: "1.99s 0-60mph",
      drivetrain: "AWD"
    }
  },
  {
    id: 2,
    brand: "Ford",
    model: "Mustang Mach-E",
    price: 45995,
    weight: 2257, // in kg
    rating: 4.5,
    type: "Electric",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF?text=Ford+Mustang+Mach-E",
    specifications: {
      range: "314 miles",
      topSpeed: "111 mph",
      acceleration: "5.8s 0-60mph",
      drivetrain: "RWD/AWD"
    }
  },
  {
    id: 3,
    brand: "Porsche",
    model: "Taycan",
    price: 82700,
    weight: 2295, // in kg
    rating: 4.7,
    type: "Electric",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF?text=Porsche+Taycan",
    specifications: {
      range: "227 miles",
      topSpeed: "161 mph",
      acceleration: "2.6s 0-60mph",
      drivetrain: "AWD"
    }
  },
  {
    id: 4,
    brand: "Toyota",
    model: "Camry",
    price: 25295,
    weight: 1580, // in kg
    rating: 4.2,
    type: "Sedan",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF?text=Toyota+Camry",
    specifications: {
      engine: "2.5L 4-Cylinder",
      mpg: "28/39",
      horsepower: "203 hp",
      drivetrain: "FWD"
    }
  },
  {
    id: 5,
    brand: "Honda",
    model: "CR-V",
    price: 26800,
    weight: 1585, // in kg
    rating: 4.6,
    type: "SUV",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF?text=Honda+CR-V",
    specifications: {
      engine: "1.5L Turbo",
      mpg: "28/34",
      horsepower: "190 hp",
      drivetrain: "FWD/AWD"
    }
  },
  {
    id: 6,
    brand: "BMW",
    model: "X5",
    price: 60600,
    weight: 2189, // in kg
    rating: 4.4,
    type: "SUV",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF?text=BMW+X5",
    specifications: {
      engine: "3.0L 6-Cylinder Turbo",
      mpg: "21/26",
      horsepower: "335 hp",
      drivetrain: "AWD"
    }
  },
  {
    id: 7,
    brand: "Audi",
    model: "A4",
    price: 39100,
    weight: 1645, // in kg
    rating: 4.3,
    type: "Sedan",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF?text=Audi+A4",
    specifications: {
      engine: "2.0L 4-Cylinder Turbo",
      mpg: "25/34",
      horsepower: "201 hp",
      drivetrain: "FWD/AWD"
    }
  },
  {
    id: 8,
    brand: "Jeep",
    model: "Wrangler",
    price: 29995,
    weight: 1986, // in kg
    rating: 4.0,
    type: "SUV",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF?text=Jeep+Wrangler",
    specifications: {
      engine: "3.6L V6",
      mpg: "20/24",
      horsepower: "285 hp",
      drivetrain: "4WD"
    }
  }
];

// --- HELPER FUNCTIONS ---
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

// --- SVG ICONS ---
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- SEO Component ---
// Manages page title and meta tags for better search engine indexing.
const Seo = ({ title, description }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
);


// --- Filter and Sort Bar Component ---
// Provides interactive controls for filtering and sorting the car list.
const FilterSortBar = ({ filters, setFilters, sort, setSort }) => {
    const brands = useMemo(() => [...new Set(carData.map(car => car.brand))], []);
    const types = useMemo(() => [...new Set(carData.map(car => car.type))], []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const resetFilters = () => {
      setFilters({
        brand: "all",
        type: "all",
        priceRange: { min: 0, max: 100000 },
      });
      document.getElementById('priceRange').value = 100000;
    }

    return (
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg mb-8 sticky top-0 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Brand Filter */}
                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-slate-300 mb-1">Brand</label>
                    <select id="brand" name="brand" value={filters.brand} onChange={handleFilterChange} className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
                        <option value="all">All Brands</option>
                        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                </div>
                {/* Car Type Filter */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-1">Type</label>
                    <select id="type" name="type" value={filters.type} onChange={handleFilterChange} className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
                        <option value="all">All Types</option>
                        {types.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                {/* Price Range Filter */}
                <div className="md:col-span-2 lg:col-span-1">
                    <label htmlFor="priceRange" className="block text-sm font-medium text-slate-300 mb-1">Max Price: {formatCurrency(filters.priceRange.max)}</label>
                    <input 
                      type="range" 
                      id="priceRange" 
                      min="0" 
                      max="100000" 
                      step="1000" 
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, max: Number(e.target.value) }}))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                    />
                </div>
                 {/* Sort Options */}
                <div>
                    <label htmlFor="sort" className="block text-sm font-medium text-slate-300 mb-1">Sort By</label>
                    <select id="sort" value={sort} onChange={handleSortChange} className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating_desc">Rating: High to Low</option>
                        <option value="weight_asc">Weight: Low to High</option>
                    </select>
                </div>
                 <button onClick={resetFilters} className="w-full md:w-auto bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out self-end">
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

// --- Car Card Component ---
// Displays individual car information in a card format.
// React.memo optimizes performance by preventing re-renders if props haven't changed.
const CarCard = React.memo(({ car, onCompare, isComparing }) => {
    return (
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex flex-col">
            <img 
                className="w-full h-56 object-cover" 
                src={car.imageUrl} 
                alt={`${car.brand} ${car.model}`}
                // Native lazy loading for performance optimization
                loading="lazy" 
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1E293B/FFFFFF?text=Image+Not+Found' }}
            />
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white">{car.brand} {car.model}</h3>
                <p className="text-slate-400 text-lg mb-4">{car.type}</p>
                <div className="flex justify-between items-center text-white mb-4">
                    <span className="text-2xl font-semibold text-cyan-400">{formatCurrency(car.price)}</span>
                    <span className="flex items-center text-lg bg-slate-700 px-3 py-1 rounded-full">
                        <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        {car.rating}
                    </span>
                </div>
                <p className="text-slate-500 text-sm mb-4">Weight: {car.weight} kg</p>
                
                <button 
                    onClick={() => onCompare(car.id)}
                    className={`w-full mt-auto font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out ${isComparing ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}`}
                >
                    {isComparing ? 'Remove from Compare' : 'Add to Compare'}
                </button>
            </div>
        </div>
    );
});

// --- Comparison View Component ---
// Shows a side-by-side table of selected cars for comparison.
const ComparisonView = ({ carIds, onRemove }) => {
    const carsToCompare = useMemo(() => carData.filter(car => carIds.includes(car.id)), [carIds]);
    
    // Get all unique specification keys from the selected cars.
    // This hook must be called on every render, unconditionally.
    const allSpecKeys = useMemo(() => {
        const keys = new Set();
        carsToCompare.forEach(car => {
            if (car.specifications) {
                Object.keys(car.specifications).forEach(key => keys.add(key));
            }
        });
        return Array.from(keys);
    }, [carsToCompare]);

    // The conditional return must happen *after* all hooks have been called.
    if (carsToCompare.length === 0) {
        return null;
    }

    const formatSpecKey = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    return (
        <div className="my-12">
            <h2 className="text-4xl font-bold text-white text-center mb-8">Comparison</h2>
            <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-2xl p-4">
                <table className="w-full min-w-[800px] border-collapse text-left">
                    <thead>
                        <tr className="border-b-2 border-slate-700">
                            <th className="p-4 font-semibold text-lg text-slate-300 w-1/5">Feature</th>
                            {carsToCompare.map(car => (
                                <th key={car.id} className="p-4 font-semibold text-lg text-white text-center">
                                    <div className="flex flex-col items-center">
                                        <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="h-20 w-auto object-cover rounded-md mb-2" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1E293B/FFFFFF?text=Image+Not+Found' }} />
                                        {car.brand} {car.model}
                                        <button onClick={() => onRemove(car.id)} className="text-red-500 hover:text-red-400 mt-1">
                                            <XIcon />
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Static Rows */}
                        <tr className="border-b border-slate-700"><td className="p-4 font-bold text-slate-400">Price</td>{carsToCompare.map(car => <td key={car.id} className="p-4 text-center text-cyan-400 font-semibold text-lg">{formatCurrency(car.price)}</td>)}</tr>
                        <tr className="border-b border-slate-700"><td className="p-4 font-bold text-slate-400">Rating</td>{carsToCompare.map(car => <td key={car.id} className="p-4 text-center text-white">{car.rating} / 5</td>)}</tr>
                        <tr className="border-b border-slate-700"><td className="p-4 font-bold text-slate-400">Weight</td>{carsToCompare.map(car => <td key={car.id} className="p-4 text-center text-white">{car.weight} kg</td>)}</tr>
                        <tr className="border-b border-slate-700"><td className="p-4 font-bold text-slate-400">Type</td>{carsToCompare.map(car => <td key={car.id} className="p-4 text-center text-white">{car.type}</td>)}</tr>

                        {/* Dynamic Specification Rows */}
                        {allSpecKeys.map(key => (
                            <tr key={key} className="border-b border-slate-700">
                                <td className="p-4 font-bold text-slate-400">{formatSpecKey(key)}</td>
                                {carsToCompare.map(car => (
                                    <td key={car.id} className="p-4 text-center text-white">
                                        {car.specifications[key] || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Main App Component ---
// The root component that orchestrates the entire application.
export default function App() {
    const [filters, setFilters] = useState({
        brand: 'all',
        type: 'all',
        priceRange: { min: 0, max: 100000 },
    });
    const [sort, setSort] = useState('price_asc');
    const [comparisonList, setComparisonList] = useState([]);

    // Memoized calculation for filtering and sorting cars to optimize performance.
    // This logic only re-runs when carData, filters, or sort order change.
    const filteredAndSortedCars = useMemo(() => {
        let result = [...carData];

        // Apply filters
        result = result.filter(car => {
            const brandMatch = filters.brand === 'all' || car.brand === filters.brand;
            const typeMatch = filters.type === 'all' || car.type === filters.type;
            const priceMatch = car.price <= filters.priceRange.max;
            return brandMatch && typeMatch && priceMatch;
        });

        // Apply sorting
        result.sort((a, b) => {
            switch (sort) {
                case 'price_desc':
                    return b.price - a.price;
                case 'rating_desc':
                    return b.rating - a.rating;
                case 'weight_asc':
                    return a.weight - b.weight;
                case 'price_asc':
                default:
                    return a.price - a.price;
            }
        });
        
        return result;
    }, [filters, sort]);

    // useCallback to memoize the function, preventing unnecessary re-creation on re-renders.
    const handleCompareToggle = useCallback((carId) => {
        setComparisonList(prev => {
            if (prev.includes(carId)) {
                return prev.filter(id => id !== carId);
            } else {
                if (prev.length < 4) { // Limit comparison to 4 cars
                    return [...prev, carId];
                }
                // NOTE: Replaced alert with console.warn for better integration in non-browser environments.
                // In a real app, a modal or toast notification is preferred.
                console.warn("You can only compare up to 4 cars at a time.");
                return prev;
            }
        });
    }, []);
    
    const handleAlertClick = useCallback((carId) => {
        setComparisonList(prev => {
            if (prev.includes(carId)) {
                return prev.filter(id => id !== carId);
            } else {
                if (prev.length < 4) { // Limit comparison to 4 cars
                    return [...prev, carId];
                }
                alert("You can only compare up to 4 cars at a time."); // In a real app, use a modal/toast
                return prev;
            }
        });
    }, []);


    return (
        <HelmetProvider>
            <Seo
                title="Car Comparison Dashboard - Compare Prices & Specs"
                description="Find the perfect car by comparing models side-by-side. Filter by price, brand, type, and more. See detailed specifications and ratings."
            />
            <div className="bg-slate-900 min-h-screen text-white font-sans">
                <main className="container mx-auto px-4 py-8">
                    <header className="text-center mb-10">
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 mb-2">Car Comparison Dashboard</h1>
                        <p className="text-lg text-slate-400">Your ultimate guide to choosing the right car.</p>
                    </header>
                    
                    <FilterSortBar filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />

                    <ComparisonView carIds={comparisonList} onRemove={handleCompareToggle} />
                    
                    {filteredAndSortedCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredAndSortedCars.map(car => (
                                <CarCard 
                                    key={car.id} 
                                    car={car} 
                                    onCompare={handleCompareToggle}
                                    isComparing={comparisonList.includes(car.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl text-slate-400">No cars match your criteria.</h2>
                            <p className="text-slate-500 mt-2">Try adjusting your filters.</p>
                        </div>
                    )}
                </main>
                 <footer className="text-center py-6 text-slate-500 border-t border-slate-800 mt-12">
                    <p>Car Comparison Dashboard &copy; 2025. All rights reserved.</p>
                </footer>
            </div>
        </HelmetProvider>
    );
}

/**
 * --- TESTING NOTES ---
 * * In a real development environment, you would use a library like Jest and React Testing Library.
 * Here's how you might test some of the components:
 * * 1.  FilterSortBar.js
 * - Test Case: "Should call setFilters when brand is changed."
 * - Method: Render the component, simulate a `change` event on the brand `<select>` element,
 * and assert that the `setFilters` mock function was called with the correct payload.
 *
 * 2.  CarCard.js
 * - Test Case: "Should display the car's name, price, and rating."
 * - Method: Render the component with mock car data and assert that the elements containing
 * the brand/model, price (formatted correctly), and rating are present in the document.
 * - Test Case: "Should call onCompare with the car's ID when the compare button is clicked."
 * - Method: Render the component with a mock `onCompare` function. Simulate a `click` on the
 * button and assert that the mock function was called with the expected car ID.
 * * 3.  App.js (Integration Test)
 * - Test Case: "Should filter the list of cars when a brand is selected."
 * - Method: Render the full App component. Simulate a `change` event on the brand filter.
 * Assert that the cars displayed on the screen now only belong to the selected brand.
 * - Test Case: "Should add a car to the comparison view when 'Add to Compare' is clicked."
 * - Method: Render the App. Click a car's compare button. Assert that the ComparisonView component
 * is now visible and contains the selected car's details.
 */
