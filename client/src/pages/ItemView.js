import React from "react"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"

import InCartCount from "../components/InCartCount"
function ItemView(){

    const [data, setData] = useState(null)
    const {id} = useParams()
    console.log(id)

    useEffect(() => {
        fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
    }, []);

    return(
      <div id='App'>
        <NavBar/>
        {!data ? 'Loading...': RenderPage(data)}
      </div>
    )
}

function RenderPage(data){
    return(
        <div id="ItemDisplay">
            <div id="Picture">
                <img src={data.images[0]}/> 
            </div>
            <div id="Info">
                <h1>{data.title}</h1>

                <div id="InfoSection">
                    <h2>Rating: </h2>
                    <p>{Rating(data.rating)}</p>
                </div>
                
                <div id="InfoSection">
                    <h2>Price: </h2>
                    <p>${data.price}</p>
                </div>
                
                <div id="Description">
                    <h2>Description</h2>
                    <p>{data.description}</p>
                </div>

                <InCartCount id = {data.id}/>

                <form action="/api/additem" method="POST">
                    <button name="id" value={data.id}>Add To Cart</button>
                </form>
            </div>
            
           
        </div>
    )
}

function Rating(rating){
    let s = ''

    for (let i = 0; i < Math.round(rating); i++) {
        s += '★'
    }

    return s
}

export default ItemView
