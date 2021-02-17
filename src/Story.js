import React from 'react';
import {useGlobalContext} from './context';

const Story = ({title='Title', url, points=0, author, num_comments=0, objectID}) => {
    const {removeStory} = useGlobalContext()
    return ( 
        <section className='story-wrapper'>
            <h1>{title}</h1>
            <p>{`${points} points by ${author} | ${num_comments} comments`}</p>
            <section className='btn-wrapper'>
                <a href={url} target="_blank"><button className='btn btn-read'>read more</button></a>
                <button className='btn btn-remove' onClick={() => removeStory(objectID)}>remove</button>
            </section>
        </section>
     );
}
 
export default Story;