import React, { useState, useEffect } from 'react';
import { debounce, options, asc_or_desc } from '../helpers';
import Card from '../components/Card';
import Select from '../components/Select';
import axios from 'axios';

function App() {
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [order, setOrder] = useState('');

  async function fetchPapers(url) {
    const request = await axios.get(url);
    if (request.data.results) {
      setPapers(request.data.results);
      setNextUrl(request.data.next);
    }
  }

  async function fetchNextPage(url) {
    const request = await axios.get(url);
    if (request.data.results) {
      setPapers(prevPapers => [...prevPapers, ...request.data.results]);
      setNextUrl(request.data.next);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const request = await axios.get(`papers/?search=${search}${order? '&ordering=' + order: ''}`)
    if (request.data.results) {
      setPapers(request.data.results);
      setNextUrl(request.data.next);
    }
  }

  async function updateOrder(data){
    if(!data) return;
    if(data === "-" && order){
      setOrder(data + order)
    } else{
      setOrder(data)
    }
  }

  async function handleSort(){
    let url
    if(nextUrl.includes("search")){
      url = nextUrl + "&ordering=" + order
    } else if(nextUrl.includes("page")) {
      url = "papers/?ordering=" + order
    } else {
      url = nextUrl + "?ordering=" + order
    }
    console.log(url)
    const request = await axios.get(url)
    if (request.data.results) {
      setPapers(request.data.results);
      setNextUrl(request.data.next);
    }
  }

  useEffect(() => {
    fetchPapers('/papers');
  }, []);

  useEffect(() => {
    handleSort()
  }, [order]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const triggerPoint = scrollableHeight * 0.8; // Adjust the threshold as needed
      if (window.scrollY >= triggerPoint && nextUrl) {
        fetchNextPage(nextUrl);
      }
    }, 250);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextUrl]);

  return (
    <>
      <nav className="w-full bg-slate-600 py-2 h-16 sticky top-0 z-10">
        <div className="w-[90%] max-w-6xl mx-auto flex justify-between min-h-full items-center">
          <h1 className='text-xl font-bold text-white'>iaps-paper-archive</h1>
          <form className='flex items-center gap-2' onSubmit={handleSearch}>
            <input placeholder="Search anything" className='px-2 rounded-md h-8' onChange={(e)=> setSearch(e.target.value)} value={search}/>
            <button className='bg-gray-400 h-8 rounded-md px-2'>Search</button>
          </form>
        </div>
      </nav>

      <div className="w-[90%] max-w-6xl mx-auto mt-4 h-screen flex flex-col gap-3" id="scrollable">
        <form className="flex gap-2">
          <Select options={options} updateOrderValue={updateOrder}/>
          <div>
            <Select options={asc_or_desc} updateOrderValue={updateOrder} asc_or_desc={true}/>
          </div>
        </form>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {papers.map((paper, index) => (
            <Card key={index} id={paper.id} title={paper.title} abstract={paper.abstract} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
