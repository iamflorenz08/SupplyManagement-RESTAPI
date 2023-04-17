const ContentBasedRecommender  = require('content-based-recommender-ts')

const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocs: 100
})

module.exports = recommender