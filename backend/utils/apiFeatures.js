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

  searchUser() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit", "topic", "category"]; // Add "topic" to removeFields

    removeFields.forEach((key) => delete queryCopy[key]);

    // Handle the "topic" filter
    if (this.queryStr.topic) {
      this.query = this.query.find({ topic: this.queryStr.topic });
    }

    // Handle the "category" filter
    if (this.queryStr.category) {
      this.query = this.query.find({ category: this.queryStr.category });
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
