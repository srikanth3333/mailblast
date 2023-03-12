import React, {useState,useRef, useEffect} from 'react'
import { UploadOutlined,FileAddOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";
import {uploadFile} from "../../redux/fileUpload/fileUploadSlice";
import {useDispatch, useSelector} from 'react-redux';
import CountCard from "../../components/CountCard";
import Link from 'next/link';

function Index() {


  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [eroCode, setEroCode] = useState('');
  const [files, setFiles] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  let data = useSelector((state) => state.uploadData)


  console.log(data.data)

  let dispatch = useDispatch()

  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  let apiObject = {email:"",page:0}

  useEffect(() => {
    dispatch(uploadFile(apiObject))
  }, [])

  const inputRef = useRef(null);
  const handleSubmission = (e) => {
    // e.preventDefault();
    
    if(files.length == 0) {
      alert("Please select a file")
      return;
    }
    setLoading(true)
    let user = localStorage.getItem('email')
		const formData = new FormData();
    formData.append(`excel`, files[0].originFileObj)
    formData.append(`user`, user)

    // return;
		fetch(
			'http://localhost:7000/api/uploadContacts',
			{
				method: 'POST',
				body: formData,
			}
		)
    .then((response) => response.json())
    .then(async (result) => {
      alert(`Successfully uploaded`)
      setShowMessage(true)
      setTimeout(() => {
          setShowMessage(false)
      }, 9000)
      files.length = null;
      setEroCode('')
      resetFileInput()
      setSelectedFile(result)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      setTimeout(() => {
        dispatch(uploadFile(apiObject))
      },2000)
    })
	};


  const props = {
    multiple: true,
    onChange(info) {
      setFiles(info.fileList)
      if (info.file.status !== 'uploading') { 
        console.log('pending')
      }
      if (info.file.status === 'done') {
        console.log('done')
      } else if (info.file.status === 'error') {
        console.log('error')
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <>
    <div className="count-card mb-3">
    <CountCard 
        loading={data.loading}
        data={[
          {name:'Total Contacts',count:data.totalCount},
        ]} />
    </div>
      <div className="text-end mb-2">
          <Link icon={<FileAddOutlined />} href="/sendRequirements" className='btn btn-success'>Send Requirements</Link>
      </div>
      <div className="card">
        <div className="card-body">
          
          <div className="row">
            <div className="col-lg-12">
              <FilterCard 
                      objectData={apiObject}
                      paginateApi={uploadFile}
                      download={null}
                      dataDownload={data.data.data}
                      data={[
                        {label:"Email ID",type:"text",value:"email"},
                      ]} 
                      title=""
                      arrayData={['']}
                    />

              <div className="mt-2"></div>
              <Upload accept=".xlsx" ref={inputRef} {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload Contacts</Button>
              </Upload>
              <p className="my-2">{files.length > 0 ? `${files.length} file selected` : null}</p>
              <Button onClick={handleSubmission} type="primary"  loading={loading}>Submit</Button>
              <TableData
                      data={data} 
                      deleteOption={false}
                      filters={{}}
                      paginate={true}
                      paginateApi={uploadFile}
                      apiObject={apiObject}
                      arrayData={[
                        {name:'timestamp',date: true,label:'Date'},
                        {name:'email',label:'Email'},
                      ]}
                />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index