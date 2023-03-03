import contentful from 'contentful-management';
// import { access_token } from './contentful.js';

export const client = (token) => {
    return contentful.createClient({
        accessToken: token,
    });
}

