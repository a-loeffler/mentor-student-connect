import { useHistory } from 'react-router'

import './index.css'


const SignupChoice = () => {
    const history = useHistory()

    const goToStudent = (e) => {
        e.preventDefault();

        history.push('/signup/student')
    }

    const goToMentor = (e) => {
        e.preventDefault();

        history.push('/signup/mentor')
    }

    return (
        <div className="signup-choice-background">
            <div className="signup-choice-container">
                <div className="student-choice-container">
                    <h1 className="signup-choice-title">
                        Get Involved as a Student
                    </h1>
                    <img className="signup-choice-img" src="/images/as-Student1.jpg" alt="sign up as a student"></img>
                    <button className="signup-choice-button" onClick={e => goToStudent(e)}>Student Signup Page</button>
                </div>
                <div className="mentor-choice-container">
                    <h1 className="signup-choice-title">
                        Get Involved as a Mentor
                    </h1>
                    <img className="signup-choice-img" src="/images/as-Mentor3.PNG" alt="sign up as a mentor"></img>
                    <button className="signup-choice-button" onClick={e => goToMentor(e)}>Mentor Signup Page</button>
                </div>
            </div>
        </div>
    )
}

export default SignupChoice
