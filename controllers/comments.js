const comments = require('../models/comments')();

module.exports = () => {
    const getComment = async(req, res) => {
        res.json(await comments.getOneComment(req.params.commentId));
    };
    const getCommentsIssue = async (req, res) => {
        res.json(await comments.getCommentsIssue(req.params.issueNumber));
    };
    const postComment = async (req, res) => {
        let issueNumber = req.params.issueNumber;
        let text = req.body.text;
        let author = req.body.author;


        const result = await comments.addComment(issueNumber, text, author);
        res.json(result);
    };

    return {
        postComment,
        getCommentsIssue,
        getComment
    };
};