import React from "react";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });
    const [allMemeImages, setAllMemeImages] = React.useState([]);
    const [positions, setPositions] = React.useState({
        top: { x: 600, y: 0 },
        bottom: { x: 600, y: 280 }
    });
    const [dragging, setDragging] = React.useState(null);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes));
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length);
        const url = allMemeImages[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function handleMouseDown(event, textType) {
        setDragging(textType);
    }

    function handleMouseMove(event) {
        if (dragging) {
            const newPositions = { ...positions };
            if (dragging === "top") {       
                newPositions.top = { x: event.clientX, y: event.clientY - 280 };
            } else if (dragging === "bottom") {
                newPositions.bottom = { x: event.clientX, y: event.clientY - 280 };
            }
            setPositions(newPositions);
        }
    }

    function handleMouseUp() {
        setDragging(null);
    }

    React.useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    });

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={getMemeImage} className="form--button">
                    Get a new meme 🎈
                </button>
            </div>
            <br />
            <div className="meme-container" style={{ position: "relative" }}>
                <img src={meme.randomImage} alt="Meme" />
                <h2
                    className="meme--text top"
                    onMouseDown={e => handleMouseDown(e, "top")}
                    style={{
                        position: "absolute",
                        top: positions.top.y,
                        left: positions.top.x
                    }}
                >
                    {meme.topText}
                </h2>
                <h2
                    className="meme--text bottom"
                    onMouseDown={e => handleMouseDown(e, "bottom")}
                    style={{
                        position: "absolute",
                        top: positions.bottom.y,
                        left: positions.bottom.x
                    }}
                >
                    {meme.bottomText}
                </h2>
            </div>
        </main>
    );
}
