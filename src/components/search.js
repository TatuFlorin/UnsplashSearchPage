import React from "react";
import Paginate from "./paginate";
import "../styles/search.css";
const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`,
    credentials: false
  }
});

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_keyword: "",
      total: null,
      total_pages: null,
      results: []
    };
  }

  onHandlerInput = event => {
    this.setState({ search_keyword: event.target.value });
  };

  onHandlerSubmit = event => {
    event.preventDefault();
    this.onCallApi(1);
  };

  onHandlerPage = event => {
    const pageNumber = event.selected + 1;
    this.onCallApi(pageNumber);
  };

  onCallApi = pageNumber => {
    axiosInstance
      .get("/search/photos", {
        params: {
          page: pageNumber,
          query: this.state.search_keyword,
          per_page: 50
        }
      })
      .then(response => {
        this.setState({
          results: response.data.results,
          total_pages: response.data.total_pages
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const paginateComponent = (
      <Paginate
        total_pages={this.state.total_pages}
        handler={this.onHandlerPage}
      />
    );

    return (
      <div className="header">
        <form onSubmit={this.onHandlerSubmit} className="form">
          <input
            type="text"
            value={this.state.search_keyword}
            onChange={this.onHandlerInput}
            placeholder="Search"
          />
        </form>

        <div className="response-section">
          {this.state.results.map(image => {
            console.log(image);
            if (image.height > 3800) {
              return (
                <div className="vertical-card" key={image.id}>
                  <img src={image.urls.small} alt={image} />
                </div>
              );
            } else {
              return (
                <div className="horizontal-card" key={image.id}>
                  <img src={image.urls.small} alt={image} />
                </div>
              );
            }
          })}
        </div>
        <div className="paginate-container">{paginateComponent}</div>
      </div>
    );
  }
}
