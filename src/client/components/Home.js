import React from 'react';

const Home = () =>{
    return(
        <div>
            I'm the Best Home component
            <button onClick={()=> console.log('clicked')}>Click me</button>
        </div>
    )
}

export default Home;