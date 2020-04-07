# Keycloak Server Installation Instruction

Please refer to [Keycloak Documentation](https://www.keycloak.org/docs/latest/server_installation/index.html)

## 1. System Requirements

These are the requirements to run the Keycloak authentication server:

Can run on any operating system that runs Java

- Java 8 JDK

- zip or gzip and tar

- At least 512M of RAM

- At least 1G of diskspace

- A shared external database like PostgreSQL, MySQL, Oracle, etc. Keycloak requires an external shared database if you want to run in a cluster. Please see the database configuration section of this guide for more information.

- Network multicast support on your machine if you want to run in a cluster. Keycloak can be clustered without multicast, but this requires a bunch of configuration changes. Please see the clustering section of this guide for more information.

- On Linux, it is recommended to use /dev/urandom as a source of random data to prevent Keycloak hanging due to lack of available entropy, unless /dev/random usage is mandated by your security policy. To achieve that on Oracle JDK 8 and OpenJDK 8, set the java.security.egd system property on startup to file:/dev/urandom.

## 2. Installing Distribution Files

The Keycloak Server has three downloadable distributions:

You can download from https://www.keycloak.org/downloads.html

- [keycloak-4.5.0.Final](https://downloads.jboss.org/keycloak/4.5.0.Final/keycloak-4.5.0.Final.tar.gz)

- [keycloak-overlay-4.5.0.Final](https://downloads.jboss.org/keycloak/4.5.0.Final/keycloak-overlay-4.5.0.Final.tar.gz)

- [keycloak-demo-4.5.0.Final]

The 'keycloak-4.5.0.Final.[zip|tar.gz]' file is the server only distribution. It contains nothing other than the scripts and binaries to run the Keycloak Server. To unpack this file just run your operating system’s unzip or gunzip and tar utilities.

The 'keycloak-overlay-4.5.0.Final.[zip|tar.gz]' file is a WildFly add-on that allows you to install Keycloak Server on top of an existing WildFly distribution. We do not support users that want to run their applications and Keycloak on the same server instance. To install the Keycloak Service Pack, just unzip it in the root directory of your WildFly distribution, open the bin directory in a shell and run ./jboss-cli.[sh|bat] --file=keycloak-install.cli.

The 'keycloak-demo-4.5.0.Final.[zip|tar.gz]' contains the server binaries, all documentation and all examples. It is preconfigured with both the OIDC and SAML client application adapters and can deploy any of the distribution examples out of the box with no configuration. This distribution is only recommended for those that want to test drive Keycloak. We do not support users that run the demo distribution in production.

To unpack of these files run the unzip or gunzip and tar utilities.

## 3. Unzip and Install on the Server

Please make sure that you already downloaded keycloak-4.5.0.Final.tar.gz on your server.

```
$ ssh -p2211 dev@185.185.24.8
...
$ tar -zxvf keycloak-4.5.0.Final.tar.gz
$ cd keycloak-4.5.0.Final
$ ./bin/standalone.sh
```

## 4. SSL Configuration

To connect Keycloak Admin console, you should edit `../standalone/configuration/standalone.xml`.

In the standalone configuration file, search for the security-realms element and add:

```
<security-realm name="UndertowRealm">
    <server-identities>
        <ssl>
            <keystore path="keycloak.jks" relative-to="jboss.server.config.dir" keystore-password="secret" />
        </ssl>
    </server-identities>
</security-realm>


Find the element server name="default-server" (it’s a child element of subsystem xmlns="urn:jboss:domain:undertow:3.0") and add:

<subsystem xmlns="urn:jboss:domain:undertow:3.0">
   <buffer-cache name="default"/>
   <server name="default-server">
      <https-listener name="https" socket-binding="https" security-realm="UndertowRealm"/>
   
</subsystem>
```

`keycloak.jks` is the jks file which was created by converted the SSL into jks.

To create `keycloak.jks`, please use the following command

```
keytool -import -keystore keycloak.jks -file root.crt -alias root
```

> root.crt is the certificate file

> alias you can choose any

It will ask you for export password when you run this command. The export password you need as a secret to be used in `standalone.xml`.


`secret` is the export password used while converting the ssl certificate into jks.

After all, run Keycloak server by the following command

```
$ ./bin/standalone.sh
```