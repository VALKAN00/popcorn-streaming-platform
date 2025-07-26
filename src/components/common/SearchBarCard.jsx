export default function SearchBarCard({ item }) {
  return (
    <>
      {(item.backdrop_path || item.poster_path) && (
        <div className="px-4 py-3 hover:bg-gray-800 transition duration-200 rounded-lg mb-5">
          <div className="search-bar-card flex flex-col sm:flex-row items-start sm:space-x-4 space-y-4 sm:space-y-0">
            <img
              className="rounded-lg shadow-md object-cover w-full sm:w-[100px] sm:h-[150px] max-w-[200px]"
              src={
                item.poster_path || item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w200${
                      item.poster_path || item.backdrop_path
                    }`
                  : "/placeholder.png"
              }
              alt={item.title || item.name}
            />

            <div className="flex flex-col justify-between text-gray-200 space-y-2 sm:space-y-3">
              <h3 className="text-lg font-semibold break-words">
                {item.title || item.name}
              </h3>
              <p className="text-sm text-gray-400">
                {item.release_date || item.first_air_date || "Unknown Release"}
              </p>
              <p className="text-sm text-yellow-400 font-medium">
                ⭐ {item.vote_average || "N/A"}
              </p>
            </div>
          </div>

          <hr className="border-gray-700 mt-3 w-[90%] mx-auto" />
        </div>
      )}
    </>
  );
}
