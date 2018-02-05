# Delete all your local databases from pouch except those starting with _ like _users _replicator

curl -X DELETE http://localhost:5984/users
curl -X PUT http://localhost:5984/users
curl -X POST http://localhost:5984/users/_bulk_docs -H "Content-Type: application/json" --data "@__tests__/seed/users.json"

curl -X DELETE https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/user_alice
curl -X PUT https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/user_alice
curl -X POST https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/user_alice/_bulk_docs -H "Content-Type: application/json" --data "@__tests__/seed/user_alice.json"

curl -X DELETE https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/user_mad-hatter
curl -X PUT https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/user_mad-hatter
curl -X POST https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/user_mad-hatter/_bulk_docs -H "Content-Type: application/json" --data "@__tests__/seed/user_mad-hatter.json"

curl -X DELETE https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/content
curl -X PUT https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/content
curl -X POST https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/content/_bulk_docs -H "Content-Type: application/json" --data "@__tests__/seed/content.json"
