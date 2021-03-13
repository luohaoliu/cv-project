import React, { Component } from 'react';


class Experience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName:"",
      positionTitle:"",
      mainTasks:"",
      date:"",
      experienceStuff: [],

      editButtonText: "Add info",
      
    }

  this.handleChange1 = this.handleChange1.bind(this);
  this.handleChange2 = this.handleChange2.bind(this);
  this.handleChange3 = this.handleChange3.bind(this);
  this.handleChange4 = this.handleChange4.bind(this);

  this.submitChange = this.submitChange.bind(this);
  this.removeItem = this.removeItem.bind(this);
  this.editItem = this.editItem.bind(this);

  this.changeText = this.changeText.bind(this);

  }

  changeText () {
      let text = this.state.editButtonText;
      
      if (text === "Modify") {
        this.setState({editButtonText:"Add info"});
      } else {
        this.setState({editButtonText:"Modify"});
      }
  }


  handleChange1(event) {
    this.setState({
      companyName: event.target.value,
    })
  }

  handleChange2(event) {
    this.setState({
      positionTitle: event.target.value,
    })
  }

  handleChange3(event) {
    this.setState({
      mainTasks: event.target.value,
    })
  }

  handleChange4(event) {
    this.setState({
      date: event.target.value,
    })
  }

  submitChange(event) {
    let text = this.state.editButtonText;
      
    if (text === "Add info") {

        event.preventDefault();
            let experience = this.state.companyName + "  |  " + this.state.positionTitle + "  |  " + this.state.mainTasks 
            + "  |  " + this.state.date;
            this.setState({
            experienceStuff: this.state.experienceStuff.concat(experience),
            companyName: "",
            positionTitle: "",
            mainTasks: "",
            date: "",
            });
    } else {
        event.preventDefault();
        let experience = this.state.companyName + "  |  " + this.state.positionTitle + "  |  " + this.state.mainTasks 
        + "  |  " + this.state.date;
        let specificItem = "change pending";
        let array = this.state.experienceStuff;
        let num = array.findIndex(el => el === specificItem);
        array.splice(num, 1, experience);
        this.setState({
            experienceStuff: array,
            companyName: "",
            positionTitle: "",
            mainTasks: "",
            date: "",
            editButtonText: "Add info",
            });
    }

    
  };

  removeItem(name) {
    let array = this.state.experienceStuff;
    array.splice(name, 1);
      this.setState({
        experienceStuff: array
      });
  }
  
  editItem(itemIndex) {
    let array = this.state.experienceStuff;
    let arrayCopy = array[itemIndex].split("  |  ");
      this.setState({
        companyName: arrayCopy[0],
        positionTitle: arrayCopy[1],
        mainTasks: arrayCopy[2],
        date: arrayCopy[3],
    });

    array[itemIndex] = "change pending";

    this.changeText();
  }


  

  render() {
    const {companyName, positionTitle, mainTasks, date, experienceStuff} = this.state;

    return (
      <div className="App">
        <h2>Practical Experience</h2>

        <div className="output">
          
        {experienceStuff.map((eachinfo, index) => {
          return <li style={{ listStyleType: "none"}} className="output-value" key = {index}> 
          <span className="text-position"> {eachinfo} </span> 
          <button className="remove-button-position" onClick={() => this.removeItem(index)} disabled={this.state.editButtonText.includes("Modify")} style={{visibility: this.props.showButton ? 'visible' : 'hidden' }}> remove </button>
          <button className="edit-button-position" onClick={() => this.editItem(index)} disabled={this.state.editButtonText.includes("Modify")} style={{visibility: this.props.showButton ? 'visible' : 'hidden' }}> edit </button>
          <br></br>
          <br></br>
          </li>
          ;
        })}
        
      </div>
      
      <form onSubmit={this.submitChange} style={{visibility: this.props.showButton ? 'visible' : 'hidden' }}>
        <label htmlFor="company-name">company name</label>
        <input
          onChange={this.handleChange1}
          value={companyName}
          type="text"
          id="company-name"
        />

        <label htmlFor="position-title"> position title</label>
        <input
          onChange={this.handleChange2}
          value={positionTitle}
          type="text"
          id="position-title"
        />

        <label htmlFor="main-tasks"> main tasks</label>
        <input
          onChange={this.handleChange3}
          value={mainTasks}
          type="text"
          id="main-tasks"
        />

        <label htmlFor="date"> date</label>
        <input
          onChange={this.handleChange4}
          value={date}
          type="text"
          id="date"
        />
        <button tyoe="submit">{this.state.editButtonText}</button>
        </form>
        
      </div>
    );
  }

}




export default Experience;