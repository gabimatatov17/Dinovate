const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,            // Replace with your API key
  appSecret: process.env.TWITTER_API_KEY_SECRET,  // Replace with your API secret key
  accessToken: process.env.TWITTER_ACCESS_TOKEN,  // Replace with your access token
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET  // Replace with your access token secret
});


// Example function to post a tweet
async function postProductToTwitter(product) {
    try {
        const tweetText = `
        New Card Alert: ${product.cardName}!\nPrice: ₪${product.price}.\nGo Check it out at Dinovate.com\n#dinovate`;
        
        const tweet = await twitterClient.v2.tweet(tweetText);  // Posting the tweet
        return tweet;

    } catch (error) {
        console.error("Error posting tweet: ", error);
        throw new Error("Failed to post on Twitter");
    }
}

async function postStoreToTwitter(store) {
    try {
        const tweetText = `
        🌟 Exciting News! 🌟\nWe're thrilled to announce the opening of our new store: ${store.storeName}! 🎉\nCome visit us at ${store.storeAddress} 🛍️✨\nCan't wait to see you there!\nWorking Hours: ${store.workingHours}\n#NewStore #GrandOpening #Dinovate`;

        const tweet = await twitterClient.v2.tweet(tweetText);  // Posting the tweet
        return tweet;

    } catch (error) {
        console.error("Error posting tweet: ", error);
        throw new Error("Failed to post on Twitter");
    }
}

module.exports = {
    postProductToTwitter,
    postStoreToTwitter
};