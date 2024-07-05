import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSolidMoviePlay } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { RiDraftLine, RiMovie2Line } from "react-icons/ri";
import Spinner from "@/components/Spinner";
import { FcRating } from "react-icons/fc";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    router.push('/auth');
    return null;  // return null or any loading indicator while redirecting
  }

  const { alldata, loading } = useFetchData('/api/getmovies');

  const publishedMovies = alldata.filter(movie => movie.status === 'Published');
  const draftMovies = alldata.filter(movie => movie.status === 'Draft');

  if (session) {
    return (
      <>
        <Head>
          <title>Movie App | Backend</title>
          <meta name="description" content="Movie website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {loading ? <Loading /> : <div className="container">
          <div className="topheadertitle flex flex-sb">
            <div>
              <h1 className="mb-1">Explore all type of movies here</h1>
              <p>Find your favorite movies here</p>
              <Link href="/"><button>Exclusive On <span>MakMovies</span></button></Link>
            </div>
            <img src="/img/rocket.png" alt="rocket" />
          </div>

          <div className="fourcards flex flex-sb">
            <div className="fcard">
              <div className="flex flex-sb">
                <div className="fcardsvg">
                  <BiSolidMoviePlay />
                </div>
                <h3>Total Movies</h3>
                <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100">
                <img src="/img/chartone.svg" alt="chart" />
                <h4>{publishedMovies.length}</h4>
              </div>
            </div>
            <div className="fcard">
              <div className="flex flex-sb">
                <div className="fcardsvg">
                  <TbCategoryPlus />
                </div>
                <h3>Categories</h3>
                <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100">
                <img src="/img/charttwo.svg" alt="chart" />
                <h4>11</h4>
              </div>
            </div>
            <div className="fcard">
              <div className="flex flex-sb">
                <div className="fcardsvg">
                  <RiMovie2Line />
                </div>
                <h3>All Genres</h3>
                <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100">
                <img src="/img/chartthree.svg" alt="chart" />
                <h4>7</h4>
              </div>
            </div>
            <div className="fcard">
              <div className="flex flex-sb">
                <div className="fcardsvg">
                  <RiDraftLine />
                </div>
                <h3>Draft Movies</h3>
                <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100">
                <img src="/img/chartfour.svg" alt="chart" />
                <h4>{draftMovies.length}</h4>
              </div>
            </div>
          </div>

          <div className="moviecards flex flex-col flex-left gap-2 w-100">
            <div className="flex flex-sb w-100 movietitle">
              <h2>List of Latest Movies</h2>
              <Link href="/addmovie"><button>Add Movie</button></Link>
            </div>
            {loading ? <div><Spinner /></div> : <>
              {publishedMovies.slice(0, 3).map((movie) => (
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
                    {/* {movie.download && movie.download['720p'] ? (
                      <Link href={movie.download['720p']}>720p</Link>
                    ) : (
                      <p>No 720p link available</p>
                    )}
                    {movie.download && movie.download['1080p'] ? (
                      <Link href={movie.download['1080p']}>1080p</Link>
                    ) : (
                      <p>No 1080p link available</p>
                    )}
                    {movie.download && movie.download['4k'] ? (
                      <Link href={movie.download['4k']}>4k</Link>
                    ) : (
                      <p>No 4k link available</p>
                    )} */}
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
            <Link href={'/movies'} className="loadmorehomebtn w-100 flex flex-center mt-2">
              <button>Load more</button>
            </Link>
          </div>
        </div>}
      </>
    );
  }
}