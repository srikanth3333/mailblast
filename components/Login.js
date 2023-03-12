import React, {useState} from 'react';
import {Input, Button, Checkbox, Divider, Form} from "antd";
import { UserOutlined,SecurityScanOutlined } from '@ant-design/icons';
import {loginStatus} from "../redux/auth/userSlice";
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function Login() {

 const [passwordVisible, setPasswordVisible] = React.useState(false);
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 let user = useSelector(state => state.auth)
 let dispatch = useDispatch()

 console.log('user')
 console.log(user)

 let router = useRouter()

 const login = () => {
   Cookies.set('loggedIn', true)
   router.push('/')
 }


 const handleLogin = () => {
   if(!email || !password) {
     alert("Below Fields cannot be empty")
     return;
   }

   axios.post(`/api/login?email=${email}&password=${password}`)
   .then(res => {
     console.log(res)
     if(res.data.msg == 'Success') {
       localStorage.setItem('email', email)
       dispatch(loginStatus({loggedIn: true}))
     } else {
       alert(res.data.msg)
     }
   })
   .catch(err => {
     alert("Something went worng please try again later")
   })
 }

 const onFinish = (values) => {
    handleLogin()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login" style={{backgroundImage: `linear-gradient(101.21deg, rgba(0, 0, 0, 0.26) 29.59%, rgba(0, 0, 0, 0.26) 62.85%),url("img/banner.png")`}}>
        <div className="container">
            <div className="row text-center justify-content-center">
                <div className="col-lg-6">
                    <h5 className="text-login">Welcome To Mail Blast</h5>
                    {/* <p className="login-para">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p> */}
                    <div className="mt-4 px-login">
                        <div className="card py-4" style={{backgroundColor:'#F8FAFC'}}>
                            <div className="card-body">
                                <h6 className="mb-3">Sign In With</h6>
                                <Divider />
                                <p className=" text-center card-text-login my-4">Amet minim mollit non deserunt ullamco est sit .</p>
                                <Form
                                        name="basic"
                                        labelCol={{
                                        span: 8,
                                        }}
                                        wrapperCol={{
                                        span: 16,
                                        }}
                                        style={{
                                        maxWidth: 600,
                                        }}
                                        initialValues={{
                                        remember: true,
                                        }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                        className="form"
                                    >
                                    <div className="">
                                    <Form.Item
                                        labelCol={{ span: 24 }} 
                                        label="Email"
                                        className=''
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email correctly!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                        ]}
                                        >
                                        <Input className='' size="large" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" prefix={<UserOutlined />} />
                                    </Form.Item>
                                    </div>
                                    <div className="">
                                    <Form.Item
                                        labelCol={{ span: 24 }}
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please input your password!',
                                            },
                                            {
                                                type: 'password',
                                                message: 'The input is not valid E-mail!',
                                            },
                                        ]}
                                        hasFeedback
                                        >
                                            <Input.Password
                                                placeholder="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                prefix={<SecurityScanOutlined />}
                                                size="large"
                                                visibilityToggle={{
                                                    visible: passwordVisible,
                                                    onVisibleChange: setPasswordVisible,
                                                }}
                                                
                                            />
                                        </Form.Item>
                                        {/* <Checkbox className="mt-2" >Remember me</Checkbox> */}
                                        {/* <br /> */}
                                    </div>
                                    <div className="">
                                        <Button htmlType="submit" className='w-100' type="primary">Log In</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login