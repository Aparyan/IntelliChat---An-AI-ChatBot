import { React, useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import InnerNavbar from '../components/InnerNavbar';
import '../styles/Speech.css';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Chat.css';
import Webcam from 'react-webcam';

const SpeechToText = ({ authorized }) => {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [ chats, setChats ] = useState('');
    const [ ch, setCh ] = useState([]);
    const [ inputText, setText ] = useState('');

    const onChangeHandler = (e) => {
        setText(e.target.value);
    }

    const m = new SpeechSynthesisUtterance()
    const speechHandler = (m, ai) => {
        m.text = ai;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(m);
    }

    const onClickHandler = async () => {
        if (inputText !== '') {
            await axios.post("https://intellichat-szoj.onrender.com/setChat", {
                data: {
                    username: localStorage.getItem('username'),
                    Chats: inputText
                }
            }).then(async (ai) => {
                speechHandler(m, ai.data);
                await axios.get("https://intellichat-szoj.onrender.com/userChats", {
                    headers: {
                        username: localStorage.getItem('username')
                    }
                }).then((res) => {
                    setCh(res.data);
                    setText('');
                })
            })
        }
    }



    const func = async () => {
        if (ch.length === 0) {
            await axios.get("https://intellichat-szoj.onrender.com/userChats", {
                headers: {
                    username: localStorage.getItem('username')
                }
            }).then((res) => {
                setCh(res.data);
            })
        }
        if (listening === false && transcript !== '') {
            setChats(transcript);
            await axios.post("https://intellichat-szoj.onrender.com/setChat", {
                data: {
                    username: localStorage.getItem('username'),
                    Chats: transcript
                }
            }).then(async (ai) => {
                    speechHandler(m, ai.data);
                    await axios.get("https://intellichat-szoj.onrender.com/userChats", {
                        headers: {
                            username: localStorage.getItem('username')
                        }
                    }).then((res) => {
                        setCh(res.data);
                    })
                })
        }
    }
    useEffect(() => {
        func();
    }, [ listening, transcript ])

    if (!browserSupportsSpeechRecognition) {
        return <span>Your Browser doesn't support speech recognition.</span>;
    }

    if (!authorized) {
        return <Navigate to='/' />
    }

    return (
        <div className='app'>
            <InnerNavbar></InnerNavbar>
            <div className='main-wrapper'>
                <div className='cam-and-mic'>
                <Webcam />
                    {
                        listening === true ? <div className='micOn' onClick={SpeechRecognition.stopListening}><svg width="50" height="50" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M15 6H13M15 10H13M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> </div>
                            :
                            <div className='micOff' onClick={SpeechRecognition.startListening}><svg width="50" height="50" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 9.4V5C15 3.34315 13.6569 2 12 2C10.8224 2 9.80325 2.67852 9.3122 3.66593M12 19V22M8 22H16M3 3L21 21M5.00043 10C5.00043 10 3.50062 19 12.0401 19C14.51 19 16.1333 18.2471 17.1933 17.1768M19.0317 13C19.2365 11.3477 19 10 19 10M15 6H13M12 15C10.3431 15 9 13.6569 9 12V9L14.1226 14.12C13.5796 14.6637 12.8291 15 12 15Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
                    }
                    <div className="listening">
                        {listening === true ? <h6 className='listen-status'>Listening...</h6> : <h6 className='listen-status'>On Mute</h6>}
                    </div>
                </div>
                <div className="wrapper">
                    <div className="text-container">
                        <div className='messages'>
                            {
                                ch.map((c) => {
                                    return <div className={c.role === 'user' ? 'userChatWrapper' : 'aiChatWrapper'}><div className={c.role === 'user' ? 'userChat' : 'aiChat'}>{c.chat}</div></div>
                                })
                            }
                        </div>
                        <div className="textBox-container">
                            <div className="textInput-container">
                                <input value={inputText} onChange={onChangeHandler} type="text" name="textBox" id="textBox" placeholder='Type your message' />
                            </div>
                            <div className="sendBtn-container">
                                <button onClick={onClickHandler}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SpeechToText;