import React from "react";
import '../App.css';

const UserDetailsComp = (props) => {
    return (
        
                <div className="panel">
                    <div className="panel-heading" role="tab" id={"heading-"+props.propertyName}>
                    <h4 className="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href={"#"+props.propertyName} aria-expanded="true" aria-controls={props.propertyName}>
                    {props.propertyName}
                    </a>
                </h4>
                    </div>
                    <div id={props.propertyName} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading-"+props.propertyName}>
                    <div className="panel-body">
                    <form name="property">
                    <fieldset className="align-left">
                    <legend>Property Selector</legend>
                    <div>
                        <label><input type="checkbox" name="lookup" />   Lookup</label>
                    </div>
                    <div>
                        <label>Comparator</label>
                        <select name="comp" className="w-195">
                            <option value="Jaro Winkler Tokenized">Jaro Winkler Tokenized</option>
                            <option value="Levenshtein">Levenshtein</option>
                            <option value="Exact Comparator">Exact Comparator</option>
                            <option value="Weighted Levenshtein">Weighted Levenshtein</option>
                            <option value="Numeric Comparator">Numeric Comparator</option>
                        </select>
                    </div>
                    <div>
                        <label>Low</label>
                        <input name="low" type="number" min="0.0" max="0.5" step="0.1" placeholder="Enter value between 0 to 0.5" className="w-195" />
                    </div>
                    <div>
                        <label>High</label>
                        <input name="high" type="number" min="0.5" max="1.0" step="0.1" placeholder="Enter value between 0.5 to 1" className="w-195" />
                    </div>
                    </fieldset>
                </form>
                    </div>
                    </div>
                </div>
    );
}

export default UserDetailsComp;