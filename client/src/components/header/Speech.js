import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SettingsVoiceSharpIcon from "@mui/icons-material/SettingsVoiceSharp";
import { useNavigate } from "react-router-dom";

const Microphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [timer, setTimer] = useState();
  const [elements, setElements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(`/getelements`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setElements(data);
        } else {
          console.log("No elements data available");
        }
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    fetchElements();
  }, []);
  const stopListeningAndReset = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    if (timer) clearTimeout(timer);
    setTimer(null);
  };

  useEffect(() => {
    console.log(`Transcript updated: ${transcript}`);
    const words = transcript.split(" ").map((word) => word.toLowerCase());

    const matchedElements = elements.filter((element) =>
      words.includes(element.id.toLowerCase())
    );

    if (matchedElements.length > 0) {
      console.log(
        `Found match: ${matchedElements.map((el) => el.id).join(", ")}`
      );
      const remainingWords = words.filter(
        (word) => !matchedElements.find((el) => el.id.toLowerCase() === word)
      );
      console.log("Remaining Words: ", remainingWords);
      localStorage.setItem("previousWords", JSON.stringify(remainingWords));
      navigate(`/getproducts${matchedElements[0].id}/${matchedElements[0].id}`);
      stopListeningAndReset();
    }

    if (transcript && !timer) {
      setTimer(setTimeout(stopListeningAndReset, 8000));
    }
  }, [transcript, elements, navigate]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>This browser don't support speech recognition.</span>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setTimer(setTimeout(stopListeningAndReset, 8000));
  };

  return (
    <div>
      <SettingsVoiceSharpIcon
        onClick={handleStartListening}
        style={{ fontSize: 25, cursor: "pointer", color: "white" }}
      />
    </div>
  );
};

export default Microphone;
