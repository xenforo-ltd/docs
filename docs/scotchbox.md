# Scotchbox

The following is a description of how to install the excellent [Scotch Box](https://box.scotch.io/) onto your own computer, in order to have a fully operational development environment for XenForo in just a few minutes with a handful of simple commands.

XenForo has a custom Scotch Box config, which provides everything you need to run XenForo, including a debugger and a performance-enhancing data cache.

Scotch Box runs within a [VirtualBox](https://www.virtualbox.org/) / [Vagrant](https://www.vagrantup.com/) environment.

## Installing Scotch Box

Start by deciding where on your computer you want your virtual web server to keep its files. It is recommended that you choose a location within your own user home directory.

In the following example locations, we will be using a directory called *MyServer*, located in the root of your own user directory, identified by your name *{username}*:

- `/Users/{username}/MyServer` (Mac)
- `C:\Users\{username}\MyServer` (Windows)
- `/home/{username}/MyServer` (some Linux distributions)
- `/users/{username}/MyServer` (other Linux distributions)

Once you have chosen a location, follow these steps:

1. Install [VirtualBox](https://www.virtualbox.org/) on your computer
1. Install [Vagrant](https://www.vagrantup.com/) on your computer
1. Using a **git** client, clone `https://github.com/scotch-io/scotch-box` into your *MyServer* directory. Using the command line client with the Mac example location above, the command would be:

	```
	git clone https://github.com/scotch-io/scotch-box /Users/{username}/MyServer
	```

1. Once the clone process is complete, download this custom **Vagrantfile** and overwrite the Vagrantfile that has been created at */Users/{username}/MyServer/Vagrantfile: [Download custom Vagrantfile](files/scotchbox/Vagrantfile).

1. When the custom Vagrantfile is in place, run the following commands:

	```
	cd /Users/{username}/MyServer
	vagrant up
	```

Your Scotch Box virtual machine is now created and ready to use.

!!!Note
	Scotch Box also provides a '[Scotch Box Pro](https://box.scotch.io/pro/)' version of their virtual machine for a reasonable purchase price. If you prefer to run Scotch Box Pro, refer to the [section below describing the differences between configuring and running Scotch Box and Scotch Box Pro](#scotch-box-pro). 

## Where do the files go?

Once your Scotch Box is up and running, you can keep your XenForo PHP and JS files on your host machine, allowing you to use your text editor or IDE of choice, while the virtual machine is responsible for compiling and serving those files through its web server.

You will be able to visit your new web server in your web browser at the following address:

 ```
 http://192.168.33.10
 ```
 
 The web server will pull the files to be served from
 
 ```
 /Users/{username}/MyServer/public
 ```
 
 If you want your XenForo to be installed at `http://192.168.33.10/xenforo`, you should place the contents of the `upload` folder from the XenForo package into `/Users/{username}/MyServer/public/xenforo`.
 
## Stopping and restarting the server
 
You can stop the Scotch Box server at any time by running

```
cd /Users/{username}/MyServer
vagrant halt
```

... and you can restart it by running

```
cd /Users/{username}/MyServer
vagrant up

```

!!!Note
	Although Vagrant / Scotch Box will automatically shut down when you reboot your computer, it will not automatically start up again.
	
	Whenever you reboot, you will need to run the `vagrant up` command again in order to use the server.
 
## Offical documentation

This guide is derived from the official Scotch Box documentation, which is located at <https://box.scotch.io>

## Scotch Box Pro

While the basic Scotch Box requires some additional configuration (which is handed through the custom Vagrantfile) in order to run XenForo 2, [Scotch Box Pro](https://box.scotch.io/pro/) requires no additional configuration, and is ready to run XenForo 2 without downloading extra packages.

To run Scotch Box Pro, purchase it from the Scotch Box Pro website, then run the *git clone* command provided as part of the instructions you will receive post-purchase.

You can now install using the same instructions as above, with the single exception that you should download [this custom Vagrantfile](files/scotchboxpro/Vagrantfile) instead of the one listed in the instructions for Scotch Box.