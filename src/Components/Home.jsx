import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
    <div className="row">
        <h2>{title}</h2>

        <div className="scroll">
            {arr.map((item, index) => (
                <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
            ))}
        </div>
    </div>
);

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const fetchUpcoming = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            setUpcomingMovies(results);
        };
        const fetchNowPlaying = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
            setNowPlayingMovies(results);
        };
        const fetchPopular = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
            setPopularMovies(results);
        };
        const fetchTopRated = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
            setTopRatedMovies(results);
        };
        const getAllGenre = async () => {
            const {
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenre(genres);
            console.log(genres);
        };

        getAllGenre();

        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
    }, []);

    return (
        <section className="home">
            <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)", backgroundSize:"100% 550px", backgroundRepeat:"no-repeat", height:"550px"
                }}
            >
                {popularMovies[0] && <h1 style={{color:"white", paddingTop:"30px", paddingLeft:"20px"}}>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p style={{width: "35%", color:"white", paddingTop:"25px",paddingBottom:"20px", paddingLeft:"20px"}}>{popularMovies[0].overview}</p>}

                <div style={{paddingLeft:"20px"}}>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>

            <Row title={"Upcoming"} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={nowPlayingMovies} />
            <Row title={"Popular"} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} />

            <div className="genreBox" style={{ backgroundColor:"black", paddingLeft:"15px", paddingBottom:"20px"}}>
                <h3 style={{color:"white", paddingTop:"30px", paddingBottom:"10px", paddingLeft:"20px", fontSize:"30px", fontWeight:"normal"}}>Genre</h3>
                {genre.map((item) => (
                  <button style={{height:"50px", borderRadius:"5px", width:"150px"}} className="genre">
                          <Link key={item.id} to={`/genre/${item.id}`} style={{color:"black", fontFamily:"sans-serif", fontWeight:"bold", fontSize:"px"}}>
                        {item.name}
                    </Link>
                  </button>
        
                  
                    
                ))}
            </div>
            <div style={{width:"100%", height:"300px", backgroundColor:"black",  color:"white", borderTop:"1.5px dashed yellow", textAlign:"center", paddingTop:"140px"}}>
                <h1 style={{fontSize:"40px"}}>“Be yourself; everyone else is already taken.”</h1>
                <h2 style={{paddingLeft:"530px", paddingTop:"40px"}}>― Oscar Wilde</h2>
           
            </div>
        </section>
    );
};

export default Home;
