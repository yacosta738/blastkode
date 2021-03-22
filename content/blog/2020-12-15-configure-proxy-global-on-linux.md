---
title: Configure global proxy on linux
path: /configure-proxy-global-on-linux
date: 2020-12-06
description: Configure global proxy on linux
summary: In this article I share some tips to In this article I share some tips to configure a global proxy in GNU/Linux operating systems
author: Yuniel Acosta
tags: [Proxy, Linux, Windscribe, Proxifier, VPN, Redsock, Proxychains]
categories: [Tooling]
cover: ./images/configure-proxy-global-on-linux/portada-proxy.jpg
draft: false
---

![background](./images/configure-proxy-global-on-linux/portada-proxy.jpg)

In GNU/Linux operating systems when we are behind a proxy server, it can become a bit cumbersome to use programs that do not have their own proxy configuration or commands like **apt-get**, or we simply want to configure it globally. Many of the GNU/Linux distributions use different package managers which are configured in different ways, in addition there are many programs that need their specifications to configure the Internet output through a proxy server. All this process becomes very cumbersome to do in environments where you use a proxy with authentication and it changes from time to time or you use a laptop where you can constantly connect to networks where proxy is not used. Imagine changing all the settings every time you change networks.

![background](./images/configure-proxy-global-on-linux/proxy-schema.png)

Here are some examples of how to configure proxy in some GNU / Linux distros

![background](./images/configure-proxy-global-on-linux/proxy-global.jpg)

## Terminal Proxy Settings
If we want to use a proxy temporarily in the terminal, we execute the following commands:

    export http_proxy=http://username:password@proxyserver:puerto
    export https_proxy=$http_proxy

## Setting environment variables for Debian | Ubuntu family distributions:
Edit file `/etc/environment` with your favorite text editor.

    sudo vim /etc/environment

We add the following lines to the file, you must duplicate them in upper and lower case because (unfortunately) some programs only search for one or the other:

    http_proxy http://username:password@proxyserver:puerto
    https_proxy http://username:password@proxyserver:puerto
    ftp_proxy http://username:password@proxyserver:puerto
    no_proxy localhost,127.0.0.1,localaddress,.localdomain.com
    #Duplicadas en mayúsculas
    HTTP_PROXY http://username:password@proxyserver:puerto
    HTTPS_PROXY http://username:password@proxyserver:puerto
    FTP_PROXY http://username:password@proxyserver:puerto
    NO_PROXY localhost,127.0.0.1,localaddress,.localdomain.com

## Setting environment variables for distributions of the RedHat|Fedora|Centos family:
    sudo vim /etc/profile.d/proxy.sh

We modify the necessary parameters

    export http_proxy="http://username:password@proxyserver:puerto/"
    export https_proxy="http://username:password@proxyserver:puerto/"
    export ftp_proxy="http://username:password@proxyserver:puerto/"

## Proxy settings for apt-get, apt, aptitude:
We create or edit file `/etc/apt/apt.conf`

    sudo vim /etc/apt/apt.conf

We add the following lines:

    Acquire::http::Proxy "http://username:password@proxyserver:puerto";
    Acquire::https::Proxy "http://username:password@proxyserver:puerto";
    Acquire::ftp::Proxy "http://username:password@proxyserver:puerto";
    #En caso de tener un repo local para el que no necesitemos proxy
    Acquire::http::Proxy {
    repositorio.localdomain.com DIRECT;
    repositorio2.localdomain.com DIRECT;
    };

## Proxy settings for yum:
Edit file `/etc/yum.conf`

    # proxy server address and port
    proxy=http://proxyserver:puerto
    # user and password
    proxy_username=usuario
    proxy_password=contraseña

## Proxy settings for pacman:
We edit the file `/etc/pacman.conf` and we must uncomment `XferCommand` as follows:

    XferCommand = /usr/bin/wget --passive-ftp -c -O %o %u

![background](./images/configure-proxy-global-on-linux/pacman.conf.png)

We save the changes and proceed to edit the configuration file for `wget`, a tool used to download packages.

    sudo vim /etc/wgetrc

We edit the configuration file `/etc/wgetrc`, look for the following lines and uncomment or add them to the end of the file.

    https_proxy = http://username:password@proxyserver:puerto
    http_proxy = http://username:password@proxyserver:puerto
    ftp_proxy = http://username:password@proxyserver:puerto
    use_proxy = on

## Proxy configuration for nodejs (npm)

    npm config set proxy http://username:password@proxyserver:puerto
    npm config set https-proxy http://username:password@proxyserver:puerto

## Proxy configuration for Git

    git config --global http.proxy http//proxyserver:puerto
    git config --global https.proxy https//proxyserver:puerto
    # In case we have a direct connection and we need to remove the proxy settings from git
    git config --global --unset http.proxy
    git config --global --unset https.proxy

As you can see, it is very complex to constantly maintain the configuration of a proxy on your pc, but luckily there are other options that allow you to configure a proxy globally to the entire operating system. In systems such as Windows or MacOS there are tools such as Proxifier, ProxyCap among others that facilitate access to the internet through a proxy, on the other hand GNU/Linux operating systems have alternatives to these programs like the ones listed below.

# Redsock

[Redsock](https://github.com/darkk/redsocks) is a tool that allows you to redirect any TCP connection to SOCKS or HTTPS proxy using your firewall, so the redirection can be system-wide or network-wide . This tool is very useful because it allows us with a single configuration file to be able to use the connection through the proxy throughout the operating system.

## Packages for the different linux distributions

---
- Archlinux/Manjaro: [https://aur.archlinux.org/packages/redsocks-git](https://aur.archlinux.org/packages/redsocks-git)
- Debian:[ http://packages.debian.org/search?searchon=names&keywords=redsocks](http://packages.debian.org/search?searchon=names&keywords=redsocks)
- Gentoo (zugaina overlay):[http://gpo.zugaina.org/net-proxy/redsocks](http://gpo.zugaina.org/net-proxy/redsocks)
- Gentoo: [https://packages.gentoo.org/packages/net-proxy/redsocks](https://packages.gentoo.org/packages/net-proxy/redsocks)
- Ubuntu: [http://packages.ubuntu.com/search?searchon=names&keywords=redsocks](http://packages.ubuntu.com/search?searchon=names&keywords=redsocks)

## Manual compilation of redsock
To compile redsock we need to clone its repository on GitHub [https://github.com/darkk/redsocks](https://github.com/darkk/redsocks) and follow the instructions in the README.md. ** [libevent-2.0.x] (http://libevent.org/) ** must be installed on our system, as well as the `gcc` and` clang` compilers. Compilation is as easy as running `make` in the project's root directory.

## Run redsock
Running redsock depends a lot on the distribution you are using and how the package installed redsock. The program has the following command line options:

* -c specifies the path to the configuration file (`./redsocks.conf` is used by default)
* -t this option checks the syntax of the configuration file.
* -p set a file to write the `getpid()` where the following signals are specified: `SIGUSR1` dumps the list of connected clients to the registry,` SIGTERM` and `SIGINT` terminate the daemon, all active connections are closed.

You can see an example of the configuration file in [redsocks.conf.example](https://github.com/darkk/redsocks/blob/master/redsocks.conf.example).

### Iptables example
You have to build iptables with connection tracking and `REDIRECT` target.
````
  # Create new chain
  root# iptables -t nat -N REDSOCKS
  
  # Ignore LANs and some other reserved addresses.
  # See http://en.wikipedia.org/wiki/Reserved_IP_addresses#Reserved_IPv4_addresses
  # and http://tools.ietf.org/html/rfc5735 for full list of reserved networks.
  root# iptables -t nat -A REDSOCKS -d 0.0.0.0/8 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 10.0.0.0/8 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 100.64.0.0/10 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 127.0.0.0/8 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 169.254.0.0/16 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 172.16.0.0/12 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 192.168.0.0/16 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 198.18.0.0/15 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 224.0.0.0/4 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 240.0.0.0/4 -j RETURN
  
  # Anything else should be redirected to port 12345
  root# iptables -t nat -A REDSOCKS -p tcp -j REDIRECT --to-ports 12345
  
  # Any tcp connection made by `luser' should be redirected.
  root# iptables -t nat -A OUTPUT -p tcp -m owner --uid-owner luser -j REDSOCKS
  
  # You can also control that in more precise way using `gid-owner` from
  # iptables.
  root# groupadd socksified
  root# usermod --append --groups socksified luser
  root# iptables -t nat -A OUTPUT -p tcp -m owner --gid-owner socksified -j REDSOCKS
  
  # Now you can launch your specific application with GID `socksified` and it
  # will be... socksified. See following commands (numbers may vary).
  # Note: you may have to relogin to apply `usermod` changes.
  luser$ id
  uid=1000(luser) gid=1000(luser) groups=1000(luser),1001(socksified)
  luser$ sg socksified -c id
  uid=1000(luser) gid=1001(socksified) groups=1000(luser),1001(socksified)
  luser$ sg socksified -c "firefox"
  
  # If you want to configure socksifying router, you should look at
  # doc/iptables-packet-flow.png, doc/iptables-packet-flow-ng.png and
  # https://en.wikipedia.org/wiki/File:Netfilter-packet-flow.svg
  # Note, you should have proper `local_ip' value to get external packets with
  # redsocks, default 127.0.0.1 will not go. See iptables(8) manpage regarding
  # REDIRECT target for details.
  # Depending on your network configuration iptables conf. may be as easy as:
  root# iptables -t nat -A PREROUTING --in-interface eth_int -p tcp -j REDSOCKS
````

Redsock is one of my favorite tools for configuring all my internet traffic through a proxy using the TCP protocol. Below I show you another more recent alternative that is very interesting and easy to configure.

# Proxifier-For-Linux
Proxifier-For-Linux es una herramienta que actúa como un intermediario entre el servidor proxy y los programas clientes que necesiten
acceso a internet. Proxifier trabaja a través de los servidores proxy en nombre de los otros programas. Proxifier actúa como un punto
global para configurar las reglas de proxy, que se aplicarán a todos los programas del sistema. Como mencioné anteriormente es un proyecto
nuevo por lo que actualmente solo tiene soporte para proxies http.

Como se explica en el repositorio oficial de [Proxifier-for-linux](https://github.com/m0hithreddy/Proxifier-For-Linux) nuestro sistema
operativo debe contar con las siguientes dependencias

## Dependencias
A continuación se muestra la lista de dependencias requeridas para compilar y ejecutar Proxifier, asi como la posible instalación
en dependencia del sistema operativo que uses.

### Instalar las dependencias
Para comprobar si tienes ya las dependencias instaladas puedes usar el comando `which <nombre del paquete>`. Ejemplo `which autoconf`
y si te devuelve la ruta es que ya esa dependencia está instalada
- [autoconf](https://github.com/autotools-mirror/autoconf) [$ sudo apt install autoconf]
- [automake](https://github.com/autotools-mirror/automake) [$ sudo apt install automake]
- [libtool](https://github.com/autotools-mirror/libtool) [$ sudo apt install libtool]
- [txt2man](https://github.com/mvertes/txt2man) [$ sudo apt install txt2man]

## Descargar Proxifier
Obtén la última versión estable de Proxifier clonando el repositorio de GitHub.

    $ git clone https://github.com/m0hithreddy/Proxifier-For-Linux.git && cd Proxifier-For-Linux

## Construir e Instalar
Después de instalar todas las dependencias, obtén el código fuente de Proxifier y dentro del directorio donde está el código ejecuta
los siguientes comandos:

    $ autoreconf -vfi
    $ ./configure
    $ make all
    $ sudo make uninstall
    $ sudo make install

## Como usar Proxifier
El servicio de Proxifier se puede habilitar ejecutando el comando:

    $ sudo systemctl daemon-reload # Reload the service units
    $ sudo systemctl start proxifier

Para más información de Proxifier puedes consultar la ayuda ejecutando el comando `$ man proxifier`. El archivo de configuración
se puede encontrar en la ruta `/usr/local/etc/proxifier.conf` donde puedes especificar la configuración de tu proxy.

La siguiente herramienta que te quiero mostrar es Proxychains

# Proxychains
[Proxychains-ng](https://github.com/haad/proxychains) es un servidor proxy que soporta los protocolos de internet HTTPs, SOCKS4 y SOCKS5 y funciona
en plataformas basadas en Unix. Permite que cualquier conexión TCP hecha por un programa siga una serie de proxies(de los protocolos antes mencionados)
hasta su destino. La lista de proxies así como la estrategia de selección de los proxies se definen con anterioridad.

## Instalar proxychains
Proxychains está disponible con [pkgsrc](https://github.com/haad/proxychains/blob/master/www.pkgsrc.org) para todos los que
lo usen en Linux, NetBSD, FreeBSD, OpenBSD, DragonFlyBSD o Mac OS X. Solo necesita instalar  [pkgsrc-wip](http://pkgsrc-wip.sourceforge.net/)
y ejecutar `make install` en un el directorio `wip/proxychains`

### Instalar proxychains desde el código fuente

Clonar el código fuente de GitHub y ejecutar los siguientes comando:

    git clone https://github.com/haad/proxychains.git && cd proxychains
    # se necesita un compilador de C, preferiblemente gcc
    ./configure
    make
    sudo make install

### Paquetes para las distintas distribuciones linux

---
- Archlinux/Manjaro: [https://www.archlinux.org/packages/community/x86_64/proxychains-ng/](https://www.archlinux.org/packages/community/x86_64/proxychains-ng/)
- Debian: [https://packages.debian.org/search?keywords=proxychains](https://packages.debian.org/search?keywords=proxychains)
- Gentoo: [https://packages.gentoo.org/packages/net-proxy/proxychains](https://packages.gentoo.org/packages/net-proxy/proxychains)
- Fedora: [https://fedora.pkgs.org/32/fedora-x86_64/proxychains-ng-4.13-5.fc32.x86_64.rpm.html](https://fedora.pkgs.org/32/fedora-x86_64/proxychains-ng-4.13-5.fc32.x86_64.rpm.html)
- Ubuntu: [http://packages.ubuntu.com/search?searchon=names&keywords=proxychains](http://packages.ubuntu.com/search?searchon=names&keywords=proxychains)

## Configuración
Proxychains busca la configuración en el siguiente orden:

- Puerto proxy SOCKS5 en la variable de entorno $ {PROXYCHAINS_SOCKS5} (si se establece, no se buscarán más configuraciones)

- Archivo listado en la variable de entorno $ {PROXYCHAINS_CONF_FILE} o proporcionado como un argumento -f para el script o binario de proxychains.

- ./proxychains.conf

- $(HOME)/.proxychains/proxychains.conf

- /etc/proxychains.conf

Ver más de la configuración en el archivo `/etc/proxychains.conf`
### Ejemplo de como configurar varios proxies

Al final del fichero `/etc/proxychains.conf` se encuentra la lista donde podemos agregar nuestros proxies. Las estrategias de
selección de proxies varían entre `dynamic_chain, strict_chain, round_robin_chain, random_chain` y solo uno puede estar
descomentado.

- dynamic_chain: Dinámico: cada conexión se realizará a través de proxies encadenados, todos los proxies encadenados en el orden en que aparecen en la lista, al menos un proxy debe estar en línea para jugar en cadena (se omiten los proxies muertos) de lo contrario, EINTR se devuelve a la aplicación

- strict_chain: Estricto: cada conexión se realizará a través de proxies encadenados, todos los proxies encadenados en el orden en que aparecen en la lista, todos los proxies deben estar en línea para jugar en cadena; de lo contrario, EINTR se devuelve a la aplicación

- round_robin_chain: Round Robin: cada conexión se realizará a través de proxies encadenados de longitud `chain_len`, todos los proxies encadenados en el orden en que aparecen en la lista, al menos un proxy debe estar en línea para jugar en cadena (se omiten los proxies muertos). el inicio de la cadena de proxy actual es el proxy después del último proxy en la cadena de proxy invocada anteriormente. Si se alcanza el final de la cadena de proxy mientras se buscan proxies, comience de nuevo desde el principio. De lo contrario, EINTR se devuelve a la aplicación. Esta semántica no está garantizada en un entorno multiproceso.

- random_chain: Aleatorio: cada conexión se realizará mediante un proxy aleatorio (o una cadena de proxy, consulte `chain_len`) de la lista.


    [ProxyList]
    # add proxy here ...
    # meanwile
    # defaults set to "tor"
    socks4  127.0.0.1 9050
    #psiphon proxy
    http 127.0.0.1 52525
    socks5 127.0.0.1 42552
    #Otro Proxy 
    http 192.168.1.11 8080 user password
    #Mobile proxy
    http 192.168.44.244 3128 user password

## Ejemplos de uso

Ejecutar `proxychains <programa a ejecutar a través de un proxy>`

    $ proxychains telnet targethost.com

En este ejemplo se ejecuta el programa **telnet** a través de un proxy ( o una cadena de proxies ) especificada por proxychains.con
in this example it will run telnet through proxy(or chained proxies) specified by proxychains.conf

Proxychains nos da una gran ventaja al poder encadenar muchos proxies a la vez lo que se usa mucho en ciberseguridad para ocultar
la identidad de las peticiones realizadas. Una de las desventajas que tiene proxychains es que se ejecuta en la consola lo cual
resulta incómodo cuando usamos programas con interfaz gráfica.

El siguiente en la lista es uno de mis favoritos pues es una VPN que permite configurar un proxy global para todo el
sistema operativo así como montar un firewall en la pc.

# Windscribe

[Windscribe](https://windscribe.com/?friend=abhyp2zr) es un conjunto de herramientas que permiten bloquear los seguidores de anuncios y los beacons web,
restaurar el acceso a contenido bloqueado y ayudarle a proteger su privacidad en línea. Hay dos componentes:
la aplicación de escritorio VPN (Windows, MacOS y Linux) y la extensión del navegador (Chrome, Edge, Firefox, Safari, ...)

La aplicación de escritorio es un cliente VPN (Virtual Private Network). Crea un túnel encriptado desde tu computadora a
los servidores de [winscribe](https://windscribe.com/?affid=abhyp2zr), y toda tu actividad se envía a través del túnel. Esto tiene dos ventajas:

1. La dirección IP de su proveedor de servicios de Internet (ISP) está enmascarada, por lo que cualquier sitio web que visite
   o cualquier aplicación que utilice (Skype, proveedores de correo electrónico, BitTorrent, etc.) verá nuestra
   dirección IP compartida por miles de personas.
2. Su proveedor de servicios de Internet no puede ver lo que hace en línea. Esto es mucho más importante de lo que piensas.

Lo primero que se tiene que hacer es crear una cuenta en [Windscribe](https://windscribe.com/?friend=abhyp2zr) registrándose
[aquí](https://windscribe.com/?friend=abhyp2zr). Windscribe nos da 2GB de consumo mensual gratis, pero si confirmamos nuestro
correo electrónico este aumenta 5GB, además puedes aumentar hasta 15GB mensuales si creas un post en twitter dando en el botón
*__Tweet4Data__* en la configuración de tu cuenta.

{{<post-image image="more-data.png" width="500" alt="More Data" />}}

## Instalar Windscribe
Después de registrarse se descarga el cliente de escritorio o la extensión para su navegador favorito
en la sesión de [Descargas](https://windscribe.com/?friend=abhyp2zr). Seguir las instrucciones del enlace de descarga
en dependencia del sistema operativo que uses.

## Configuración del cliente de Windscribe para Linux
Lo primero que tenemos que hacer es arrancar el servicio de windscribe para ello ejecutamos el comando:

    sudo systemctl start windscribe

Una vez este corriendo el servicio de windscribe debemos configurar el proxy ejecutando el comando
`windscribe proxy --host <direccion del proxy> --port <puerto> --user <usuario> --password <contraseña>`:

    windscribe proxy --host 19.18.4.54 --port 3128 --user acosta --password "super password"
    windscribe proxy on

Con los comandos anteriores configuramos y activamos windscribe para que use nuestro proxy. Ahora cuando para conectar toda las
aplicaciones salgan a internet a través de Windscribe ejecutamos el comando:

    windscribe connect best # Nos conecta al servidor de windscribe con mejor rendimiento

Para consultar la ayuda de windscribe podemos ejecutar el comando `windscribe --help`


{{<post-image image="windscribe-help.png" width="500" alt="Windscribe" />}}

Estas son algunas de las opciones que existen para configurar la salida a internet a través de un proxy en sistemas operativos GNU-Linux.
De todas las variantes mostradas en este artículo mi favorita sin dudas es windscribe por todas las facilidades que ofrece.
Espero que les sirva de ayuda en caso que quieran tener configurado de forma global un proxy en linux.

