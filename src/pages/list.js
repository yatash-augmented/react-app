import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/list.css'
const List = ({ favorites, setFavorites, loadedItems, setLoadedItems }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadItems = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/1/photos`, {
        params: { _page: page, _limit: 10 },
      });
      setLoadedItems(prevItems => [...prevItems, ...response.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading]);

  useEffect(() => {
    if (loadedItems.length === 0) {
      loadItems();
    }
  }, [loadItems, loadedItems.length]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
    loadItems();
  }, [isLoading, loadItems]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleFavorite = (item) => {
    if (favorites.some(fav => fav.id === item.id)) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <div className="list-page">
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
      <div className="list">
      <ul>
        {loadedItems.map(item => (
         <div key={item.id} className="list-item">
         <img src={item.thumbnailUrl} alt={item.title} />
         <p>{item.title}</p>
            <button onClick={() => toggleFavorite(item)}>
              {favorites.some(fav => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </ul>
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default List;

