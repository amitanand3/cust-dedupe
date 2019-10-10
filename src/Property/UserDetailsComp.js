import React from "react";
import '../App.css';

const UserDetailsComp = (props) => {
    return (
        <div>
            <button className="accordion" onClick={props.toggle}>{props.propertyName}</button>
            <div className="panel" style={{"maxHeight": "290px"}}>
                <fieldset className="align-left">
                <legend>Property Selector</legend>
                <div>
                    <label><input type="radio" />Lookup</label>
                </div>
                <div>
                    <label>Comparator</label>
                    <select className="w-270">
                    <option>Jaro Winkler Tokenized</option>
                    <option>Levenshtein</option>
                    <option>Exact Comparator</option>
                    <option>Weighted Levenshtein</option>
                    <option>Numeric Comparator</option>
                    </select>
                </div>
                <div>
                    <label>Low</label>
                    <input type="number" min="0.0" max="0.5" step="0.1" placeholder="Enter value between 0 to 0.5 (Default: 0.5)" className="w-270" />
                </div>
                <div>
                    <label>High</label>
                    <input type="number" min="0.5" max="1.0" step="0.1" placeholder="Enter value between 0.5 to 1 (Default: 0.9)" className="w-270" />
                </div>
                </fieldset>
                <fieldset>
                <legend>Values</legend>
                <div>
                    <label>Threshold</label>
                    <input type="number" className="w-310" placeholder="Default: 0.9" />
                </div>
                <div>
                    <label>Max Search Hits</label>
                    <input type="number" className="w-310" placeholder="Default: 10" />
                </div>
                <div>
                    <label>Min Relevance</label>
                    <input type="number" className="w-310" placeholder="Default: 0.9" />
                </div>
                <div>
                    <label>Fuzzy Search</label>
                    <input type="text" className="w-310" placeholder="True/False (Default: True)" />
                </div>
                <div>
                    <label>Path</label>
                    <input type="text" className="w-310" placeholder="Default drive path for lucene index (/opt/flink/lucene)" />
                </div>
                </fieldset>
            </div>
      </div>
    );
}

export default UserDetailsComp;