import React from 'react'
import { Form, Button, Input, Icon, Table, Select } from 'antd'
import { connect } from 'react-redux'
import { REDUCER, createclient } from '../../../ducks/login'

import * as app from '../../../ducks/app'
const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class Clientcontent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client: {},
      clients: [],
      userprofile: {},
    }

    var self = this
    app.getclient(function(result) {
      var state = self.state
      state.clients = result
      self.setState(state)
    })
  }

  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        console.log(values)
        if (!error) {
          dispatch(createclient(values))
        }
      })
    }
  }

  render() {
    const tableColumns = [
      {
        title: 'ClientId',
        dataIndex: 'clientId',
        key: 'clientId',
      },
      {
        title: 'Protocol',
        dataIndex: 'protocol',
        key: 'protocol',
      },
      {
        title: 'Root Url',
        dataIndex: 'rootUrl',
        key: 'rooturl',
      },
    ]

    const { form, isSubmitForm } = this.props
    return (
      <div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">Organizations</span>
        </div>
        <div className="row" />
        <div className="row">
          <div className="col-lg-4 card">
            <Form
              layout="vertical"
              hideRequiredMark
              onSubmit={this.onSubmit(isSubmitForm)}
              style={{ marginTop: 20, padding: 5 }}
            >
              <FormItem label="clientid">
                {form.getFieldDecorator('clientid', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Please input your clientid' }],
                })(<Input size="default" />)}
              </FormItem>
              <FormItem label="protocol">
                {form.getFieldDecorator('protocol', {
                  initialValue: 'openid-connect',
                })(
                  <Select size="default" style={{ width: '100%' }}>
                    <option value="openid-connect">openid-connect</option>
                    <option value="saml">saml</option>
                  </Select>,
                )}
              </FormItem>
              <FormItem label="Root Url">
                {form.getFieldDecorator('rootUrl', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Please input root url' }],
                })(<Input size="default" type="url" />)}
              </FormItem>

              <FormItem>
                <Button
                  type="primary"
                  className="width-150 mr-4"
                  htmlType="submit"
                  loading={isSubmitForm}
                >
                  Create Client
                </Button>
              </FormItem>
            </Form>
          </div>
          <div className="col-lg-1" />
          <div className="col-lg-7">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">Organizations</div>
                <div className="col-lg-6 utils__titleDescription">
                  Organization Clients From Keycloark
                </div>
                <div className="col-lg-6" />
              </div>
              <div className="card-body">
                <Table columns={tableColumns} dataSource={this.state.clients} pagination={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Clientcontent
