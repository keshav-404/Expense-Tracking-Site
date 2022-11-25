import React from 'react';
import axios from 'axios';
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
} from 'devextreme-react/pie-chart';
import NavBar from './NavBar';
import {
    Row,
    Col,
  } from "react-bootstrap";



class PieChar extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
        result: [],
        d:[],
      };

    this.pointClickHandler = this.pointClickHandler.bind(this);
    this.legendClickHandler = this.legendClickHandler.bind(this);
  }



  componentDidMount() {
    axios.get('http://localhost:8080/expenses',{ headers: { "Authorization": localStorage.getItem("jwtToken")}})
		.then((response) => {
      this.setState({
        result: response.data
    });
    console.log(this.state.result)
  let a=[];
    const map1 = new Map();
    this.state.result.map(expenses =>{
      console.log(expenses);
      if(map1.has(expenses.category))
      {
        let f= map1.get(expenses.category)+expenses.cost;
        map1.set(expenses.category,f)

      }
      else{
      map1.set(expenses.category,expenses.cost)
      }
      // map1[expenses.category]+=expenses.cost;
      console.log(map1)
    
    
    })
      map1.forEach((value, key)=>{
         a.push({"catergory":key,"cost":value})
      })
      console.log(a);

      
      

     this.setState({
      d:a,
     });
  })}

  render() {
    return (
        <div><NavBar/>
        <Row className="justify-content-md-center">
        <Col xs={5}>
      <PieChart
        id="pie"
        dataSource={this.state.d}
        palette="Bright"
        title="Expenses based on Catergory"
        onPointClick={this.pointClickHandler}
        onLegendClick={this.legendClickHandler}
      >
        <Series
          argumentField="catergory"
          valueField="cost"
        >
          <Label visible={true}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>

        <Size width={500} />
        <Export enabled={true} />
      </PieChart></Col></Row>
      </div>
    );
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    item.isVisible() ? item.hide() : item.show();
  }
}

export default PieChar;
