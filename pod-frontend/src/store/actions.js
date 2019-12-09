import axios from 'axios';
import { db } from '../../firebase-config';

const url = 'https://hfzn51rqf2.execute-api.eu-west-1.amazonaws.com/Prod/bankid';

export default {
    async signInWithBankID(ctx, params) {
        let fetchedUrl = await axios.post(url, params);
        return fetchedUrl;
    },
    async checkStatus(ctx, status) {
        let fetchedStatus = await axios.post(url, status);
        return fetchedStatus;
    },
    async getUserData(ctx, personalNr) {
        let doc = await db.collection("pensiondata").doc(`${personalNr}`);
        return doc;
    },
}