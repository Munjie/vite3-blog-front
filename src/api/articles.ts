// @ts-ignore
import request from '@/utils/http.ts';
// @ts-ignore
import {get} from '@/utils/http.ts';

export const pageHomeArticle = (data: any) => {
    return request({
        url: '/article/page-home-article',
        method: 'post',
        data,
    });
};


export const getArticleDetail = async (data: any) => {
    try {
        return await get('/article/get-article-by-id/' + data);
    } catch (error) {
        console.error('获取文章详情失败:', error);
        return ;
    }
};