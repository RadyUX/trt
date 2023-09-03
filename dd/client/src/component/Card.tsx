function JobCard({ title, location, description }) {
    return (
      <div className="w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="px-4 py-2">
          <h1 className="text-3xl font-bold text-gray-900 uppercase">{title}</h1>
          <p className="mt-1 text-sm text-gray-600">{location}</p>
        </div>
  
        <div className="px-4 py-2 mt-2">
          <p className="text-sm text-gray-700">{description}</p>
        </div>
  
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <button className="text-sm text-white hover:underline">En savoir plus</button>
          <span className="text-sm text-white">Posté il y a 2 jours</span>
        </div>

        <button className="pointer">Apply</button>
      </div>
    );
}

export default JobCard;
