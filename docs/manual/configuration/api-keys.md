# API keys

Versions of XenForo from 2.1 and onwards have a REST API available.

This allows external systems and applications that are not running directly _through_ XenForo to access data from your forum.

## Key management

In order to work with the API, these external API clients must possess a suitable **API key**, which grants permission to access the necessary data.

API keys can be created and managed in the Admin Control Panel at **Setup > Service providers > API keys**.

It is a good idea to create a separate key for every separate client of the API, so that each one received _precisely_ the permissions it requires and nothing more, and so that you can revoke access for one client without affecting others.

## Full documentation

A full description of how API key types and how to work with them is available in the [XenForo developer documentation](https://xenforo.com/docs/dev/rest-api/).

## API endpoints

The API features a number of endpoints and actions that can be taken. Additional endpoints and data may be added in the future.

[View the API endpoint documentation](https://xenforo.com/community/pages/api-endpoints/)