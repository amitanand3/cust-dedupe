import React from "react";
import '../App.css';

const UserDetailsComp = (props) => {
    return (
        <div>
            <button className="accordion" onClick={props.toggle}>{props.propertyName}</button>
            <div className="panel" style={{"maxHeight": "290px"}}>
                <form id="prop-form" name="property">
                    <fieldset className="align-left">
                    <legend>Property Selector</legend>
                    <div>
                        <label><input type="radio" name="lookup" />Lookup</label>
                    </div>
                    <div>
                        <label>Comparator</label>
                        <select name="comp" className="w-270">
                            <option value="Jaro Winkler Tokenized">Jaro Winkler Tokenized</option>
                            <option value="Levenshtein">Levenshtein</option>
                            <option value="Exact Comparator">Exact Comparator</option>
                            <option value="Weighted Levenshtein">Weighted Levenshtein</option>
                            <option value="Numeric Comparator">Numeric Comparator</option>
                        </select>
                    </div>
                    <div>
                        <label>Low</label>
                        <input name="low" type="number" min="0.0" max="0.5" step="0.1" placeholder="Enter value between 0 to 0.5 (Default: 0.5)" className="w-270" />
                    </div>
                    <div>
                        <label>High</label>
                        <input name="high" type="number" min="0.5" max="1.0" step="0.1" placeholder="Enter value between 0.5 to 1 (Default: 0.9)" className="w-270" />
                    </div>
                    </fieldset>
                </form>
                <form id="val-form" name="values">
                    <fieldset>
                    <legend>Values</legend>
                    <div>
                        <label>Threshold</label>
                        <input name="threshold" type="number" className="w-310" placeholder="Default: 0.9" />
                    </div>
                    <div>
                        <label>Max Search Hits</label>
                        <input name="hits" type="number" className="w-310" placeholder="Default: 10" />
                    </div>
                    <div>
                        <label>Min Relevance</label>
                        <input name="minRel" type="number" className="w-310" placeholder="Default: 0.9" />
                    </div>
                    <div>
                        <label>Fuzzy Search</label>
                        <input name="fuzzy" type="text" className="w-310" placeholder="True/False (Default: True)" />
                    </div>
                    <div>
                        <label>Path</label>
                        <input name="path" type="text" className="w-310" placeholder="Default drive path for lucene index (/opt/flink/lucene)" />
                    </div>
                    </fieldset>
                </form>
            </div>
      </div>
    );
}

export default UserDetailsComp;