import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaEye, FaHeart, FaStar } from 'react-icons/fa';



export default function genres() {

    const router = useRouter();
    const { genre } = router.query;

    // function for capitalize the first letter of the string
    const capitalizeTitle = (str) => {
        if(typeof str !== 'string') return '';

        return str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }    

    const capitalizedGenre = capitalizeTitle(genre);

    // use hooks
    const { alldata, loading } = useFetchData(`/api/getmovies?genre=${capitalizedGenre}`);

    // for head title
    const pagetitle = `${router.query.genre} - Genre | Makmovies`;

    const capitalizedTitle = capitalizeTitle(pagetitle);

    return (

        <>
            <Head>
                <title>{capitalizedTitle}</title>
            </Head>

            <section className="genrenamesec">
                <div className="genrename">
                    <h1>Genre: {router.query.genre}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit perferendis atque assumenda porro consequatur illo accusantium suscipit fuga veritatis iure, doloremque ratione? Nulla, pariatur similique.</p>
                </div>
            </section>
            <div className="genremoviesec">
                <div className="genremovie">
                    {loading ? <Spinner /> : <>
                        {alldata.length === 0 ? <p className='nodatafound'>No Movies Found</p> : <>
                            {alldata.map((movie) => (
                                <div className="mcard">
                                    <Link href={`/movies/${movie.slug}`}>
                                        <div className="cardimg">
                                            <img src={movie.smposter} alt="movies" loading="lazy" />
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
                        </> }

                    </>}
                </div>
            </div>

        </>
    )
}


