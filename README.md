Server API
Create Room: "/room", method = RequestMethod.POST)
Get rooms: "/room", method = RequestMethod.GET)
Get room: "/room/{id}", method = RequestMethod.GET)
Start meeting: "/room/{roomId}/start", method = RequestMethod.GET)
Register room user: "/room/{roomId}/register", method = RequestMethod.GET)
unregister room user: "/room/{roomId}/unregister/{userId}", method = RequestMethod.GET)

Get Vote Result: "/room/{roomId}/vote/result", method = RequestMethod.GET)
Vote: "/room/{roomId}/vote", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")


*API endpoints*

Create room
 POST /room
  { "name" : "Meeting or room name"}
 Returns
  Location: /room/roomId
  Content-Type: application/json
  Body: room

Find a room
 GET /room/{roomId}
 Returns
  Content-Type: application/json
  Body: room


List rooms
 GET /room
 Returns
  Content-Type: application/json
  Body: Array of room

VOTES
/votes/result
  Returns boolean


*Room object*
{ "name" : ..., "id" :..., "timeoutSeconds":...., "endDate" :..." "talks":[...] }

*Talk object*
{ "votes" : []}

*Vote object*
{ "voteType" : "YES/DONT_CARE/NO"}