const db = require('../db')();

const COLLECTION = 'projects';


module.exports = () => {

    const get = async (slug = null) => {
        if(!slug){
            const everyslug = await db.get(COLLECTION);
            return everyslug;
        }
        const oneslug = await db.get(COLLECTION, {slug});
        return oneslug;
    };

    const add = async(slug, name, description) => {
        const results = await db.add(COLLECTION, {
            slug: slug,
            name: name,
            description: description,
        });

        return results.result;
    };


    return {
        get,
        add,
    };
};