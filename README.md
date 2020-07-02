# OTLogDeleteArchive
This will help you set up a cronjob that will trigger a script that deletes and archives OT Node logs on the 1st of every month. The archived files are stored in ~/NodeArchive.
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

CONTAINER=mycontainer

Add a Cron job to the bottom of your crontab to trigger the script. Test running the command before adding it to your crontab.
<ol>
<li>Sudo nano /etc/crontab</li>
<li>Edit and Paste the command below to the end of your crontab</li>
</ol>

0 0 1 * * root cd ~/path/to/my/script/ && node process.js



