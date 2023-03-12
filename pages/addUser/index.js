import React from 'react';
import {Input,Select,Button, Checkbox, Form} from 'antd';
import axios from 'axios';
import {getUsersList} from "../../redux/auth/userSlice";
import { useDispatch, useSelector}  from 'react-redux';
import CountCard from '@/components/CountCard';
import TableData from '@/components/TableData';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 16,
  },
};


function index() {

  const [role, setRole] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  let dispatch = useDispatch();
  let data = useSelector(state => state.auth)


  const submitData = () => {
    if(!role || !email || !password) {
      alert("Fields cannot be empty")
      return;
    }

    axios.post(`/api/users?role=${role}&email=${email}&password=${password}&allowUser=${checked}`)
    .then(res => {
      alert(res.data.msg)
      setRole('')
      setEmail('')
      setPassword('')
      setChecked(false)
    })
    .catch(err => alert("Somthing went wrong please try again later"))
  }


  const onFinishSubmit = (values) => {
    console.log(values)
  }

  let apiObject = {page:0};

  React.useEffect(() => {
    dispatch(getUsersList(apiObject))
  },[])

  

  return (
    <>
    <div className="count-card mb-3">
    <CountCard 
        loading={data.loading}
        data={[
          {name:'Total Users',count:data.totalCount},
        ]} />
    </div>
    <div className="card mt-4">
      <div className="card-body">
        <Form className="row" {...layout} onFinish={onFinishSubmit}>
          <div className="col-lg-12">
            <h3>Add Users & Roles</h3>
          </div>
          <div className="col-lg-4">
          <Form.Item name={['user', 'role']} label="Role"
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
            <Select
                // allowClear
                placeholder={"User role"}
                showSearch
                value={role}
                style={{ width: '100%' }}
                onChange={(val) => setRole(val)}
                >
                <Select.Option value={"SAD"}> 
                            {"Super Admin"}
                </Select.Option>
                <Select.Option value={"ADM"}> 
                            {"Admin"}
                </Select.Option>
            </Select>
            </Form.Item>
          </div>
          <div className="col-lg-4">
              <Form.Item name={['user', 'email']} label="Email"
                  rules={[
                      {
                          type:"email",
                          required: true,
                      },
                  ]}
              >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Item>
          </div>
          <div className="col-lg-4">
              <Form.Item name={['user', 'password']} label="Email"
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
                <Input.Password value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
              </Form.Item>
          </div>
          <div className="col-lg-12 mt-2">
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>Allow user to add another user</Checkbox>
          </div>
          <div className="col-lg-4 mt-2">
            <Button onClick={submitData} htmlType="submit" type="primary">Add User </Button>
          </div>
        </Form>

        <TableData
                      data={data} 
                      deleteOption={false}
                      filters={{}}
                      paginate={true}
                      paginateApi={getUsersList}
                      apiObject={apiObject}
                      arrayData={[
                        {name:'role',label:'role'},
                        {name:'email',label:'email'},
                        {name:'allowUser',label:'Allow status'},
                      ]}
                />
      </div>
    </div>
    </>
  )
}

export default index