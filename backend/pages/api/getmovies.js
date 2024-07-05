import { mongooseConnect } from "@/lib/mongoose";
import { Movie } from "@/models/Movie";

export default async function handler(req, res) {
    await mongooseConnect();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const {
                    title, slug, bgposter, smposter, titlecategory, description, rating,
                    year, duration, genre, language, subtitle, size, quality, youtubelink,
                    category, watchonline, download, status
                } = req.body;

                if (!title || !slug || !bgposter || !smposter || !titlecategory || !description ||
                    !rating || !year || !duration || !genre || !language || !subtitle || !size ||
                    !quality || !youtubelink || !category || !watchonline || !download || !status) {
                    return res.status(400).json({ error: 'All fields are required' });
                }

                const movieData = await Movie.create({
                    title, slug, bgposter, smposter, titlecategory, description, rating,
                    year, duration, genre, language, subtitle, size, quality, youtubelink,
                    category, watchonline, download, status
                });

                res.status(201).json(movieData);
            } catch (error) {
                console.error('Error creating movie:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
            break;

        case 'GET':
            try {
                if (req.query?.id) {
                    const movie = await Movie.findById(req.query.id);
                    if (!movie) {
                        return res.status(404).json({ error: 'Movie not found' });
                    }
                    res.status(200).json(movie);
                } else {
                    const movies = await Movie.find();
                    res.status(200).json(movies.reverse());
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
            break;

        case 'PUT':
            try {
                const {
                    title, slug, bgposter, smposter, titlecategory, description, rating,
                    year, duration, genre, language, subtitle, size, quality, youtubelink,
                    category, watchonline, download, status
                } = req.body;

                // Extract _id from query parameters
                const { id } = req.query;

                // Check if _id is provided
                if (!id) {
                    return res.status(400).json({ error: 'Movie _id is required' });
                }

                // Validate other required fields
                const requiredFields = [
                    'title', 'slug', 'bgposter', 'smposter', 'titlecategory', 'description',
                    'rating', 'year', 'duration', 'genre', 'language', 'subtitle', 'size',
                    'quality', 'youtubelink', 'category', 'watchonline', 'download', 'status'
                ];

                for (const field of requiredFields) {
                    if (!req.body[field]) {
                        return res.status(400).json({ error: `Field '${field}' is required` });
                    }
                }

                // Update the movie in the database
                const updatedMovie = await Movie.findByIdAndUpdate(id, {
                    title, slug, bgposter, smposter, titlecategory, description, rating,
                    year, duration, genre, language, subtitle, size, quality, youtubelink,
                    category, watchonline, download, status
                }, { new: true });

                if (!updatedMovie) {
                    return res.status(404).json({ error: 'Movie not found' });
                }

                res.status(200).json(updatedMovie);
            } catch (error) {
                console.error('Error updating movie:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
            break;

        case 'DELETE':
            try {
                if (req.query?.id) {
                    const deletedMovie = await Movie.deleteOne({ _id: req.query.id });
                    if (deletedMovie.deletedCount === 0) {
                        return res.status(404).json({ error: 'Movie not found' });
                    }
                    res.status(200).json({ success: true });
                } else {
                    res.status(400).json({ error: 'Missing id' });
                }
            } catch (error) {
                console.error('Error deleting movie:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
            break;

        default:
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
}
