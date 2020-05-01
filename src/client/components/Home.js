import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>{
    return(
        <main>
            <section>
                <Link to="/news">View all the News</Link>
            </section>
        </main>
    )
}

export default Home;