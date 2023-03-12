import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/router'


function Index() {

    const router = useRouter()
    let id = router.query.id
    const [data, setData] = React.useState([])

    const getData = () => {
        
        axios.get(`/api/mailchimp/getReports?campaignId=${id}`)
        .then(res => setData(res.data.msg))
        .catch(err => console.error(err))
    }


    React.useEffect(() => {
        getData()
    },[])

  return (
    <div className="card">
        <div className="card-body">
            <div className="id-pl">
                <p>list_name: {data.list_name}</p>
                <p>campaign_title: {data.campaign_title}</p>
                <p>list_is_active: {data.list_is_active}</p>
                <p>subject_line: {data.subject_line}</p>
                <p>emails_sent: {data.emails_sent}</p>
                <p>abuse_reports: {data.abuse_reports}</p>
                <p>unsubscribed: {data.unsubscribed}</p>
                <p>list_name: {data.list_name}</p>
                <p>send_time: {data.send_time}</p>
                <p>opens_total: {data?.opens?.opens_total}</p>
                <p>unique_opens: {data?.opens?.unique_opens}</p>
                <p>last_open: {data?.opens?.last_open}</p>
                <p>clicks_total: {data?.clicks?.clicks_total}</p>
                <p>unique_clicks: {data?.clicks?.unique_clicks}</p>
                <p>click_rate: {data?.clicks?.click_rate}</p>
            </div>
            
        </div>
    </div>
  )
}

export default Index