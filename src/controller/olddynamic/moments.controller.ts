import * as Router from 'koa-router';
import { Context } from '../../utils/koa.util';
import { route, required, log, HttpMethod, DataType } from '../../addon/route';
// import * as biz from '../../biz/db.biz';
import * as moment from '../../biz/moments.biz'
// import { SQL } from '../../utils/sql.util';
import DATE from '../../utils/date.util';
import UUID from '../../utils/uuid.util'

export default class MomentsController {

    /**
     * 取得好友动态
     * @param ctx 
     * @param next 
     */

    @route({
        path: '/getMoments',
        method: HttpMethod.GET,
        unless: true, 
    })
    @required({
        'query': ['userId'],
    })
    @log
    async getMoments(ctx: Context, next: Function): Promise<any> {
        try {
            let {userId}=ctx.request.query;
            console.log(userId);
            const friendsList = await moment.getFriendsList(ctx,userId);
            //console.log(obj.result);
            let users:any = [];
            //整合users
            const friendsListEnd=await moment.mergeFriendsList(ctx,friendsList,userId,users);
            //users保存所有的好友和自己的id 再从数据库拿到所有的这些ID发布的moments
            
            const res:any = await moment.getFriendsMoments(ctx,users);
            //遍历所得到的的moments
            let fin = JSON.parse(res);
            const result =await moment.pushCommentsToMoments(ctx,fin);
            ctx.success(result, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }
    
    /**
     * 获取某个动态的点赞浏览状态
     * @param ctx 
     * @param next 
     */

    @route({
        path: '/getStatus',
        method: HttpMethod.GET,
        unless: true,
    })
    @required({
        'query': ['momentId'],
    })
    @log
    async getStatus(ctx: Context, next: Function): Promise<any> {
        try {
            let{momentId} = ctx.request.query;
            const obj =await moment.getStatus(ctx,momentId);
            ctx.success(obj, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }
    
    /**
     * 获取用户名
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/getUserId',
        method: HttpMethod.GET,
        unless: true,
    })
    @required({
        'query': ['username'],
    })
    @log
    async getUserId(ctx: Context, next: Function): Promise<any> {
        try {
           let{username} = ctx.request.query;
            const obj = await moment.getUserId(ctx,username);
            ctx.success(obj, 'success');
            console.log(obj);
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }
    
    /**
     * 添加动态
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/addMoment',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['content','publishTm','userId','username'],
    })
    @log
    async addMoment(ctx: Context, next: Function): Promise<any> {
        try {
            const {content,publishTm,userId,username} = ctx.request.body;
            
            const obj = await moment.addMoment(ctx,userId,username,content,publishTm); 
            ctx.success(obj, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }
    
    /**
     * 添加评论
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/addComment',
        method: HttpMethod.POST,
        unless: true,
    })
    @required({
        'body': ['userId','username','time','content','momentId'],
    })
    @log
    async addComment(ctx: Context, next: Function): Promise<any> {
        try {
            const {userId,username,time,content,momentId} = ctx.request.body;
            const obj = await moment.addComment(ctx,userId,username,time,content,momentId);
            ctx.success(obj, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }


    /**
     * 增添点赞
     * @param ctx 
     * @param next 
     */
    @route({
        path: '/addOrDecreaseLikes',
        method: HttpMethod.PATCH,
        unless: true,
    })
    @required({
        'body': ['userId','momentId','type'],
    })
    @log
    async addOrDecreaseLikes(ctx: Context, next: Function): Promise<any> {
        try {
            const {userId,momentId,type} = ctx.request.body;
           await moment.addOrDecreaseLikes(ctx,momentId,userId,type);
            ctx.success(1, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }

    /**
     * 增添浏览数
     * @param ctx 
     * @param next 
     */
     @route({
        path: '/addOrDecreaseViews',
        method: HttpMethod.PATCH,
        unless: true,
    })
    @required({
        'body': ['userId','momentId','type'],
    })
    @log
    async addOrDecreaseViews(ctx: Context, next: Function): Promise<any> {
        try {
            const {userId,momentId,type} = ctx.request.body;
            await moment.addOrDecreaseViews(ctx,momentId,userId,type);
            ctx.success(1, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }
     /**
     * 删除动态
     * @param ctx 
     * @param next 
     */
     @route({
        path: '/deleteMoment',
        method: HttpMethod.DELETE,
        unless: true,
    })
    @required({
        'query': ['momentId'],
    })
    @log
    async deleteMoment(ctx: Context, next: Function): Promise<any> {
        try {
            const {momentId} = ctx.request.query;
            const obj =await moment.deleteMoment(ctx,momentId);
            ctx.success(obj, 'success');
        } catch (e) {
            console.error(e);
            ctx.error('error', e);
        }
    }



}