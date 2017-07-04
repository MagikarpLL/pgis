import { Context } from '../utils/koa.util';
import { DBType } from '../utils/db.util';
import { DBTypeChanger } from '../utils/dbtype.util';
import UUID from '../utils/uuid.util';
import DATE from '../utils/date.util';
import OBJECT from '../utils/object.util';

export async function getFriendsList(ctx:Context,userId:String) : Promise<Object>{
     const sql = ctx.sql.select(`*`)
        .from('FRIENDS_INFO').where(`user_id_1=${userId} or user_id_2=${userId}`)
        .toQuery().text;
        const result = await ctx.db.query(sql);
    return JSON.parse(result.result) ;
}

export async function mergeFriendsList(ctx:Context,obj:any,userId:String,users:String[]) : Promise<Object>{
    
     for (var key in obj) {
                if (obj[key].USER_ID_1 != userId) {
                    users.push(obj[key].USER_ID_1);
                }
                else {
                    users.push(obj[key].USER_ID_2);
                }
            }
            users.push(userId);
            return users;
}

export async function getFriendsMoments(ctx:Context,users:String[]) : Promise<Object>{
    
      const res = await ctx.db.query(`SELECT s.* from PUBLISHED_MOMENTS s,Mh_User_Info 
            where s.USER_ID_ in (${users.toString()}) and register_number_ =s.user_id_ 
            order by s.PUBLISH_TM_ desc 
            `);
            return res.result;
}

export async function pushCommentsToMoments(ctx:Context,jsonObj:any) : Promise<Object>{
    
       for(var key in jsonObj){
                jsonObj[key].PUBLISH_TM_=DATE.getDateTime(jsonObj[key].PUBLISH_TM_);
                //取得对应的moments的所有评论
                const obj = await ctx.db.query(`SELECT COMMENTS_,username_,comment_tm_ from MOMENT_COMMENTS,Mh_User_Info WHERE 
            moment_id_='${jsonObj[key].ID_}' and register_number_=user_id_  order by COMMENT_TM_ desc` );
                var com = JSON.parse(obj.result);
                jsonObj[key].COMMENTS=[];
                for(var counter in com){
                    jsonObj[key].COMMENTS.push({COMMENT_BY_:com[counter].USERNAME_,COMMENT_:com[counter].COMMENTS_,COMMENT_TM_:DATE.getDateTime(com[counter].COMMENT_TM_)});
                }     
            }  
         return jsonObj;
}

export async function getStatus(ctx:Context,momentId:String) : Promise<Object>{
    
       const obj = await ctx.db.query(`SELECT mus.*,mu.user_name_ from MOMENT_USER_STATUS mus,Mh_User_Info mu WHERE 
            moment_id_=${momentId} and mus.user_id_=mu.register_number_`);
    return  JSON.parse(obj.result);
}

export async function getUserId(ctx:Context,username:String) : Promise<Object>{
    
       const obj = await ctx.db.query(`SELECT mu.register_number_ from Mh_User_Info mu WHERE 
            user_name_='${username}'`);
           return JSON.parse(obj.result);
     
    // const sql = ctx.sql.select(`ta.DATASOURCE_NAME_ as "datasourceName",ta.SQL_ as "sql",
    //     ta.ID_ as "id",ta.CREATE_TIME_ as "createTime",ta.REMARK_ as "remark"`)
    //     .from('MH_DATASOURCE ta')
    //     .toQuery().text;
    //     const result = await ctx.db.query(sql);
   
}
export async function addMoment(ctx:Context,userId:String,username:String,content:String,publishTm:any) : Promise<Object>{
            let momentId = UUID.genUUID();
            var sql=`INSERT INTO PUBLISHED_MOMENTS values ('${momentId}',
                '${content}',0,to_date ( '${publishTm}' , 'YYYY-MM-DD HH24:MI:SS' ),'${userId}','','${username}',0)`;
            const obj = await ctx.db.edit(sql);    
            await ctx.db.edit(`INSERT INTO MOMENT_USER_STATUS values (${UUID.genUUID()},0,0,${momentId},${userId})`);
            return 1 ;
    
    // const sql = ctx.sql.select(`ta.DATASOURCE_NAME_ as "datasourceName",ta.SQL_ as "sql",
    //     ta.ID_ as "id",ta.CREATE_TIME_ as "createTime",ta.REMARK_ as "remark"`)
    //     .from('MH_DATASOURCE ta')
    //     .toQuery().text;
    //     const result = await ctx.db.query(sql);
  
}
export async function addComment(ctx:Context,userId:String,username:String,time:any,content:String,momentId:String) : Promise<Object>{
     
            const obj = await ctx.db.edit(`INSERT INTO MOMENT_COMMENTS values('${UUID.genUUID()}','${ content}','${ momentId}'
            ,'${ userId}','${ username}',to_date ( '${ time}' , 'YYYY-MM-DD HH24:MI:SS' ))`);
            console.log(obj.result);
            return   JSON.parse(obj.result);
     
     
}
export async function addOrDecreaseLikes(ctx:Context,momentId:String,userId:String,type:number) : Promise<Object>{
      
      if(type==1){
                await ctx.db.edit(`UPDATE PUBLISHED_MOMENTS set likes_=likes_+1 where ID_='${momentId}'`);
                await ctx.db.edit(`UPDATE MOMENT_USER_STATUS set is_liked_ =1 where moment_Id_=‘${momentId}' and 
                user_Id_='${userId}'`)
            }
            else{
                await ctx.db.edit(`UPDATE PUBLISHED_MOMENTS set likes_=likes_-1 where ID_='${momentId}'`);
                await ctx.db.edit(`UPDATE MOMENT_USER_STATUS set is_liked_ =0 where moment_Id_='${momentId}' and 
                user_Id_='${userId}'`);
            }
     
    return 1;
}
export async function addOrDecreaseViews(ctx:Context,momentId:String,userId:String,type:number) : Promise<Object>{
    
        if(type==1){
                await ctx.db.edit(`UPDATE PUBLISHED_MOMENTS set views_=views_+1 where ID_='${momentId}'`);
                await ctx.db.edit(`UPDATE MOMENT_USER_STATUS set is_viewed_ =1 where moment_Id_='${momentId}' and 
                user_Id_='${userId}'`);
            }
            else{
                await ctx.db.edit(`UPDATE PUBLISHED_MOMENTS set views_=views_-1 where ID_='${momentId}'`);
                await ctx.db.edit(`UPDATE MOMENT_USER_STATUS set is_viewd_ =0 where moment_Id_='${momentId}' and 
                user_Id_='${userId}'`);}
    return 1;

}
export async function deleteMoment(ctx:Context,momentId:String) :Promise<Object>{
    const obj =await ctx.db.edit(`DELETE FROM PUBLISHED_MOMENTS WHERE id_=${momentId}`);
    return JSON.parse(obj.result);
}
export async function deleteComment(ctx:Context,commentId:String) : Promise<Object>{
    const obj =await ctx.db.edit(`DELETE FROM MOMENT_COMMENTS WHERE comment_id_=${commentId}`)
    return;
}