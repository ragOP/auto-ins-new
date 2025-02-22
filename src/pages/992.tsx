import React, { useState, useEffect } from "react";
//@ts-ignore
import TagManager from "react-gtm-module";
import axios from "axios";
import "./styles.scss";

import { scrollTo } from "../utils";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head_bg from "../assets/share.png";
import Headline from "../assets/headline_spandeb1.png";
import Logo from "../assets/rag.png";

// google tag manager
// const tagManagerArgs = {
//   gtmId: "GTM-KZJBC3B",
// };

// TagManager.initialize(tagManagerArgs);

export default function Fifth_SP() {

  const SlideUp = cssTransition({
    enter: "toast-enter",
    exit: "toast-exit",
  });

  const messages = [
    "Michael D. from Texas just qualified for a $25,000 Final Expense Coverage",
    "Jane L. Rodriguez. from Dallas just qualified for a $25,000 Final Expense Coverage",
    "Sunny D. from LOS ANGELES,just qualified for a $40,000 Final Expense Coverage",
    "Moody K. from Texas just qualified for a $36,000 Final Expense Coverage",
    "Tom D. from Seattle just qualified for a $40,000 Final Expense Coverage"
  ];

  // Function to shuffle array in place
  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffleArray(messages);

  const notify = (message: any) => {
    // Dismiss all existing toasts
    toast.dismiss();

    // Bold formatting for specific keywords
    let boldedMessage = message.replace(
      /\$40,000 Final Expense Coverage/g,
      '<strong class="green-bold">$40,000 Final Expense Coverage</strong>'
    );

    const specialAmounts = ["$25,000", "$36,000", "$16,800"];
    specialAmounts.forEach((amount) => {
      if (message.includes(amount)) {
        boldedMessage = boldedMessage.replace(
          amount,
          `<strong class="green-bold">${amount}</strong>`
        );
      }
    });

    toast(<div dangerouslySetInnerHTML={{ __html: boldedMessage }} />, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
    });
  };


  useEffect(() => {
    const delayedEffect = setTimeout(() => {
      // Function to display a random toast
      const showRandomToast = () => {
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        notify(randomMessage);
      };

      // Show the first toast
      showRandomToast();

      // Set up a recurring timer with a fixed 5-second interval
      const timer = setInterval(() => {
        showRandomToast();
      }, 5000); // 5-second delay between toasts

      // Cleanup
      return () => {
        clearInterval(timer);
      };
    }, 6000); // Initial 6-second delay before starting the logic

    // Cleanup for the setTimeout
    return () => {
      clearTimeout(delayedEffect);
    };
  }, []);



  useEffect(() => {
    window.document.title = "Benefits For Elderly";

    axios
      .get(process.env.REACT_APP_PROXY + `/visits/8`)

  }, []);

  const handleCall = () => {
    getButtonClick({ buttonId: 5 })
  };

  const [quiz, setQuiz] = useState("1.Are You Already Insured?");
  const [step, setStep] = useState("process");
  const [min, setMin] = useState(3);
  const [second, setSecond] = useState<any>(0);
  const [yes, setYes] = useState("YES");
  const [no, setNo] = useState("NO");


  const stepProcess = () => {
    if (step === "Reviewing the answers...") {
      setTimeout(() => {
        setStep("Searching for available spots...");
      }, 1500);
    }
    if (step === "Searching for available spots...") {
      setTimeout(() => {
        setStep("Confirming Eligibility...");
      }, 1500);
    }
    if (step === "Confirming Eligibility...") {
      setTimeout(() => {
        setStep("completed");


      }, 1500);
    }

    if (step === "completed") {
      const startTime: any = new Date();
      const timer = setInterval(() => {
        const nowTime: any = new Date();
        setSecond((180 - Math.round((nowTime - startTime) / 1000)) % 60);
        setMin(
          Math.floor((180 - Math.round((nowTime - startTime) / 1000)) / 60)
        );
      }, 1000);
    }
  };

  useEffect(() => {
    stepProcess();
  }, [step]);

  const topScroll = (id: any) => {
    scrollTo({ id });
  };


  const handleQuizP = () => {
    topScroll("btn");
    if (quiz === "1.Are You Already Insured?") {
      setQuiz("2. Do You Live in the USA?");
      setYes("Yes");
      setNo("No");
      getButtonClick({ buttonId: 1 })
    } else {
      setStep("Reviewing the answers...");
      topScroll("top");
      getButtonClick({ buttonId: 3 })
    }
  };

  const handleQuizN = () => {
    topScroll("btn");
    if (quiz === "1.Are You Already Insured?") {
      setQuiz("2. Do You Live in the USA?");
      setYes("Yes");
      setNo("No");
      getButtonClick({ buttonId: 2 })
    } else {
      setStep("Reviewing the answers...");
      topScroll("top");
      getButtonClick({ buttonId: 4 })
    }
  };

  const closingDate = new Date(); // Gets today's date
  const formattedDate = closingDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });


  const websiteViewCount = async () => {
    await fetch("https://anlyatical-dashboard.onrender.com/api/website", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "websiteId": 101,
        "websiteName": "benefitsforelderly.org/engfe25k",
      }),
    });
  }

  const getButtonClick = async ({ buttonId }: { buttonId: number }) => {
    await fetch("https://anlyatical-dashboard.onrender.com/api/button", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "websiteId": 101,
        "buttonId": buttonId,
      }),
    });
  }

  useEffect(() => {
    websiteViewCount()
  }, [])


  const handleSession = async () => {
  
    const generateSessionId = () => {
      return 'session-' + Math.random().toString(36).substr(2, 9);
    };

    const sessionId = generateSessionId();
    async function endSession() {
      const response = await axios.post('https://anlyatical-dashboard.onrender.com/api/session/end', { websiteId: 101, sessionId });
      console.log('Session ended. Duration:', response.data.duration, 'seconds');
    }

    try {
      // Start the session
      await axios.post('https://anlyatical-dashboard.onrender.com/api/session/start', { websiteId:101, sessionId });
      console.log('Session started');

      // Record an interaction
      await axios.post('https://anlyatical-dashboard.onrender.com/api/session/interaction', { websiteId:101, sessionId });
      console.log('Interaction recorded');

      // End the session after 5 seconds
      window.addEventListener('beforeunload', endSession);

      setTimeout(endSession, 5000);

      return () => {
        endSession();
        window.removeEventListener('beforeunload', endSession);
      };

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleSession();
  }, []);
  return (
    <div>
      

      {/* <ToastContainer /> */}

      <div
        style={{
          marginBottom: '4px',
          overflow: 'hidden', // Ensure the text doesn't overflow outside the container
          whiteSpace: 'nowrap', // Prevent the text from wrapping
        }}
        className="top-sticky-blue-test2Above"
        id="top"
      > 
        <div
          style={{
            display: 'inline-block',
            animation: 'scroll 20s linear infinite', // Slower animation
          }}
        >
          {`Hotlines to claim this benefit will close on ${formattedDate}, 9 P.M.`}
        </div>
        <style>
          {`
      @keyframes scroll {
        0% {
          transform: translateX(100%); /* Start off-screen to the right */
        }
        100% {
          transform: translateX(-100%); /* End off-screen to the left */
        }
      }
    `}
        </style>
      </div>
      <div style={{ marginBottom: '4px' }} className="top-sticky-blue-test2" id="top">
        {/* Benefits For Elderly */}
       <center>
       <img 
        src={Logo} 
        alt="Logo" 
        className="logo-image"
        style={{
          maxWidth: '200px',
          display: 'block',
          height: '40px',
     
        }}
       </center>
      />

      </div>
      {step === "process" ? (
        <>
          <div className="main-container-5">
            <div className="main-descrition-5-5">
              {/*               <div className="main-des-title-6-7">
                <b>
                Americans Over 50 Can Now Qualify For The $25,000 Burial Coverage Benefit in 2024!
                </b>
              </div> */}


              <div className="main-des-title-6-7">
                <b>
                Before You Pay Your Car Insurance Bill This Month,  {""}
                  <span style={{ backgroundColor: "#FFC300" }}>
                  Check This Gov Backed Program in 2025...
                  </span>{" "}

                </b>
              </div>


              {/* <img className='topic-img-larger' src = {Headline} alt = "head"/> */}
              <img className="topic-img-middle-z" src={"https://convertri.imgix.net/7562552f-90c0-11ea-abef-0697e5ca793e%2F2bd3e4ed982aedd952d7678f7af4f9cf7eb8ade6%2Fins.jpeg?auto=compress,format&dpr=2&fit=scale&w=460&h=259"} alt="head" />
              <div style={{ marginTop: '14px', marginLeft: '10px' }} className="main-des-5">
              Americans are taking advantage of this opportunity lower their Auto Insurance rates significantly under this new LCA program.
                <br /> <br />

                Simply answer the questions below and claim your discounted plan while you still can!
              </div>
            </div>
            <div style={{ marginTop: '15px' }} className="survey">
              <div className="quiz-5" id="btn">
                {quiz}
              </div>
              <div className="answer">
                <div className="answer-btn-5" onClick={handleQuizP}>
                  {yes}
                </div>
                <div className="answer-btn-5" onClick={handleQuizN}>
                  {no}
                </div>
              </div>
            </div>


          </div>
{/*           <img className="topic-img-middle-z" style={{ marginTop: '20px' }}  src={"https://convertri.imgix.net/7562552f-90c0-11ea-abef-0697e5ca793e%2Fab9fa3ba7b98c8992f944850d83f0671f760c0c0%2Ff035afdf-e613-11ed-922e-06cea9523c95_a8154e206fdb23bd140889c26fb0b7be4655a1bf_newpremium3.jpeg?auto=compress,format&dpr=2&fit=scale&w=460&h=231"} alt="head" /> */}

{/*           <img className="topic-img-middle-z" style={{ marginTop: '20px' }}  src={"https://convertri.imgix.net/7562552f-90c0-11ea-abef-0697e5ca793e%2F74ca61be8b6726c0d265d0c8f5f08f1ab116692a%2Ff035afdf-e613-11ed-922e-06cea9523c95_1212e98684692ad7703610f522705d58eb93fcc7_oldpremium3.jpeg?auto=compress,format&dpr=2&fit=scale&w=460&h=231"} alt="head" /> */}

{/*           <img className="topic-img-middle-z" style={{ marginTop: '20px' }}  src={"https://convertri.imgix.net/7562552f-90c0-11ea-abef-0697e5ca793e%2Fe1444462913fa7028d40d0b004ffc97406de8031%2Ff035afdf-e613-11ed-922e-06cea9523c95_a96ba2f263bc587b48e2a1ab9340d43b79f5beec_newpremium2.jpeg?auto=compress,format&dpr=2&fit=scale&w=460&h=246"} alt="head" /> */}
    
        </>
      ) : step !== "process" && step !== "completed" ? (
        <div className="checking" style={{ fontWeight: "700" }}>
          {step}
        </div>
      ) : (
        <div className="checking">
          <div className="congrats">Congratulations, You Qualify!</div>
          <div className="top-description-5">

            <b>Make A Quick Call</b> To Claim Your Discounted Auto Insurance Plan Now!
          </div>
          <div className="spots-count">Spot Remaining: 4</div>
          <a href="tel:++13214858035">
            <div className="call-btn" onClick={handleCall}>
              CALL (321) 485-8035
            </div>
          </a>
          <div className="sub-description">
            Due to high call volume, your official agent is waiting for only 3 minutes, then your spot will not be reserved.
          </div>
          <div className="timer">
            <div className="timer-cell">{min}</div>
            <div className="timer-cell">:</div>
            <div className="timer-cell">{second}</div>
          </div>
        </div>
      )}
      <div className="footer">
        <div className="terms">Terms & Conditions | Privacy Policy</div>
      </div>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </div>
  );
}
