module.exports = mongoose => {
    var subscriberSchema = mongoose.Schema(
      {
        token: String,
        topic: String
      },
      { timestamps: true }
    );
    subscriberSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Subscriber = mongoose.model("subscriber", subscriberSchema);
    return Subscriber;
  };