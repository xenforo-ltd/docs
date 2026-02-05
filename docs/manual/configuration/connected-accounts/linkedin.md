# LinkedIn

### Creating the LinkedIn Application

1. Before being allowed to create a new app you will need to browse to https://www.linkedin.com/company/setup/new/ and set up a new business page. The length of time it takes for this to show up in the app creation page can vary between hours to weeks.
1. Browse to https://www.linkedin.com/secure/developer?newapp= and log in with your LinkedIn account.
1. Click **Create app**
1. Fill out the form as necessary:
    1. The Company Name will be displayed to users when they attempt to register via LinkedIn, you will use the one you created previously.
    1. The Application Name will be displayed to users when they attempt to register via LinkedIn.
    1. The Description will be displayed to users when they attempt to register via LinkedIn.
    1. Fill in your Email and Privacy Policy as required.
    1. Upload an App Logo as required.
    1. The Application Products will use **Share on LinkedIn and Sign in with LinkedIn**.
    1. Click **Create App**.
    1. Under the **Authentication** tab note down the **Client ID** and **Client Secret**.
    1. Under OAuth2 Authorized Redirect URLs this should be set to `<XF board URL>/connected_account.php`. For example, `https://xenforo.com/community/connected_account.php`. The beginning of this URL must match your *Board URL* setting in XenForo exactly.
    1. Click **Update**.

### Configuring LinkedIn connected account

1. Log in to the Admin Control Panel.
1. Go to **Setup > Connected accounts**.
1. Click on **LinkedIn** in the list. Enter the **Client ID** and **Client Secret** obtained earlier into the respective fields and save.
1. [Test the connected account](index.md#testing-connected-accounts)