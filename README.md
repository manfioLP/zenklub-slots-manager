# zenklub-slots-manager
This project was built on a task to Zenklub test.

It consists on a slot manager for Zenklub's professional, each slot has a 30 minute duration and can be created with any hour time and minute time.

The platform let you CRUD professionals and Slots for professionals, also has the feature to create an entire "Agenda" just informing the periods the professional wants to be available.

It was deployed using [CircleCI](https://circleci.com/) + [Serverless Framework](https://www.serverless.com/) + [Mongo Atlas DB](https://www.mongodb.com/cloud/atlas) and can be accessed on <em> <ins> https://8ogkf8aex1.execute-api.us-east-1.amazonaws.com/dev </ins> </em>

If you wish to clone the repo and use locally, please mind providing valids env variable according to .env.example + have Node + Serverless + Serverless Offline properly installed. 

Also feel free to get in touch so I can provide a valid database user info to test locally.

*Since it's just for tests purposes, professional and slot model were bundled together in just one project and no authorization and authentication is made on the requests.*


### :package: Professional

##### - Create [POST]
###### path: /professional

You only must inform "name" on the body

Returns the created professional object 
``{
  	"deleted": Boolean,
  	"specialties": [String],
  	"_id": String [UNIQUE],
  	"name": String,
  	"createdAt": "2020-07-14T20:07:29.513Z",
  	"updatedAt": "2020-07-14T20:07:29.513Z",
  }``
  
##### - [GET] 
###### path: /professional/{id}
Only add the professionalId to the query path params and it will return a professional object

##### - Delete
###### path: /professional/{id}
Only add the professionalId to the query path params and it will return the deleted professional object with a sucess message - It only sets deleted to true

##### - List [GET] 
###### path: /professional
######query : page and/or limit
If you inform no id on the query path parameters, then it returns all the professionals. Can be paginated by adding query.page and query.limit

##### - Update [PUT] 
###### path: /slot/{id}
You can update any basic info on the professional model, just pass it -mind correct types- on the Body request.
i.e:
``{
  	"specialties": ["test", "123"],
  	"name": "Joaquin Barbosa"
  }``


### :package: Slot

##### - Create [POST]
###### path: /slot

To create a single Slot (30 minutes duration), just set the requisitions body with the information
``{
  	"professionalId": "5f0cb6bf85a4520d780b88c7",
  	"hour": String | Number
  	"minutes": String | Number
  	"weekday": String | Number [JS Date Day of week number],
  	"day": String | Number [day of the month],
  	"month": String | Number [JS Date Month Number],
  	"year": String | Number [4 digits format i.e: 2020]
  }``
*Please note, this is just for testing purposes, in a production environment the professional would use the /agenda create method*

Returns the created Slot object, with own id and timestamp
  
##### - [GET] 
###### path: /slot/{id}
find specific the slot by its _id and return the slot object as in
``{
  	"previousAvailable": true,
  	"nextAvailable": true,
  	"booked": false,
  	"_id": "5f0e5d6d545aa213eb55d1bf",
  	"weekday": "MONDAY",
  	"day": "10",
  	"month": "1",
  	"year": "2020",
  	"professionalId": "5f0e108177f11227ce138c2a",
  	"hour": "20",
  	"minutes": "00",
  	"createdAt": "2020-07-15T01:35:41.244Z",
  	"updatedAt": "2020-07-15T01:35:41.244Z",
  	"identifier": "2020-1-10-20-00#5f0e108177f11227ce138c2a",
  	"timeSorter": 2000,
  }``
  - previousAvailable/nextAvailable indicates wheter it can be booked or not, since our slots have 30 minutes and a session corresponds to one hour, you need 2 slots, then it is used to verify if it can be booked or not
  - booked tells if this slot is booked already or not
  - timeSorter is for internal sorting usage
  - identifier is a unique identifier used in /agenda/book composed by: *year-month-day-hour-minute#professionalId*

##### - Delete
###### path: /slot/{id}
Only add the slotId to the query path params and it will return the deleted professional object with a sucess message

##### - List [GET] 
###### path: /slot
######query : page and/or limit and
######query : professionalId
######query : weekday
######query : month
Here it returns ALL the Slots on the database, the result is automatically paginated if no pagination query is sent, but you can use any pagination values.
Also you can list all the slots from a desired professional, from desired weekday or from a month, just set the query values properly.


### :package: Agenda

##### - Create Agenda - series of Slots [POST]
###### path: /agenda/${professionalId}
To create a series of Slot (for example, to the professional say when he will be available), you use this method a array of agendas, agendas object consists on informing the date and from what time until what time the professional will be available.

For example:
``"agenda": [
  		{
  			"weekday": String | Number [JS Date Day of week number],
  			"day": String | Number [day of the month in number],
  			"month": String | Number [JS Date month number],
  			"year": "2020",
  			"availability": {
  				"from": "08:00",
  				"to": "12:00"
  			}
  		},
  		{
  			"weekday": "MONDAY",
  			"month": "1",
  			"day": 10,
  			"year": "2020",
  			"availability": {
  				"from": "13:30",
  				"to": "18:00"
  			}
  		},
  		... goes on
  	]``

then it will return a list of slots created that can be queried from /SLOT/LIST Method.


##### - Book a Session - [PUT]
###### path: /agenda/{professionalId}/book/{timeId}

to book a session, all you have to do is to send on the request's body the ``"bookerName: String`` and set the query path parameters.

*Please note that timeId consist of the date of the slot in the format **year-monthNumber-dayNumber-hour-minute***

i.e: ``/agenda/5f0cb6bf85a4520d780b88c7/book/2020-1-13-9-30``

then it will set previousAvailable and nextAvailable to false and booked to true. Only if it is possible of coure.

