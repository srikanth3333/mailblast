import { connectToDatabase } from "../../../lib/mongodb";

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "145ac84a947a97ffab790ccd34f6f3ca-us21",
    server: "us21",
});

export default async function handler(req, res) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("mail_messages")
    if(req.method == "POST") {
        const response = await mailchimp.templates.updateTemplate("16454", {
            name: "Test Email Template",
            html: `<html>
                <body>
                    "name" : ${req.body.name},
                    "location" : ${req.body.location},
                    "experience" : ${req.body.experience},
                    "duration" : ${req.body.duration},
                    "mandatory" : ${req.body.mandatory},
                    "secondary" : ${req.body.secondary},
                    "rate" : ${req.body.rate},
                    "client" : ${req.body.client},
                    "visa" : ${req.body.visa},
                    "user" : ${req.body.user},
                    "fromMail" : ${req.body.fromMail},
                </body>
            </html>`,
        });
        console.log(response);
        const campaign = {
            type: "regular",
            recipients: {
              list_id: "b89616f5f5"
            },
            settings: {
              subject_line: req.body.name,
              reply_to: "srikanth939196@gmail.com",
              from_name: "Srikanth",
              template_id: 16454
            },
        };
    
        const responseCampaign = await mailchimp.campaigns.create(campaign);
        
        const sendResponse = await mailchimp.campaigns.send(responseCampaign.id);
        
        await collection.insertOne({
                "name" : req.body.name,
                "location" : req.body.location,
                "experience" : req.body.experience,
                "duration" : req.body.duration,
                "mandatory" : req.body.mandatory,
                "secondary" : req.body.secondary,
                "rate" : req.body.rate,
                "client" : req.body.client,
                "visa" : req.body.visa,
                "user":req.body.user,
                "fromMail":req.body.fromMail,
                "addrList":req.body.addrList,
                "timestamp" : new Date(),
                "campaignId": responseCampaign.id
        })
        
        // const responseReport = await mailchimp.reports.getCampaignReport("775f1752b1");
        
        return res.status(200).json({msg: 'success'});
    }
    
}