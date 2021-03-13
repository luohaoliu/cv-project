import React, { Component } from 'react';
import './styles/index.css';
import Education from './components/Education' 
import Experience from './components/Experience' 


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname:"",
      email:"",
      phone:"",
      informationStuff: [],
      showButton: false,
    }

  this.handleChange1 = this.handleChange1.bind(this);
  this.handleChange2 = this.handleChange2.bind(this);
  this.handleChange3 = this.handleChange3.bind(this);

  this.submitChange = this.submitChange.bind(this);
  this.removeItem = this.removeItem.bind(this);
  this.editItem = this.editItem.bind(this);
  this.viewChange = this.viewChange.bind(this);

  }

  viewChange() {
    let status = this.state.showButton;
    if (status === false) {
      this.setState({
        showButton: true,
      })
    } else {
      this.setState({
        showButton: false,
      })
      
    }
  }

  handleChange1(event) {
    this.setState({
      fullname: event.target.value,
    })
  }

  handleChange2(event) {
    this.setState({
      email: event.target.value,
    })
  }

  handleChange3(event) {
    this.setState({
      phone: event.target.value,
    })
  }

  submitChange(event) {
    event.preventDefault();
    if(this.state.informationStuff.length < 1) {
        let information = this.state.fullname + "  |  " + this.state.email + "  |  " + this.state.phone;
        this.setState({
          informationStuff: this.state.informationStuff.concat(information),
          fullname: "",
          email: "",
          phone: "",
        });
    }
  };

  removeItem(name) {
    let array = this.state.informationStuff;
    array.splice(name, 1);
      this.setState({
        informationStuff: array
      });
  }
  
  editItem(itemIndex) {
    let array = this.state.informationStuff;
    let arrayCopy = array[itemIndex].split("  |  ");
      this.setState({
        fullname: arrayCopy[0],
        email: arrayCopy[1],
        phone: arrayCopy[2],
        informationStuff:[]
    });
  }


  

  render() {
    const {fullname, email, phone, informationStuff} = this.state;

    return (
      <div className="App">
        <h1 className="Title">Project CV Application</h1>
        <button onClick={()=>this.viewChange()}> Change View </button>
        <h2>General Information</h2>

        <div className="output">
          
        {informationStuff.map((eachinfo, index) => {
          return <li style={{ listStyleType: "none"}} className="output-value" key = {index}> 
          <span className="text-position"> {eachinfo} </span> 
          <button className="remove-button-position" onClick={() => this.removeItem(index)} style={{visibility: this.state.showButton ? 'visible' : 'hidden' }}> remove </button>
          <button className="edit-button-position" onClick={() => this.editItem(index)} style={{visibility: this.state.showButton ? 'visible' : 'hidden' }}> edit </button>
          <br></br>
          <br></br>
          </li>
          ;
        })}
        
      </div>
      
      <form onSubmit={this.submitChange} style={{visibility: this.state.showButton ? 'visible' : 'hidden' }}>
        <label htmlFor="user-name"> name</label>
        <input
          onChange={this.handleChange1}
          value={fullname}
          type="text"
          id="user-name"

        />

        <label htmlFor="user-email"> email</label>
        <input
          onChange={this.handleChange2}
          value={email}
          type="text"
          id="user-email"
        />

        <label htmlFor="phone"> phone number</label>
        <input
          onChange={this.handleChange3}
          value={phone}
          type="text"
          id="phone"
        />
        <button tyoe="submit" disabled={!this.state.fullname || !this.state.email || !this.state.phone}>Add Info</button>
        </form>
      <Education showButton={this.state.showButton} /> 
      <Experience showButton={this.state.showButton} /> 
      </div>
    );
  }

}

export default App;
