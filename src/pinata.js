// require('dotenv').config();
// const key = process.env.REACT_APP_PINATA_KEY;
// const key = "0x2eaBEa5ed04d1d1942c01Ba3A4A55056947D1702"
const key = "a381a98a566aff391103"
// const secret = process.env.REACT_APP_PINATA_SECRET;
// const secret = "d25cbee39e8e9952c626972fb42ef716a6d99d3368a6f18b219fe801366b37af";
const secret = "da0ddbf744a39736795124e9e7d969a5eeaf817223e81fc36a97f5b2410bd110";

// import {FormData} from 'form-data';
const axios = require('axios');
// const FormData = require('form-data');



export const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    console.log("?????", JSONBody, key, secret)
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    // const fileContents = Buffer.from(bytes);
    let data = new FormData();
    console.log("]]]]]", FormData, file)
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);
   console.log({data, key, secret})
    return axios 
        .post(url, data, {
            maxBodyLength: -1,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};