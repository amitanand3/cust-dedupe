import React, { Component } from 'react';
import './App.css';
import UserDetailsComp from './Property/UserDetailsComp';

class App extends Component {

  propList = ['firstName', 'middleName', 'surName', 'dob', 'phone', 'zipcode'];

  toggleView = (event) => {
    event.currentTarget.classList.toggle("active");
    let panel = event.currentTarget.nextElementSibling;
    
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }

  resetForm = () => {
    document.getElementById("prop-form").reset();
    document.getElementById("val-form").reset();
  }

  createXML = () => {
    let xmlDoc = document.implementation.createDocument("", "", null);
    let rootElem = xmlDoc.createElement("duke");
    let schema = xmlDoc.createElement("schema");

    let valForm = document.getElementById('val-form');
    let threshold = xmlDoc.createElement("threshold");
    threshold.innerHTML = valForm.elements['threshold'].value || "0.9";
    schema.appendChild(threshold);
    
    this.propList.forEach((prop, index) => {
      let form = document.property[index];
      let property = xmlDoc.createElement("property");
      property.setAttribute("lookup", form.elements["lookup"].checked);
  
      let name = xmlDoc.createElement("name");
      name.innerHTML = prop;
      let comp = xmlDoc.createElement("comparator");
      comp.innerHTML = form.elements["comp"].value;
      let low = xmlDoc.createElement("low");
      low.innerHTML = form.elements["low"].value || "0.5";
      let high = xmlDoc.createElement("high");
      high.innerHTML = form.elements["high"].value || "0.9";

      property.appendChild(name);
      property.appendChild(comp);
      property.appendChild(low);
      property.appendChild(high);

      schema.appendChild(property);
    });

    let dbTag = xmlDoc.createElement("database");
    dbTag.setAttribute("class", "no.priv.garshol.duke.databases.LuceneDatabase");
    
    let param = xmlDoc.createElement("param");
    param.setAttribute("name", "path");
    let path = valForm.elements['path'].value || "/opt/flink/lucene";
    param.setAttribute("value", path);
    dbTag.appendChild(param);

    param = xmlDoc.createElement("param");
    param.setAttribute("name", "max-search-hits");
    let hits = valForm.elements['hits'].value || "10";
    param.setAttribute("value", hits);
    dbTag.appendChild(param);

    param = xmlDoc.createElement("param");
    param.setAttribute("name", "min-relevance");
    let minRel = valForm.elements['minRel'].value || "0.9";
    param.setAttribute("value", minRel);
    dbTag.appendChild(param);

    param = xmlDoc.createElement("param");
    param.setAttribute("name", "fuzzy-search");
    let fuzzy = valForm.elements['fuzzy'].value || "true";
    param.setAttribute("value", fuzzy);
    dbTag.appendChild(param);

    schema.appendChild(dbTag);
    rootElem.appendChild(schema);
    xmlDoc.appendChild(rootElem);

    console.log(xmlDoc);
    let xmlSerializer = new XMLSerializer();
    let xmlString = xmlSerializer.serializeToString(xmlDoc);
    console.log(xmlString);
    let tempTab = window.open("");
    tempTab.document.write('<textarea style="border:none; -webkit-box-sizing: border-box; -moz-box-sizing: border-box;         box-sizing: border-box; width:100%; height:100%">'+xmlString+'</textarea>');
  }
  
  render() {
    return (
      <div className="center">
        <fieldset className="w-700">
          <legend>
            <h1>
              <u>Customer Master Deduplication Portal</u>
            </h1>
          </legend>
          {
            this.propList.map((value, index) => {
              return <UserDetailsComp key={index} toggle={(event) => this.toggleView(event)} propertyName={value} />
            })
          }
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
                  <input name="path" type="text" className="w-310" placeholder="Default drive path for lucene index: /opt/flink/lucene" />
              </div>
            </fieldset>
          </form>
          <div className="center">
            <button className="m-10 bg-coral" onClick={()=>this.resetForm()}>RESET</button>
            <button className="m-10 bg-lgreen" onClick={()=>this.createXML()}>SUBMIT</button>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default App;
