import { reject } from 'lodash';
import app from './main';

import router from './router';

export default ({ url }) => new Promise((resolve, reject) => {
    router.onReady(() => {
        if(router.getMatchedComponents().length) {
            resolve(app);
        }
        else {
            reject({ code: 404, msg: 'not Found' })
        }
    })
    router.push(url);
});