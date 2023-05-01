import React from "react"
//import ReactDOM from "react-dom/client"
import ReactDOM from "react-dom/client"
import "./css/index.css"	
import Root from "./routes/Root"
import About from "./routes/About"
import FrontPage from "./routes/FrontPage"
import Quiz from "./routes/Quiz"
import {createHashRouter , Outlet, RouterProvider } from "react-router-dom"

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <FrontPage key={1}/>,
            },
            {
                path: "/pokedex",
                element: <FrontPage key={2}/>,
            },
            {
                path: "/quiz",
                element: <Quiz key={3}/>,
            },
            {
                path: "/about/:id",
                element: <About key={4}/>,
            },            
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <RouterProvider router={router}><Outlet/></RouterProvider>
        
)
