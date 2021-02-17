import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import {useGlobalContext} from './context'
import Story from './Story'

function App() {
  const {loading, stories, totalPage, page,handlePage} = useGlobalContext();
  console.log(stories, totalPage)
  return (
    <main className='main-wrapper'>
      <SearchForm />
      {stories.length > 0 ? 
        <section className='controller-wrapper'>
          <button className='ctrl-btn' onClick={() => handlePage(-1)}> prev</button>
          <span>{`${page} of ${totalPage}`}</span>
          <button className='ctrl-btn' onClick={() => handlePage(1)}> next</button>
        </section> : null}
      {
        loading ? <div className='loader'></div> :
      
      <section className='story-container'>
        
        <section className='story-area'>
        {stories.length < 1 ? <h1>There are no stories in the board</h1> :
        stories.map(item => <Story key={item.objectID} {...item} />)}
        </section>
      </section>
      }
    </main>
  );
}

export default App;
