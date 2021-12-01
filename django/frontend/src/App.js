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
      currSeq: {sequence: "", alignments: []},
      tableHtml: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChange = (event) =>{
    const { name, value } = event.target;
    const currSeq = {...this.state.currSeq, [name] : value};
    this.setState({
      currSeq
    });
  }
renderItems = (results) =>{
  return (
    
  <Table singleLine>
    <Table.Header>
      <tr>
        <th>Sequence</th>
        <th>E value</th>
        <th>Length</th> 
        <th>Query</th>
        <th>Match</th>
        <th>Subject</th>
      </tr>
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
          )
};

  handleSubmit = async() =>
  {
    var str = document.getElementsByName("sequence")[0].value;
    this.setState({"sequence" : str})
    var res = await axios
      .post(`/api/nt_searches/`, str);
    const data = res.data;
    this.setState({"alignments" : data});
  
    this.state.prevSearches.push(data);
    console.log(this.state.prevSearches)
    const table = this.renderAlignments();
    this.setState({"tableHtml": table});
  };

  renderAlignments(){
    console.log("render alignments");
    const results = this.state.prevSearches;
    console.log(results);
    console.log(results[0]);
    if(results.length == 0){
      console.log("No searches yet")
    }
    return(
      results.map(el => {
        return (this.renderItems(el));
      })
    );
  }
render() {
  return (
    <main className="Container">
        <img src={logo} className="App-logo"  />
        <p>
          <b>Ginkgo DNA Alignment Tool Prototype </b> <br></br>
          Enter a DNA sequence to query blast for matches from the following genomes: <br></br>
          NC_000852, NC_007346, NC_008724, NC_009899, NC_014637, NC_020104, NC_023423, NC_023640, NC_023719,
          NC_027867 <br></br>
          <br></br>
          Output gives: <br></br>
          Sequence: the Blast result for organism and accession code <br></br>
          e_val: the expected value returned by blast, indicating significance of result <br></br>
          length: the length of the aligned sequence <br></br>
          query: the sequence searched <br></br>
          match: a string of the positions that are the same in each string <br></br>
          subject: the string to which the query is aligned 
        </p>
        
        <label>
            Enter DNA sequence:
            <input
              name="sequence"
              type="text"
              placeholder="DNA Sequence"
            />
          </label>
        <button onClick={this.handleSubmit}
        > Query </button>
        {this.state.tableHtml}

    </main>
  );
};
};
export default App;
