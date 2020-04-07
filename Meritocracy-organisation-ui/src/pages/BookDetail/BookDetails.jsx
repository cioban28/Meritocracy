import React from "react";
import {Link} from "react-router-dom";
import * as app from '../../ducks/app'

class BookDetails extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      book:{}
    };

    var self = this;
    app.getbook(props.bookid,function(value){
      self.setState({
        book:value
      });
    })
    console.log(props);
  }

  render() {
    console.log(this.props);
    const {book} = this.state;
    return book ? (
      <div className="bookDetails row">
        <h1 className="col-md-12">Details for Book ID {book._id}</h1>
        <hr/>
        <div className="col-md-12">
          <h3 className="col-md-3">Author:</h3>
          <p className="lead col-md-6">{book.title}</p>
        </div>
        <div className="col-md-12">
          <h3 className="col-md-3">Title</h3>
          <p className="col-md-6">{book.author}</p>
        </div>
        <hr/>
        <p>
          <Link to="/">&laquo; back to list</Link>
        </p>
      </div>
    ) : null
  }
}

export default BookDetails;
