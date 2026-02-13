

import { comment,user,post } from "../../database/models/index.js";
import { Op } from "sequelize";

export async function bulkOfComment(body) {
    console.log(body)
    if (!Array.isArray(body) || body.length === 0) {
        const error = new Error("Input body must be a non-empty array of comments.");
        error.statusCode = 400; 
        throw error;
    }
    
    const newComments = await comment.bulkCreate(body);
    return newComments;
};

export async function updateComment(commentId, body) {

    const foundComment = await comment.findByPk(commentId);
    if(!foundComment){
      const error = new Error("comment not found");
        error.statusCode = 404; 
        throw error;
    }
    if (foundComment.userId !== body.userId){
        const error = new Error("You are not authorized to update this comment");
        error.statusCode = 403; 
        throw error;
    }

     if (!body.content) {
        const error = new Error("Content is required");
        error.statusCode = 400;
        throw error;
    }

    await foundComment.update({
        content: body.content
    });

    return foundComment;
}


export async function findOrCreateComment({ postId, userId, content }) {

    if (!postId || !userId || !content) {
        const error = new Error("postId, userId, and content are required");
        error.statusCode = 400;
        throw error;
    }

    const [commentInstance, created] = await comment.findOrCreate({
        where: {
            postId,
            userId,
            content
        },
        defaults: {
            postId,
            userId,
            content
        }
    });

    return {
        comment: commentInstance,
        created 
    };
}

export async function findCommentsByWord(word) {
    if (!word) {
        const error = new Error("Search word is required");
        error.statusCode = 400;
        throw error;
    }

    const result = await comment.findAndCountAll({
        where: {
            content: {  
                [Op.like]: `%${word}%`
            }
        }
    });

    return {
        count: result.count,   
        comments: result.rows 
    };
}

export async function getRecentComments(postId) {
    
    if (!postId) {
        const error = new Error("postId is required");
        error.statusCode = 400;
        throw error;
    }

    const recentComments = await comment.findAll({
        where: {
            postId
        },
        order: [["createdAt", "DESC"]],
        limit: 3
    });

    return recentComments;
}

export async function getCommentsByPostUser (commentId){

 if(!commentId) {
        const error = new Error("commentId is required");
        error.statusCode = 400;
        throw error;
    }
    const foundedComment = await  comment.findByPk(commentId,{
        include: [
            {
                model : user,
                attributes : ["id", "name", "email"]
            },
            {
                model :post,
                attributes : ["id", "title", "content"]
            }
        ]

    })

    if (!foundedComment){
        const error = new Error("commentId Not Found");
        error.statusCode = 404;
        throw error;
    }
    return foundedComment
}