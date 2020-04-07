import React from "react";
import { Form, Button, Input, Icon, Table,Select } from 'antd'
import { connect } from 'react-redux'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms['addbooks'],
})

@connect(mapStateToProps)
@Form.create()


export default class BookForm extends React.Component {

 onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        console.log(values);
        if (!error) {
          this.props.onBookSubmit(values)
        }
      })
    }
  }

  render() {
    const { form, isSubmitForm } = this.props
    return (
      <div className="col-sm-4">
        <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)} style={{marginTop:20,padding:5}}>
            <h3>Add a new book:</h3>
           <FormItem label="Author">
              {form.getFieldDecorator('author', {
                initialValue: '',
                rules: [{ required: true, message: 'Please input book author' }],
              })(<Input size="default" />)}
            </FormItem>
             <FormItem label="Title">
              {form.getFieldDecorator('title', {
                initialValue: '',
                rules: [{ required: true, message: 'Please input book title' }],
              })(<Input size="default" />)}
            </FormItem>
             <FormItem>
              <Button
                type="primary"
                className="width-150 mr-4"
                htmlType="submit"
                loading={isSubmitForm}
              >
                Add Book
              </Button>
            </FormItem>
        </Form>
      </div>
    );
  }
}
