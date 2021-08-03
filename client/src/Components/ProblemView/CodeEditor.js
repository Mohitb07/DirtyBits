import React, { memo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import { RotateSpinner } from "react-spinners-kit";
import InputField from "./InputField";
import OutputField from "./OutputField";
import LanguageDrop from "./LanguageDrop";
import axios from "axios";
import ThemeDrop from "./ThemeDrop";
import "./sass/CodeEditor.css";
import InputOutputField from "./InputOutputField";
import {fetchUser, sendData} from '../../actions'
import { useDispatch } from "react-redux";

const CodeEditor = (props) => {
  const dispatch = useDispatch()
  var mapping = { python: "p3", cpp: "CP", p3:"P3" };
  var score;
  var user_id = parseInt(props.uid);

  const [editorHeight, setEditorHeight] = useState("78vh");

  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("Enter Input");
  const [output, setOutput] = useState("Output will be Displayed Here");

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const endpoint = "http://54.198.168.63/run/" + user_id.toString() + "/";

  const displayOut = async (out) => {
    score = out["testCasesPassed"];
    console.log(score.split('/'));
    const newScore = score.split('/')
    const first = parseInt(newScore[0]);
    const second = parseInt(newScore[1]);
    const calculatedScore = (first/second) * 100
    console.log(first, second)
    console.log('calculated score', calculatedScore)
    console.log(props.id)
    console.log(props.uid)
    const dataToSend = {
      score : calculatedScore,
      problemId : props.id,
      userId : props.uid
    }
    console.log('data to send', dataToSend)

    dispatch(sendData(dataToSend))

    if (!document.getElementById("custominput").checked) {
      document.getElementById("result").innerHTML =
        "Test Cases Passed : " + score;
    } else {
      document.getElementById("result").innerHTML = "";
    }
    if (out["error"] !== "") {
      setOutput("ERROR \n" + out["error"]);
    } else {
      if (out["outputGen"] !== "") {
        setOutput(out["outputGen"]);
      }
    }
    if (document.getElementById("custominput").checked) {
      document.getElementById("inputfield").style.display = "none";
      document.getElementById("outputfield").style.display = "none";
      var x = document.getElementById("inputoutputfield");
      x.style.display = "block";
      x.focus();
      x.scrollIntoView();
    } else {
      document.getElementById("inputoutputfield").style.display = "none";
      document.getElementById("inputfield").style.display = "none";
      if (out["error"] !== "") {
        x = document.getElementById("outputfield");
        x.style.display = "block";
        x.focus();
        x.scrollIntoView();
      }
    }
    setIsEditorReady(true);
  };

  const connect = async (data) => {
    var socket = new WebSocket(
      "ws://54.198.168.63:8001/ws/runcode/" + user_id.toString() + "/"
    );
    socket.onopen = function (e) {
      console.log("opened");
    };
    const response = await axios.post(endpoint, data);
    socket.onmessage = async function (e) {
      var data = JSON.parse(e.data);
      if (data["text"] !== "passed" && data["text"] !== "failed") {
        var metadata = JSON.parse(data["text"])[0];
        displayOut(metadata.fields);
      } else {
        console.log(data["text"]);
      }
    };
    return response;
  };

  const compileCode = async (data) => {
    await connect(data);
  };
  const runCode = () => {
    setIsEditorReady(false);

    if (input !== "Enter Input") {
      const data = {
        userId: user_id,
        problemId: props.id,
        code: valueGetter.current(),
        language: mapping[language],
        inputGiven: input,
        status: "R",
        testCasesPassed: 0,
      };
      console.log(data);
      compileCode(data);
    } else {
      const data = {
        userId: user_id,
        problemId: props.id,
        code: valueGetter.current(),
        language: mapping[language],
        inputGiven: "",
        status: "R",
        testCasesPassed: 0,
      };
      console.log(data);
      compileCode(data);
    }
  };
  const inputProvided = () => {
    const inpVal = document.getElementById("custominput").checked;
    var x = document.getElementById("inputfield");
    if (inpVal) {
      setEditorHeight("50vh");
      if (document.getElementById("outputfield").style.display === "block") {
        document.getElementById("outputfield").style.display = "none";
        document.getElementById("inputoutputfield").style.display = "block";
      } else if (
        document.getElementById("inputoutputfield").style.display === "block"
      ) {
        document.getElementById("inputoutputfield").style.display = "block";
      } else {
        x.style.display = "block";
        x.focus();
        x.scrollIntoView();
      }
    } else {
      setEditorHeight("78vh");
      x.style.display = "none";
    }
  };
  return (
    <div>
      <div className="d-flex flex-row justify-content-around">
        <LanguageDrop props={language} dispatch={setLanguage} />
        <ThemeDrop props={theme} dispatch={setTheme} />
      </div>
      <br />
      <Editor
        value="Enter Code Here"
        loading={<Loader />}
        height={editorHeight}
        width="48vw"
        theme={theme}
        language={language}
        editorDidMount={handleEditorDidMount}
      />

      <div className="d-flex flex-row justify-content-around pt-2 pb-2">
        <h3 id="result"></h3>
        <div>
          <input onClick={inputProvided} id="custominput" type="checkbox" />{" "}
          <label>Custom Input </label>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={runCode}
            disabled={!isEditorReady}
          >
            {" "}
            Run Code
          </button>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-around">
        <div id="inputfield" style={{ display: "none" }}>
          <InputField currState="false" val={input} dispatch={setInput} />
        </div>
      </div>

      <div className="d-flex flex-row justify-content-around">
        <div id="outputfield" style={{ display: "none" }}>
          <OutputField currState="false" val={output} dispatch={setOutput} />
        </div>
      </div>

      <div id="inputoutputfield" style={{ display: "none" }}>
        <InputOutputField
          vali={input}
          valo={output}
          dispatchi={setInput}
          dispatcho={setOutput}
        />
      </div>
    </div>
  );
};

export default memo(CodeEditor);
