# Delete all your local databases from pouch except those starting with _ like _users _replicator

curl -X DELETE http://127.0.0.1:5984/users
curl -X PUT http://127.0.0.1:5984/users
curl -X POST http://127.0.0.1:5984/users/_bulk_docs -H 'Content-Type: application/json' --data "@__tests__/seed/users.json"

curl -X PUT http://127.0.0.1:5984/user_alice
curl -X POST http://127.0.0.1:5984/user_alice/_bulk_docs -H 'Content-Type: application/json' --data "@__tests__/seed/user_alice.json"

curl -X PUT http://127.0.0.1:5984/user_mad-hatter
curl -X POST http://127.0.0.1:5984/user_mad-hatter/_bulk_docs -H 'Content-Type: application/json' --data "@__tests__/seed/user_mad-hatter.json"

curl -X PUT http://127.0.0.1:5984/content
curl -X POST http://127.0.0.1:5984/content/_bulk_docs -H 'Content-Type: application/json' --data "@__tests__/seed/content.json"
