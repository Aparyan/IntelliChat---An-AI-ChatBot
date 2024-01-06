import React, { useEffect } from 'react'
import '../styles/Speech.css';
const Webcam = () => {

    const streamCamVideo = () => {
        var constraints = { audio: true, video: { width: 1080, height: 700 } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (mediaStream) {
                var video = document.querySelector("video");

                video.srcObject = mediaStream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }

    useEffect(() => {
        streamCamVideo()
    }, [])

    return (
        <div>
            <video autoPlay={true} id="videoElement"></video>
        </div>
    );
}

export default Webcam