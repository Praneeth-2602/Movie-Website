import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { FaBars, FaStar } from 'react-icons/fa';
import useFetchData from '@/hooks/useFetchData';

export default function Header() {

    // navbar header sticky
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('nav');
            header.classList.toggle('sticky', window.scrollY > 0);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    // navbar toggle
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [searchbar, setSearchbar] = useState(false);

    const [activeLink, setActiveLink] = useState('/');

    // search function by title of the movie
    const [movieShortName, setMovieShortName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState('');

    // fetch data
    const { alldata, loading } = useFetchData(`/api/getmovies`);

    // filter for published movies required for search
    const publishedData = alldata.filter(movie => movie.status === "Published");
    // function to handle search
    useEffect(() => {
        const filteredMovies = publishedData.filter(movie => movie.title.toLowerCase().includes(movieShortName.toLowerCase()));
        setSearchResult(filteredMovies);
        console.log("Search Result:", searchResult);
    }, [movieShortName])

    const handleMovieClick = () => {
        setMovieShortName('');
    }

    const searchRef = useRef(null);

    // function for when click outside of the search bar will be closed
    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setMovieShortName('');
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    }

    useEffect(() => {
        // update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname])

    const handleNavbarOpen = () => {
        setNavbar(true);
    }

    const handleNavbarClose = () => {
        setNavbar(false);
    }

    const handleSearchbarOpen = () => {
        setSearchbar(!searchbar);
    }

    const handleSearchbarClose = () => {
        setSearchbar(false);
    }


    return <>
        <nav className="header">
            <h1 className="logo" data-text="&nbsp;Makmovies&nbsp;">
                <a href="/">&nbsp;Makmovies&nbsp;</a>
            </h1>
            <form className={searchbar ? "search_bar active" : "search_bar"}>
                <input type="text"
                    placeholder="Search for movies"
                    value={movieShortName}
                    onChange={(e) => setMovieShortName(e.target.value)}
                />
                <div className="searchclose" onClick={handleSearchbarClose}>
                    <IoClose />
                </div>
                {movieShortName && (
                    <div className="search_results">
                        <h2>---:Search Results:---</h2>
                        <ul>
                            {searchResult.length > 0 ? (
                                searchResult.slice(0, 20).map((movie) => (
                                    <Link onClick={handleMovieClick} href={`/movies/${movie.slug}`} key={movie._id}>
                                        <div className="moviesearchlist">
                                            <div>
                                                <img src={movie.smposter} alt="image" height={110} width={80} />
                                            </div>
                                            <div className="searchbarinfo">
                                                <h5>{movie.title}</h5>
                                                <h4>Rating: <FaStar /><span>{movie.rating}</span></h4>
                                                <h4>Release Year: {movie.year}</h4>
                                            </div>
                                        </div>
                                    </Link>

                                ))
                            ) : (
                                <p> No movie found</p>
                            )
                            }
                        </ul>
                    </div>
                )}
            </form>

            <div id={navbar ? "navbaractive" : "navbar"}>
                <div className="navlogomovie">
                    <h1 className="logo" data-text="&nbsp;Makmovies&nbsp;">
                        <a href="/">&nbsp;Makmovies&nbsp;</a>
                    </h1>
                    <div className="navclosesvg" onClick={handleNavbarClose}><IoClose /></div>
                </div>

                <ul className={clicked ? "navbar active" : "navbar"}>
                    <li>
                        <Link href="/"
                            className={activeLink === '/' ? 'active' : ''}
                            onClick={() => handleLinkClick('/')}
                        >Home</Link>
                    </li>
                    <li>
                        <Link href="/movies"
                            className={activeLink === '/movies' ? 'active' : ''}
                            onClick={() => handleLinkClick('/movies')}
                        >Movies</Link>
                    </li>
                    <li>
                        <Link href="/series"
                            className={activeLink === '/series' ? 'active' : ''}
                            onClick={() => handleLinkClick('/series')}
                        >Series</Link>
                    </li>
                    <li>
                        <Link href="/bollywood"
                            className={activeLink === '/bollywood' ? 'active' : ''}
                            onClick={() => handleLinkClick('/bollywood')}
                        >Bollywood</Link>
                    </li>
                    <li>
                        <Link href="/hollywood"
                            className={activeLink === '/hollywood' ? 'active' : ''}
                            onClick={() => handleLinkClick('/hollywood')}
                        >Hollywood</Link>
                    </li>
                    <li>
                        <Link href="/contact"
                            className={activeLink === '/contact' ? 'active' : ''}
                            onClick={() => handleLinkClick('/contact')}
                        >Contact</Link>
                    </li>
                </ul>
            </div>

            <div className="mobile">
                <BiSearch className='opensearchsvg' onClick={handleSearchbarOpen} />
                <FaBars onClick={handleNavbarOpen} />
            </div>
        </nav>

    </>
}