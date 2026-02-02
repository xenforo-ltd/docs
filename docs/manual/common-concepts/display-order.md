# Display order

Display order is a concept widely used in XenForo.

It allows items to be set in an order relative to one another that is quickly and easily changed.

The system is based on each item having a display order value, which is an arbitrary whole number. Items with higher numbers are displayed after items with lower numbers, as shown in this example, where the item's display order is shown in parentheses:

+ **Blue** (5)
+ **Purple** (7)
+ **Red** (29)
+ **Green** (1578)

Display order applies *only* to items with the same (or no) parent item. If an item is a child of another item, it will only be affected by the display order of its sibling children, and not by the display order values of its parent, or children of another parent.

Here's another example showing this, with a list of parent items, each of which have their own child items. Again, the display order value is shown in parentheses:

+ **Colors** (<span style={{color: 'orange'}}>1000</span>)
    + **Blue** (<span style={{color: 'blue'}}>5</span>)
    + **Purple** (<span style={{color: 'blue'}}>7</span>)
    + **Red** (<span style={{color: 'blue'}}>29</span>)
    + **Green** (<span style={{color: 'blue'}}>1578</span>)
+ **Animals** (<span style={{color: 'orange'}}>2000</span>)
    + **Badger** (<span style={{color: 'red'}}>100</span>)
    + **Hedgehog** (<span style={{color: 'red'}}>101</span>)
    + **Otter** (<span style={{color: 'red'}}>102</span>)
+ **Fast food** (<span style={{color: 'orange'}}>10000</span>)
    + **Hamburger** (<span style={{color: 'purple'}}>30</span>)
    + **Hot dog** (<span style={{color: 'purple'}}>50</span>)
    + **Fried chicken** (<span style={{color: 'purple'}}>75</span>)

In this example, the top-level items (Colors, Animals and Fast food) are ordered by display order values of 1000, 2000 and 10000. These are entirely independent of the values of their child items, which relate only to their own siblings. The color codings help to illustrate the relative display order values.