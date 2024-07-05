import React, { useState } from 'react';
import useFetchData from "@/hooks/useFetchData";
import Link from 'next/link';
import { VscThreeBars } from "react-icons/vsc";
import { PiWindowsLogoBold } from "react-icons/pi";
import { IoLanguage, IoNotificationsSharp } from 'react-icons/io5';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';


export default function Header() {

    const { data: session } = useSession()


    // fetch api
    const { alldata, loading } = useFetchData('/api/getmovies');

    const [searchQuery, setSearchQuery] = useState('');
    const [openSearch, setOpenSearch] = useState(false);

    // search bar open close 
    const handleOpen = () => {
        setOpenSearch(!openSearch);
    }

    const handleClose = () => {
        setSearchQuery('');
        setOpenSearch(false);
    }

    // filter publish data
    const publishedMovies = alldata.filter(ab => ab.status === 'Published');

    // search query
    const filteredMovies = alldata.filter(ab => ab.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return <>
        <header className='header'>
            <div className="flex flex-sb">
                <div className="headerbar">
                    <VscThreeBars />
                </div>

                {session && (
                    <div className="searchheaderinput">
                        <input type="text" placeholder='Search Movies here' value={searchQuery}
                            onClick={handleOpen}
                        />
                    </div>)}

                <ul className="flex gap-2">
                    <Link href='/'><li><PiWindowsLogoBold /></li></Link>
                    <Link href='/'><li><IoLanguage /></li></Link>
                    <Link href='/'><li><IoNotificationsSharp /></li></Link>
                    <Link href='/'><li><MdOutlineStickyNote2 /></li></Link>
                    <Link href='/'><li><img src="/img/user.png" alt="user" /></li></Link>
                </ul>
            </div>

            {openSearch && (
                <div className="fixedsearchq">
                    <input type="text" placeholder='Search Movies here' value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <div className="searchresultofinput">
                            <>
                                {filteredMovies.length > 0 ? (
                                    filteredMovies.slice(0, 10).map(movies => (
                                        <div className="siresult" key={movies._id}>
                                            <img src={`${movies.smposter}`} alt="movie" />
                                            <div className="simovieinfo">
                                                <h3>{movies.title}</h3>
                                                <div className='udbtns'>
                                                    <Link href={`/movies/edit/${movies._id}`}>Update</Link>
                                                    <Link href={`/movies/delete/${movies._id}`}>Delete</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='w-100 flex flex-center'>No Movie Found</div>
                                )}
                            </>
                        </div>
                    )}
                    <button className='closesearch' onClick={handleClose}>x</button>

                </div>
            )}
        </header>
    </>;
}
