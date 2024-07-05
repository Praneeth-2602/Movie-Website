import { useState } from "react";
import { useRouter } from "next/router"
import useFetchData from "@/hooks/useFetchData";
import Link from 'next/link';
import Spinner from "@/components/Spinner";
import { FcRating } from "react-icons/fc";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function movies() {

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <Loading />;
    }

    if (!session) {
        router.push('/auth');
        return null;  // return null or any loading indicator while redirecting
    }

    // fetch api
    const { alldata, loading } = useFetchData('/api/getmovies');

    const allMovie = alldata.length;    // total number of movies

    const [currentPage, setCurrentPage] = useState(1); // current page
    const [moviesPerPage] = useState(7); // seven movies per page
    const [searchQuery, setSearchQuery] = useState(''); // search query
    const filteredMovies = searchQuery.trim() === "" ? alldata : alldata.filter(ab => ab.title.toLowerCase().includes(searchQuery.toLowerCase())); // filter movies

    const indexOfFirstMovie = (currentPage - 1) * moviesPerPage; // index of first movie
    const indexOfLastMovie = currentPage * moviesPerPage; // index of last movie

    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const publishedMovies = currentMovies.filter(ab => ab.status === 'Published');   // filter publish data

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }; // paginate function


    // get the current page movies

    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allMovie / moviesPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    if (session) {
        return <>
            <div className="container">
                <div className="moviecards flex flex-col flex-left gap-2 w-100">
                    <div className="flex flex-sb w-100 movietitle">
                        <h2>List of Published Movies</h2>
                        <Link href='/addmovie'><button>Add Movie</button></Link>
                    </div>

                    {loading ? <Spinner /> : <>
                        {publishedMovies.map((movie) => (
                            <div className="moviecard" key={movie._id}>
                                <img src={movie.bgposter || "/img/noimage.jpg"} alt="movie" />
                                <div className="moviecardinfo">
                                    <div>
                                        <h3>{movie.slug}</h3>
                                        <p>{movie.category}</p>
                                    </div>
                                    {movie.download && movie.download['480p'] ? (
                                        <Link href={movie.download['480p']}>480p</Link>
                                    ) : (
                                        <p>No 480p link available</p>
                                    )}
                                    <div>
                                        <FcRating /> {movie.rating}
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Link href={`/movies/edit/${movie._id}`}><button>Update movie</button></Link>
                                        <Link href={`/movies/delete/${movie._id}`}><button>Delete movie</button></Link>
                                    </div>
                                </div>
                            </div>

                        ))}

                    </>}

                    {publishedMovies.length === 0 ? "" :
                        <div className="blogpagination">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map((number) => (
                                <button key={number} onClick={() => paginate(number)} className={`${currentPage === number ? 'active' : ''}`}>{number}</button>
                            )
                            )}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentMovies.length < moviesPerPage || currentPage === pageNumbers.length}
                            >Next</button>
                        </div>
                    }
                </div>
            </div>
        </>
    }
}