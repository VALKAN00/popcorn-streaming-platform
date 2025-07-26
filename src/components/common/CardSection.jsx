import Card from "./Card.jsx";

// Corrected Code
export default function CardSection({ icon, title, movies_data, type }) {
  return (
    <section className="w-full px-2 sm:px-4 lg:px-6 xl:px-8 mt-10 max-w-[1600px] mx-auto">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center mb-10">
        <span className="text-4xl sm:text-5xl font-extrabold tracking-wide text-white">
          {icon}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-white">
          {title}
        </h2>
      </div>

      {/* Grid Layout for Movie Cards */}
      <div className="w-full flex justify-center items-center " >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies_data.map((movie) =>
            movie.backdrop_path ? (
              <div key={movie.id}>
                <Card movie={movie} type={type} />
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
