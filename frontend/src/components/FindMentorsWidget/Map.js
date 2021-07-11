import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GoogleMap, LoadScript, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

import MentorCard from './MentorCard';

import zipcodeMatcher from '../../zipcodedata';



const Map = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user)
    const mentors = useSelector(state => state.mentors)
    console.log(mentors)

    const [center, setCenter] = useState({})

    const [checkedMentor, setCheckedMentor] = useState({})


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



    const containerStyle = {
        width: '100%',
        height: '250px',
    }



    const coordinateLister = (mentorKeys) => {
        const validArray = [];

        for (let i = 0; i < mentorKeys.length; i++) {
            let key = mentorKeys[i];
            let mentor = mentors[key];

            let zipcode = mentor.zip_code;
            let mentorName = `${mentor.first_name} ${mentor.last_name}`;

            if(zipcodeMatcher[zipcode]) {
                const [markerLat, markerLng] = zipcodeMatcher[zipcode];

                const markerCoordinates = {
                    lat: markerLat,
                    lng: markerLng
                }
                    //put in a reference to the userId
                validArray.push({
                    mentorId: mentor.id,
                    mentorZipcode: zipcode,
                    mentorName: mentorName,
                    markerCoordinates: markerCoordinates
                });

            }

        }

        return validArray;
    }

    const coordinatesToMap = coordinateLister(mentorKeys);
    console.log(coordinatesToMap);



    const onSelect = (item) => {
        setCheckedMentor(item);
    }



    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBg3TRFxhdzL6WBoePFhTuJ27_kqv8ZHyA'
        >
            <div className="map-container">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={8}
                    center={center}
                    defaultOptions={{mapTypeControl: false}}
                >

                    {coordinatesToMap.map((coordinates, index) => <Marker key={index} position={coordinates.markerCoordinates} onClick={() => onSelect(coordinates)}/>)}

                    {checkedMentor.markerCoordinates && (
                        <InfoWindow
                            position={checkedMentor.markerCoordinates}
                            clickable={true}
                            onCloseClick={() => setCheckedMentor({})}

                        >
                            <MentorCard
                                mentorName={checkedMentor.mentorName}
                                mentorId={checkedMentor.mentorId}
                                mentorZipcode={checkedMentor.mentorZipcode}
                            />
                        </InfoWindow>
                    )}

                </GoogleMap>
            </div>

        </LoadScript>
    )

}

export default Map;
