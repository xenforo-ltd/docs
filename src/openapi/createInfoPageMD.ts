import type { InfoPageMetadata } from "docusaurus-plugin-openapi-docs/lib/types";
import { createInfoPageMD as defaultCreateInfoPageMD } from "docusaurus-plugin-openapi-docs/lib/markdown";

export function createInfoPageMD(pageData: InfoPageMetadata): string {
  const defaultContent = defaultCreateInfoPageMD(pageData);

  const additionalContent = `
## Accessing the API

The API for a specific XenForo installation is accessible at \`<XenForo base URL>/api/\`. All endpoints are prefixed by this URL. For example, if XenForo is installed at \`https://example.com/community/\`, then the API URLs will start with \`https://example.com/community/api/\`.

### Request format

Request bodies must be sent using the \`application/x-www-form-urlencoded\` encoding or, if a file is being uploaded, the \`multipart/form-data\` encoding. Parameters may also be passed via the query string, although for non-GET requests we **strongly** recommend passing parameters via the request body.

All request data must use the UTF-8 character set.

### Response format

All API responses will be returned in JSON format, except in cases where a binary file is specifically requested (such as when downloading an attachment).

- **Success**: Returns a 200 status code
- **Redirect**: Returns a 300-range status code
- **Error**: Returns a 400-range status code

### Bypassing permissions

If the request is made with a super user key and you wish to bypass the context user's permissions, this may be done on a per-request basis by setting the \`api_bypass_permissions\` parameter to \`1\`. This can be passed via a query string or as part of the request body.

## Error handling

When an error is encountered, the response code will be in the 400 range. Occasionally, a 500-range error may occur, though this indicates that the server was unable to process the request.

Error responses have a standardized format:

\`\`\`json
{
    "errors": [
        {
            "code": "api_key_not_found",
            "message": "API key provided in request was not found.",
            "params": []
        }
    ]
}
\`\`\`

The top level will be an object with an \`errors\` key containing an array with one or more entries. Each entry includes:

| Field | Description |
|-------|-------------|
| \`code\` | A machine-readable code for the error. There are many possible error codes as they are situation dependent. |
| \`message\` | A human-readable version of the error. This may change or be translated and should not be used to identify the type of error. |
| \`params\` | A list of key-value parameters relevant to the error. They may supplement the error code and message to give more specific details. |

## Setting up API keys

API keys are created via the admin control panel. For detailed information about creating and managing API keys, including the different key types (Guest, User, and Super user keys) and scopes, see the [REST API manual](/manual/reference/rest-api).
`;

  return defaultContent + additionalContent;
}
