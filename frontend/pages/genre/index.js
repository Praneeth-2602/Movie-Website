import React from 'react'
import Head from 'next/head'
import Genrecard from '@/components/Genrecard'



const category = (props) => {
    return (
        <>
        <Head>
            <title>Genre - Category | Makmovies</title>
        </Head>

        <section className="genrenamesec">
            <div className="genrename">
                <h1>Explore by Genre</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat beatae nulla vel ex earum neque voluputate magnam veniam.</p>
            </div>
        </section>
        <section className="genrenamesec genremovie">
            <Genrecard link={'/genre/action'} img={'/img/action.jpg'} title={'Action Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/comedy'} img={'/img/comedy.jpg'} title={'Comedy Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/drama'} img={'/img/drama.jpg'} title={'Drama Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/horror'} img={'/img/horror.jpg'} title={'Horror Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/scifi'} img={'/img/scifi.jpg'} title={'Sci-fi Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/animation'} img={'/img/animation.jpg'} title={'Animation Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/thriller'} img={'/img/thriller.jpg'} title={'Thriller Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/fantasy'} img={'/img/fantasy.jpg'} title={'Fantasy Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/mystery'} img={'/img/mystery.jpg'} title={'Mystery Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/adventure'} img={'/img/adventure.jpg'} title={'Adventure Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/crime'} img={'/img/crime.jpg'} title={'Crime Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/romantic'} img={'/img/romantic.jpg'} title={'Romantic Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>
            <Genrecard link={'/genre/documentary'} img={'/img/documentary.jpg'} title={'Documentary Movies'} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aut necessitatibus dignissimos, repellendus libero distinctio quaerat"}/>

        </section>
        </>
    )
}

export default category