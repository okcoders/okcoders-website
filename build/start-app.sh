docker stop app
docker rm app
docker run \
-p 80:9000 \
-d \
--link mongo \
-e DB_URL="mongodb://mongo:27017/okcoders" \
--name app \
local-app