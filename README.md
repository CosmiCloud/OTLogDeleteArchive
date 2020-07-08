# OTLogDeleteArchive
This will help you set up a cronjob that will trigger a script that deletes and archives OT Node logs on the 1st of every month. The archived files are stored in ~/NodeArchive. You will receive a Push notification whenever ever the script completes or fails. If the script does fail, the notification will include log statements to identify the issue.
<br><br>
Install the 'Notify My Device' app from the app store and install it onto your mobile device.
<br><br>
Navigate to https://www.notifymydevice.com/ and create an account. Go to 'My applications' and create an application. Copy the API key and save it for later.
<br><br>
Note: Ensure you have write permissions for your log file that can found when you run docker inspect -f '{{.LogPath}}' otnode

------------------------------------------------------------------------------------------------------------------------------------------------------------------

On your node:<br>
Install npm, nodejs
<ul>
<li>sudo apt install npm</li>
<li>sudo apt install nodejs</li>
</ul>

Edit your environment variable inside of your directory and add your container name found when you run the command mentioned in the note.
<ol>
<li>Sudo nano .env</li>
<li>Paste and edit the variable below</li>
</ol>

CONTAINER=mycontainer<br>
APIKEY=myAPIkey<br>
NODENAME="my nodes name"

Add a Cron job to the bottom of your crontab to trigger the script. Test running the command before adding it to your crontab.
<ol>
<li>Sudo nano /etc/crontab</li>
<li>Edit and Paste the command below to the end of your crontab</li>
</ol>

0 0 1 * * root cd ~/path/to/my/script/ && node process.js
