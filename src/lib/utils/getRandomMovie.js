export async function getRandomMovie() {
    const response = await fetch(PUBLIC_API + '/api/movie');


    const data = await response.json();

    const movies = data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];


    return {
        title: randomMovie.title,
        synopsis: randomMovie.overview,
    };
}