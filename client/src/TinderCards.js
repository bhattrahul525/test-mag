import React, { useState,useEffect } from 'react'
import TinderCard from "react-tinder-card";
import "./TinderCards.css"
import axios from "./axios";

function TinderCards() {
    const [people,setPeople] = useState([
        axios.get("http://localhost:5000/meet-and-greet/cards")
        .then(req=>{
            setPeople(req.data);
        })
    ])

    console.log(people);

const swiped=(direction,nameToDelete)=>{
    console.log("removing: "+nameToDelete);
    //setLastDirection(direction);
};

const OutOfFrame =(name) => {
    console.log(name+"left the screen!");
};

    return (
        <div className="TinderCards">
            <div className="tinderCards_cardContainer">
            {
                people.map((person)=>(
                    <TinderCard className="swipe"
                    key={person.name}
                    preventSwipe={["up","down"]}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={()=>OutOfFrame(person.name)}>
                    
                    <div style={{backgroundImage : `url(${person.imgUrl})`}}
                    className="card"
                    >
                        <h3>{person.name}</h3>
                    </div>

                    </TinderCard>
                    )
                )
            }
            </div>
        </div>
    );
}
export default TinderCards;
