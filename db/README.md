# okcoders-website-db

## running

You must have docker [installed](https://docs.docker.com/v17.12/docker-for-mac/install/)

run the below to start a db and add some seed data

```
./start-and-seed.sh
```

You should see the following:

```
(base) $ pwd
/Users/zach/code/okcoders/okcoders-website-db
(base) $ ./start-and-seed.sh
179848eaa90171abbad3dc5047d4d293e6b6522bae612ce46a83292214c95d51
MongoDB shell version v4.0.9
connecting to: mongodb://127.0.0.1:27017/okcoders?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("17b10051-d0dd-42c9-9b0d-93ddd823f516") }
MongoDB server version: 4.0.9
```

Notice after this you now have a docker container running for the db:

```
docker ps
```

which shows:

```
(base) $ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                      NAMES
179848eaa901        mongo               "docker-entrypoint.s…"   13 seconds ago      Up 12 seconds       0.0.0.0:27017->27017/tcp   website-db
```


And you can connect to that db using docker as well:

```
(base) $ docker run -it --rm --network host mongo mongo
```

Notice our seed data in there:

```
(base) $ docker run -it --rm --network host mongo mongo
MongoDB shell version v4.0.9
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("e9a64f06-6e37-4798-8f12-45368dced887") }
MongoDB server version: 4.0.9
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
2019-04-16T16:07:12.677+0000 I STORAGE  [main] In File::open(), ::open for '/home/mongodb/.mongorc.js' failed with Unknown error
Server has startup warnings:
2019-04-16T16:06:05.585+0000 I STORAGE  [initandlisten]
2019-04-16T16:06:05.585+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2019-04-16T16:06:05.585+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2019-04-16T16:06:06.088+0000 I CONTROL  [initandlisten]
2019-04-16T16:06:06.088+0000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2019-04-16T16:06:06.088+0000 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2019-04-16T16:06:06.088+0000 I CONTROL  [initandlisten]
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

> show dbs
admin     0.000GB
config    0.000GB
local     0.000GB
okcoders  0.000GB
> use okcoders
switched to db okcoders
> show collections
alumni
> db.alumni.find()
{ "_id" : ObjectId("5cb5fd73e5f04d9de478ca09"), "firstName" : "Zach", "lastName" : "Mays", "age" : 29 }
```

To exit the client press ctrl+c, and then to stop the db do the following:
```
docker stop website-db
```

which looks like:

```
> ^C
bye
2019-04-16T16:07:28.047+0000 E -        [main] Error saving history file: FileOpenFailed: Unable to open() file /home/mongodb/.dbshell: Unknown error
(base) $ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                      NAMES
179848eaa901        mongo               "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:27017->27017/tcp   website-db
(base) $ docker stop website-db
website-db
(base) $ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
(base) $
```

