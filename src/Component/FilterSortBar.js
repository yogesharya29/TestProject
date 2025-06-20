import React, { useState, useMemo, useCallback } from 'react';

// --- Filter and Sort Bar Component ---
// Provides interactive controls for filtering and sorting the car list.
const FilterSortBar = ({ filters, setFilters, sort, setSort, carData, formatCurrency }) => {
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

export default FilterSortBar;