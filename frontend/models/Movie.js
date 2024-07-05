import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    bgposter: { type: String, required: true },
    smposter: { type: String, required: true },
    titlecategory: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    year: { type: Number, required: true },
    duration: { type: String, required: true },
    genre: { type: [String], required: true },
    language: { type: String, required: true },
    subtitle: { type: String, required: true },
    size: { type: String, required: true },
    quality: { type: String, required: true },
    youtubelink: { type: String, required: true },
    category: { type: String, required: true },
    watchonline: { type: String, required: true },
    download: {
        "480p": { type: String, required: true },
        "720p": { type: String, required: true },
        "1080p": { type: String, required: true },
        "4k": { type: String, required: true }
    },
    status: { type: String, required: true },
});

export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
