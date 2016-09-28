'use strict';

import sf from 'node-salesforce';


var conn = null;
export function getSFToken() {
	return new Promise(function(resolve, reject) {
         var sf = require('node-salesforce');
        conn = new sf.Connection({
          oauth2 : { 
            loginUrl : 'https://login.salesforce.com', 
            clientId : '3MVG9ZL0ppGP5UrAWx8JIjz4sovMXTSe8.vw7Qw9ioNgyQau7ImbAAIUXkVynEK1lX4UdFLWFpIUlftth9KZe',
            clientSecret : '7769180756478225142',
            redirectUri : 'https://localhost:9000'
          }
        });

        // getting token
        conn.login('ashu.gupta@iqss.co.in', 'gupta@171G3wkrihdSGWdREWA3xqTmib2', function(err, userInfo) {
          if (err) { reject(err); }
          else {
						resolve(userInfo);
					}
				});
				
	});
}

export function getSFConnect() {
	return new Promise(function(resolve, reject) {
		if(conn == null){
				getSFToken().then(function(res){
						resolve(conn);
				})
				.catch(function(err){
					reject(err);
				});
		} else 	resolve(conn);
	});
}