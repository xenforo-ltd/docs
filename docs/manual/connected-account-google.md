# Google

### Creating the Google Project

1. Browse to https://cloud.google.com/console/project and log in with your Google account. Note that the email address associated with this account may be displayed when users register using their Google account.
1. Click the **Create Project** button and enter a name and ID. These will only be used internally.
1. Once the project is created, click the hamburger menu icon located at the top left, then select **APIs & Services**, then **Credentials** in the sidebar, and finally **OAuth Consent Screen** and complete the details as necessary and save the settings.
1. Click **CREATE CREDENTIALS**, select **OAuth Client ID**, then **WEB APPLICATION** and complete the details as follows:
    1. In the **AUTHORIZED JAVASCRIPT ORIGINS** fields, enter your domain URL without the trailing slash For example, `https://xenforo.com`. Note that if users access your site both with and without the "www" (`http://www.xenforo.com` and `http://xenforo.com`), you should enter both URLs. Similarly, if users can access your site both with and without HTTPS, you should enter a value with http and https. Each URL should be placed on its own line. Ensure **all** variations of the URL used to access your site are entered.
    1. In the **AUTHORIZED REDIRECT URIS** enter `<XF board URL>/connected_account.php`. For example, `https://xenforo.com/community/connected_account.php`. The beginning of this URL must match your *Board URL* setting in XenForo exactly.
    1. Double check all of the URLs are correct and then click the **Create Client ID** button. The **Create Client ID** overlay will be displayed so just click the **Cancel** button.
1. On the Credentials page, make a note of the **CLIENT ID** and **CLIENT SECRET**.

To change the values displayed when a user attempts to register via Google, you can customize this in your Google project via **APIs & auth > Consent screen**.

### Configuring Google connected account

To finalize the Google connected account, you must enter the data obtained above into the relevant section of the XenForo control panel.

1. Log in to the Admin Control Panel.
1. Go to **Setup > Connected accounts**.
1. Click on **Google** in the list. Enter the **Client ID** and **Client secret** obtained earlier into the respective fields and save.
1. [Test the connected account](connected-accounts.md#testing-connected-accounts)