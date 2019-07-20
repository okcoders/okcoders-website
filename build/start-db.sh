docker stop mongo
docker rm mongo
docker run \
	-v "$1"/data:/data/db \
	-d \
	-p 27017:27017 \
	--name mongo \
	local-mongo