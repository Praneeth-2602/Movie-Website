import Head from "next/head";
import useFetchData from "../hooks/useFetchData";
import { useEffect, useState } from "react";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Scrollbar } from "swiper/modules";
import Loader from "@/components/Loader";
import Link from "next/link";
import { FaDownload, FaAngleDoubleUp, FaFilm, FaStar, FaPlus, FaHeart, FaEye, FaPhotoVideo, FaCheck, FaArrowRight } from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import movies from "./movies";


export default function Home() {

  // fetch data from api
  const { alldata, loading } = useFetchData('/api/getmovies');

  const [wloading, setWLoading] = useState(true);

  // video animation function 
  useEffect(() => {
    // check if the user has visited the home page before
    const visitedbefore = sessionStorage.getItem('visitedHome');
    if (visitedbefore) {
      // if the user has visited the home page before, set the welcome animation to false
      setWLoading(false);
    } else {
      // if the user has not visited the home page before, set the welcome animation to true
      setTimeout(() => {
        setWLoading(false);
        // set the session storage to visitedHome 
        sessionStorage.setItem('visitedHome', 'yes');
      }, 3000);
    }
  }, []);

  const publishedData = alldata.filter(movie => movie.status === "Published");

  const [selectedGenre, setSelectedGenre] = useState("All Movies");

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  }
  const genres = ['All Movies', 'Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Crime', 'Fantasy', 'Horror', 'Romance', 'Thriller', 'Science_Fiction']

  const categories = ["Bollywood", "Hollywood", "South", "Gujarati", "Marvel_Studio", "Tv_Shows", "Web_Series"]

  const filteredData = publishedData.filter((movie) => {
    console.log("selectedGenre:", selectedGenre);
    if (selectedGenre === "All Movies") return true;
    if (categories.includes(selectedGenre)) return movie.category === selectedGenre;
    else return movie.genre.includes(selectedGenre);
  });
  console.log("filteredData:", filteredData);

  return (


    <>
      <Head>
        <title>Movie App | vbmcoder</title>
        <meta name="description" content="Next Js Movie App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {wloading ? <WelcomeAnimation /> : <div>
          <div className="swiper_top_main">
            <Swiper autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
              direction="horizontal"
              loop={true}
              speed={1200}
              watchSlidesProgress={true}
              parallax={true}
              pagination={{
                clickable: true
              }}
              modules={[Pagination, Navigation, Autoplay]}
              scrollbar={{ draggable: true }}
            >
              {loading ? <div className="slideimagebx flex flex-center"><Loader /></div> : <>
                {publishedData.slice(0, 4).map((movie) => (
                  (<SwiperSlide key={movie._id}>
                    <div className="slideimagebx">
                      {/* slideshow */}
                      <img src={movie.bgposter} alt="movie" loading="lazy" />
                      {/* content */}
                      <div className="content" key={movie._id}>
                        <div className="contentflex">
                          <div className="smlimg">
                            <img src={movie.smposter} alt="movie" loading="lazy" />
                          </div>
                          <div className="movieconte">
                            <h1 className="header_title">{movie.title}</h1>
                            <h6>Duration: <span id="header_dur">{movie.duration}</span></h6>
                            <h3 id="header_gen">
                              <span className="star">&#9733;</span>
                              {movie.rating}
                              <span>{movie.genre.join(', ')}</span>
                            </h3>
                            <div className="btns">
                              <Link href={`/movies/${movie.slug}`}>
                                <button className="btn_download">
                                  <FaDownload className="faDownload" /> DOWNLOAD <span>FREE</span>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>)
                ))}

              </>}

              <div className="swiper-pagination"></div>
              <div className="swiper-scrollbar"></div>


            </Swiper>
          </div>

          <div className="tranding_bx">
            <li><Link href='/all' className="active"><i><FaAngleDoubleUp className="fas" /></i> Latest</Link></li>
            <li><Link href='/movies' className="active"><i><FaFilm className="fas" /></i> Movies</Link></li>
            <li><Link href='/series' className="active"><i><FaStar className="fas" /></i> Series</Link></li>
            <li><Link href='/' className="active"><i><FaPlus className="fas" /></i> Recently Added</Link></li>
          </div>

          <div className="scrollcardssec">
            <Swiper
              slidesPerView={8}
              spaceBetween={10}
              className="myswiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              direction="horizontal"
              loop={true}
              speed={1200}
              watchSlidesProgress={true}
              parallax={true}
              modules={[Pagination, Navigation, Autoplay, Scrollbar]}
              breakpoints={{
                1587: {
                  slidesPerView: 8,
                  spaceBetween: 10
                },
                1287: {
                  slidesPerView: 6,
                  spaceBetween: 10
                },
                987: {
                  slidesPerView: 5,
                  spaceBetween: 10
                },
                787: {
                  slidesPerView: 4,
                  spaceBetween: 10
                },
                587: {
                  slidesPerView: 3,
                  spaceBetween: 10
                },
                387: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
              }}
            >
              <div className="scrollcards">
                {loading ? <div className="scrollcardssec flex flex-center h-15vh"><Loader /></div> : <>
                  {publishedData.map((movie) => (
                    <SwiperSlide key={movie._id}>
                      <div className="card">
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

                    </SwiperSlide>))}
                </>}
              </div>
            </Swiper>
          </div>

          <div className="tranding_bx" style={{ marginTop: '40px' }}>
            <li><Link href='/movies'><i><FaPhotoVideo className="fas" /></i> Movies</Link></li>
            <li><Link href='/series'><i><FaFilm className="fas" /></i> Series</Link></li>
            <li><Link href='/series'><i><FaCheck className="fas" /></i> Original Series</Link></li>
            <li><Link href='/genre'><i><FaClapperboard className="fas" /></i> </Link>Genre</li>
          </div>

          <div className="moviestegs">
            {/* mapping over the genres array to generate the buttons */}
            {genres.slice(0, 16).map((genre) => (
              <button key={genre} onClick={() => handleGenreClick(genre)} className={selectedGenre === genre ? "active" : ""}>
                {genre}
              </button>
            ))}
            {categories.map((category) => (
              <button key={category} onClick={() => handleGenreClick(category)} className={selectedGenre === category ? "active" : ""}>
                {category}
              </button>
            ))}

            <div className="moviescontainer">
              {loading ? <div className="scrollcardssec flex flex-center h-15vh"><Loader /></div> : <>
                {filteredData.length === 0 ? <p className="nodatafound">No movie found</p> : <>
                  {filteredData.map((movie) => (
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


                </>}
              </>}
            </div>
          </div>

          <div className="nextpagelink">
            <Link href="/all">
              <button className="cssbuttons_io_button">Next Page
                  <div className="icon">
                    <FaArrowRight/>
                  </div>
              </button>
            </Link>
          </div>
        </div>}
      </div>



    </>
  );
}
