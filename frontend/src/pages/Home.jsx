// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { userDataContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import aiImg from "../assets/ai.gif"
// import { CgMenuRight } from "react-icons/cg";
// import { RxCross1 } from "react-icons/rx";
// import userImg from "../assets/user.gif"
// function Home() {
//   const {userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext)
//   const navigate=useNavigate()
//   const [listening,setListening]=useState(false)
//   const [userText,setUserText]=useState("")
//   const [aiText,setAiText]=useState("")
//   const isSpeakingRef=useRef(false)
//   const recognitionRef=useRef(null)
//   const [ham,setHam]=useState(false)
//   const isRecognizingRef=useRef(false)
//   const synth=window.speechSynthesis

//   const handleLogOut=async ()=>{
//     try {
//       const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
//       setUserData(null)
//       navigate("/signin")
//     } catch (error) {
//       setUserData(null)
//       console.log(error)
//     }
//   }

//   const startRecognition = () => {
    
//    if (!isSpeakingRef.current && !isRecognizingRef.current) {
//     try {
//       recognitionRef.current?.start();
//       console.log("Recognition requested to start");
//     } catch (error) {
//       if (error.name !== "InvalidStateError") {
//         console.error("Start error:", error);
//       }
//     }
//   }
    
//   }

//   const speak=(text)=>{
//     const utterence=new SpeechSynthesisUtterance(text)
//     utterence.lang = 'hi-IN';
//     const voices =window.speechSynthesis.getVoices()
//     const hindiVoice = voices.find(v => v.lang === 'hi-IN');
//     if (hindiVoice) {
//       utterence.voice = hindiVoice;
//     }


//     isSpeakingRef.current=true
//     utterence.onend=()=>{
//         setAiText("");
//   isSpeakingRef.current = false;
//   setTimeout(() => {
//     startRecognition(); // ⏳ Delay se race condition avoid hoti hai
//   }, 800);
//     }
//    synth.cancel(); // 🛑 pehle se koi speech ho to band karo
// synth.speak(utterence);
//   }

//   const handleCommand=(data)=>{
//     const {type,userInput,response}=data
//       speak(response);
    
//     if (type === 'google-search') {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`, '_blank');
//     }
//      if (type === 'calculator-open') {
  
//       window.open(`https://www.google.com/search?q=calculator`, '_blank');
//     }
//      if (type === "instagram-open") {
//       window.open(`https://www.instagram.com/`, '_blank');
//     }
//     if (type ==="facebook-open") {
//       window.open(`https://www.facebook.com/`, '_blank');
//     }
//      if (type ==="weather-show") {
//       window.open(`https://www.google.com/search?q=weather`, '_blank');
//     }

//     if (type === 'youtube-search' || type === 'youtube-play') {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
//     }

//   }

// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = true;
//   recognition.lang = 'en-US';
//   recognition.interimResults = false;

//   recognitionRef.current = recognition;

//   let isMounted = true;  // flag to avoid setState on unmounted component

//   // Start recognition after 1 second delay only if component still mounted
//   const startTimeout = setTimeout(() => {
//     if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
//       try {
//         recognition.start();
//         console.log("Recognition requested to start");
//       } catch (e) {
//         if (e.name !== "InvalidStateError") {
//           console.error(e);
//         }
//       }
//     }
//   }, 1000);

//   recognition.onstart = () => {
//     isRecognizingRef.current = true;
//     setListening(true);
//   };

//   recognition.onend = () => {
//     isRecognizingRef.current = false;
//     setListening(false);
//     if (isMounted && !isSpeakingRef.current) {
//       setTimeout(() => {
//         if (isMounted) {
//           try {
//             recognition.start();
//             console.log("Recognition restarted");
//           } catch (e) {
//             if (e.name !== "InvalidStateError") console.error(e);
//           }
//         }
//       }, 1000);
//     }
//   };

//   recognition.onerror = (event) => {
//     console.warn("Recognition error:", event.error);
//     isRecognizingRef.current = false;
//     setListening(false);
//     if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
//       setTimeout(() => {
//         if (isMounted) {
//           try {
//             recognition.start();
//             console.log("Recognition restarted after error");
//           } catch (e) {
//             if (e.name !== "InvalidStateError") console.error(e);
//           }
//         }
//       }, 1000);
//     }
//   };

//   recognition.onresult = async (e) => {
//     const transcript = e.results[e.results.length - 1][0].transcript.trim();
//     if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//       setAiText("");
//       setUserText(transcript);
//       recognition.stop();
//       isRecognizingRef.current = false;
//       setListening(false);
//       const data = await getGeminiResponse(transcript);
//       handleCommand(data);
//       setAiText(data.response);
//       setUserText("");
//     }
//   };


//     const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
//     greeting.lang = 'hi-IN';
   
//     window.speechSynthesis.speak(greeting);
 

//   return () => {
//     isMounted = false;
//     clearTimeout(startTimeout);
//     recognition.stop();
//     setListening(false);
//     isRecognizingRef.current = false;
//   };
// }, []);




//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[15px] overflow-hidden'>
//       <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>setHam(true)}/>
//       <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000053] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${ham?"translate-x-0":"translate-x-full"} transition-transform`}>
//  <RxCross1 className=' text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>setHam(false)}/>
//  <button className='min-w-[150px] h-[60px]  text-black font-semibold   bg-white rounded-full cursor-pointer text-[19px] ' onClick={handleLogOut}>Log Out</button>
//       <button className='min-w-[150px] h-[60px]  text-black font-semibold  bg-white  rounded-full cursor-pointer text-[19px] px-[20px] py-[10px] ' onClick={()=>navigate("/customize")}>Customize your Assistant</button>

// <div className='w-full h-[2px] bg-gray-400'></div>
// <h1 className='text-white font-semibold text-[19px]'>History</h1>

// <div className='w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col truncate'>
//   {userData.history?.map((his)=>(
//     <div className='text-gray-200 text-[18px] w-full h-[30px]  '>{his}</div>
//   ))}

// </div>

//       </div>
//       <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute hidden lg:block top-[20px] right-[20px]  bg-white rounded-full cursor-pointer text-[19px] ' onClick={handleLogOut}>Log Out</button>
//       <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold  bg-white absolute top-[100px] right-[20px] rounded-full cursor-pointer text-[19px] px-[20px] py-[10px] hidden lg:block ' onClick={()=>navigate("/customize")}>Customize your Assistant</button>
//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
// <img src={userData?.assistantImage} alt="" className='h-full object-cover'/>
//       </div>
//       <h1 className='text-white text-[18px] font-semibold'>I'm {userData?.assistantName}</h1>
//       {!aiText && <img src={userImg} alt="" className='w-[200px]'/>}
//       {aiText && <img src={aiImg} alt="" className='w-[200px]'/>}
    
//     <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText?userText:aiText?aiText:null}</h1>
      
//     </div>
//   )
// }

// export default Home

import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aiImg from "../assets/ai.gif"
import { CgMenuRight } from "react-icons/cg"
import { RxCross1 } from "react-icons/rx"
import userImg from "../assets/user.gif"

function Home() {
  const {
    userData,
    serverUrl,
    setUserData,
    getGeminiResponse
  } = useContext(userDataContext)
  const navigate = useNavigate()

  const [listening, setListening] = useState(false)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const [ham, setHam] = useState(false)

  const isSpeakingRef = useRef(false)
  const isRecognizingRef = useRef(false)
  const recognitionRef = useRef(null)

  const synth = window.speechSynthesis
  let restartTimeout = useRef(null)

  // 1. Preload voices
  useEffect(() => {
    const loadVoices = () => synth.getVoices()
    synth.onvoiceschanged = loadVoices
    loadVoices()
  }, [])

  // 2. Text-to-Speech helper
  const speak = (text) => {
    // if already speaking, queue
    if (synth.speaking) {
      setTimeout(() => speak(text), 500)
      return
    }

    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = userData.assistantLang || 'hi-IN'
    const voices = synth.getVoices()
    const match = voices.find(v => v.lang === utter.lang)
    if (match) utter.voice = match

    isSpeakingRef.current = true
    utter.onend = () => {
      isSpeakingRef.current = false
      // keep aiText on screen until next response
      restartRecognition()
    }

    synth.speak(utter)
  }

  // 3. Restart-recognition with debounce
  const restartRecognition = () => {
    if (restartTimeout.current) clearTimeout(restartTimeout.current)
    restartTimeout.current = setTimeout(() => {
      if (!isSpeakingRef.current && recognitionRef.current && !isRecognizingRef.current) {
        try {
          recognitionRef.current.start()
        } catch (e) {
          /* ignore InvalidStateError */
        }
      }
    }, 500)
  }

  // 4. Logout handler
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true
      })
    } catch (err) {
      console.error(err)
    } finally {
      setUserData(null)
      navigate("/signin")
    }
  }

  // 5. Command handler
  const handleCommand = (data) => {
    const { type, userInput, response } = data
    // open new tabs for certain commands
    if (type === 'google-search') {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank')
    }
    else if (type === 'calculator-open') {
      window.open(`https://www.google.com/search?q=calculator`, '_blank')
    }
    else if (type === 'instagram-open') {
      window.open(`https://www.instagram.com/`, '_blank')
    }
    else if (type === "facebook-open") {
      window.open(`https://www.facebook.com/`, '_blank')
    }
    else if (type === "weather-show") {
      window.open(`https://www.google.com/search?q=weather`, '_blank')
    }
    else if (type === 'youtube-search' || type === 'youtube-play') {
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, '_blank')
    }

    // speak() will be called separately after setting state
  }

  // 6. Main useEffect: recognition + initial greeting
  useEffect(() => {
    let isMounted = true

    // prompt mic permissions
    navigator.mediaDevices.getUserMedia({ audio: true })
      .catch(err => console.warn("Mic permission needed:", err))

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = userData.assistantLang || 'en-US'
    recognition.continuous = true
    recognition.interimResults = false

    recognitionRef.current = recognition

    recognition.onstart = () => {
      isRecognizingRef.current = true
      setListening(true)
    }

    recognition.onend = () => {
      isRecognizingRef.current = false
      setListening(false)
      restartRecognition()
    }

    recognition.onerror = (e) => {
      console.warn("SpeechRecognition error:", e.error)
      isRecognizingRef.current = false
      setListening(false)
      restartRecognition()
    }

    recognition.onresult = async (e) => {
      const last = e.results[e.results.length - 1][0].transcript.trim()
      const nameMatch = userData.assistantName.toLowerCase()
      if (last.toLowerCase().includes(nameMatch)) {
        setUserText(last)
        recognition.stop()
        isRecognizingRef.current = false
        setListening(false)

        const data = await getGeminiResponse(last)
        setAiText(data.response)
        handleCommand(data)
        speak(data.response)
        setUserText("")
      }
    }

    // start listening
    restartRecognition()

    // initial greeting
    const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`)
    greeting.lang = 'hi-IN'
    synth.speak(greeting)

    return () => {
      isMounted = false
      clearTimeout(restartTimeout.current)
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
    }
  }, [
    userData.name,
    userData.assistantName,
    userData.assistantLang,
    getGeminiResponse
  ])

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex flex-col items-center justify-center gap-6 overflow-hidden'>
      {/* Hamburger menu */}
      <CgMenuRight
        className='lg:hidden absolute top-5 right-5 text-white w-6 h-6'
        onClick={() => setHam(true)}
      />

      {/* Side drawer */}
      <div className={`
          absolute lg:hidden top-0 left-0 w-full h-full
          bg-black/50 backdrop-blur-lg p-5 flex flex-col gap-5
          transform transition-transform
          ${ham ? 'translate-x-0' : 'translate-x-full'}
        `}>
        <RxCross1
          className='absolute top-5 right-5 text-white w-6 h-6'
          onClick={() => setHam(false)}
        />
        <button
          className='bg-white text-black font-semibold px-5 py-3 rounded-full'
          onClick={handleLogOut}
        >
          Log Out
        </button>
        <button
          className='bg-white text-black font-semibold px-5 py-3 rounded-full'
          onClick={() => navigate("/customize")}
        >
          Customize Assistant
        </button>
        <div className='border-t border-gray-400 my-4'/>
        <h2 className='text-white font-semibold'>History</h2>
        <div className='overflow-y-auto space-y-2 text-gray-200'>
          {userData.history?.map((his, i) => (
            <div key={i}>{his}</div>
          ))}
        </div>
      </div>

      {/* Top-right buttons for large screens */}
      <div className='hidden lg:flex absolute top-5 right-5 gap-4'>
        <button
          className='bg-white text-black font-semibold px-5 py-3 rounded-full'
          onClick={handleLogOut}
        >
          Log Out
        </button>
        <button
          className='bg-white text-black font-semibold px-5 py-3 rounded-full'
          onClick={() => navigate("/customize")}
        >
          Customize
        </button>
      </div>

      {/* Assistant avatar */}
      <div className='w-72 h-96 rounded-2xl shadow-lg overflow-hidden'>
        <img
          src={userData.assistantImage}
          alt="assistant"
          className='w-full h-full object-cover'
        />
      </div>
      <h1 className='text-white text-xl font-semibold'>
        I&apos;m {userData.assistantName}
      </h1>

      {/* Animation & text */}
      <div className='flex flex-col items-center'>
        {aiText ? (
          <img src={aiImg} alt="thinking" className='w-48' />
        ) : (
          <img src={userImg} alt="listening" className='w-48' />
        )}
        <p className='text-white text-lg mt-4'>
          {userText || (aiText || "")}
        </p>
      </div>

      {/* Listening indicator */}
      {/* {listening && (
        <div className='fixed bottom-5 text-green-400'>
          Listening...
        </div>
      )} */}
    </div>
  )
}

export default Home




// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { userDataContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import aiImg from '../assets/ai.gif'
// import userImg from '../assets/user.gif'
// import { CgMenuRight } from 'react-icons/cg'
// import { RxCross1 } from 'react-icons/rx'

// export default function Home() {
//   const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
//   const navigate = useNavigate()

//   const [listening, setListening] = useState(false)
//   const [userText, setUserText] = useState('')
//   const [aiText, setAiText] = useState('')
//   const [ham, setHam] = useState(false)

//   const isSpeakingRef = useRef(false)
//   const isRecognizingRef = useRef(false)
//   const recognitionRef = useRef(null)
//   const synth = window.speechSynthesis
//   const restartTimeout = useRef(null)

//   // Preload voices
//   useEffect(() => {
//     const loadVoices = () => synth.getVoices()
//     synth.onvoiceschanged = loadVoices
//     loadVoices()
//   }, [])

//   // Text‑to‑Speech helper
//   const speak = (text) => {
//     if (synth.speaking) {
//       return setTimeout(() => speak(text), 500)
//     }
//     const utter = new SpeechSynthesisUtterance(text)
//     utter.lang = userData.assistantLang || 'hi-IN'
//     const match = synth.getVoices().find(v => v.lang === utter.lang)
//     if (match) utter.voice = match

//     isSpeakingRef.current = true
//     utter.onend = () => {
//       isSpeakingRef.current = false
//       restartRecognition()
//     }
//     synth.speak(utter)
//   }

//   // Restart recognition with debounce
//   const restartRecognition = () => {
//     clearTimeout(restartTimeout.current)
//     restartTimeout.current = setTimeout(() => {
//       if (
//         !isSpeakingRef.current &&
//         recognitionRef.current &&
//         !isRecognizingRef.current
//       ) {
//         try { recognitionRef.current.start() }
//         catch (e) { /* ignore */ }
//       }
//     }, 500)
//   }

//   // Logout
//   const handleLogOut = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setUserData(null)
//       navigate('/signin')
//     }
//   }

//   // Browser actions
//   const handleCommand = ({ type, userInput }) => {
//     if (type === 'google-search') {
//       window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank')
//     } else if (type === 'calculator-open') {
//       window.open('https://www.google.com/search?q=calculator', '_blank')
//     } else if (type === 'instagram-open') {
//       window.open('https://www.instagram.com/', '_blank')
//     } else if (type === 'facebook-open') {
//       window.open('https://www.facebook.com/', '_blank')
//     } else if (type === 'weather-show') {
//       window.open('https://www.google.com/search?q=weather', '_blank')
//     } else if (type === 'youtube-search' || type === 'youtube-play') {
//       window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, '_blank')
//     }
//   }

//   // Main Recognition setup
//   useEffect(() => {
//     let mounted = true

//     // Prompt mic access
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .catch(err => console.warn('Microphone permission denied:', err))

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     const recognition = new SpeechRecognition()
//     recognitionRef.current = recognition

//     recognition.continuous = true
//     recognition.interimResults = false
//     recognition.lang = userData.assistantLang || 'en-US'

//     // Debug events
//     recognition.onaudiostart = () => console.debug('Audio capture started')
//     recognition.onaudioend   = () => console.debug('Audio capture ended')
//     recognition.onnomatch    = () => console.debug('No match')

//     recognition.onstart = () => {
//       console.debug('🎙️ recognition started')
//       isRecognizingRef.current = true
//       setListening(true)
//     }

//     recognition.onend = () => {
//       console.debug('🛑 recognition ended')
//       isRecognizingRef.current = false
//       setListening(false)
//       restartRecognition()
//     }

//     recognition.onerror = (event) => {
//       const err = event.error
//       console.warn('Recognition error:', err)

//       switch (err) {
//         case 'no-speech':
//         case 'aborted':
//           // ignore
//           break
//         case 'not-allowed':
//         case 'service-not-allowed':
//           alert('⚠️ Please allow microphone access in your browser settings.')
//           break
//         default:
//           // retry after 1s
//           setTimeout(() => {
//             if (mounted && !isSpeakingRef.current) {
//               try { recognition.start() } catch (_) {}
//             }
//           }, 1000)
//       }
//     }

//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1][0].transcript.trim()
//       console.debug('Transcript:', transcript)

//       if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//         recognition.stop()
//         isRecognizingRef.current = false
//         setListening(false)

//         setUserText(transcript)
//         const data = await getGeminiResponse(transcript)
//         setAiText(data.response)
//         handleCommand(data)
//         speak(data.response)
//         setUserText('')
//       }
//     }

//     // Kick off listening
//     restartRecognition()

//     // Initial greeting
//     const greet = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`)
//     greet.lang = 'hi-IN'
//     synth.speak(greet)

//     return () => {
//       mounted = false
//       clearTimeout(restartTimeout.current)
//       recognition.stop()
//       setListening(false)
//       isRecognizingRef.current = false
//     }
//   }, [userData.name, userData.assistantName, userData.assistantLang, getGeminiResponse])

//   return (
//     <div className="w-full h-screen bg-gradient-to-t from-black to-[#02023d] flex flex-col items-center justify-center gap-6 overflow-hidden">
//       {/* Hamburger */}
//       <CgMenuRight
//         className="lg:hidden absolute top-5 right-5 text-white w-6 h-6"
//         onClick={() => setHam(true)}
//       />

//       {/* Side drawer */}
//       <div className={`
//         absolute lg:hidden top-0 left-0 w-full h-full
//         bg-black/50 backdrop-blur-lg p-5 flex flex-col gap-5
//         transform transition-transform
//         ${ham ? 'translate-x-0' : 'translate-x-full'}
//       `}>
//         <RxCross1
//           className="absolute top-5 right-5 text-white w-6 h-6"
//           onClick={() => setHam(false)}
//         />
//         <button
//           className="bg-white text-black font-semibold px-5 py-3 rounded-full"
//           onClick={handleLogOut}
//         >
//           Log Out
//         </button>
//         <button
//           className="bg-white text-black font-semibold px-5 py-3 rounded-full"
//           onClick={() => navigate('/customize')}
//         >
//           Customize Assistant
//         </button>
//         <div className="border-t border-gray-400 my-4"/>
//         <h2 className="text-white font-semibold">History</h2>
//         <div className="overflow-y-auto space-y-2 text-gray-200">
//           {userData.history?.map((h, i) => <div key={i}>{h}</div>)}
//         </div>
//       </div>

//       {/* Large screen controls */}
//       <div className="hidden lg:flex absolute top-5 right-5 gap-4">
//         <button
//           className="bg-white text-black font-semibold px-5 py-3 rounded-full"
//           onClick={handleLogOut}
//         >
//           Log Out
//         </button>
//         <button
//           className="bg-white text-black font-semibold px-5 py-3 rounded-full"
//           onClick={() => navigate('/customize')}
//         >
//           Customize
//         </button>
//       </div>

//       {/* Avatar */}
//       <div className="w-72 h-96 rounded-2xl shadow-lg overflow-hidden">
//         <img
//           src={userData.assistantImage}
//           alt="assistant"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <h1 className="text-white text-xl font-semibold">
//         I&apos;m {userData.assistantName}
//       </h1>

//       {/* Chat bubble */}
//       <div className="flex flex-col items-center">
//         {aiText ? (
//           <img src={aiImg} alt="thinking" className="w-48" />
//         ) : (
//           <img src={userImg} alt="listening" className="w-48" />
//         )}
//         <p className="text-white text-lg mt-4">
//           {userText || aiText || ''}
//         </p>
//       </div>

//       {/* Listening indicator */}
//       {/* {listening && (
//         <div className="fixed bottom-5 text-green-400">
//           Listening...
//         </div>
//       )} */}
//     </div>
//   )
// }

