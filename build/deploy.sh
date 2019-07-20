cd ..
tar -zcvf okcoders-website-bundle.tar.gz okcoders-website/
scp -i ~/.ssh/okcoders.pem ./okcoders-website-bundle.tar.gz ec2-user@ec2-100-27-26-134.compute-1.amazonaws.com:/home/ec2-user/
ssh -i ~/.ssh/okcoders.pem ec2-user@ec2-100-27-26-134.compute-1.amazonaws.com -t '
	rm -rf okcoders-website/
	tar -zxvf okcoders-website-bundle.tar.gz
	cd okcoders-website
	./build/build.sh

	./build/start-db.sh "/home/ec2-user/data"
	./build/start-app.sh
' 
