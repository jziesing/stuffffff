import React from 'react';
import StockDetailsContainer from './stock_details_container';
import StockGraph from '../stockgraph/stockgraph_container';
import key from '../../../frontConfig/frontKeys';
import './stock_search.css';
import stockSearchLandingPic from './stock-search-landing.png'
import { figureAPICall } from './../../../util/stocks_api_util'

export default class StockSearch extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stocks: "",
      ticker: ""
    };
    this.getStockDetails = this.getStockDetails.bind(this);
    this.getStockTicker = this.getStockTicker.bind(this);
  }

  getStockTicker(e) {
    e.preventDefault();
    const stockSearchAPI = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.stock}&apikey=${key}`;
    this.props.stockNameSearchAPICall(stockSearchAPI)
    .then(response => this.apiLogic(response['name']['data']['bestMatches']))
  }
  
  apiLogic(response) {
    let apiCall = figureAPICall(response);
    console.log(apiCall);
    if (apiCall) {
      this.setState({ticker: apiCall});
      this.getStockDetails();
      return this.render();
    } else {
      
    }
  }  

  getStockDetails(e){
    if (e) { e.preventDefault() }
    const intraDayAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=15min&outputsize=full&apikey=${key}`;
    this.props.intraDayAPICall(intraDayAPI);
    const timeSeriesMonthlyAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${this.state.ticker}&apikey=${key}`;
    this.props.timeSeriesInfoAPICall(timeSeriesMonthlyAPI);
  }
  
  update() {
    return e => this.setState({
      stock: e.currentTarget.value
    });
  }

  render(){
    let theStockDetailsAndGraph = (!this.props.stockDetails.intraDay) ? null : (
      <div className="stock-details-and-graph">
        <StockDetailsContainer />
        <StockGraph />
      </div>
    );

    let stockSearchLanding = (this.props.stockDetails.intraDay) ? null : (

      <div className="stock-search-landing">
        <span>
          <img 
          src={stockSearchLandingPic} 
          alt='stock search' 
          className="stock-search-background" />
        </span>
        <div>
          <p>Seek And You Shall Find</p>
          <span>Enter a company's ticker to access real-time information</span>
        </div>
      </div>
    );
    

    return (
      <div className="stock-search-container">
        <div className="stock-search-component">
          <form onSubmit={this.getStockTicker} className="stock-search-form">
            <span>Search Stocks:</span>
            <input
              type="text"
              value={this.state.stock}
              onChange={this.update()}
              className="stock-search-form-input"
              placeholder="Enter a Stock Company Name or Ticker"
              />
            <input
              type="submit"
              value="Submit"
              className="stock-form-submit"
            />
          </form>

        </div>
          {stockSearchLanding}
          {theStockDetailsAndGraph}
      </div>
    );
  }
}