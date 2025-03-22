import { dynamoDB, TABLE_NAME } from '../config/dynamodb.js';
import { v4 as uuidv4 } from 'uuid';

class MessagePost {
    static async findAll() {
        const params = {
            TableName: TABLE_NAME
        };
        
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    }

    static async findById(id) {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                _id: id
            }
        };
        
        const result = await dynamoDB.get(params).promise();
        return result.Item;
    }

    static async create(postData) {
        const post = {
            _id: uuidv4(),
            ...postData,
            createdAt: new Date().toISOString(),
            post_likes: 0
        };

        const params = {
            TableName: TABLE_NAME,
            Item: post
        };

        await dynamoDB.put(params).promise();
        return post;
    }

    static async findByIdAndUpdate(id, updateData) {
        const updateExpr = [];
        const exprAttrNames = {};
        const exprAttrValues = {};

        Object.entries(updateData).forEach(([key, value]) => {
            if (key !== '_id') {
                updateExpr.push(`#${key} = :${key}`);
                exprAttrNames[`#${key}`] = key;
                exprAttrValues[`:${key}`] = value;
            }
        });

        const params = {
            TableName: TABLE_NAME,
            Key: { _id: id },
            UpdateExpression: `SET ${updateExpr.join(', ')}`,
            ExpressionAttributeNames: exprAttrNames,
            ExpressionAttributeValues: exprAttrValues,
            ReturnValues: 'ALL_NEW'
        };

        const result = await dynamoDB.update(params).promise();
        return result.Attributes;
    }

    static async findByIdAndRemove(id) {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                _id: id
            }
        };

        await dynamoDB.delete(params).promise();
    }
}

export default MessagePost;