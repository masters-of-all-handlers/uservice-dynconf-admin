import {Fragment, useLayoutEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";

const prettifyJSON = json => {
  try {
    return [
      JSON.stringify(JSON.parse(json), null, 4)?.split("\n"),
      -1
    ];
  } catch (e) {
    const match = e.toString().match(/at position ([0-9]+)/);
    if (match) {
      return [json.split("\n"), parseInt(match[1])];
    }
  }
  return [json.split("\n"), 0];
}

const parseLine = line => {
  const keyValueMatches = line.match(/(\s*)"([^"]*)"(:\s+)([^{,]*)(.*)/);
  const closingMatches = line.match(/(\s*)(.*)/);
  if (keyValueMatches) {
    const [, tab, key, sep, value, finish] = keyValueMatches;
    return {tab, key, sep, value, finish};
  } else if (closingMatches) {
    const [, tab, finish] = closingMatches;
    return {tab, key: null, sep: null, value: null, finish};
  }
  return null;
}

const valueMatchers = {
  string: line => line.match(/("[^"]*")/),
  number: line => {
    const float = parseFloat(line);
    if (isNaN(float)) {
      return null;
    }
    return [line, float.toString()];
  },
}

const colorize = line => {

  for (let [type, matcher] of Object.entries(valueMatchers)) {
    const matches = matcher(line);
    if (matches) {
      return <span className={styles[type]}>{matches[1]}</span>;
    }
  }
  return line;
}

const JSONKeyValue = ({keyString, sep, value}) => {
  return <>
    {colorize(`"${keyString}"`)}
    {sep}
    {colorize(value)}
  </>
}

const JSONLine = ({line, oldLine, newLine}) => {
  const {tab, key, sep, value, finish} = parseLine(line);
  return <div className={classnames(styles.line, {
      [styles.oldLine]: oldLine,
      [styles.newLine]: newLine
    }
  )}>
    {tab}
    {key &&
      <JSONKeyValue keyString={key} value={value} sep={sep}/>}
    {finish}
  </div>
}

export default function JSONView({json, newJson, editable, onChange}) {
  const [localJson, setLocalJson] = useState(json);
  const [oldLines, oldErrPos] = prettifyJSON(localJson);
  const [newLines, newErrPos] = newJson ? prettifyJSON(newJson) : [[], -1];
  const ref = useRef();
  const handleChange = e => {
    if (editable && onChange) {
      onChange(ref.current.innerText);
      if (e.type === "blur") {
        setLocalJson(json);
      }
    }
  }
  return <div ref={ref} contentEditable={editable}
              suppressContentEditableWarning={editable}
              onKeyUp={handleChange} onBlur={handleChange}>{
    oldLines.map(
      (line, i) => {
        if (newLines) {
          const newLine = newLines[i];
          if (newLine && line && newLine !== line) {
            return <Fragment key={i}>
              <JSONLine line={line} oldLine/>
              <JSONLine line={newLine} newLine/>
            </Fragment>
          }
        }
        return <JSONLine key={i} line={line}/>;
      }
    )
  }
  </div>
}
