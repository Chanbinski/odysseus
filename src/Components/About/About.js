import React from 'react';
import './About.css'

function About() {
    return (
        <div className="about">
            <div className="header">About</div>
            <div className="sub-header"></div>
            <div className="explanation">

                Odysseus is a tool that help users connect different concepts and generate ideas. <br></br><br></br>

                It was created as a final project for "Introduction to Ancient Greece" or AGRS 10A in UC Berkeley, a class that focuses on reading against the grain, or interpreting text in an unconventional way. <br></br><br></br>

                There are just two core features in Odysseus. First, you store a keyword which is a single word that capture a single concept. When storing a keyword, you also store a description of that word. Second, for each keyword, you can connect multiple keywords by adding the words and its corresponding explanation of the connection. When you hover over the keyword, you will find the connection pop up to the right side of it. <br></br><br></br>

                That's it! Now, you can go through each keyword and look at the connections each keyword has, and you can go through all the keywords and view the connections and come up with new ideas. <br></br><br></br>
            </div>
        </div>
    )
}

export default About