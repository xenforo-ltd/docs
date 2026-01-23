# Advertising

It is easy to deploy advertising to a XenForo site without having to customize any templates.

The basic process is to choose a location in which to place an advert, enter the HTML provided by the advertiser and optionally configure to which user groups the advert will be displayed.

The advertising system is located at **Setup > Advertising**.

## Deploying an advert

Add a new advert with **Setup > Advertising > Add advertisement**.

Give your advert a title of your choosing. This title is for your own reference only, it will not affect the final display of the ad.

### Position

Pick a *Position* from the drop-down menu. These positions are named in an intuitive fashion, and it should be clear where to expect your ad to appear after selecting a location.

### HTML content

In the *HTML* text box, paste the advert HTML as provided by the advertiser, or enter your own using XenForo template syntax.

Make sure your HTML is valid to prevent unexpected layout breakage.

### Display criteria

If you check either of the *Display criteria* checkboxes, you may restrict the display of your ad to only members of specific user groups that you choose, or you may exclude members of groups from seeing your ad.

This can be useful when used in conjunction with a [paid user upgrade](user-upgrades.md) in which users may pay to view a version of your site with all ads hidden.

### Display order

If you have multiple ads deployed to the same position, they will be displayed according to the [display order](display-order.md) that you define.

### Active switch

You may quickly disable an ad without completely removing it by un-checking the *Advertisement is active* checkbox.

## Advert positions

The XenForo [templates](templates.md) are preconfigured with numerous locations in which ads can be placed with minimal effort. Within the template code, these appear as follows:

```html
<xf:ad position="advert_location_name" />
```

It is important not to remove these snippets of code from the templates when customizing, otherwise the location will not work as expected.

