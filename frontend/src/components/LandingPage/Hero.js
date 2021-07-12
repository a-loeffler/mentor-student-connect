import './index.css'


const Hero = () => {




    return (
        <div className="hero-container">
            <div className="hero-banner-image-container">
                <img className="hero-banner-image" src="/images/fistbump-lg.jpg" alt="Connect. Empower. Inspire. Mentors connect, empower, and inspire students to learn with more purpose and take part in society"></img>
                <div className="hero-banner-image-overlay"></div>
            </div>
            <div className="hero-text-container">
                <h1 className="hero-title-text hero-white">Connect.</h1>
                <h1 className="hero-title-text hero-blue">Empower.</h1>
                <h1 className="hero-title-text hero-gold">Inspire.</h1>
                <p className="hero-paragraph-text">Mentors connect, empower, and inspire students to learn with more purpose and take part in society</p>
            </div>
            <div className="hero-bottom-effect-container">
                <img className="fan-effect" src="/images/fan-effect.png" alt=""></img>
            </div>
            <div className="hero-bottom-whitespace">
                
            </div>
        </div>
    )
}

export default Hero
