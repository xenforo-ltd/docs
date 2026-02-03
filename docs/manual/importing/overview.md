# Importing data from other software

XenForo has the ability to import information from other forums, including users, forums, threads, posts and private messages, along with various other data.

This can be extremely useful if you are migrating your forum from another software package, or if your forum needs to merge with, or absorb another forum site.

XenForo importers are now installed via a separate add-on which you can download from your [Customer area](https://xenforo.com/customers/).

At the time of writing, XenForo 2 supports importing data from the following sources:

- XenForo 2.x
- vBulletin 3.6 to 5.3
- IPS 4.x
- phpBB 3.2 to 3.3
- SMF 2.0
- MyBB 1.8
- Discourse 3.x

## Before you start

Before you begin an import, there are a number of considerations and preparatory steps you may want to make prior to the configuration process. These steps vary depending on the system from which you will be importing, and are described in the [system-specific importer notes](overview.md#system-specific-importer-notes) below.

## Selecting an importer

You can start the import system by clicking on **Import data**, in the **Tools** section of the XenForo admin control panel.

On this page, you will be asked to choose an import source. The sources listed are grouped by the system into which they are designed to import.

:::note
At the time of writing, all existing importers target XenForo itself, but in time there may be importers that target the XenForo Media Gallery, the XenForo Resource Manager, or even third party add-on products.
:::
Once you have selected an importer that matches the source data you want to import, hit the **Continue** button. 

## Import speed

While it is entirely possible for importers to fetch data from a remote server, network latency will be a significant factor in these instances, due to the fact that each import step could be running several thousand queries to fetch and import the data.

The time spent waiting for the data to be fetched over even a very fast local area network will result in massive slow-down compared to imports performed on a single server.

For the fastest possible import process, back up the database and files on your servers and then perform the import on the fastest possible server available to you, with both the source and destination databases and files located on that server. Once the import is complete, you can deploy the resulting database and files to your live production environment.

## System-specific importer notes

Before you select and configure an importer, you should read any notes available for the importer you are planning to use, in order to best prepare your XenForo installation to receive the imported data.

- [vBulletin](import-notes-vbulletin.md)
