# Redirection

Some importers provide **redirection scripts**, which are designed to sit in the location of your original source software and intercept request for content from that source system.

The redirection scripts can then query the table you defined as the **import log table** in order to get the necessary URL for the content in your XenForo installation that corresponds to the data requested by the original URL.

The scripts the seamlessly redirect the visitor to the new content, while sending an *HTTP header* that tells the browser that the content has permanently moved to a new location.

This permanent redirection HTTP header allows search engines to find any content they previously indexed from your original source software, and they will update their URLs to point to the new location as a result.

### Redirection for vBulletin

XenForo 2.0.2 ships with [a new redirection system](import-notes-vbulletin.md#xenforo-redirects-for-vbulletin) that aims to take the effort out of setting up redirects. You can read about it here:

[XenForo Redirects for vBulletin](import-notes-vbulletin.md#xenforo-redirects-for-vbulletin) 