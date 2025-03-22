import { v4 as uuidv4 } from "uuid";
import { dynamoDB, TABLE_NAME } from "../config/dynamodb.js";

class MessagePost {
  static async create(postData) {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        _id: uuidv4(),
        post_title: postData.post_title || "",
        post_message: postData.post_message || "",
        posted_by: postData.posted_by || "",
        post_tags: postData.post_tags || [],
        selectedFile: postData.selectedFile || "",
        post_likes: postData.post_likes || 0,
        createdAt: new Date().toISOString(),
      },
    };

    await dynamoDB.put(params).promise();
    return params.Item;
  }

  static async findAll() {
    const params = {
      TableName: TABLE_NAME,
    };

    const result = await dynamoDB.scan(params).promise();
    return result.Items;
  }

  static async findById(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        _id: id,
      },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
  }

  static async findByIdAndUpdate(id, updateData) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        _id: id,
      },
      UpdateExpression:
        "set post_title = :title, post_message = :message, posted_by = :author, post_tags = :tags, selectedFile = :file, post_likes = :likes",
      ExpressionAttributeValues: {
        ":title": updateData.post_title,
        ":message": updateData.post_message,
        ":author": updateData.posted_by,
        ":tags": updateData.post_tags,
        ":file": updateData.selectedFile,
        ":likes": updateData.post_likes,
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
  }

  static async findByIdAndRemove(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        _id: id,
      },
    };

    await dynamoDB.delete(params).promise();
  }

  static async updateLikes(id, likes) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        _id: id,
      },
      UpdateExpression: "set post_likes = :likes",
      ExpressionAttributeValues: {
        ":likes": likes,
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
  }
}

export default MessagePost;
