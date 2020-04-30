import React from 'react';

const Home = () =>{
    return(
        <main>
            <section>
                I'm the Best Home component
                <button onClick={()=> console.log('clicked')}>Click me</button>
            </section>
        </main>
    )
}

export default Home;