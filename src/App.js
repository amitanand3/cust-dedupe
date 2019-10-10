import React, { Component } from 'react';
import './App.css';
import UserDetailsComp from './Property/UserDetailsComp';

class App extends Component {

  toggleView = (event) => {
    event.currentTarget.classList.toggle("active");
    let panel = event.currentTarget.nextElementSibling;
    
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }

  createXML = () => {
    let xmlDoc = document.implementation.createDocument("", "", null);
    let rootElem = xmlDoc.createElement("duke");
    let schema = xmlDoc.createElement("schema");
    
    let property = xmlDoc.createElement("property");
    property.setAttribute("lookup", "true");

    let name = xmlDoc.createElement("name");
    name.innerHTML = "firstName";
    let comp = xmlDoc.createElement("comparator");
    comp.innerHTML = "no.priv.garshol.duke.comparators.JaroWinklerTokenized";
    let low = xmlDoc.createElement("low");
    low.innerHTML = "0.5";
    let high = xmlDoc.createElement("high");
    high.innerHTML = "0.9";

    property.appendChild(name);
    property.appendChild(comp);
    property.appendChild(low);
    property.appendChild(high);

    schema.appendChild(property);
    rootElem.appendChild(schema);
    xmlDoc.appendChild(rootElem);

    console.log(xmlDoc);
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
          <UserDetailsComp toggle={(event) => this.toggleView(event)} propertyName={'First Name'} />
          <UserDetailsComp toggle={(event) => this.toggleView(event)} propertyName={'Middle Name'} />
          <UserDetailsComp toggle={(event) => this.toggleView(event)} propertyName={'Last Name'} />
          <UserDetailsComp toggle={(event) => this.toggleView(event)} propertyName={'Date of Birth'} />
          <UserDetailsComp toggle={(event) => this.toggleView(event)} propertyName={'Phone'} />
          <UserDetailsComp toggle={(event) => this.toggleView(event)} propertyName={'Zipcode'} />
          <div className="center">
            <button className="m-10 bg-coral">RESET</button>
            <button className="m-10 bg-lgreen" onClick={()=>this.createXML()}>SUBMIT</button>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default App;
