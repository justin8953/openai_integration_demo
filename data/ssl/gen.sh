echo "Generating Root SSL certificates"
openssl req -new -nodes -text -out root.csr \
  -keyout root.key -subj "/C=AU/ST=Victoria/L=Melbourne/O=openaidemo/OU=RD/CN=localhost"
echo " Generating Root SSL certificates and signing with root key"
openssl x509 -req -in root.csr -text -days 3650  -signkey root.key -out root.crt

echo "Generating Intermediate SSL certificates"
openssl req -new -nodes -text -out intermediate.csr -keyout intermediate.key -subj "/C=AU/ST=Victoria/L=Melbourne/O=openaidemo/OU=RD/CN=localhost"
echo "Generating Intermediate SSL certificates and signing with root key"
openssl x509 -req -in intermediate.csr -text -days 1825 -CA root.crt -CAkey root.key -CAcreateserial -out intermediate.crt

echo "Generating DB Server SSL certificates"
openssl req -new -nodes -text -out db-server.csr -keyout db-server.key -subj "/C=AU/ST=Victoria/L=Melbourne/O=openaidemo/OU=RD/CN=localhost"
echo "Generating DB Server SSL certificates and signing with intermediate key"
openssl x509 -req -in db-server.csr -text -days 365 -CA intermediate.crt -CAkey intermediate.key -CAcreateserial -out db-server.crt

echo "Generating ES Server SSL certificates"
openssl req -new -nodes -text -out es-server.csr -keyout es-server.key -subj "/C=AU/ST=Victoria/L=Melbourne/O=openaidemo/OU=RD/CN=localhost"
echo "Generating ES Server SSL certificates and signing with intermediate key"
openssl x509 -req -in es-server.csr -text -days 365 -CA intermediate.crt -CAkey intermediate.key -CAcreateserial -out es-server.crt


echo "Generating Backend Server SSL certificates"
openssl req -new -nodes -text -out backend-server.csr -keyout backend-server.key -subj "/C=AU/ST=Victoria/L=Melbourne/O=openaidemo/OU=RD/CN=localhost"
echo "Generating Backend Server SSL certificates and signing with intermediate key"
openssl x509 -req -in backend-server.csr -text -days 365 -CA intermediate.crt -CAkey intermediate.key -CAcreateserial -out backend-server.crt