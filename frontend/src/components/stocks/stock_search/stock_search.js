import React from 'react';
import StockDetailsContainer from './stock_details_container';
import StockGraph from '../stockgraph/stockgraph_container';
import key from '../../../frontConfig/frontKeys';
import './stock_search.css';

export default class StockSearch extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        ticker: "",
      };
      this.getStockDetails = this.getStockDetails.bind(this);
  }
  getStockDetails(e){
      e.preventDefault();
      const intraDayAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=15min&outputsize=full&apikey=${key}`;
      const intraDayInfo = this.props.intraDayAPICall(intraDayAPI).then(
          (res) => {
              if (res) {
                let stockInfo = res.stock.data
              }
          }
      )
      const timeSeriesMonthlyAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${this.state.ticker}&apikey=${key}`;
      const timeSeriesInfo = this.props.timeSeriesInfoAPICall(timeSeriesMonthlyAPI);
  }
  update() {
      return e => this.setState({
          ticker: e.currentTarget.value
      });
  }
  render(){
    let theStockDetailsAndGraph = (Object.keys(this.props.stockDetails).length === 0) ? null : (
      <div className="stock-details-and-graph">
        <StockDetailsContainer />
        <StockGraph /> ;
      </div>);
    let stockSearchLanding = (Object.keys(this.props.stockDetails).length !== 0) ? null: (
      <div className="stock-search-landing">
          <div>Find Your Next Unicorn</div>
          <div>Enter a company's stock ticker to access real-time information</div>
      </div>
    )
    return (
      <div className="stock-search-container">
        <div className="stock-search-component">
          <form onSubmit={this.getStockDetails} className="stock-search-form">
              <span>Search Stocks:</span>
              <input
                type="text"
                value={this.state.ticker}
                onChange={this.update()}
                className="stock-search-form-input"
                placeholder="Enter a Ticker"
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