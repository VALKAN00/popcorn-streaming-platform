export default function Footer() {
  return (
    <footer className="w-full text-gray-400 py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <hr className="mb-6 border-gray-600" />
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} <span className="font-semibold text-white">Abdelrhman Ahmed</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
