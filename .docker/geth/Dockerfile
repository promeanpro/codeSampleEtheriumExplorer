FROM ethereum/client-go:stable

RUN mkdir /blockchain

ENTRYPOINT ["geth", "--ws", "--wsaddr=0.0.0.0", "--wsorigins=test", "--datadir=/blockchain"]