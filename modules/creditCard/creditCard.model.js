module.exports = mongoose => {
    const { Schema } = mongoose;

    const schema = new Schema({
        userId: { type: String },
        cardToken: { type: String },
        brandType: { type: String },
        maskedNumber: { type: String },
        primary: {type: Boolean },
    });
    schema.index({ userId: 1 });
    schema.pre('save', async function (next) {
        const CreditCard = mongoose.model('CreditCard')
        this.primary = await CreditCard.count({userId: this.userId}) === 0;
        next();
    });

    mongoose.model('CreditCard', schema, 'CreditCard');

};