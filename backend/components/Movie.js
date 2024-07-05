import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

export default function MovieForm({
    _id,
    title: existingTitle,
    slug: existingSlug,
    bgposter: existingBgposter,
    smposter: existingSmposter,
    titlecategory: existingTitlecategory,
    description: existingDescription,
    rating: existingRating,
    year: existingYear,
    duration: existingDuration,
    genre: existingGenre,
    language: existingLanguage,
    subtitle: existingSubtitle,
    size: existingSize,
    quality: existingQuality,
    youtubelink: existingYoutubelink,
    category: existingCategory,
    watchonline: existingWatchonline,
    download: existingDownload,
    status: existingStatus
}) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [bgposter, setBgposter] = useState(existingBgposter || '');
    const [smposter, setSmposter] = useState(existingSmposter || '');
    const [titlecategory, setTitlecategory] = useState(existingTitlecategory || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [rating, setRating] = useState(existingRating || '');
    const [year, setYear] = useState(existingYear || '');
    const [duration, setDuration] = useState(existingDuration || '');
    const [genre, setGenre] = useState(existingGenre || []);
    const [language, setLanguage] = useState(existingLanguage || '');
    const [subtitle, setSubtitle] = useState(existingSubtitle || '');
    const [size, setSize] = useState(existingSize || '');
    const [quality, setQuality] = useState(existingQuality || '');
    const [youtubelink, setYoutubelink] = useState(existingYoutubelink || '');
    const [category, setCategory] = useState(existingCategory || '');
    const [watchonline, setWatchonline] = useState(existingWatchonline || '');
    const [showInputs, setShowInputs] = useState({
        "480p": false,
        "720p": false,
        "1080p": false,
        "4k": false,
    });
    const [status, setStatus] = useState(existingStatus || 'draft');
    const [downloadlink, setDownloadlink] = useState(existingDownload || {
        "480p": "",
        "720p": "",
        "1080p": "",
        "4k": "",
    });

    // Resolutions for download links
    const resolutions = ["480p", "720p", "1080p", "4k"];

    // Function to handle form submission
    async function createMovie(ev) {
        ev.preventDefault();

        const data = {
            title, slug, bgposter, smposter, titlecategory, description, rating,
            year, duration, genre, language, subtitle, size, quality, youtubelink,
            category, watchonline, download: downloadlink, status
        };

        try {
            if (_id) {
                await axios.put(`/api/getmovies?id=${_id}`, data);
            } else {
                await axios.post(`/api/getmovies`, data);
            }
            setRedirect(true);
        } catch (error) {
            console.error('Failed to save movie:', error);
        }
    }

    // Function to handle toggling input visibility for download links
    const toggleInputVisibility = (resolution) => {
        setShowInputs(prevState => ({
            ...prevState,
            [resolution]: !prevState[resolution]
        }));
    };

    // Function to handle input change for download links
    const handleInputChange = (resolution, value) => {
        setDownloadlink(prevState => ({
            ...prevState,
            [resolution]: value,
        }));
    };

    // Function to handle genre selection
    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        if (genre.includes(selectedGenre)) {
            setGenre(genre.filter(g => g !== selectedGenre));
        } else {
            setGenre([...genre, selectedGenre]);
        }
    };

    // Function to handle slug generation from title
    const handleSlugChange = (e) => {
        const inputValue = e.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-').toLowerCase();
        setSlug(newSlug);
    };

    if (redirect) {
        router.push('/');
    }

    return (
        <>
            <Head>
                <title>Add Movie Page</title>
            </Head>

            <form className="addmovieform" onSubmit={createMovie}>
                {/* Preview bgposter and smposter images */}
                <div className="w-100 flex gap-3 mt-1">
                    {bgposter && <div className="bgposter flex flex-col w-70 flex-left">
                        <img src={bgposter} alt="Background Poster" id="prv" />
                        <label htmlFor="prv" className="w-100">Background Image Preview</label>
                    </div>}
                    {smposter && <div className="smposter flex flex-col w-33 flex-left">
                        <img src={smposter} alt="Main Poster" id="prv" />
                        <label htmlFor="prv" className="w-100">Main Poster Preview</label>
                    </div>}
                </div>

                <div className="formdata w-100 flex flex-sb mt-3 flex-left">
                    {/* Left side form fields */}
                    <div className="w-50 flex flex-left flex-col">
                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="bgposter">Background Poster</label>
                            <input type="text" placeholder="Bgposter image link" id="bgposter" value={bgposter} onChange={(e) => setBgposter(e.target.value)} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="title">Movie Title</label>
                            <input type="text" placeholder="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="description">Description</label>
                            <textarea placeholder="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="rating">Rating</label>
                            <input type="number" placeholder="Rating" id="rating" value={rating} onChange={(e) => {
                                let newValue = parseFloat(e.target.value) <= 10 ? e.target.value : '10';
                                newValue = parseFloat(e.target.value) >= 0 ? e.target.value : '0';
                                setRating(newValue);
                            }} step={0.1} max={10} min={0} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="duration">Duration</label>
                            <input type="text" placeholder="Duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="watchonline">Watch Online</label>
                            <input type="text" placeholder="Watch Online Link" id="watchonline" value={watchonline} onChange={(e) => setWatchonline(e.target.value)} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="downloadlink">Download Link</label>
                            <div className="flex gap-1">
                                {resolutions.map(resolution => (
                                    <div key={resolution} className={showInputs[resolution] ? 'dresolbtn active' : 'dresolbtn'} onClick={() => toggleInputVisibility(resolution)}>
                                        {showInputs[resolution] ? `Hide ${resolution}` : `Show ${resolution}`}
                                    </div>
                                ))}
                            </div>
                            {resolutions.map(resolution => (
                                <div key={resolution} className="w-100">
                                    {showInputs[resolution] && (
                                        <input type="text" id={`downloadlink${resolution}`} placeholder={`${resolution} Download link`} value={downloadlink[resolution]} onChange={e => handleInputChange(resolution, e.target.value)} />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="status">Status</label>
                            <div className="flex gap-05">
                                <input type="radio" id="draft" name="status" value="draft" checked={status === 'draft'} onChange={(e) => setStatus(e.target.value)} />
                                <label htmlFor="draft">Draft</label>
                            </div>
                            <div className="flex gap-05">
                                <input type="radio" id="publish" name="status" value="publish" checked={status === 'Published'} onChange={(e) => setStatus(e.target.value)} />
                                <label htmlFor="publish">Published</label>
                            </div>
                        </div>
                    </div>

                    {/* Right side form fields */}
                    <div className="w-50 flex flex-left flex-col">
                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="smposter">Main Poster</label>
                            <input type="text" placeholder="Main Poster image link" id="smposter" value={smposter} onChange={(e) => setSmposter(e.target.value)} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="slug">Slug</label>
                            <input type="text" placeholder="URL of the movie" id="slug" value={slug} onChange={handleSlugChange} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="year">Year</label>
                            <input type="number" placeholder="Year" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="youtubelink">Youtube Link</label>
                            <input type="text" placeholder="Youtube Link" id="youtubelink" value={youtubelink} onChange={(e) => setYoutubelink(e.target.value)} />
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="language">Language</label>
                            <select name="language" id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                <option value="">Select Language</option>
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                                <option value="tamil">Tamil</option>
                                <option value="telugu">Telugu</option>
                                <option value="malayalam">Malayalam</option>
                                <option value="kannada">Kannada</option>
                            </select>
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="quality">Quality</label>
                            <select name="quality" id="quality" value={quality} onChange={(e) => setQuality(e.target.value)}>
                                <option value="">Select Quality</option>
                                <option value="camrip">Camrip</option>
                                <option value="hdrip">HDrip</option>
                                <option value="dvdrip">DVDrip</option>
                                <option value="bluray">BluRay</option>
                            </select>
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="subtitle">Subtitle</label>
                            <select name="subtitle" id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}>
                                <option value="">Select Subtitle</option>
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                                <option value="tamil">Tamil</option>
                                <option value="telugu">Telugu</option>
                            </select>
                        </div>

                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="size">Size</label>
                            <input type="text" placeholder="500MB || 1GB || 2GB || 4GB" id="size" value={size} onChange={(e) => setSize(e.target.value)} />
                        </div>

                        <div className="moviecategory flex flex-sb flex-left">
                            <div className="w-50 flex flex-col flex-left mb-2">
                                <label htmlFor="titlecategory">Title Category</label>
                                {['Movies', 'Series', 'Shows'].map(category => (
                                    <div key={category} className="flex gap-05">
                                        <input type="radio" id={category.toLowerCase()} name="titlecategory" value={category.toLowerCase()} checked={titlecategory === category.toLowerCase()} onChange={(e) => setTitlecategory(e.target.value)} />
                                        <label htmlFor={category.toLowerCase()}>{category}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="w-50 flex flex-col flex-left mb-2">
                                <label htmlFor="moviecategory">Movie Category</label>
                                {["Bollywood", "Hollywood", "South", "Gujarati", "Marvel_Studio", "Tv_Shows", "Web_Series"].map(cat => (
                                    <div key={cat} className="flex gap-05">
                                        <input type="radio" id={cat.toLowerCase()} name="moviecategory" value={cat.toLowerCase()} checked={category === cat.toLowerCase()} onChange={(e) => setCategory(e.target.value)} />
                                        <label htmlFor={cat.toLowerCase()}>{cat}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="w-100 flex flex-col flex-left mb-2">
                                <label htmlFor="genre">Genre</label>
                                {['Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Crime', 'Fantasy', 'Horror', 'Romance', 'Thriller', 'Science_Fiction'].map(cat => (
                                    <div key={cat} className="flex gap-05">
                                        <input type="checkbox" id={cat.toLowerCase()} name="genre" value={cat.toLowerCase()} checked={genre.includes(cat.toLowerCase())} onChange={handleGenreChange} />
                                        <label htmlFor={cat.toLowerCase()}>{cat}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <div className="w-100 mb-2">
                    <button type="submit" className="flex-center w-100">Save Data</button>
                </div>
            </form>
        </>
    );
}
