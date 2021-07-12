import Hero from "./Hero";
import IdentityBoxes from "./IndentityBoxes";
import MentorPlug from "./MentorPlug";
import AboutUs from "./AboutUs";

const LandingPage = () => {



    return (
        <div className="landing-page-container">
            <Hero />
            <IdentityBoxes />
            <MentorPlug />
            <AboutUs />
        </div>
    )
}

export default LandingPage
