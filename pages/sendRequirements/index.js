import {useEffect, useState} from 'react';
import { Button, Form, Input, InputNumber, Space, Option } from 'antd';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Select from 'react-select'
import { useSelector, useDispatch} from 'react-redux';
import {getContacts} from "../../redux/getContacts/index"
import { useRouter } from 'next/router'


const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Index = () => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let data = useSelector(state => state.contacts)
    let dispatch = useDispatch()
    let [seletedMails, setSeletedMails] = useState([])
    let [prevData, setPrevData] = useState({})
    let router = useRouter()

    const onFinish = (values) => {
        handleShow()
        // console.log(values);
        setPrevData(values.user)
        
    };

    const onFinishSubmit = (values) => {
        let user = localStorage.getItem('email')
        handleSendMail({...prevData, fromMail:values.user.fromMail, user:user,addrList:seletedMails})
        // if(seletedMails.length > 0) {
        //     // handleSubmit({...prevData, fromMail:values.user.fromMail, user:user,addrList:seletedMails})
        //     handleSendMail({...prevData, fromMail:values.user.fromMail, user:user,addrList:seletedMails})
        // }else {
        //     alert("Address list cannot be empty")
        // }
    };

    const handleSendMail = (usrData) => {
        axios.post("/api/mailchimp/sendCampaign", usrData)
        .then(res => {
            if(res.data.msg == 'success') {
                router.push("/excelUpload")
            }else {
                alert("Something went wrong try again later")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }



    const handleSubmit = (val) => {
        console.log(val)
        axios.post(`/api/mail`, val)
        .then(res => {
            if(res.msg == "success") {

            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        // handleShow()
        dispatch(getContacts())
    }, [])

    console.log(data.data)


   return(<>
        <div className="card mt-4">
         <div className="card-body">
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'name']}
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'location']}
                        label="Work Location"
                        rules={[
                            {
                            type: 'text',
                            required: true,
                            },
                        ]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'experience']}
                        label="Experience"
                        rules={[
                            {
                             type: 'number',
                             required: true,
                             min: 0,
                             max: 99,
                            },
                        ]}
                    >
                    <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'duration']}
                        label="Project Duration"
                        rules={[
                            {
                            type: 'number',
                            required: true,
                            min: 0,
                            max: 99,
                            },
                        ]}
                    >
                    <InputNumber />
                    </Form.Item>
                    <Form.Item name={['user', 'mandatory']} label="Mandatory Skills"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'secondary']} label="Secondary Skills"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'rate']} label="Rate">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'client']} label="Client">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'visa']} label="Visa Types">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
                
            </div>
        </div>

        <Modal
          show={show} onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="mt-4"
          >
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  Send Mail
              </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-1">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center">
                    <Form {...layout} onFinish={onFinishSubmit}  validateMessages={validateMessages}>
                        <Form.Item name={['user', 'fromMail']} label="From Mail"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {/* <label className="text-start">Address List</label>
                        <Select 
                            getOptionLabel={(option)=>option.email_address}
                            getOptionValue={(option)=>option.email_address}                         
                            options={data.data} 
                            isMulti
                            onChange={(val) => setSeletedMails(val)}
                            /> */}
                        <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                // offset: 8,
                            }}
                        >
                            <Button type="primary" className='mt-2' htmlType="submit">
                                Send Mail
                            </Button>
                        </Form.Item>
                    </Form>
                    

                </div>  
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
      </Modal>
    </>
)};
export default Index;
