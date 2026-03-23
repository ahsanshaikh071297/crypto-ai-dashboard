import { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { searchCoins } from '../../services/api/coingeckoApi';

function Topbar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await searchCoins(query);
        setResults(response?.coins?.slice(0, 6) || []);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadSearchResults();
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectCoin = (coin) => {
    setQuery('');
    setResults([]);
    navigate(`/coin-details/${coin.id}`);
  };

  return (
    <header className="topbar">
      <div className="topbar-search-wrapper">
        <div className="topbar-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search a coin..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {query && (
          <div className="search-dropdown">
            {loading && <p className="search-status">Searching...</p>}

            {!loading && results.length === 0 && (
              <p className="search-status">No coins found</p>
            )}

            {!loading &&
              results.map((coin) => (
                <button
                  key={coin.id}
                  className="search-result-item"
                  onClick={() => handleSelectCoin(coin)}
                >
                  <img src={coin.thumb} alt={coin.name} className="search-coin-image" />
                  <div>
                    <p className="search-coin-name">{coin.name}</p>
                    <span className="search-coin-symbol">{coin.symbol.toUpperCase()}</span>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="topbar-actions">
        <button className="icon-btn">
          <FaMoon />
        </button>

        <button className="icon-btn">
          <FaBell />
        </button>

        <div className="profile-circle">A</div>
      </div>
    </header>
  );
}

export default Topbar;