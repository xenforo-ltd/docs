# Cron

## What is Cron?

Named after the UNIX utility, which was in turn named after the Greek god of time *Chronos*, **cron** is a system for scheduling automated tasks.

A variety of scheduled tasks or jobs are listed in the **Tools > Cron entries** section of the Admin control panel, each of which perform important tasks related to system housekeeping, clean-up, periodic updates etc.

### Job run trigger

Normally, cron tasks are run automatically in an asynchronous fashion when triggered by a XenForo page being loaded by one of your site visitors. Occasionally however, in specific rare circumstances, this will not be sufficient and it will be necessary to have your server execute the job trigger at a specific time.

To do this, edit the **Setup > Options > System and performance > Job run trigger** option from the Admin control panel and set it to **Server based trigger**.

It will then be necessary to instruct your server to run the CLI command `php cmd.php xf:run-jobs` from within your XenForo installation directory on a regular basis using its own scheduled task manager.

:::warning
Changing the job run trigger is an advanced operation and will not be necessary for the vast majority of XenForo installations.
:::

    In the event that you opt for **Server based trigger** but fail to add the necessary configuration to `crontab`, `cron.d`, `system.d` or some other suitable task scheduler, cron tasks will not run on your XenForo installation and unexpected outcomes may occur. 

[About configurable job run trigger](https://xenforo.com/community/threads/assorted-improvements.181954/post-1437259) |  [crontab guru](https://crontab.guru/)

### Manually running a cron job

In the event that you want to run a cron job immediately rather than waiting for its next scheduled execution time, you can do so by visiting **Tools > Cron entries** then clicking the **Run now** gadget for the job you want to run.