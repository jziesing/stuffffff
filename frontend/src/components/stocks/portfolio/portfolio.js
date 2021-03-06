import React from 'react';
import StockIndexContainer from '../stock_index/stock_index_container';
// import StockGraphContainer from '../stockgraph/stockgraph_container';
// import PortfolioPieChartContainer from './portfolio_piechart_container'
// import PortfolioBackground from './portfolio_background.png'
import './portfolio.css'

class Portfolio extends React.Component {
  render() {
    return (
        <div className="portfolio-container">
          <div> 
            <h1>Here is your Portfolio!</h1>
          </div>
          <div>
            {/* <span className="portfolio-background">
              <img
                src={PortfolioBackground}
                alt='portfoio background'
                className="portfolio-background" />
            </span> */}
            <StockIndexContainer />
            {/* <PortfolioPieChartContainer /> */}
          </div>
      </div>
    );
  }
}

export default Portfolio;