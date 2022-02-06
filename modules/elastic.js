const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
async function NewPost(params) {
  const newpostindex = await client.index({
    index: "posts",
    body: params,
  });

  await client.indices.refresh({ index: "posts" });

  const { body } = await client.get({
    index: "posts",
    id: newpostindex.body._id,
  });

  return body;
}

async function GetPost(params) {
  var score = 0,
    Should = [];
  if (params.contenu) {
    Should = [
      { match: { contenu: params.contenu } },
      { match: { titre: params.contenu } },
    ];
    console.log(Should);
    score = 3;
  }
  params = {
    page: params.page,
    langetude: parseFloat(params.langetude),
    langetude: parseFloat(params.langetude),
  };
  const { body } = await client.search({
    index: "posts",
    body: {
      from: (params.page - 1) * 5,
      min_score: score,
      size: 5,
      query: {
        bool: {
          must: [
            {
              range: {
                "emplacement.langetude": {
                  gte: params.langetude - 0.5,
                  lte: params.langetude + 0.5,
                },
              },
            },
            {
              range: {
                "emplacement.latitude": {
                  gte: params.latitude - 0.5,
                  lte: params.latitude + 0.5,
                },
              },
            },
          ],
          should: Should,
        },
      },
    },
  });
  console.log(body);
  return body.hits;
}

async function GetPostById(params) {
  const { body } = await client.get({
    index: "posts",
    id: params._id,
  });
  console.log(body);
  return body;
}

module.exports = {
  NewPost: NewPost,
  GetPost: GetPost,
  GetPostById: GetPostById,
};
