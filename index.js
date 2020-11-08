const https = require('https');

exports.handler = async (event) => {
    let dataString = '';
    const category_name=event['pathParameters']['category-name']
    const response = await new Promise((resolve, reject) => {
        let url=`https://www.cubyt.io/data/categories`;
        if(category_name){
            url=`${url}/${category_name}`
        }
        const req = https.get(url, function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(JSON.parse(dataString), null, 4)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    return response;
};
