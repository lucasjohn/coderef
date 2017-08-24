var AWS = require('aws-sdk');
//var request = require('request');
 
exports.handler = (event, context, callback) => {

var rds = new AWS.RDS();

var date = new Date().toISOString().split('T')[0]+'-06-27';

//console.log('arn:aws:rds:us-west-2:326281182735:cluster-snapshot:rds:sensorwebdb-cluster-'+date);

var idToDelete = '';

var paramsForDescribe = {
  // MaxRecords: 20, // IT should return always 1 item
  SnapshotType: 'manual'
};
var paramsToCopy = {
  SourceDBClusterSnapshotIdentifier: 'arn:aws:rds:us-west-2:326281182735:cluster-snapshot:rds:sensorwebdb-cluster-'+date, /* required */
  TargetDBClusterSnapshotIdentifier: 'west-cluster-snapshot-'+date //, /* required */
};
var paramsToDelete = {};

rds.describeDBClusterSnapshots(paramsForDescribe, function(err, data) {
	if (err) {
		console.log(err, err.stack); // an error occurred

	}
	else {
	  	if (data.DBClusterSnapshots.length > 0){
	  		idToDelete = data.DBClusterSnapshots[0]['DBClusterSnapshotIdentifier']; // Get the first one because it should have only 1
	    	console.log('Found ID to Delete > '+idToDelete);
	    	paramsToDelete = {
	        	DBClusterSnapshotIdentifier: idToDelete /* required */
	        };
	        rds.deleteDBClusterSnapshot(paramsToDelete, function(err, data) {
				if (err) {
			  		console.log(err, err.stack); // an error occurred
				}
				else {
				  	console.log('Removal requested');
				  	rds.copyDBClusterSnapshot(paramsToCopy, function(err, data) {
						if (err) {
							console.log(err, err.stack); // an error occurred
						}
						else {
							console.log('Copy requested');
						}
					});
				}
			});
	  	} else {
	  		rds.copyDBClusterSnapshot(paramsToCopy, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				}
				else {
					console.log('Copy requested');
				}
			});
	  	}
	}
});

  // Start the request        
/*  request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {

			var headers2 = {
				'User-Agent':       'Super Agent/0.0.1',
				'Content-Type':     'application/x-www-form-urlencoded'
			};
			var options2 = {
				url: 'http://monitor.sensorweb.com.br/httpds?__device=stats:stats&copyDBClusterSnapshot='+result,
				method: 'GET',
				headers: headers2
			};
			request(options2, function (error, response, body) {

				if (!error && response.statusCode == 200) {
					console.log('Done!');
				}else{
					console.log(response.statusCode);
				}
			});
	    }
	});*/

}