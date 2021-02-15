#!/bin/bash

# PHP versions for Debian
sudo apt-get -y install apt-transport-https lsb-release ca-certificates curl
sudo curl -sSL -o /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'

# TablePlus (optional)
wget -O - -q http://deb.tableplus.com/apt.tableplus.com.gpg.key | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://deb.tableplus.com/debian tableplus main"

# ElasticSearch (optional)
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list

# Fetch the latest version info and upgrade existing packages
sudo apt update -y
sudo apt upgrade -y

# PHP stuff
sudo apt install php5.6-fpm -y
sudo apt install php7.4-fpm -y
sudo apt install php8.0-fpm -y
sudo apt install php-pear -y
sudo apt install php-memcache -y

# PHP modules
for module in xdebug imagick gettext gd bcmath bz2 curl dba xml gmp intl ldap mbstring mysql odbc soap zip enchant sqlite3
do
    for version in 7.4 5.6 8.0
    do
        sudo apt install php${version}-${module} -y
    done
done

# Apache web server
sudo apt install apache2 -y
# enable Apache FastCGI / FPM module
sudo a2enmod proxy_fcgi

# TablePlus (optional)
sudo apt install tableplus -y

# ElasticSearch (optional)
sudo apt install elasticsearch -y

# MariaDB (MySQL)
sudo apt install mariadb-server -y
sudo mysql -uroot -p