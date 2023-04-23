import {useParams} from "react-router-dom"
import Info from "../components/info";

export default function About() {

    const {id} = useParams();

    return  <Info
    id={id}/>
}