module.exports = mongoose => {

    var notificationSchema = mongoose.Schema(
      {
        topic: String,
        title: String,
        body: String
      },
      { timestamps: true }
    );
    notificationSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const Notification = mongoose.model("notification", notificationSchema);
    return Notification;

  };