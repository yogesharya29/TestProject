import React, { useState, useMemo, useCallback } from 'react';


const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ComparisonView = ({ carIds, onRemove, carData, formatCurrency }) => {
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

export default ComparisonView;