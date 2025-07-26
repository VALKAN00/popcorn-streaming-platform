import './App.css';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Homepage from './pages/HomePage.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import TvShows from './pages/TvShows.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import MyListPage from './pages/MyListPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { Routes, Route } from 'react-router-dom';
import { MylistProvider } from './components/context/MylistContext.jsx';
import { FavoriteMoviesProvider } from './components/context/MoviesContext.jsx';
import CategoryDetailPage from './pages/CategoryDetailPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import PlansPage from './pages/PlansPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';

function App() {
  return (
    <MylistProvider>
      <FavoriteMoviesProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/tv-shows" element={<TvShows />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/my-list" element={<MyListPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/categories/:name" element={<CategoryDetailPage />} />
              <Route path="/search/:query" element={<SearchPage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/checkout/:planName" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoriteMoviesProvider>
    </MylistProvider>
  );
}

export default App;
