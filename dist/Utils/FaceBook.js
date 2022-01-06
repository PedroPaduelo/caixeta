const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const access_token = '<ACCESS_TOKEN>';
const app_secret = '<APP_SECRET>';
const app_id = '<APP_ID>';
const id = '<AD_ACCOUNT_ID>';
const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true;
if (showDebugingInfo) {
    api.setDebug(true);
}
const logApiCallResult = (apiCallName, data) => {
    console.log(apiCallName);
    if (showDebugingInfo) {
        console.log('Data:' + JSON.stringify(data));
    }
};
let fields, params;
fields = [];
params = {
    'name': 'My campaign',
    'objective': 'LINK_CLICKS',
    'status': 'PAUSED',
    'special_ad_categories': [],
};
const campaigns = (new AdAccount(id)).createCampaign(fields, params);
logApiCallResult('campaigns api call complete.', campaigns);
