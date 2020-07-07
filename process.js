const { exec } = require("child_process");
const fs = require('fs');
const dateFormat = require('dateformat');
const querystring = require('querystring');
const https = require("https");
require('dotenv').config();


var container = process.env.CONTAINER;
var logPath = '/var/lib/docker/containers/'+container+'/'+container+'-json.log';
var date = dateFormat(new Date(), "yyyy-mm-dd-h:MM:ss");
var copyLogs = 'sudo mkdir -p ~/NodeArchive && sudo cp '+logPath+' ~/NodeArchive/nodeLogs';
var archiveCopy = 'sudo tar -czf ~/NodeArchive/nodeLogs_'+date+'.tar --absolute-names ~/NodeArchive/nodeLogs';
var trimCopy = 'sudo rm -rf ~/NodeArchive/nodeLogs';

function PushNotification(PushTitle, PushText)
    {
             var apiKey = process.env.APIKEY
             var postdata = querystring.stringify({
                     'ApiKey': apiKey,
                     'PushTitle': PushTitle,
                     'PushText': PushText,
                     });
                     var options = {
                     hostname: 'www.notifymydevice.com',
                     port: 443,
                     path: '/push?',
                     method: 'POST',
                     headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                     'Content-Length': postdata.length
                     }
             };

     callback = function (response) {
             var str = '';
                     //another chunk of data has been recieved, so append it to `str`
                             response.on('data', function (chunk) {
                             str += chunk;
                             });
                             //the whole response has been recieved, so we just print it out here
                             response.on('end', function () {
                             console.log('Response: ' + str);
                             });
                     }
             var req = https.request(options, callback);
             req.write(postdata);
             req.end();
             req.on('error', function (e) {
             Log(e);
     });
    }

exec(copyLogs, (error, copy, stderr) => {
  if (error){
    console.log('Failed to copy logs.');
    PushNotification(process.env.NODENAME + " log archiving failed.",'Failed to copy.');

  } else{
    console.log('Logs copied.');
    console.log('Archiving Logs...');

    exec(archiveCopy, (error, archive, stderr) => {
        if (error){
          console.log('Failed to archive logs.');
          PushNotification(process.env.NODENAME + " log archiving failed.",'Failed to archive.');

        } else{
          console.log('Logs Archived.');
          console.log('Trimming extra copy...');

          exec(trimCopy, (error, trim, stderr) => {
            if (error){
              console.log('Failed to trim copy.');
              PushNotification(process.env.NODENAME + " log archiving failed.",'Failed to trim copy.');

            } else{
              console.log('Log trimmed.');
              console.log('Truncating Node logs...');

                fs.truncate(logPath,0,function(){
                  PushNotification(process.env.NODENAME + " log archiving complete.",'Complete.');

                });
              }
          });
        }
    });
  }
});
