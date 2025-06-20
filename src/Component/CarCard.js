import React from 'react';



const CarCard = React.memo(({ car, onCompare, isComparing, formatCurrency }) => {
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

export default CarCard;