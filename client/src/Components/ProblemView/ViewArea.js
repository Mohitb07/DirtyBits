import React, { memo } from "react";
import CodeEditor from "./CodeEditor";
import ProblemArea from "./ProblemArea";
import "./sass/ProblemBox.css";

function ViewArea(props) {
  console.log('view area')
  return (
    <div className="d-flex flex-wrap flex-row justify-content-between pt-2 pl-1 pb-2">
      <div className="ProblemBox">
        <ProblemArea id={props.id} />
      </div>
      <div>
        <CodeEditor id={props.id} uid={props.uid} />
      </div>
    </div>
  );
}

export default memo(ViewArea);
