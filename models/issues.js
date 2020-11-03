const db = require('../db')();
const COLLECTION = 'issues';
const ObjectID = require('mongodb').ObjectID;


module.exports = () => {

    const get = async (issueNumber = null) => {
        if(!issueNumber){
            const everyissues = await db.get(COLLECTION);
            return everyissues;
        }
        const oneissue = await db.get(COLLECTION, {slug:issueNumber});
        return oneissue;
    };

    const getByProjectId = async (issueNumber) => {
        let expression = new RegExp(issueNumber);
        const byProject = await db.get(COLLECTION, {slug:expression});
        return byProject;



    };

    const add = async(slug, title, description, status, projectId) => {
        const counter = await  db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
            slug: `${slug}-${counter +1}`,
            title: title,
            description: description,
            status: status,
            projectId: new ObjectID(projectId),
            comments:[]
        });

        return results.result;
    };


    return {
        get,
        add,
        getByProjectId
    };
};