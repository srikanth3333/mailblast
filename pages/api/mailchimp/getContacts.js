const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "145ac84a947a97ffab790ccd34f6f3ca-us21",
    server: "us21",
});

export default async function handler(req, res) {
    
    const response = await mailchimp.lists.getListMembersInfo('b89616f5f5');

    return res.status(200).json({data:response.members});
}