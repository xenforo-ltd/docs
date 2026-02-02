# Import specification: vBulletin

When importing from vBulletin, the XenForo system will require access to the following data:

* MySQL database in which vBulletin is installed
* Directory in which file attachments are stored, if not in the database
* Directory in which user avatars are stored, if not in the database

The following data is imported from vBulletin

## User groups

* Title
* User title
* Extensive permissions

## Users

* Basics
	* User name
	* Email
	* Log-in credentials
	* Custom avatar
	* Last activity date
	* Registration date
	* Post count
	* Custom user title
	* Birth date
	* Signature
* Permissions & memberships
	* User group membership(s)
	* Permissions
	* Admin status
	* Super moderator status
	* Moderator status
	* Banned status and reason
* Custom user fields
	* **Any admin-defined custom user field** and,
	* Location
	* About
	* Home page
	* ICQ
	* AIM
	* Yahoo!
	* MSN
	* Skype
* Buddy and ignore user lists
* Preferences
	* Online visibility
	* Birth date display
	* Signature display
	* Auto subscribe with reply
	* Email mailing list
	* Visitor message privacy
	
## Paid subscriptions

The following data will be imported, though a new payment profile will need to be attached.

* Title
* Description
* Member group IDs
* Cost
* Duration
* Recurring
* Display order

## Custom BB codes

* Tag
* Title
* Example
* Replacement HTML
* Optional attribute
* Allow empty tags
* Make children plain
* Disable contained smilies
* Disable contained linebreaks
* Disable contained auto-link

## Private messages

All private messages will be imported into XenForo as separate conversations, as vBulletin 3.x does not support linked replies.

* From user
* To users
* Date
* Title
* Message text
* Read state for each recipient

## Visitor messages

* From user
* To user
* Date
* Message text
* User IP address
* Is moderated
* Is deleted

## Forums

* Parent / sibling tree structure
* Category, forum or link type
* User group access privileges
* Title
* Thread count
* Post count
* Thread prefix requirements
* Last post info
* Subscribed users with notification preferences

## Moderators

* User association
* Forum association
* Privileges
* Is super moderator

## Threads

* Title
* Author
* Start date
* Thread prefix
* Containing forum
* 


## Thread prefixes

* Prefix set grouping
* Title

## Posts

## Attachments

## Reputation

## CAPTCHA questions

## FAQ pages

## Announcements

## Notices

## Smilies