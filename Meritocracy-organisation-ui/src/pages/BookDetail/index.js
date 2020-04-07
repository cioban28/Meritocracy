import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import BookDetails from './BookDetails'
import React from 'react'

class BookStore extends React.Component {
  static defaultProps = {
    pathName: 'Book Store',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="BookBox Page" />
        <BookDetails bookid={this.props.match.params.bookid} />
      </Page>
    )
  }
}

export default BookStore
