import React, {Component, useState} from "react";
import logo from './ginkgo_logo.svg';
import './App.css';
import axios from "axios";
import { Table } from "semantic-ui-react";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      prevSearches: [],
      currSeq: {sequence: "", alignments: []}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/nt_searches/');
      const currSeq = await res.json();
      this.setState({
        currSeq
      });
    } catch (e) {
      console.log(e);
  }
  };

  refreshList = () => {
    axios
      .get("/api/nt_searches/")
      .then((res) => this.setState({ prevSearches: res.data }))
      .catch((err) => console.log(err));
  };
  handleInputChange = (event) =>{
    // event.preventDefault();
    const { name, value } = event.target;
    const currSeq = {...this.state.currSeq, [name] : value};
    this.setState({
      currSeq
    });
  }

renderItems = (results) => {
  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Sequence</Table.HeaderCell>
          <Table.HeaderCell>E value</Table.HeaderCell>
          <Table.HeaderCell>Length</Table.HeaderCell> 
          <Table.HeaderCell>Query</Table.HeaderCell>
          <Table.HeaderCell>Match</Table.HeaderCell>
          <Table.HeaderCell>Subject</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {results.map(el => {
          console.log(el);
           return(
            <Table.Row key={el.sequence}>
              <Table.Cell> {el.sequence} </Table.Cell>
              <Table.Cell>{el.e_val}</Table.Cell>
              <Table.Cell> {el.length} </Table.Cell>
              <Table.Cell> {el.query} </Table.Cell>
              <Table.Cell> {el.match} </Table.Cell>
              <Table.Cell> {el.subject} </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

  handleSubmit = async() =>
  {
    var str = document.getElementsByName("sequence")[0].value;
    this.setState({"sequence" : str})
    var res = await axios
      .post(`/api/nt_searches/`, str);
    const data = res.data;
    // console.log(data);
    this.setState({"alignments" : data});
  
    this.state.prevSearches.push(data);
    console.log("prev searches");
    console.log(this.state.prevSearches);
    // return(this.renderAlignments());
  };

  renderAlignments = () => {
    console.log("render alignments");
    const results = this.state.prevSearches;
    if(results.length == 0){
      console.log("No searches yet")
    }
    return(
      results.map(el => {
        return this.renderItems(el);
      })
    );
  }
render() {
  return (
    <main className="Container">
        <img src={logo} className="App-logo"  />
        <p>
          Ginkgo DNA Alignment Tool Prototype
        </p>
        
        <label>
            DNA sequence
            <input
              name="sequence"
              type="text"
              // value={this.state.currSeq.sequence}
              placeholder="DNA Sequence"
              // onChange={this.handleInputChange}

            />
          </label>
        <button onClick={this.handleSubmit}
        > Query </button>
       <div>
         {this.renderAlignments()}
       </div>
    </main>
  );
};
};
export default App;
