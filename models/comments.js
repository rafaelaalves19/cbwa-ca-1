const projects = require('./projects');

const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';


module.exports = () => {

    const getCommentsIssue = async (issueNumber) => {
      const PIPELINE = [
          {$match: {slug:issueNumber}},
          {$project: {
              comments: 1,
              _id: 0,
              slug: 1,
          },
         },
      ]
      const getComment = await db.aggregate(COLLECTION, PIPELINE);
      return getComment;
    };

    const getOneComment = async (commentId) => {
        const PIPELINE = [
            { $match: { 'comments._id': ObjectID(commentId) } },
             {$project: {
                 comments: {
                     $filter: {
                         input: '$comments',
                         as: 'comment',
                         cond: {$eq: ['$$comment._id', ObjectID(commentId)] },
                        },
                    },
                    _id: 0,
                    slug: 1,
                },
            },
        ]

        const comments = await db.aggregate(COLLECTION, PIPELINE);
        return comments;

    }

    const addComment = async(issueNumber, text, author) => {
        const PIPELINE = [{slug: issueNumber}, {$push:{comments: {
            _id: new ObjectID(),
            text: text,
            author: author
        }}}] 


        const results = await db.update(COLLECTION, PIPELINE); 

        return results.result;
    };


    return {
        getCommentsIssue,
        getOneComment,
        addComment
    };
};