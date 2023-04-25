import { Link } from "react-router-dom"
import Info from "../components/info";
import { useLocation } from "react-router";
import "../css/pagination.css";
import "../css/frontpage.css"


function About() {

    const pokemonData = useLocation().state.pokemonData;
    const lastPage = useLocation().state.lastPage;




    return (
        <>
            <Info props={pokemonData} />
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