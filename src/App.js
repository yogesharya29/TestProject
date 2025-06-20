import React, { useState, useMemo, useCallback } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import logo from './logo.svg';
import './App.css';

import carData from './mock.json';
import Seo from './Component/Seo';
import FilterSortBar from './Component/FilterSortBar';
import ComparisonView from './Component/ComparisonView';
import CarCard from './Component/CarCard';

function App() {
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

    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

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
                    
                    <FilterSortBar filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} carData={carData} formatCurrency={formatCurrency} />

                    <ComparisonView carIds={comparisonList} onRemove={handleCompareToggle} carData={carData} formatCurrency={formatCurrency} />
                    
                    {filteredAndSortedCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredAndSortedCars.map(car => (
                                <CarCard 
                                    key={car.id} 
                                    car={car} 
                                    onCompare={handleCompareToggle}
                                    isComparing={comparisonList.includes(car.id)}
                                    formatCurrency={formatCurrency}
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

export default App;
