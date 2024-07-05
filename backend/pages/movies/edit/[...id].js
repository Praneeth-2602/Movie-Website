import MovieForm from "@/components/Movie";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [movieInfo, setMovieInfo] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/api/getmovies?id=' + id)
                .then(res => setMovieInfo(res.data))
                .catch(err => console.log(err));
        }
    }, [id]);

    return (
        <>
            <Head>
                <title>Edit Movie</title>
            </Head>

            <div className="blogpage">
                <div className="titledashboard container flex flex-sb">
                    <div className="mb-2">
                        <h2>Update Movie: <span>{movieInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                </div>
                <div className="mt-3 container">
                    {movieInfo && <MovieForm {...movieInfo} />}
                </div>
            </div>
        </>
    );
}
