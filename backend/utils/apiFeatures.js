class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword;
  
    if (keyword) {
      this.query = this.query.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { topic: { $regex: keyword, $options: "i" } },
        ],
      });
    }
  
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
