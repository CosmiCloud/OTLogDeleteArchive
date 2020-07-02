const { exec } = require("child_process");
const fs = require('fs');
const dateFormat = require('dateformat');
require('dotenv').config();

var container = process.env.CONTAINER;
var logPath = '/var/lib/docker/containers/'+container+'/'+container+'-json.log';
var date = new Date();
var date = dateFormat(new Date(), "yyyy-mm-dd-h:MM:ss");
var master = 'sudo mkdir -p ~/NodeArchive && sudo cp '+logPath+' ~/NodeArchive/nodeLogs && sudo tar -czf ~/NodeArchive/nodeLogs_month'+date+'.tar ~/NodeArchive/nodeLogs && sudo rm -rf ~/NodeArchive/nodeLogs'

exec(master, (error, stdout, stderr) => {
  if (error){
    console.error(error);
  }
  else{
    fs.truncate(logPath,0,function(){console.log('Logs archived')});
  }
});
