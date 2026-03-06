import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/xenforo-api",
    },
    {
      type: "category",
      label: "Alerts",
      link: {
        type: "doc",
        id: "api/alerts",
      },
      items: [
        {
          type: "doc",
          id: "api/get-alerts",
          label: "Gets the API user's list of alerts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-alerts",
          label: "Sends an alert to the specified user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-alerts-mark-all",
          label: "Marks all of the API user's alerts as read or viewed",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-alerts-id",
          label: "Gets information about the specified alert",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-alerts-id-mark",
          label: "Marks the alert as viewed/read/unread",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Attachments",
      link: {
        type: "doc",
        id: "api/attachments",
      },
      items: [
        {
          type: "doc",
          id: "api/get-attachments",
          label: "Gets the attachments associated with the provided API attachment key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-attachments",
          label: "Uploads an attachment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-attachments-new-key",
          label: "Creates a new attachment key, allowing attachments to be uploaded separately from the related content",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-attachments-id",
          label: "Gets information about the specified attachment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-attachments-id",
          label: "Delete's the specified attachment",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-attachments-id-data",
          label: "Gets the data that makes up the specified attachment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-attachments-id-retina-thumbnail",
          label: "Gets the URL to the attachment's thumbnail, if it has one",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-attachments-id-thumbnail",
          label: "Gets the URL to the attachment's thumbnail, if it has one",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Auth",
      link: {
        type: "doc",
        id: "api/auth",
      },
      items: [
        {
          type: "doc",
          id: "api/post-auth",
          label: "Tests a login and password for validity",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-auth-from-session",
          label: "Looks up the active XenForo user based on session ID or remember cookie value",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-auth-login-token",
          label: "Generates a token that can automatically log into a specific XenForo user when the login URL is visited",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Conversations",
      link: {
        type: "doc",
        id: "api/conversations",
      },
      items: [
        {
          type: "doc",
          id: "api/post-conversation-messages",
          label: "Replies to a conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-conversation-messages-id",
          label: "Gets the specified conversation message",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-conversation-messages-id",
          label: "Updates the specified conversation message",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-conversation-messages-id-react",
          label: "Reacts to the specified conversation message",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-conversations",
          label: "Gets the API user's list of conversations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-conversations",
          label: "Creates a conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-conversations-id",
          label: "Gets information about the specified conversation",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-conversations-id",
          label: "Updates the specified conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-conversations-id",
          label: "Deletes the specified conversation from the API user's list",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-conversations-id-invite",
          label: "Invites the specified users to this conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-conversations-id-labels",
          label: "Sets labels on the specified conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-conversations-id-mark-read",
          label: "Marks the conversation as read up until the specified time",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-conversations-id-mark-unread",
          label: "Marks a conversation as unread",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-conversations-id-messages",
          label: "Gets a page of messages in the specified conversation",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-conversations-id-star",
          label: "Sets the star status of the specified conversation",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Featured content",
      link: {
        type: "doc",
        id: "api/featured-content",
      },
      items: [
        {
          type: "doc",
          id: "api/get-featured",
          label: "Gets a list of featured content",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Forums",
      link: {
        type: "doc",
        id: "api/forums",
      },
      items: [
        {
          type: "doc",
          id: "api/get-forums-id",
          label: "Gets information about the specified forum",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-forums-id-mark-read",
          label: "Marks the forum as read up until the specified time",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-forums-id-threads",
          label: "Gets a page of threads from the specified forum",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Index",
      link: {
        type: "doc",
        id: "api/index",
      },
      items: [
        {
          type: "doc",
          id: "api/get-index",
          label: "Gets general information about the site and the API",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Me",
      link: {
        type: "doc",
        id: "api/me",
      },
      items: [
        {
          type: "doc",
          id: "api/get-me",
          label: "Gets information about the current API user",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-me",
          label: "Updates information about the current user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-me-avatar",
          label: "Updates the current user's avatar",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-me-avatar",
          label: "Deletes the current user's avatar",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-me-email",
          label: "Updates the current user's email address",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-me-password",
          label: "Updates the current user's password",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Media",
      link: {
        type: "doc",
        id: "api/media",
      },
      items: [
        {
          type: "doc",
          id: "api/get-media",
          label: "Gets a list of media items",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media",
          label: "Creates a media item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-media-id",
          label: "Gets information about the specified media item",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-id",
          label: "Updates the specified media item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-media-id",
          label: "Deletes the specified media item",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-media-id-comments",
          label: "Gets a page of comments on the specified media item",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-media-id-data",
          label: "Gets the data file for the specified media item (image binary data)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-id-feature",
          label: "Creates or edits the feature for the specified media",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-media-id-react",
          label: "Reacts to the specified media item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-media-id-unfeature",
          label: "Deletes the feature for the specified media",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Media albums",
      link: {
        type: "doc",
        id: "api/media-albums",
      },
      items: [
        {
          type: "doc",
          id: "api/get-media-albums",
          label: "Gets a list of albums",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-albums",
          label: "Creates an album",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-media-albums-id",
          label: "Gets information about the specified album",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-albums-id",
          label: "Updates the specified album",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-media-albums-id",
          label: "Deletes the specified album",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-media-albums-id-comments",
          label: "Gets a page of comments on the specified album",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-media-albums-id-media",
          label: "Gets a page of media from the specified album",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-albums-id-react",
          label: "Reacts to the specified album",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Media categories",
      link: {
        type: "doc",
        id: "api/media-categories",
      },
      items: [
        {
          type: "doc",
          id: "api/get-media-categories",
          label: "Gets the media category tree",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-categories",
          label: "Creates a media category",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-media-categories-flattened",
          label: "Gets a flattened list of media categories",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-media-categories-id",
          label: "Gets information about the specified media category",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-categories-id",
          label: "Updates the specified media category",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-media-categories-id",
          label: "Deletes the specified category",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-media-categories-id-content",
          label: "Gets a page of content from the specified category",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Media comments",
      link: {
        type: "doc",
        id: "api/media-comments",
      },
      items: [
        {
          type: "doc",
          id: "api/get-media-comments",
          label: "Gets a list of latest comments",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-comments",
          label: "Creates a comment on an album or media item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-media-comments-id",
          label: "Gets information about the specified comment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-media-comments-id",
          label: "Updates the specified comment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-media-comments-id",
          label: "Deletes the specified comment",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-media-comments-id-react",
          label: "Reacts to the specified comment",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Nodes",
      link: {
        type: "doc",
        id: "api/nodes",
      },
      items: [
        {
          type: "doc",
          id: "api/get-nodes",
          label: "Gets the node tree",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-nodes",
          label: "Creates a new node",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-nodes-flattened",
          label: "Gets a flattened node tree",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-nodes-id",
          label: "Gets information about the specified node",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-nodes-id",
          label: "Updates the specified node",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-nodes-id",
          label: "Deletes the specified node",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "OAuth2",
      link: {
        type: "doc",
        id: "api/o-auth-2",
      },
      items: [
        {
          type: "doc",
          id: "api/post-oauth-2-introspect",
          label: "Introspects an OAuth token to determine its validity and metadata (RFC 7662)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-oauth-2-revoke",
          label: "Revokes an access token or refresh token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-oauth-2-token",
          label: "Gets information about an OAuth token",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-oauth-2-token",
          label: "Exchanges an authorization code or refresh token for an access token",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Posts",
      link: {
        type: "doc",
        id: "api/posts",
      },
      items: [
        {
          type: "doc",
          id: "api/post-posts",
          label: "Adds a new reply to a thread",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-posts-id",
          label: "Gets information about the specified post",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-posts-id",
          label: "Updates the specified post",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-posts-id",
          label: "Deletes the specified post",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-posts-id-mark-solution",
          label: "Toggle the specified post as the solution to its containing thread",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-posts-id-react",
          label: "Reacts to the specified post",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-posts-id-vote",
          label: "Votes on the specified post (if applicable)",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Profile posts",
      link: {
        type: "doc",
        id: "api/profile-posts",
      },
      items: [
        {
          type: "doc",
          id: "api/post-profile-post-comments",
          label: "Creates a new profile post comment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-profile-post-comments-id",
          label: "Gets information about the specified profile post comment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-profile-post-comments-id",
          label: "Updates the specified profile post comment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-profile-post-comments-id",
          label: "Deletes the specified profile post comment",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-profile-post-comments-id-react",
          label: "Reacts to the specified profile post comment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-profile-posts",
          label: "Creates a new profile post",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-profile-posts-id",
          label: "Gets information about the specified profile post",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-profile-posts-id",
          label: "Updates the specified profile post",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-profile-posts-id",
          label: "Deletes the specified profile post",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-profile-posts-id-comments",
          label: "Gets a page of comments on the specified profile post",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-profile-posts-id-react",
          label: "Reacts to the specified profile post",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Resource categories",
      link: {
        type: "doc",
        id: "api/resource-categories",
      },
      items: [
        {
          type: "doc",
          id: "api/get-resource-categories",
          label: "Gets the resource category tree",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-resource-categories",
          label: "Creates a resource category",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-resource-categories-flattened",
          label: "Gets a flattened list of resource categories",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-resource-categories-id",
          label: "Gets information about the specified resource category",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-resource-categories-id",
          label: "Updates the specified resource category",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-resource-categories-id",
          label: "Deletes the specified category",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-resource-categories-id-resources",
          label: "Gets a page of resources from the specified category",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Resource reviews",
      link: {
        type: "doc",
        id: "api/resource-reviews",
      },
      items: [
        {
          type: "doc",
          id: "api/get-resource-reviews",
          label: "Gets a list of latest resource reviews",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-resource-reviews",
          label: "Creates a review/rating for a resource",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-resource-reviews-id",
          label: "Gets information about the specified review",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-resource-reviews-id",
          label: "Deletes the specified review",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-resource-reviews-id-author-reply",
          label: "Adds or updates an author reply to the specified review",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-resource-reviews-id-author-reply",
          label: "Removes the author reply from the specified review",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Resource updates",
      link: {
        type: "doc",
        id: "api/resource-updates",
      },
      items: [
        {
          type: "doc",
          id: "api/post-resource-updates",
          label: "Creates a resource update",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-resource-updates-id",
          label: "Gets information about the specified resource update",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-resource-updates-id",
          label: "Updates the specified resource update",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-resource-updates-id",
          label: "Deletes the specified resource update",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Resource versions",
      link: {
        type: "doc",
        id: "api/resource-versions",
      },
      items: [
        {
          type: "doc",
          id: "api/post-resource-versions",
          label: "Creates a new version of a resource",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-resource-versions-id",
          label: "Gets information about the specified resource version",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-resource-versions-id",
          label: "Deletes the specified resource version",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-resource-versions-id-download",
          label: "Downloads a file from the specified resource version",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Resources",
      link: {
        type: "doc",
        id: "api/resources",
      },
      items: [
        {
          type: "doc",
          id: "api/get-resources",
          label: "Gets a list of resources",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-resources",
          label: "Creates a resource",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-resources-id",
          label: "Gets information about the specified resource",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-resources-id",
          label: "Updates the specified resource",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-resources-id",
          label: "Deletes the specified resource",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-resources-id-feature",
          label: "Creates or edits the feature for the specified media",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-resources-id-reviews",
          label: "Gets a page of reviews for the specified resource",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-resources-id-unfeature",
          label: "Deletes the feature for the specified media",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-resources-id-updates",
          label: "Gets a page of updates for the specified resource",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-resources-id-versions",
          label: "Gets a list of versions for the specified resource",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Search",
      link: {
        type: "doc",
        id: "api/search",
      },
      items: [
        {
          type: "doc",
          id: "api/post-search",
          label: "Creates a new search",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-search-member",
          label: "Retrieves search results for a specific member",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-search-id",
          label: "Retrieves search results for a given search",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-search-id-older",
          label: "Retrieves older search results for a given search",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Search forums",
      link: {
        type: "doc",
        id: "api/search-forums",
      },
      items: [
        {
          type: "doc",
          id: "api/get-search-forums-id",
          label: "Gets information about the specified search forum",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-search-forums-id-threads",
          label: "Gets a page of threads from the specified search forum",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Stats",
      link: {
        type: "doc",
        id: "api/stats",
      },
      items: [
        {
          type: "doc",
          id: "api/get-stats",
          label: "Gets site statistics and general activity information",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Threads",
      link: {
        type: "doc",
        id: "api/threads",
      },
      items: [
        {
          type: "doc",
          id: "api/get-threads",
          label: "Gets a list of threads",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-threads",
          label: "Creates a thread",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-threads-id",
          label: "Gets information about the specified thread",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-threads-id",
          label: "Updates the specified thread",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-threads-id",
          label: "Deletes the specified thread",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-threads-id-change-type",
          label: "Converts a thread to the specified type",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-threads-id-feature",
          label: "Creates or edits the feature for the specified thread",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-threads-id-mark-read",
          label: "Marks the thread as read up until the specified time",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-threads-id-move",
          label: "Moves the specified thread to a different forum",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-threads-id-posts",
          label: "Gets a page of posts in the specified conversation",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-threads-id-unfeature",
          label: "Deletes the feature for the specified thread",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/post-threads-id-vote",
          label: "Votes on the specified thread (if applicable)",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Users",
      link: {
        type: "doc",
        id: "api/users",
      },
      items: [
        {
          type: "doc",
          id: "api/get-users",
          label: "Gets a list of users (alphabetically)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-users",
          label: "Creates a user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-users-find-email",
          label: "Finds users by their email",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-users-find-name",
          label: "Finds users by a prefix of their user name",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-users-id",
          label: "Gets information about the specified user",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/post-users-id",
          label: "Updates an existing user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-users-id",
          label: "Deletes the specified user",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/post-users-id-avatar",
          label: "Updates the specified user's avatar",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-users-id-avatar",
          label: "Deletes the specified user's avatar",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-users-id-profile-posts",
          label: "Gets a page of profile posts on the specified user's profile",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "oEmbed",
      link: {
        type: "doc",
        id: "api/o-embed",
      },
      items: [
        {
          type: "doc",
          id: "api/get-oembed",
          label: "Returns oEmbed data for the given URL (oEmbed 1",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
