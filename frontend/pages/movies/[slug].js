import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useFetchData from '@/hooks/useFetchData';
import { FaBookmark, FaCheck, FaThumbsDown, FaThumbsUp, FaImdb, FaHeart, FaEye, FaStar, FaInstagram, FaWhatsapp, FaFacebook, FaFacebookSquare, FaWhatsappSquare } from 'react-icons/fa';
import { FaShareFromSquare } from 'react-icons/fa6';
import { useRef, useState, useEffect } from 'react';

export default function MoviesPost() {
    const router = useRouter();
    const { slug } = router.query;

    // use hooks
    const { alldata, loading } = useFetchData(`/api/getmovies?slug=${slug}`);
    const { allMovies } = useFetchData('/api/getmovies');

    // filter for published movies required
    const publishedData = allMovies.filter((movie) => movie.status === 'Published');
    console.log('Published Movies:', publishedData);

    // scroll left right data
    const [scrollPosition, setScrollPosition] = useState(0);

    // scroll left right function
    const scrollLeft = () => {
        document.querySelector('.scrollcards').scrollLeft -= 300;
    };

    const scrollRight = () => {
        document.querySelector('.scrollcards').scrollLeft += 500;
    };


    const title = slug ? slug.replaceAll('-', ' ') : 'Default Title';
    const bgposter = alldata && alldata[0] ? alldata[0].bgposter : '/img/noimage.jpg'; // Use a default image
    const smposter = alldata && alldata[0] ? alldata[0].smposter : '/img/noimage.jpg'; // Use a default image
    const watchonline = alldata && alldata[0] ? alldata[0].watchonline : ' '; // Use a default image
    const rating = alldata && alldata[0] ? alldata[0].rating : ' '; // Use a default image
    const genre = alldata && alldata[0] ? alldata[0].genre : [];
    const duration = alldata && alldata[0] ? alldata[0].duration : ' '; // Use a default image
    const year = alldata && alldata[0] ? alldata[0].year : ' '; // Use a default image
    const quality = alldata && alldata[0] ? alldata[0].quality : ' '; // Use a default image
    const titlecategory = alldata && alldata[0] ? alldata[0].titlecategory : ' '; // Use a default image
    const description = alldata && alldata[0] ? alldata[0].description : ' '; // Use a default image
    const language = alldata && alldata[0] ? alldata[0].language : ' '; // Use a default image
    const genreJoin = Array.isArray(genre) ? genre.join(', ') : 'Unknown Genre';
    const subtitle = alldata && alldata[0] ? alldata[0].subtitle : ' '; // Use a default image
    const size = alldata && alldata[0] ? alldata[0].size : ' '; // Use a default image
    const p480 = alldata && alldata[0] ? alldata[0].download['480p'] : ' '; // Use a default image
    const p720 = alldata && alldata[0] ? alldata[0].download['720p'] : ' '; // Use a default image
    const p1080 = alldata && alldata[0] ? alldata[0].download['1080p'] : ' '; // Use a default image
    const k4 = alldata && alldata[0] ? alldata[0].download['4k'] : ' '; // Use a default image
    const youtubelink = alldata && alldata[0] ? alldata[0].youtubelink : ' '; // Use a default image
    const movieUrl = `https://www.makmovies.in/${slug}`;
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(movieUrl)}`;


    // share in whatsapp 
    const [showShareLinks, setShowShareLinks] = useState(false);
    const sharelinkref = useRef(null);

    const handleButtonClick = () => {
        setShowShareLinks(!showShareLinks);
    };

    const handlePageClick = (e) => {
        if (sharelinkref.current && !sharelinkref.current.contains(e.target)) {
            setShowShareLinks(false);
        }
    };

    useEffect(() => {
        // attach the click event listener
        document.addEventListener('click', handlePageClick);

        return () => {
            // detach the click event listener
            document.removeEventListener('click', handlePageClick);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <div className='slideimagebx'>
                    <img src={bgposter} alt='movie' loading='lazy' />
                </div>
                <div className="mainmoviebx" ref={sharelinkref}>
                    <div className="leftdata">
                        <div className="leftimgbx">
                            <img src={smposter} alt='movie' loading='lazy' />
                            <div className="seenonly">
                                <div className="seenwatch">
                                    <button><FaBookmark className='sebtn' />Watchlist</button>
                                    <button><FaCheck className='sebtn' />Seen</button>
                                    <button><FaThumbsUp className='sebtn' />Like</button>
                                    <button><FaThumbsDown className='sebtn' />Dislike</button>
                                </div>
                                <a target='_blank' href={watchonline}><button className="watchmoviebtn">Click to Watch Online</button></a>
                            </div>
                        </div>
                        <div className="rating">
                            <h3>Rating</h3>
                            <div className="rate">
                                <FaImdb className='faImdb' />
                                <h4>{rating} <span>IMDB</span></h4>
                            </div>
                        </div>
                        <div className="rating">
                            <h3>GENRE</h3>
                            <h4 className='uppercase'>{genre}</h4>
                        </div>
                        <div className="rating">
                            <h3>DURATION</h3>
                            <h4 className='uppercase'>{duration}</h4>
                        </div>
                        <div className="rating">
                            <h3>YEAR</h3>
                            <h4 className='uppercase'>{year}</h4>
                        </div>
                        <div className="rating">
                            <h3>QUALITY</h3>
                            <h4 className='uppercase'>{quality}</h4>
                        </div>
                    </div>
                    <div className="rightdata">
                        <div className="movietitle">
                            <h1>{title}</h1>
                            <button onClick={handleButtonClick} className="faShareFromSquare">
                                <FaShareFromSquare />
                            </button>
                        </div>
                        <p className="dpera">DOWNLOAD FREE NOW </p>
                        <div className="moviedescription">
                            <article className="movieinfo">
                                <h3 className="uppercase">{titlecategory} info :</h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='uppercase'>&#9642; {titlecategory} Name:</td>
                                            <td>{title.toUpperCase()}</td>
                                        </tr>
                                        <tr>
                                            <td className='uppercase'>&#9642; Release Year:</td>
                                            <td>{year}</td>
                                        </tr>
                                        <tr>
                                            <td className='uppercase'>&#9642; Genre:</td>
                                            <td>{genreJoin}</td>
                                        </tr>
                                        <tr>
                                            <td className='uppercase'>&#9642; Language:</td>
                                            <td>{language}</td>
                                        </tr>
                                        <tr>
                                            <td className='uppercase'>&#9642; Subtitle:</td>
                                            <td>{subtitle}</td>
                                        </tr>
                                        <tr>
                                            <td className='uppercase'>&#9642; Size:</td>
                                            <td>{size}</td>
                                        </tr>
                                        <tr>
                                            <td className='uppercase'>&#9642; Quality:</td>
                                            <td>{quality}</td>
                                        </tr>
                                        <tr>
                                            <td className='uppercase'>&#9642; Format:</td>
                                            <td>MKV</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </article>
                            <article>
                                <div className="storyline">
                                    <h3>Synopsis / Story Line: </h3>
                                    <p>{description}</p>
                                </div>
                            </article>
                            <section className="downloadsec">
                                <h2>G-Drive [GDToT] Download Links</h2>
                                <div className="downloadlinks">
                                    <a target='_blank' href={p480}>Download 480p</a>
                                    <a target='_blank' href={p720}>Download 720p</a>
                                    <a target='_blank' href={p1080}>Download 1080p</a>
                                    <a target='_blank' href={k4}>Download 2160p</a>
                                </div>
                            </section>
                        </div>
                        <div className="youtubeiframe">
                            <h3 id='movietrailer' className='uppercase'>{titlecategory} Trailer: </h3>
                            <iframe width="560" height="315" src={youtubelink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>                        </div>
                    </div>
                </div>
                <div className="raletedmovies">
                    <h3>LATEST MOVIES:</h3>
                    <div className="scrollcards">
                        {publishedData.slice(0, 12).map((movie) => (
                            <div className="card" key={movie._id}>
                                <Link href={`/movies/${movie.slug}`}>
                                    <div className="cardimg">
                                        <img src={movie.smposter} alt="movie" loading="lazy" />
                                    </div>
                                    <div className="contents">
                                        <h5>{movie.title}</h5>
                                        <h6>
                                            <span>{movie.year}</span>
                                            <div className="rate">
                                                <i className="cardfas">
                                                    <FaHeart />
                                                </i>
                                                <i className="cardfas">
                                                    <FaEye />
                                                </i>
                                                <i className="cardfas">
                                                    <FaStar />
                                                </i>
                                                <h6>{movie.rating}</h6>
                                            </div>
                                        </h6>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="cardbuttons">
                        <button onClick={scrollLeft} className='cardLeft'>&#8592;</button>
                        <button onClick={scrollRight} className='cardRight'>&#8594;</button>
                    </div>
                    <div className="sharelinks" style={{display: showShareLinks ? 'flex' : 'none'}}>
                        <div className="svg"><Link href={whatsappLink} target='_blank'>
                            <FaInstagram/>
                        </Link></div>
                        <div className="svg"><Link href={whatsappLink} target='_blank'>
                            <FaWhatsapp/>
                        </Link></div>
                        <div className="svg"><Link href={whatsappLink} target='_blank'>
                            <FaFacebook/>
                        </Link></div>
                    </div>
                </div>
            </div>
        </>
    );
}
