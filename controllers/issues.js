const issues = require('../models/issues')();

module.exports = () => {
    const getController = async(req, res) => {
        res.json(await issues.get());
    };
    
    const getIssue = async (req, res) => {
        res.json(await issues.get(req.params.slug)); 
    };

    const getByProject = async (req, res) => {
        res.json(await issues.getByProjectId(req.params.slug)); 
    };

    const postController = async (req, res) => {

        let slug = req.params.slug;
        let title = req.body.title;
        let description = req.body.description;
        let status = req.body.status;
        let projectId = req.body.projectId;

        const result = await issues.add(slug, title, description, status, projectId);
        res.json(result);
    };

    return {
        getIssue,
        getController, 
        postController,
        getByProject
    };
};