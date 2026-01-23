# Twitter

### Creating the Twitter Application

1. Browse to https://developer.twitter.com/ and log in with your Twitter account.
1. After logging in, hover over your username in the top right corner and from the menu select **Apps**.
1. Click **Create an app**.
1. Fill out the form as necessary:
    1. The name and description will be displayed to users when they attempt to register via Twitter.
    1. The website URL should be set to the **Board URL** value set in XenForo. It's very important that the correct domain is entered here. Registration will only work if the request comes from the domain entered here.
    1. Click **Enable Sign in with Twitter**
    1. The callback URL should be set to `<XF board URL>/connected_account.php`. For example, `https://xenforo.com/community/connected_account.php`. The beginning of this URL must match your *Board URL* setting in XenForo exactly.
    1. You need to explain how the app will be used. Words to the effect of "This app will be used to provide log in/sign up with Twitter functionality so that users can log in and register to the forum with their Twitter accounts."
1. After creating the application, you will be redirected to a page displaying information about the application. Click the **Keys and tokens** tab.
1. On the same page, make a note of your **API key** and **API secret key** below the **Consumer API keys** heading.

### Configuring Twitter connected account

To finalize the Twitter connected account, you must enter the data obtained above into the relevant section of the XenForo control panel.

1. Log in to the Admin Control Panel.
1. Go to **Setup > Connected accounts**.
1. Click on **Twitter** in the list. Enter the **Consumer key** and **Consumer Secret** obtained earlier into the respective fields and save.
1. [Test the connected account](connected-accounts.md#testing-connected-accounts)