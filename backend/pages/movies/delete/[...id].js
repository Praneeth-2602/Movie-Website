import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProduct() {

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

    // Function to go back to the home page
    function goBack() {
        router.push('/movies');
    }

    async function deleteMovie() {
        await axios.delete('/api/deletemovie?id=' + id)
        goBack();   // Go back to the home page
    }

    return <>

        <Head>
            <title>Update Website</title>
        </Head>

        <div className="blogpage container">
            <div className="titledashboard container flex flex-sb">
                <div className="mb-2">
                    <h2>Delete Movie: <span>{movieInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                    <svg
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                    >
                        <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
                    </svg>
                    <p className="cookieHeading">Are you sure?</p>
                    <p className="cookieDescription">If you delete this movie content it will bw permanently deletecard</p> 
                    <div className="buttonContainer">
                        <button onClick={deleteMovie} className="acceptButton">Delete</button>
                        <button onClick={goBack} className="declineButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}