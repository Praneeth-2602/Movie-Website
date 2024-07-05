
import Head from "next/head";
import useFetchData from "../hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { FaStar, FaHeart, FaEye } from "react-icons/fa";


export default function hollywood() {

    // fetch data
    const { alldata, loading } = useFetchData('/api/getmovies');

    //filter for published movies
    const publishedData = alldata.filter(movie => movie.status === 'Published');

    console.log(publishedData);

    // now filter the data by movies
    const hollywoodData = publishedData.filter(movie => movie.category === 'hollywood');


    return <>
        <Head>
            <title>ALL Hollywood | Makmovies</title>
            <meta name="description" content="All the Web Series" />
        </Head>

        <section className="genrenamesec">
            <div className="genrename">
                <h1>Hollywood Movies</h1>
                <p>Explosive stunts, intense battles, and adrenaline-pumping thrills. Hero face danger head-on, showcasing their skills in action packed spectacles that leaces the audience on the edge.</p>
            </div>

        </section>
        <section className="genremoviesec">
            <div className="genremovie">
                {loading ? <Spinner /> : <>
                    {hollywoodData.map((movie) => (
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
                </>}
            </div>
        </section>
    </>
}