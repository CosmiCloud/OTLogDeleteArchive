const { exec } = require("child_process");
const fs = require('fs');
require('dotenv').config();

var container = process.env.CONTAINER;
var logPath = '/var/lib/docker/containers/'+container+'/'+container+'-json.log';
var date = new Date();
var date = date.getMonth();
var master = 'sudo mkdir ~/NodeArchive && sudo cp '+logPath+' ~/NodeArchive/nodeLogs && sudo tar -czf ~/NodeArchive/nodeLogs_month'+date+'.tar ~/NodeArchive/nodeLogs && sudo rm -rf ~/NodeArchive/nodeLogs'

exec(master, (error, stdout, stderr) => {});

fs.truncate(logPath,0,function(){console.log('Logs archived')});
