The following is a description of how to install the excellent [Scotch Box](https://box.scotch.io/) onto your own computer, in order to have a fully operational development environment for XenForo in just a few minutes with a handful of simple commands.

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

1. Once the clone process is complete, run the following commands:

	```
	cd /Users/{username}/MyServer
	vagrant up
	```

Your Scotch Box virtual machine is now created and ready to use.

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

## Installing Xdebug (optional)

If you go down the Scotch Box route, you may want to install a debugger to allow you to set break points both in your code and that of XenForo itself, to diagnose problems or just to see how the execution flow works. [Xdebug](https://xdebug.org) by Derick Rethans is an excellent tool for the job.

!!!Note
	If you just want to run your server and have no interest in a debugger, the rest of this document can be ignored.

Scotch Box does not come packaged with Xdebug, but it can be installed into a working Scotch Box with minimal effort.

1. Log in to your Scotch Box via SSH with the following commands:

	```
	cd /Users/{username}/MyServer
	vagrant ssh
	```
	
1. Once logged in, run the following commands:

	```
	sudo apt-get install php-xdebug
	sudo nano /etc/php/7.0/mods-available/xdebug.ini
	```
	
1. This will open a text editor where you can configure Xdebug. Add the following text to the xdebug.ini file, then save it:

	```
	zend_extension=xdebug.so
	xdebug.show_error_trace = 1
	xdebug.remote_enable=on
	xdebug.remote_connect_back=on
	xdebug.remote_host=192.168.33.10
	``` 
	
1. Finally, restart the Apache web server with the following command:

	```
	sudo apachectl graceful
	```

Your virtual machine now has a fully operational debugger, which you can access through your IDE.