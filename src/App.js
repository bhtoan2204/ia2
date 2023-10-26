import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

function App()
{
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('dogs');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const client_id = '--1pk-owdpdWruNroHsr2IoCc0NaTnqG1B5UbacCHoM';

  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}&per_page=10`;

  const fetchImage = () =>
  {
    axios
      .get(fetchUrl)
      .then((response) =>
      {
        const newImages = response.data.results;
        setData((prevData) => [...prevData, ...newImages]);
        setPage(page + 1);

        if (newImages.length === 0)
        {
          setHasMore(false);
        }
      })
      .catch((error) =>
      {
        console.error('Error fetching images:', error);
      });
  };

  useEffect(() =>
  {
    setPage(1);
    setHasMore(true);
    setData([]);
    fetchImage();
  }, [query]);

  const searchImages = (e) =>
  {
    if (e.keyCode === 13)
    {
      setQuery(e.target.value);
      setData([]);
    }
  };

  return (
    <>
      <div className="title-container">
        <h1 className="app-title">Image Search App</h1>
      </div>
      <div className="form">
        <input
          className="input"
          type="text"
          onKeyDown={(e) => searchImages(e)}
          placeholder="Search pictures"
        />
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchImage}
        hasMore={hasMore}
        loader={
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="card-list">
          {data.map((image, index) => (
            <div className="container" key={index}>
              <img className="card--image" src={image.urls.regular} alt={image.alt_description} />
              <h4>Photo by {image.user.name}</h4>
              <h5>{image.alt_description}</h5>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default App;
