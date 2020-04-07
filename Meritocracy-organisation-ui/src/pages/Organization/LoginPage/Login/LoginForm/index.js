import React from 'react'
import { connect } from 'react-redux'
import { REDUCER, submitorganization } from 'ducks/login'
import { Form, Button, Input, Icon, Table, Select } from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class LoginForm extends React.Component {
  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          dispatch(submitorganization(values))
        }
      })
    }
  }

  render() {
    const { form, isSubmitForm } = this.props

    return (
      <div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">Organization Website Login</span>
        </div>
        <div className="row" />
        <div className="row">
          <div className="col-lg-12 card">
            <Form
              layout="vertical"
              hideRequiredMark
              onSubmit={this.onSubmit(isSubmitForm)}
              style={{ marginTop: 20, padding: 5 }}
            >
              <FormItem label="Organization">
                {form.getFieldDecorator('clientid', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Please select your Organization' }],
                })(
                  <Select size="default" style={{ width: '100%' }}>
                    <option value="openid-connect">openid-connect</option>
                    <option value="saml">saml</option>
                  </Select>,
                )}
              </FormItem>
              <FormItem label="User ID">
                {form.getFieldDecorator('user', {
                  rules: [{ required: true, message: 'Please input your User Id' }],
                })(<Input size="default" type="text" />)}
              </FormItem>
              <FormItem label="Password">
                {form.getFieldDecorator('password', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Please input root url' }],
                })(<Input size="default" type="password" />)}
              </FormItem>

              <FormItem>
                <Button
                  type="primary"
                  className="col-lg-12"
                  htmlType="submit"
                  loading={isSubmitForm}
                >
                  Create Client
                </Button>
              </FormItem>
            </Form>
          </div>
          <div className="col-lg-1" />
        </div>
      </div>
    )
  }
}

export default LoginForm
