import React from "react";
export  default function Meme() {


    const [meme, setMeme] = React.useState({
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemeImages, setAllMemeImages] = React.useState([]);

    React.useEffect(()=>{
       const res =  fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))
    },[])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url;
        setMeme(prevMeme =>({
            ...prevMeme,
            randomImage: url
        }))
    }
    function handleChange(event){
        const{name, value} = event.target
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]:value
        }))
    }
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name = "topText"
                    value = {meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name = "bottomText"
                    value = {meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={getMemeImage}
                    className="form--button"
                >
                    Get a new meme  🎈
                </button>
            </div>
            <br/>
            <img src={meme.randomImage} alt="Meme"/>
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </main>
    )
}