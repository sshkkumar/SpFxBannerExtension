This extension will show up a message on the top of the modern page.
The message to show will be into a separate json file.
When the extension runs it will get the json file(the site url where the 'Site Assets/banner.json' file is uploaded is configured in the config file), extract the message and show up into the top placeholder of the modern site's landing page.

More Details:
1. There can be 2 different messages/banner texts to be put onto a site. They are called 'Banner1' and 'Banner2'
2. The messages are put into 'banner.json' file. The file will be uploaded into 'Site Assets' library. This file will have 'Banner1' and 'Banner2' as key and respective message as banner texts
3. There will be another list called 'BannerDetails' which will store the list sites showing the 2 banners.
4. The list will have 3 columns:
  a. SourceSiteUrl - Single Line of Text field. This field will store the site Url where we want to put the banner on.
  b. BannerType - Single line of Text field which will have values as 'Banner1' or 'Banner2'
  c. TargetSiteUrl - Single line of Text to store target site url, in case, user wants to show target site url in either of the 2 banners
5. The banner message(Banner1 and Banner2) can have one placeholder {0} which can be replaced by the text in the 'TargetSiteUrl' value. This can be site url of dynamic text that user wants to replace on the banner. For example: following is the banner.json file
{
  "Banner": {
    "Banner1": "Youe site is migrating",
    "Banner2": "Your site is live. Please access the target URL at {0}"
  }
}

The 'Banner2' text has {0} which will be replaced by the tool during the load time with the value specified in the 'TargetSiteUrl' column of the list.
