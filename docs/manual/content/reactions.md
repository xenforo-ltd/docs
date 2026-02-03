# Reactions

Reactions allow users to express the emotion they feel towards a piece of content with a simple click. The most basic reaction is **Like**, with which everyone who has not been living in a cave for the past decade or so is familiar.

XenForo allows multiple reactions to be defined, such as *love*, *sad* and *wow*, each of which may be defined to be a **positive**, **negative** or **neutral** reaction.

Each reaction type may be assigned a *reaction score*. For example, **Like** is given a score of (positive) +1. If ten users 'like' a post, in the absence of any other reactions, its reaction score will be 10. Reactions may also be assigned neutral (+0), negative (-1) or custom scores depending upon their use case.

### Reaction manager

All currently-defined reactions are viewable through the reaction manager at **Content > Reactions**.

Each reaction is listed showing its graphic, title and associated reaction score.

Clicking a reaction or the **Add reaction** button will enter the reaction editor, where reactions can be defined and edited.

### Reaction editor

The reaction editor form is made up of two parts:

The first part is specific to reactions, and provides input fields to define the title, text color, reaction score and [display order](../common-concepts/display-order.md) for the currently-edited reaction.

:::note
The **text color** field comes into use when a user has selected a particular reaction for a given content item, at which point their reaction will be accompanied by the title of that reaction in the color defined here.
:::

The second part of the reaction editor form concerns itself with defining the reaction graphic.

This is achieved in the same manner in which [smilie graphics](smilies.md#image-replacement-url) are defined.

Reaction graphics can be uploaded from your computer directly via the control panel with XenForo 2.2 and newer.

#### About negative reaction scores

:::warning
While it is possible to allow users to express negative reactions, many community administrators will stop short of actually assigning a negative score to reactions.
:::

    For example, a person may react with **angry** to a post describing an unfortunate incident, without wanting to actually penalize the author of the post.
    
    Negative scoring reactions also have the potential to be abused by vindictive users trying to gang-up on other users they may dislike.

By default, XenForo assigns **neutral** scores to the ostensibly negative reactions **sad** and **angry**.