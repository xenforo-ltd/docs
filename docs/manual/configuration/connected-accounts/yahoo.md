# Yahoo

### Creating the Yahoo Application

1. Browse to https://developer.yahoo.com/apps/ and log in with your Yahoo Account.
1. Click the **Create an App** Button
1. Fill out the form as necessary:
    1. The Application Name will be displayed to users when they attempt to register via Yahoo.
    1. The Application Type is a **Web Application**
    1. The Description is optional.
    1. The Homepage URL should be set to the **Board URL** value set in XenForo.
    1. The Redirect URI should be set to `<XF board URL>/connected_account.php`. For example, `https://xenforo.com/community/connected_account.php`. The beginning of this URL must match your *Board URL* setting in XenForo exactly.
    1. In API permissions tick **OpenID Connect Permissions**, **Email** and **Profile**
    1. Once you click **Create App** note down the **Client ID** and **Client Secret**.

### Configuring Yahoo connected account

1. Log in to the Admin Control Panel.
1. Go to **Setup > Connected accounts**.
1. Click on **Yahoo** in the list. Enter the **Client ID** and **Client Secret** obtained earlier into the respective fields and save.
1. [Test the connected account](index.md#testing-connected-accounts)