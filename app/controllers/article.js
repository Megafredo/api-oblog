//~ IMPORTATION ERROR
import { _400, _404, _500 } from './errorController.js';
import { Article } from '../models/article.js';

/**
 * @typedef {*}Articles
 * @property {string} category
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {integer} category_id
 */

//~ FUNCTIONS

//~ ------------------------------------------------------------- FETCH ALL ARTICLES

async function fetchAllArticles(req, res) {
  try {
    
    const articles = await Article.findAllArticles();
    console.log("articles: ", articles);

    if (articles) res.status(200).json(articles);
    else throw new Error(`Aucun article n'a été trouvé`);
  } catch (err) {
    _500(err, req, res);
  }
}
//~ ------------------------------------------------------------- CREATE ARTICLE
async function createArticle(req, res) {
  try {
    // Les vérifications sont faites grâce a Joi et ses schémas
    await Article.createArticle(req.body);

    return res.status(200).json(`L'article a bien été créé`);
  } catch (err) {
    _500(err, req, res);
  }
}
//~ ------------------------------------------------------------- FETCH ONE ARTICLE
async function fetchOneArticle(req, res) {
  try {
    const articleId = +req.params.id;

    const article = await Article.findOneArticle(articleId);

    if (article) res.status(200).json(article);
    else throw new Error(`L'article n'existe pas`);
  } catch (err) {
    _500(err, req, res);
  }
}
//~ ------------------------------------------------------------- UPDATE ARTICLE
async function updateArticle(req, res) {
  try {
    const articleId = +req.params.id;

    let articleInfo = await Article.findOneArticle(articleId);
    
    for (const key in articleInfo) {
      req.body[key] ? req.body[key] : req.body[key] = articleInfo[key];
    }

    await Article.updateArticle(articleId, req.body);

    return res.status(200).json(`L'article a bien été modifié`);
    
  } catch (err) {
    _500(err, req, res);
  }
}
//~ ------------------------------------------------------------- DELETE ARTICLE
async function deleteArticle(req, res) {
  try {
    const articleId = +req.params.id;
    await Article.deleteArticle(articleId);

    return res.status(200).json(`L'article a bien été supprimé`);
  } catch (err) {
    _500(err, req, res);
  }
}
export { fetchAllArticles, createArticle, fetchOneArticle, updateArticle, deleteArticle };
