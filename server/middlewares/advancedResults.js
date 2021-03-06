const advancedResults = (model, private, ...populate) => async (
  req,
  res,
  next
) => {
  let query;

  // create a copy of the query
  const reqQuery = { ...req.query };

  // remove fields
  const removeFields = ["select", "sort", "page", "limit"];

  //loop over removefields and remove each critical filed from the query
  removeFields.forEach((param) => delete reqQuery[param]);

  //convert query to string
  let queryStr = JSON.stringify(reqQuery);

  // create operators ($gt, $gte, ...)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  let queryObj = JSON.parse(queryStr);

  if (private) {
    queryObj.user = req.user.id;
  }
  // begin creating the query
  query = model.find(queryObj);

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // executing query
  const results = await query;

  // pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advancedResults;
