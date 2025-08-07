// @ts-ignore
import request from '@/utils/http.ts';


export const pageHomeArticle = (data:any) => {
    return request({
        url: '/article/page-home-article',
        method: 'post',
        data,
    });
};