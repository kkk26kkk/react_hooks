import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useInput from "./useInput";
import useTabs from "./useTabs";
import useTitle from "./useTitle";
import useClick from "./useClick";
import useConfirm from "./useConfirm";
import usePreventLeave from "./usePreventLeave";
import useBeforeLeave from "./useBeforeLeave";
import useFadeIn from "./useFadeIn";
import useNetwork from "./useNetwork";
import useScroll from "./useScroll";
import useFullscreen from "./useFullscreen";
import useNotification from "./useNotification";
import useAxios from "./useAxios";

import "./styles.css";

const App = () => {
  //useInput
  const maxLen = (value) => value.length <= 10;
  const name = useInput("Mr.", maxLen);

  //useTabs
  const content = [
    {
      tab: "Section 1",
      content: "I'm the content of the Section 1"
    },
    {
      tab: "Section 2",
      content: "I'm the content of the Section 2"
    }
  ];
  const { currentItem, changeItem } = useTabs(0, content);

  //useEffect
  const sayHello = () => console.log("hello");
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);
  useEffect(sayHello, [number]);

  //useTitle
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => titleUpdater("Home"), 5000);

  //useClick
  const sayHi = () => console.log("hi.");
  const title = useClick(sayHi);

  //useConfirm
  const deleteWorld = () => console.log("Deleting the world...");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure", deleteWorld, abort);

  //usePreventLeave
  const { enablePrevent, disablePrevent } = usePreventLeave();

  //useBeforeLeave
  const begForLife = () => console.log("Pls dont leave");
  useBeforeLeave(begForLife);

  //useFadeIn
  const fadeInP1 = useFadeIn(1, 2);
  const fadeInP2 = useFadeIn(5, 10);

  //useNetwork
  const handleNetworkChange = (online) => {
    console.log(online ? "We just went online" : "We are offline");
  };
  const onLine = useNetwork(handleNetworkChange);

  //useScroll
  const { y } = useScroll();

  //useFullscreen
  const onFullS = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
  };
  const { element, triggerFull, exitFull } = useFullscreen(onFullS);

  //useNotification
  const triggerNotif = useNotification("Can I steal your kimchi?", {
    body: "I love kimchi, dont you?"
  });

  //useAxios
  const { loading, data, refetch } = useAxios({
    url: "https://yts-proxy.now.sh/list_movies.json"
  });

  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1>useInput</h1>
      <input placeholder="Name" {...name} />

      <h1>useTabs</h1>
      {content.map((section, index) => (
        <button key={index} onClick={() => changeItem(index)}>
          {section.tab}
        </button>
      ))}
      <div>{currentItem.content}</div>

      <h1>useEffect</h1>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>

      <h1>useTitle</h1>
      <p>Look at the title of this browser.</p>

      <h1>useClick</h1>
      <p ref={title}>Click this paragraph.</p>

      <h1>useConfirm</h1>
      <button onClick={confirmDelete}>Delete the world.</button>

      <h1>usePreventLeave</h1>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>

      <h1>useBeforeLeave</h1>
      <p>개발자 도구 실행 후 상단 탭 벗어날 때 콘솔 확인</p>

      <h1>useFadeIn</h1>
      <p {...fadeInP1}>Hello</p>
      <p {...fadeInP2}>lorem ipsum lalalal</p>

      <h1>useNetwork</h1>
      <p>{onLine ? "Online" : "OffLine"}</p>

      <h1>useScroll</h1>
      <h1 style={{ color: y > 800 ? "red" : "blue" }}>Hi</h1>

      <h1>useFullscreen</h1>
      <div ref={element}>
        <img src="https://i.ibb.co/R6RwNxx/grape.jpg" alt="img" />
        <button onClick={exitFull}>Exit fullScreen</button>
      </div>
      <button onClick={triggerFull}>Make fullScreen</button>

      <h1>useNotification</h1>
      <p onClick={triggerNotif}>Hello</p>

      <h1>useAxios</h1>
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading"}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
