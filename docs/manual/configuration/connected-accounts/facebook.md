# Facebook

### Creating a Facebook application

Before you configure your XenForo installation, follow the steps below to create a custom application for your site. A Facebook account is required to create an application.

1. Browse to https://developers.facebook.com/ and be sure that you're logged into your Facebook account. Note that you must be logged in as a person, not a page.
1. Click the **My Apps** button at the top and then click on the **Add a New App** link.
1. Provide a name and email and then click **Create App ID**.
1. Next you should see a page called *Add Product*; if you do not, click the *Plus Icon* on the left next to the *Products* Heading. Under **Facebook Login**, click **Setup**.
1. You will then need to choose the platform. Click **Web** and enter the URL to your site. Click **Next* through all of the steps.
1. In the sidebar on the left, click **Settings** under *Facebook Login*.
1. In **Valid OAuth redirect URIs**, enter `<XF board URL>/connected_account.php`. For example, `https://xenforo.com/community/connected_account.php`. The beginning of this URL must match your *Board URL* setting in XenForo exactly. The Board URL *Requires HTTPS*. Once entered, click **Save Changes** at the bottom.
1. In the sidebar on the left, click **Settings** followed by **Basic**. For the **Privacy Policy URL** and the **Terms of Service URL** enter the links to those pages on your site.
1. In the sidebar on the left, click **App Review**. If the app is listed as in development, click the toggle next to it to make it live/public.
1. Go back to the sidebar on the left and click **Settings** followed by **Basic** near the top. Make a note of the *App ID* and *App Secret*. These values will need to be entered into the XenForo control panel.

### Configuring Facebook connected account

To finalize the Facebook connected account, you must enter the data obtained above into the relevant section of the XenForo control panel.

1. Log in to the Admin Control Panel.
1. Go to **Setup > Connected accounts**.
1. Click on **Facebook** in the list. Enter the **App ID** and **App secret** obtained earlier into the respective fields and save.
1. [Test the connected account](index.md#testing-connected-accounts)