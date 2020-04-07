import React from "react";
import BookForm from "./BookForm";
import BookList from "./BookList";
import * as app from '../../../ducks/app'

class BookBox extends React.Component {
  
  constructor(props)
  {
    super(props)

    this.state = {
      books:[]
    };

    var self = this;
    app.getbooks(function(result){
      console.log(result);
      self.setState({
        books:result
      });
    })
  }
  addbook = (value) => {
    console.log(value);
    var self = this;
    app.addbook(value,function(result){
      var books = self.state.books;
      books.push(result);
      self.setState({books:books});
    });
  }

  bookdelete = (value) =>
  {
    console.log(value);
    app.deletebook(value);
    var books = this.state.books;

    var index;
    for(index = 0;index<books.length;index++)
    {
      if(books[index]._id === value._id)
      {
        books = books.splice(index - 1,1);
      }
    }

    this.setState({
      books:books
    });
  }
  render() {
    return (
      <div className="bookBox row">
        <h1 className = "col-md-12">
          Welcome
        </h1>
        <h1 className = "col-md-12">Best Books ever!</h1>
        <hr/>
        <BookList books={this.state.books} onBookDelete={this.bookdelete}/>
        <div className="col-md-2"></div>
        <BookForm onBookSubmit={this.addbook}/>
      </div>
    );
  }
}

export default BookBox
