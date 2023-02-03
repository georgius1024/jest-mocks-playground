export default {
  additionalCheck(data) {
    console.log("additionalCheck");
    return true;
  },

  validate(data) {
    if (data > 10) {
      return this.additionalCheck(data);
    }
    return true;
  },
};
