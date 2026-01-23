# Microsoft

### Creating the Microsoft Application

1. Browse to https://apps.dev.microsoft.com/ and log in with your Microsoft Account.
1. If prompted, click **Add an App in the Azure Portal**
1. Click the **New Registration** Button
1. Fill out the form as necessary:
    1. The Application Name will be displayed to users when they attempt to register via Microsoft.
    1. The Supported Account Type is **Personal**
    1. The Redirect URI type is **Web** and should be set to `<XF board URL>/connected_account.php`. For example, `https://xenforo.com/community/connected_account.php`. The beginning of this URL must match your *Board URL* setting in XenForo exactly. If you are able to access your site from both www. or a non-www. domain name, you will need to both these as possible Redirect URLs. *HTTPS* is required.
1. Click **Register**
1. Note down the **Application (client) ID**
1. Click **Certificates and Secrets** in the left hand menu.
1. Click **New Client Secret**
1. Give the Secret a Name and set the expiry date to **Never**
1. Click **Add**
1. Note down the Secret **Value**

### Configuring Microsoft connected account

1. Log in to the Admin Control Panel.
1. Go to **Setup > Connected accounts**.
1. Click on **Microsoft** in the list. Enter the **Application (client) ID** and Secret **Value** obtained earlier into the respective fields and save.
1. [Test the connected account](connected-accounts.md#testing-connected-accounts)