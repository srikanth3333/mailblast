import { connectToDatabase } from "../../../lib/mongodb";
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "145ac84a947a97ffab790ccd34f6f3ca-us21",
    server: "us21",
});

export default async function handler(req, response) {
    const responseReport = await mailchimp.campaigns.replicate(req.query.campaignId);   
    const resp = await mailchimp.campaigns.send(responseReport.id)
    return response.status(200).json({msg: resp});
}