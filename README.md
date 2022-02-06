# Test-Back

This project was created by NodeJs Express and uses a microservice of authentification 'Keycloak'
and another microservice for searching data 'elasticsearch' and Database MongoDb

## Set up Keycloak

- connect to your keycloak admin .
- create a Realm
- 1. create a Client named 'api-node' with client Protocol 'openid-connect' and acces type 'bearer only'
  2. or you can change the name of the client and then u generate the config file and replace the config file "./keyloak.json"

## For the Front End Project

- for the Front end repository : https://github.com/aymankd/Test-Front.git

# Run the Project

### `npm i`

### `npm start`
