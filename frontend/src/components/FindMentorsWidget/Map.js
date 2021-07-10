import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import zipcodeMatcher from '../../zipcodedata';

import { getMentors } from '../../store/mentors'

const Map = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user)
    const mentors = useSelector(state => state.mentors)
    console.log(mentors)

    const [center, setCenter] = useState({})

    const [checkedMentor, setCheckedMentor] = useState(null)


    useEffect(() => {

        if (currentUser) {
            
            const [userLat, userLng] = zipcodeMatcher[currentUser.zip_code];

            setCenter({
                lat: userLat,
                lng: userLng
            })
        }


    }, [])


    const mentorKeys = Object.keys(mentors)




    // if (Object.keys(mentors).length > 0) {
    //     console.log("line32")
    //     setMentorKeys(Object.keys(mentors))
    //     console.log(mentors)
    // } else {
    //     dispatch(getMentors(currentUser.zip_code))
    //         .then(console.log(mentors))
    // }



    const containerStyle = {
        width: '350px',
        height: '200px',
    }



    const coordinateLister = (mentorKeys) => {
        const newArray = [];

        for (let i = 0; i < mentorKeys.length; i++) {
            let key = mentorKeys[i];
            let mentor = mentors[key];

            let zipcode = mentor.zip_code;

            if(zipcodeMatcher[zipcode]) {
                const [markerLat, markerLng] = zipcodeMatcher[zipcode];

                const markerCoordinates = {
                    lat: markerLat,
                    lng: markerLng
                }
                    //put in a reference to the userId
                newArray.push({mentorId: mentor.id, markerCoordinates: markerCoordinates});

            }

        }

        return newArray;
    }

    const coordinatesToMap = coordinateLister(mentorKeys);
    console.log(coordinatesToMap);

    // const coordinateFinder = (key) => {
    //     const mentor = mentors[key]
    //     const zipcode = mentor.zip_code;

    //     console.log(zipcodeMatcher[zipcode])

    //     if (zipcodeMatcher[String(zipcode)]) {

    //         const [markerLat, markerLng] = zipcodeMatcher[String(zipcode)]

    //         const markerCoordinates = {
    //             lat: markerLat,
    //             lng: markerLng
    //         }
    //         console.log(key, markerCoordinates)

    //         return markerCoordinates;
    //     }

    //     return ""
    //     // return markerCoordinates;
    // }

    // console.log(mentorKeys)

    // const checker = mentorKeys.map((key, index) => {
    //     coordinateFinder(key)
    // })

    // console.log(checker)


    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBg3TRFxhdzL6WBoePFhTuJ27_kqv8ZHyA'
        >
            <div className="map-container">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={8}
                    center={center}
                >

                    {coordinatesToMap.map((coordinates, index) => <Marker key={index} position={coordinates.markerCoordinates} />)}
                </GoogleMap>
            </div>

        </LoadScript>
    )

}

export default Map;
