# Apple

### Pre-requisites

Before configuring "Sign in with Apple" you must first join the [Apple Developer Program](https://developer.apple.com/) and pay for a full developer account. You must also ensure your site is available over an SSL (https) connection with a valid certificate.

### Creating a new application

1. Log in to your [Apple Developer Account](https://developer.apple.com/account/).
2. Under "Certificates, IDs & Profiles" click [Identifiers](https://developer.apple.com/account/resources/identifiers/list).
3. Click the "plus" icon followed by "App IDs" and click "Continue".
4. Select "App" as the type and click "Continue".
5. Note down the value of "App ID Prefix" which is your "Team ID". This will be needed later.
6. Enter a "Description" and with "Explicit" selected, type a "Bundle ID". Reverse-domain name style is suggested, but it doesn't have to match your domain name exactly. We will choose `com.xenforo.community`.
7. Under "Capabilities" find "Sign In with Apple" and click the checkbox.
8. Click "Save" and when the page reloads click "Register".
9. Once you have returned to the list of "Identifiers" click the "plus" icon again, but this time select "Services IDs" before clicking "Continue".
10. Provide a "Description" and an "Identifier". We recommend using your board/site title for the description. For the identifier, once again, reverse-domain name style is suggested. We will choose `com.xenforo.community.service`.
11. Click "Continue" followed by "Register".
12. Back on the "Identifiers" list, ensure the list is filtered by "Services IDs" in the top right corner of the list.
13. Click the "Services ID" you just created.
14. Find "Sign In with Apple" in the list and click "Configure".
15. In the overlay that appears you need to provide the actual domain name for your website in the "Domain and Subdomains" field. We will choose `xenforo.com`.
16. Under "Return URLs" you need to type your board URL and its `connected_account.php` URL. Therefore, we will choose `https://xenforo.com/community/connected_account.php`.
17. Click "Next" followed by "Done" to close the overlay. Now click "Continue" followed by "Save".
18. You should be returned back to the "Identifiers" list. In the left-hand navigation, click "Keys".
19. On the "Register a New Key" page, enter a "Key Name".
20. Find "Sign in with Apple" in the list below, click the checkbox and click "Continue".
21. Under "Primary App ID" select the app ID you created in steps 3-8, followed by "Save".
22. Click "Continue" followed by "Register".
23. You must now click "Download" to download the key and note the "Key ID".

### Configuring Sign In with Apple connected account

1. Log in to the Admin Control Panel.
2. Go to **Setup > Connected accounts**.
3. Click on **Apple** in the list.
4. Enter your "Team ID" which you noted down in step 5 in the section above.
5. Enter your "Services ID" which you created in step 10 above, e.g. `com.xenforo.community.service`.
6. Enter your "Key ID" which you noted down in step 23 above.
7. Use the "Choose file" button to upload the key you downloaded in step 23 above.
8. [Test the connected account](index.md#testing-connected-accounts)

### Configuring Email for Apple Private Relay support

Apple iCloud customers can hide their email addresses when using Sign in with Apple. This sets up a randomised, anonymous email forwarder to their real email address. To enable seamless transmission of email to these Apple users, you must tell Apple about your mail domain names and email addresses.

1. Log in to your [Apple Developer Account](https://developer.apple.com/account/).
2. Under "Certificates, IDs & Profiles" click [Services](https://developer.apple.com/account/resources/services/list).
3. Under "Sign in with Apple for Email Communication" click "Configure".
4. Click the "plus" icon next to "Email Sources" to open the "Register your email sources" overlay.
5. Under "Domains and Subdomains" enter your email domain(s), e.g. `xenforo.com`.
6. Under "Email Addresses" enter your default email address as configured in your Admin control panel, e.g. `contact@xenforo.com`.
7. Click "Next" followed by "Register", followed by "Done".
