import React from "react";
import Paginate from "react-paginate";
import "../styles/paginate.css";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pg;
    if (this.props.total_pages > 1) {
      pg = (
        <Paginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={<span className="gap">...</span>}
          pageCount={this.props.total_pages}
          onPageChange={this.props.handler}
          containerClassName={"pagination"}
          previousLinkClassName={"previous_page"}
          nextLinkClassName={"next_page"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      );
    }
    return <div>{pg}</div>;
  }
}
