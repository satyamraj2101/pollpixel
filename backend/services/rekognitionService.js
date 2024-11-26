// C:\Users\KIIT\WebstormProjects\PollPixel\backend\services\rekognitionService.js
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

const rekognition = new AWS.Rekognition();

module.exports = {
    addFaceToCollection: async (collectionId, imageBytes) => {
        const params = {
            CollectionId: collectionId,
            Image: { Bytes: imageBytes },
            ExternalImageId: `face_${Date.now()}`,
        };
        try {
            const response = await rekognition.indexFaces(params).promise();
            return response;
        } catch (error) {
            console.error('Error adding face to collection:', error);
            throw new Error('Error adding face to collection');
        }
    },

    searchFace: async (collectionId, imageBytes) => {
        const params = {
            CollectionId: collectionId,
            Image: { Bytes: imageBytes },
            MaxFaces: 1,
            FaceMatchThreshold: 80, // Adjust as necessary
        };
        try {
            const response = await rekognition.searchFacesByImage(params).promise();
            return response;
        } catch (error) {
            console.error('Error searching face in collection:', error);
            throw new Error('Error searching face in collection');
        }
    },
};
