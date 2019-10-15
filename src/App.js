import React, { Component } from 'react';
import './App.css';
import UserDetailsComp from './Property/UserDetailsComp';

class App extends Component {

  propList = ['firstName', 'middleName', 'surName', 'dob', 'phone', 'zipcode'];

  resetForm = () => {
    document.getElementsByName("property").forEach((form) => {
      form.reset();
    });
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
    let fuzzy = valForm.elements['fuzzy'].checked;
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
        <fieldset className="w-550">
          <legend align="center">
              <h2>Customer Master Deduplication Portal</h2>
          </legend>
          <div className="m-t-10">
          <div className="inline-block w-170 m-l--10">
            <div className="container">
              <div className="col-md-6 col-sm-6">
                <div className="panel-group wrap" id="accordion" role="tablist" aria-multiselectable="true">
                  {
                    this.propList.map((value, index) => {
                      return <UserDetailsComp key={index} toggle={(event) => this.toggleView(event)} propertyName={value} />
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <form id="val-form" name="values" className="inline-block abs m-l-160 box">
            <fieldset>
              <legend>Values</legend>
              <div className="p-15">
              <div>
                  <label>Threshold</label>
                  <input name="threshold" type="number" className="w-170" placeholder="Default: 0.9" />
              </div>
              <div>
                  <label>Max Search Hits</label>
                  <input name="hits" type="number" className="w-170" placeholder="Default: 10" />
              </div>
              <div>
                  <label>Min Relevance</label>
                  <input name="minRel" type="number" className="w-170" placeholder="Default: 0.9" />
              </div>
              <div>
                  <label><input name="fuzzy" type="checkbox" />   Fuzzy Search</label>
              </div>
              <div>
                  <label>Path</label>
                  <input name="path" type="text" className="w-170" placeholder="Drive path for lucene index" />
              </div>
              </div>
            </fieldset>
          </form>
          </div>
          <div className="center">
            <button className="button2" onClick={()=>this.resetForm()}>RESET</button>
            <button className="m-l-15 button1" onClick={()=>this.createXML()}>SUBMIT</button>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default App;
