# Enable GIPHY support

[giphy-prod-key]: videos/GIPHY-prod-key.mp4
[giphy-prod-key-1]: /img/manual/GIPHY-prod-key-1.png
[giphy-prod-key-2]: /img/manual/GIPHY-prod-key-2.png

If you enable [GIPHY](https://giphy.com/) support on your site it enables your users to search for GIFs while they are composing messages on your forum.

You can enable this by going to **Options > Messages** and clicking **Enable GIPHY support**. You will also need to obtain a GIPHY API key and upgrade it to a production key.

### Obtaining a GIPHY API production key

* Go to the [GIPHY Developers](https://developers.giphy.com/docs/api/) page and click Create an App.

* If you already have a GIPHY account then you can log in on the page that appears.

* If you do not already have a GIPHY account you can click **Join GIPHY!** to create one.

* Once you are logged in to the [GIPHY Developers Dashboard](https://developers.giphy.com/dashboard/) click **Create an App**.

* In the overlay that appears, you will be given a choice of SDK or API. Click **Select API** followed by **Next Step**.

* Enter a name in the **Your App Name** field. Insert this in the format:

  > [Your forum name] (GIPHY integration for XenForo)

* In the **App Description** field enter the following:

  > While writing a post using XenForo, users can click the GIF button to see the featured GIFs via the GIPHY API. Users can search using the GIPHY API in the same editor interface. A GIF can be clicked to insert it into their post.

* Read the [GIPHY API Terms](https://support.giphy.com/hc/en-us/articles/360028134111-GIPHY-API-Terms-of-Service) and click the checkbox to agree to them, followed by clicking **Create App**.

* At this point you now have a GIPHY API Beta Key. These beta keys
  are rate limited to a maximum of 42 search requests an hour and
  1000 search requests a day. To avoid rate limits, you should now
  upgrade the key to a production key.

* To obtain a production key from the [GIPHY Developers Dashboard](https://developers.giphy.com/dashboard/) click **Upgrade to Production** below the key you just created.

* On the form that appears in answer to the question **Which API does your app utilize?** ensure only **Search** is selected.

* Answer the questions about monthly users, categories and provide your board URL.

* Download [this video](../videos/GIPHY-prod-key.mp4) which shows GIPHY in action on a XenForo forum.

* Click the first **Attach File** button that asks you to **Please upload a video that shows your app in action.** Upload the video you downloaded in the above step.

* Download [this image](/img/manual/GIPHY-prod-key-1.png) which shows the features of the GIPHY integration.

* Click the second **Attach File** button that asks you to **Please provide a screenshot that demonstrates the features of your app + the GIPHY integration.** Upload the image you downloaded in the above step.

* Download [this image](/img/manual/GIPHY-prod-key-2.png) which shows the attribution marks.

* Click the third **Attach File** button that asks you to **Please provide a screenshot that includes the 'Powered by GIPHY' attribution marks.** Upload the image you downloaded in the above step.

* Finally, click **Apply**. Your production key should be approved within 5 working days (often sooner).