import Axios from "axios";
import React, { memo, useState } from "react";
import "./sass/ProblemArea.css";
import Iframe from "react-iframe";
import { StageSpinner as ProbSpinner } from "react-spinners-kit";

function ProblemArea(props) {
  console.log('p area as well')
  const endpoint = "http://54.198.168.63/";

  const [totaltc, setTotaltc] = useState(0);

  const data = {
    type: "problem",
    id: props.id,
  };

  const showTCIn = (tc) => {
    var inps = new Array();
    for (var i = 1; i <= tc; i++) {
      inps.push(
        endpoint +
          "media/TestCases/" +
          data.id +
          "/sc-input" +
          i.toString() +
          ".txt"
      );
    }
    const renderinp = inps.map((item, index) => {
      return (
        <>
          <div style={{color:'white'}}>
            <pre>#TestCase {index + 1}</pre>
            <Iframe id="frmFile" src={item}></Iframe>
          </div>
        </>
      );
    });
    return renderinp;
  };

  const showTCOt = (tc) => {
    var ops = new Array();
    for (var i = 1; i <= tc; i++) {
      ops.push(
        endpoint +
          "media/TestCases/" +
          data.id +
          "/sc-output" +
          i.toString() +
          ".txt"
      );
    }
    const renderout = ops.map((item, index) => {
      return (
        <>
          <pre>#TestCase {index + 1}</pre>
          <Iframe id="frmFile" src={item}></Iframe>
        </>
      );
    });
    return renderout;
  };

  const getData = async (data) => {
    const response = await Axios.post(endpoint + "getData/", data);
    const out = response.data;
    document.querySelector(".problemTitle").innerHTML = out["title"];
    document.querySelector(".problemStatement").innerHTML = out["description"];
    document.querySelector(".timelimit").innerHTML =
      "Time Limit : " + out["timeLimit"];
    document.querySelector(".memorylimit").innerHTML =
      "Memory Limit : " + out["memoryLimit"];
    setTotaltc(out["sampleTc"]);
    document.querySelector("#SpinnerDisp").style.display = "none";
    document.querySelector("#ProblemDisp").style.display = "block";
  };

  getData(data);

  return (
    <div>
      <div id="ProblemDisp">
        <h1 className="problemTitle"></h1>
        <br></br>
        <b>
          <p className="problemStatement"></p>
        </b>
        <br></br>
        <div className="d-flex flex-row justify-content-around" id="testCases">
          <div className="d-flex flex-column">
            <h5 id="ioheading">Input</h5>
            {showTCIn(totaltc)}
          </div>
          <div className="d-flex flex-column">
            <h5 id="ioheading">Output</h5>
            {showTCOt(totaltc)}
          </div>
        </div>
        <p className="timelimit"></p>
        <p className="memorylimit"></p>
      </div>
      <div id="SpinnerDisp">
        <ProbSpinner />
      </div>
    </div>
  );
}

export default memo(ProblemArea);
