FROM icr.io/appcafe/open-liberty:kernel-slim-java17-openj9-ubi

# Add config
COPY --chown=1001:0  docker/config/prod/server.xml /config/

RUN features.sh

# Add application
COPY --chown=1001:0  docker/config/prod/war/WEB-INF/* /config/apps/defender-ui.war/WEB-INF/
COPY --chown=1001:0  build/asset-manifest.json /config/apps/defender-ui.war/
COPY --chown=1001:0  build/favicon.ico /config/apps/defender-ui.war/
COPY --chown=1001:0  build/index.html /config/apps/defender-ui.war/
COPY --chown=1001:0  build/manifest.json /config/apps/defender-ui.war/
COPY --chown=1001:0  build/robots.txt /config/apps/defender-ui.war/
COPY --chown=1001:0  build/logo192.png /config/apps/defender-ui.war/
COPY --chown=1001:0  build/logo512.png /config/apps/defender-ui.war/
COPY --chown=1001:0  build/static/css/* /config/apps/defender-ui.war/static/css/
COPY --chown=1001:0  build/static/images/* /config/apps/defender-ui.war/static/images/
COPY --chown=1001:0  build/static/js/* /config/apps/defender-ui.war/static/js/
COPY --chown=1001:0  build/static/media/* /config/apps/defender-ui.war/static/media/

# The new start script will create a keystore with OpenShift's certificates
USER root
RUN mv /opt/ol/helpers/runtime/docker-server.sh /opt/ol/helpers/runtime/docker-server2.sh
COPY --chown=1001:0 docker/config/docker-server.sh /opt/ol/helpers/runtime/docker-server.sh
RUN chmod 775 /opt/ol/helpers/runtime/docker-server.sh
USER 1001

