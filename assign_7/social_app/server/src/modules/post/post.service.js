import {post,comment} from "../../database/models/index.js";
import { Sequelize } from "sequelize";

export async function addPost(body) {   
    const {
        title,
        content,
        userId} = body;
        const newPost = new post({
            title,
            content,
            userId
        });
        await newPost.save();
        return newPost;
}  ;

export async function  deletePost (postId,body){
const {userId} = body;

const foundPost = await post.findByPk(postId);

if (!foundPost) {
    const error  = new Error ("Post not found!!!!");
    error.statusCode = 404;
    throw error ;
}

if (foundPost.userId !== userId){
     const error  = new Error ("u are not authorized to delete this post!");
    error.statusCode = 403;
    throw error ;
}
await foundPost.destroy();
return { message: "Post Deleted Successfully" }
};

export async function getPostsWithDetails() {
    const posts = await post.findAll({
        attributes: ['id', 'title'],
        include: [
            {
                association: 'user',
                attributes: ['id', 'name']
            },
            {
                association: 'comments',
                attributes: ['id', 'content']
            }
        ]
    });
    return posts;
}

export async function getPostsWithCommentCount() {
    const posts = await post.findAll({
        attributes: [
            "id",
            "title",
            [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"]
        ],
        include: [
            {
                model: comment,
                attributes: [],
                required: false 
            }
        ],
        group: ["post.id"],
        raw: true
    });

    return posts;
}



