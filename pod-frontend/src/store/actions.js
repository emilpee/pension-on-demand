import axios from 'axios';

export default {
    async signInOnMobile(ctx, params) {
        const url = 'https://hfzn51rqf2.execute-api.eu-west-1.amazonaws.com/Prod/bankid';
        let fetchedUrl = await axios.post(url, { params });
        return fetchedUrl.data;
    }
}