import React, { Component } from 'react';


class Education extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolName:"",
      titleOfStudy:"",
      dateOfStudy:"",
      educationStuff: [],
      editButtonText: "Add info",
    }

  this.handleChange1 = this.handleChange1.bind(this);
  this.handleChange2 = this.handleChange2.bind(this);
  this.handleChange3 = this.handleChange3.bind(this);

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
      schoolName: event.target.value,
    })
  }

  handleChange2(event) {
    this.setState({
      titleOfStudy: event.target.value,
    })
  }

  handleChange3(event) {
    this.setState({
      dateOfStudy: event.target.value,
    })
  }

  submitChange(event) {
    let text = this.state.editButtonText;
      
    if (text === "Add info") {
    event.preventDefault();

        let education = this.state.schoolName + "  |  " + this.state.titleOfStudy + "  |  " + this.state.dateOfStudy;
        this.setState({
          educationStuff: this.state.educationStuff.concat(education),
          schoolName: "",
          titleOfStudy: "",
          dateOfStudy: "",
        });
    
    } else {
      event.preventDefault();
      let education = this.state.schoolName + "  |  " + this.state.titleOfStudy + "  |  " + this.state.dateOfStudy;
      
      let specificItem = "change pending";
      let array = this.state.educationStuff;
      let num = array.findIndex(el => el === specificItem);
      array.splice(num, 1, education);
      this.setState({
          educationStuff: array,
          schoolName: "",
          titleOfStudy: "",
          dateOfStudy: "",
          editButtonText: "Add info",
          });
    }
  };

  removeItem(name) {
    let array = this.state.educationStuff;
    array.splice(name, 1);
      this.setState({
        educationStuff: array
      });
  }
  
  editItem(itemIndex) {
    let array = this.state.educationStuff;
    let arrayCopy = array[itemIndex].split("  |  ");
      this.setState({
        schoolName: arrayCopy[0],
        titleOfStudy: arrayCopy[1],
        dateOfStudy: arrayCopy[2],
    });

    array[itemIndex] = "change pending";

    this.changeText();
  }


  render() {
    const {schoolName, titleOfStudy, dateOfStudy, educationStuff} = this.state;

    return (
      <div className="App">
        <h2>Education Experience</h2>

        <div className="output">
          
        {educationStuff.map((eachinfo, index) => {
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
        <label htmlFor="school-name">school name</label>
        <input
          onChange={this.handleChange1}
          value={schoolName}
          type="text"
          id="school-name"
        />

        <label htmlFor="title-of-study"> title of study</label>
        <input
          onChange={this.handleChange2}
          value={titleOfStudy}
          type="text"
          id="title-of-study"
        />

        <label htmlFor="date-of-study"> date of study</label>
        <input
          onChange={this.handleChange3}
          value={dateOfStudy}
          type="text"
          id="phone"
        />
        <button tyoe="submit">{this.state.editButtonText}</button>
        </form>
        
      </div>
    );
  }

}




export default Education;
