// @ts-ignore
import request from '@/utils/http.ts';
// @ts-ignore
import {get} from '@/utils/http.ts';


export const getBlogConfig = async () => {
    try {
        return await get('/config/get-blog-conf');
    } catch (error) {
        console.error('getBlogConfig error:', error);
        return ;
    }
};

export const listAllTags = async () => {
    try {
        return await get('/config/list-all-tag');
    } catch (error) {
        console.error('getAllTag error:', error);
        return ;
    }
};