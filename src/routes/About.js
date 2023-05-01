import { Link, useParams } from "react-router-dom";
import Info from "../components/info";
import { useLocation } from "react-router";
import "../css/pagination.css";
import "../css/frontpage.css";
import {React, useState, useEffect } from "react";

function About() {

    const lastPage = useLocation().state.lastPage;
    const pokemonData = null;

    const {id} = useParams();

    return (
        <>
            <Info id={id}/>
            <Link to={{ pathname: `/pokedex` }}
                state={{ lastPage: lastPage }}>
                <div className="paginationcontainer">
                    <div className="pagination">
                        <button>←</button>
                    </div >
                </div>
            </Link>
        </>
    )
} export default About;